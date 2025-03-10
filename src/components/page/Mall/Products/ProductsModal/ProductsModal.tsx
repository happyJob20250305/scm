import { useRecoilState } from 'recoil';
import { modalState } from '../../../../../stores/modalState';
import { FC, useContext, useEffect, useRef, useState } from 'react';
import { ProductsModalStyled } from './styled';
import { StyledInput } from '../../../../common/StyledInput/StyledInput';
import { StyledButton } from '../../../../common/StyledButton/StyledButton';
import styled from 'styled-components';
import { StyledInputStyled } from '../../../../common/StyledInput/styled';
import { searchApi } from '../../../../../api/MallApi/searchApi';
import { Products } from '../../../../../api/api';
import { IProducts, IProductsBodyResponse, IProductsDetail } from '../../../../../models/interface/IProducts';
import { Column, StyledTable } from '../../../../common/StyledTable/StyledTable';
import { ChangeEvent } from 'react';
import { postApi } from '../../../../../api/MallApi/postApi';
import { ProductsContext } from '../../../../../api/Provider/ProductsProvider';
import Swal from 'sweetalert2';


interface IProductsModalProps {
    productId: number;
    postSuccess: () => void;
    setProductId: React.Dispatch<React.SetStateAction<number>>;
}

const initProducts = {
    productId: 0,
    supplyId: 0,
    productNumber: "",
    name: "",
    sellPrice: 0,
    description: "",
    categoryName: "",
    supplyName: "",
    fileName: null,
    fileSize: 0,
    logicalPath: null, 
}

export const ProductsModal: FC<IProductsModalProps> = ({productId, postSuccess, setProductId}) => {
    const [modal, setModal] = useRecoilState<boolean>(modalState);
    const [imageUrl, setImageUrl] = useState<string>("");
    const [fileName, setFileName] = useState<string>("");
    const [detail, setDetail] = useState<IProducts>(initProducts);
    const [attachment, setAttachment] = useState<IProducts>();
    const [sellPrice, setSellPrice] = useState<string>("");
    const [count, setCount] = useState<number>();
    const [requestedDeliveryDate, setRequestedDeliveryDate] = useState<string>("");
    const { userType } = useContext(ProductsContext);
    
    useEffect(() => {

        productId && productsDetail();


        return () => {
            setProductId(0);
        }
    }, [productId]);


    const productsDetail = async () => {
        try {
            const result = await searchApi<IProductsBodyResponse>(
                Products.searchDetail,
                {productId}
            );

            if(result) {
                setDetail(result.detailValue);
                setAttachment(result.attachmentValue);


                const { fileType, logicalPath } = result.attachmentValue;
                if (fileType === "jpg" || fileType === "gif" || fileType === "png") {
                    setImageUrl(logicalPath);
                } else {
                    setImageUrl("");
                }

                setSellPrice(result.detailValue.sellPrice.toLocaleString());

            }
        } catch (error) {
            console.error("searchDetail 오류:", error);
        }
    }

    // 단독건 주문하기
    const saveOrder = async() => {
        const updateDetail = {
            ...detail,
            count,
            requestedDeliveryDate: requestedDeliveryDate || null,  // 빈 문자열인 경우 null 처리
            price: detail.sellPrice
        }
        
        if(checkInput()) {
            const result = await postApi(Products.historySave, updateDetail);
            
            if(!result) {
                return;
            }

            if(!confirm("입금하시겠습니까?")) {
                return;
            } else {
                if(result.result === "success") {
                    Swal.fire({
                        icon: "success",
                        title: "주문 완료",
                        confirmButtonText: "확인",
                    }).then(() => {
                        postSuccess(); // 승인 후 실행할 함수
                    });
                }
            }

            

            
        }

        
    }

    // 장바구니 담기
    const addCart = async() => {
        const updateDetail = {
            ...detail,
            count,
            requestedDeliveryDate: requestedDeliveryDate || null,  // 빈 문자열인 경우 null 처리
            price: detail.sellPrice
        }

        if(checkInput()) {
            const result = await postApi(Products.cartDetailSave, updateDetail);

            if(result.result === "success") {
                Swal.fire({
                    icon: "success",
                    title: "담기 완료",
                    confirmButtonText: "확인",
                }).then(() => {
                    postSuccess(); // 승인 후 실행할 함수
                });
            }
        }

                
    }

    // 유효성 검사
    const checkInput = () => {
        const currentDate = new Date();
        currentDate.setHours(0, 0, 0, 0);
        const inputDate = new Date(requestedDeliveryDate);
        inputDate.setHours(0, 0, 0, 0);

        if(!count) {
            alert('주문 수량을 입력해주세요.');
            return false;
        } else if(count < 1) {
            alert('주문 수량은 최소 1개입니다.');
            return false;
        }
        if(!requestedDeliveryDate) {
            alert('납품 희망일자를 입력해주세요.');
            return false;
        } else if(inputDate < currentDate) {
            alert('배송일을 과거 날짜로 선택할 수 없습니다.');
            return false;
        }
        return true;
    }

    const handlerFile = (e: ChangeEvent<HTMLInputElement>) => {
        const fileInfo = e.target.files;
        if (fileInfo?.length > 0) {
            const fileSplit = fileInfo[0].name.split(".");
            const fileType = fileSplit[1].toLowerCase();

            if (fileType === "jpg" || fileType === "gif" || fileType === "png") {
                setImageUrl(URL.createObjectURL(fileInfo[0]));
            }
            setFileName(fileInfo[0].name)
        }
    }

    return (
        <ProductsModalStyled>
            <div className="container">
                <table>
                    <tbody>
                        <tr>
                            <th rowSpan={3}>
                                <label htmlFor="file-upload">
                                    <img className="product-image" src={imageUrl || "default_image_url"} alt="상품 이미지" />
                                </label>
                                <input
                                    id="file-upload"
                                    type="file"
                                    accept="image/jpg, image/jpeg, image/png, image/gif"
                                    style={{ display: "none" }} 
                                    onChange={handlerFile}
                                />
                            </th>
                            <th>제품 번호</th>
                            <td><StyledInput size="modal" name='productId' type="text" defaultValue={productId} readOnly/></td>
                            <th>주문 수량<span className="font_red">*</span></th>
                            <td><StyledInput size="modal" name='count' type="text" placeholder='수량 입력 필수'
                                onChange={(e) => setCount(Number(e.target.value))}/></td>
                        </tr>
                        <tr>    
                            <th>제조사</th>
                            <td><StyledInput size="modal" type="text" defaultValue={detail.supplyName} readOnly/></td>
                            
                            <th>납품 희망일자<span className="font_red">*</span></th>
                            <td><StyledInput size="modal" name='requestedDeliveryDate' type="date"
                                onChange={(e) => setRequestedDeliveryDate(e.target.value)}/></td>
                        </tr>
                        <tr>
                            <th>판매 가격</th>
                            <td><StyledInput size="modal" type="text" name='price' defaultValue={sellPrice}  readOnly/></td>
                        </tr>
                        <tr>
                            <th colSpan={5}>제품 상세 정보</th>
                        </tr>
                        <tr>
                            <td colSpan={5}>
                                <textarea className="text-area" defaultValue={detail.description} readOnly></textarea>
                            </td>
                        </tr>
                    </tbody>
                </table>

                <div className="button-container">
                    {userType !== null && userType !== "S" && (
                        <>
                            <button onClick={addCart}>장바구니 담기</button>
                            <button onClick={saveOrder}>주문</button>
                        </>
                    )}
                    <button onClick={() => setModal(!modal)}>취소</button>
                </div>
            </div>


        </ProductsModalStyled>
    )
}
