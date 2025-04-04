import { useContext, useEffect, useState } from "react";
import { ApprovalOrderMainStyled } from "./styled";
import { ApprovalOrderContext } from "../../../../../api/Provider/approval/ApprovalOrderProvider";
import { searchApi } from "../../../../../api/ApprovalApi/searchApi";
import { Approval } from "../../../../../api/api";
import { IApprovalOrder, IApprovalOrderResponse } from "../../../../../models/interface/IApproval";
import { Column, StyledTable } from "../../../../common/StyledTable/StyledTable";
import { StyledButton } from "../../../../common/StyledButton/StyledButton";
import { PageNavigate } from "../../../../common/pageNavigation/PageNavigate";
import { postApi } from "../../../../../api/ApprovalApi/postApi";
import Swal from "sweetalert2";
import { Spinner } from "../../../../common/Spinner/spinner";

export const ApprovalOrderMain = () => {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const { searchKeyword } = useContext(ApprovalOrderContext);
    const [approvalOrderCount, setApprovalOrderCount] = useState<number>(0);
    const [cPage, setCPage] = useState<number>(0);
    const [approvalOrderList, setApprovalOrderList] = useState<IApprovalOrder[]>([]);

    const columns = [
        { key: "supplyName", title: "발주업체명" },
        { key: "productName", title: "제품명" },
        { key: "count", title: "수량" },
        { key: "price", title: "금액" },
        { key: "orderDate", title: "구매일자" },
        { key: "actions", title: "" },
    ] as Column<IApprovalOrder>[];

    useEffect(() => {
        searchApprovalOrder();
    }, [searchKeyword]);

    const handlerButton = async (orderId: number) => {
        const result = await postApi(Approval.approvalOrder, { orderId });
        if (result.result === "success") {
            Swal.fire({
                icon: "success",
                title: "승인 완료",
                confirmButtonText: "확인",
            }).then(() => {
                searchApprovalOrder();
            });
        }
    };

    const searchApprovalOrder = async (currentPage?: number) => {
        currentPage = currentPage || 1;
        setIsLoading(true);
        try {
            const result = await searchApi<IApprovalOrderResponse>(Approval.searchOrder, {
                ...searchKeyword,
                currentPage,
                pageSize: 5,
            });

            if (result) {
                setApprovalOrderList(result.orderList);
                setApprovalOrderCount(result.orderCnt);
                setCPage(currentPage);
            }
        } catch (error) {
            console.error("Error fetching shopping orders:", error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <ApprovalOrderMainStyled>
            {isLoading ? (
                <Spinner />
            ) : (
                <StyledTable
                    data={approvalOrderList}
                    columns={columns}
                    renderAction={(row) => (
                        <StyledButton size='small' onClick={() => handlerButton(row.orderId)}>
                            승인
                        </StyledButton>
                    )}
                    renderCell={(row, column) => {
                        if (column.key === "price") {
                            const totalPrice = row.count * row.price;
                            return `${totalPrice.toLocaleString("ko-KR")}원`;
                        }
                        return row[column.key as keyof IApprovalOrder];
                    }}
                />
            )}
            <PageNavigate
                totalItemsCount={approvalOrderCount}
                onChange={searchApprovalOrder}
                itemsCountPerPage={5}
                activePage={cPage}
            />
        </ApprovalOrderMainStyled>
    );
};
