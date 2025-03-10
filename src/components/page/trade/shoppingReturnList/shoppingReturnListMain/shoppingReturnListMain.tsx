import { useContext, useEffect, useState } from "react";
import { StyledButton } from "../../../../common/StyledButton/StyledButton";
import { useRecoilState } from "recoil";
import { modalState } from "../../../../../stores/modalState";
import { searchApi } from "../../../../../api/CommonCodeApi/searchApi";
import { Column, StyledTable } from "../../../../common/StyledTable/StyledTable";
import { ShoppingReturnListMainStyled } from "./styled";
import { ShoppingReturnListContext } from "../../../../../api/Provider/trade/ShoppingReturnListProvider";
import { IShoppingReturn, IShoppingReturnListResponse } from "../../../../../models/interface/IShoppingReturnList";
import { ShoppingReturnList } from "../../../../../api/api";
import { PageNavigate } from "../../../../common/pageNavigation/PageNavigate";
import { Portal } from "../../../../common/potal/Portal";
import { ShoppingReturnModal } from "../shoppingReturnListModal/shoppingReturnListModal";

export const transformShoppingReturnData = (data: any[]): IShoppingReturn[] => {
    return data.map((item) => ({
        count: item.count,
        isApproved: item.isApproved,
        name: item.name,
        price: item.price,
        productName: item.productName,
        refundId: item.refundId,
        returnsRequestDate: item.returnsRequestDate,
        totalPrice: item.totalPrice,
    }));
};
export const ShoppingReturnListMain = () => {
    const { searchKeyword } = useContext(ShoppingReturnListContext);
    const [cPage, setCPage] = useState<number>(0);
    const [shoppingReturnList, setShoppingReturnList] = useState<IShoppingReturn[]>([]);
    const [shoppingReturnListCnt, setShoppingReturnListCnt] = useState<number>(0);
    const [modal, setModal] = useRecoilState(modalState);
    const [shoppingReturnId, setShoppingReturnId] = useState<number>(0);

    const columns = [
        { key: "refundId", title: "번호" },
        { key: "productName", title: "반품제품명" },
        { key: "returnsRequestDate", title: "반품신청날짜" },
        { key: "count", title: "반품수량" },
        { key: "totalPrice", title: "반품금액" },
        { key: "isApproved", title: "처리상태" },
    ] as Column<IShoppingReturn>[];

    useEffect(() => {
        searchShoppingReturn();
    }, [searchKeyword]);

    const searchShoppingReturn = async (currentPage?: number) => {
        currentPage = currentPage || 1;

        const result = await searchApi<IShoppingReturnListResponse>(ShoppingReturnList.searchList, {
            ...searchKeyword,
            currentPage,
            pageSize: 5,
        });

        if (result) {
            setShoppingReturnList(transformShoppingReturnData(result.shoppingReturnList));
            setShoppingReturnListCnt(result.shoppingReturnListCnt);
            setCPage(currentPage);
        }
    };

    const handlerModal = (id: number) => {
        setModal(!modal);
        setShoppingReturnId(id);
    };

    const postSuccess = () => {
        setModal(!modal);
        searchShoppingReturn();
    };

    return (
        <ShoppingReturnListMainStyled>
            <StyledTable
                data={shoppingReturnList}
                columns={columns}
                onRowClick={(row) => {
                    handlerModal(row.refundId);
                }} // ✅ 특정 테이블에서만 실행!
                renderCell={(row, column) => {
                    if (column.key === "totalPrice") {
                        return `${row.totalPrice.toLocaleString("ko-KR")}원`; // 숫자를 통화 형식으로 변환
                    } else if (column.key === "isApproved") {
                        let approvalStatusText = "";

                        switch (
                            row.isApproved // isApproved 값에 따라 변환
                        ) {
                            case 0:
                                approvalStatusText = "SCM 승인 대기중";
                                break;
                            case 1:
                                approvalStatusText = "임원 승인 대기중";
                                break;
                            case 2:
                                approvalStatusText = "임원 승인 완료";
                                break;
                            case 3:
                                approvalStatusText = "창고 이동 완료";
                                break;
                            default:
                                approvalStatusText = "알 수 없는 상태"; // 예외 처리
                        }

                        return approvalStatusText;
                    }

                    return row[column.key as keyof IShoppingReturn]; // 기본 값 반환
                }}
            />
            <PageNavigate
                totalItemsCount={shoppingReturnListCnt}
                onChange={searchShoppingReturn}
                itemsCountPerPage={5}
                activePage={cPage}
            />
            {modal && (
                <Portal>
                    <ShoppingReturnModal shoppingReturnId={shoppingReturnId} postSuccess={postSuccess} />
                </Portal>
            )}
        </ShoppingReturnListMainStyled>
    );
};
