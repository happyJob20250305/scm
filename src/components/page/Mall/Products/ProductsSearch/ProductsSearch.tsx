import { useContext, useEffect, useRef, useState } from "react";
import { StyledSelectBox } from "../../../../common/StyledSelectBox/StyledSelectBox";
import { ProductsSearchStyled } from "./styled"
import { StyledButton } from "../../../../common/StyledButton/StyledButton";
import { StyledInput } from "../../../../common/StyledInput/StyledInput";
import { searchApi } from "../../../../../api/MallApi/searchApi";
import { getApi } from "../../../../../api/MallApi/getApi";
import { ICategory, ISupplyList } from "../../../../../models/interface/IProducts";
import { Products } from "../../../../../api/api";
import { ProductsContext } from "../../../../../api/Provider/ProductsProvider";

export const ProductsSearch = () => {
    const title = useRef<HTMLInputElement>();
    const [categories, setCategories] = useState<{label: string; value: string}[]>([]);
    const [selectCategoryValue, setSelectCategoryValue] = useState<string>("");
    const [supplyList, setSupplyList] = useState<{label: string; value: string}[]>([]);
    const [selectSupplyValue, setSelectSupplyValue] = useState<string>("");
    const { setSearchKeyword } = useContext(ProductsContext);
    
    useEffect(() => {
        selectCategory();
        selectsupply();
    }, [])

    const selectCategory = async () => {
        const result = await getApi<{categoryValue: ICategory[]}>(Products.category);
        const categoryOptions = result.categoryValue.map(category => ({
            label: category.detailName,
            value: category.detailName,
        }));
        setCategories([{ label: "전체", value: "" }, ...categoryOptions]);
    };

    const selectsupply = async () => {
        const result = await getApi<{supplyList?: ISupplyList[]}>(Products.supplyList);

        const supplyOptions = result.supplyList.map(supply => ({
            label: supply.name,
            value: supply.name,
        }));
        setSupplyList([{ label: "전체", value: ""}, ...supplyOptions]);
    };

    const handlerSearch = () => {
        setSearchKeyword({
            searchCategory: selectCategoryValue,
            searchSupplyName: selectSupplyValue,
            searchTitle: title.current.value,
        })
    }

    return (
        <ProductsSearchStyled>
            제품 분류:
            <StyledSelectBox options={categories} value={selectCategoryValue} onChange={setSelectCategoryValue}></StyledSelectBox>
            제조사:
            <StyledSelectBox options={supplyList} value={selectSupplyValue} onChange={setSelectSupplyValue}></StyledSelectBox>
            제품명:
            <StyledInput ref={title}/>
            <StyledButton variant='secondary' onClick={handlerSearch}>검색</StyledButton>
        </ProductsSearchStyled>
    )
}