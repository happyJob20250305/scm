import { FC, useEffect, useState } from "react";
import { StyledInput } from "../../../../common/StyledInput/StyledInput";
import { useRecoilState } from "recoil";
import { modalState } from "../../../../../stores/modalState";
import { ShoppingReturnListModalStyled } from "./styled";
import { searchApi } from "../../../../../api/tradeApi/searchApi";
import {
    ISelectOption,
    IShoppingReturn,
    IShoppingReturnModalResponse,
} from "../../../../../models/interface/IShoppingReturnList";
import { ShoppingReturnList } from "../../../../../api/api";
import { transformShoppingReturnData } from "../shoppingReturnListMain/shoppingReturnListMain";
import { StyledSelectBox } from "../../../../common/StyledSelectBox/StyledSelectBox";
import { postApi } from "../../../../../api/tradeApi/postApi";
import Swal from "sweetalert2";

const initShoppingReturn = {
    count: 0,
    isApproved: 0,
    name: "",
    price: 0,
    productName: "",
    refundId: 0,
    returnsRequestDate: "",
    totalPrice: 0,
};

interface IShoppingReturnListModalProps {
    postSuccess: () => void;
    shoppingReturnId: number;
}

export const ShoppingReturnModal: FC<IShoppingReturnListModalProps> = ({ postSuccess, shoppingReturnId }) => {
    const [modal, setModal] = useRecoilState(modalState);
    const [warehouseOptions, setWarehouseOptions] = useState<ISelectOption[]>([]);
    const [shoppingReturn, setShoppingReturn] = useState<IShoppingReturn>(initShoppingReturn);
    const [selectValue, setSelectValue] = useState<number>(0);

    useEffect(() => {
        shoppingReturnModal();
    }, []);

    const shoppingReturnModal = async () => {
        const result = await searchApi<IShoppingReturnModalResponse>(ShoppingReturnList.searchModal, {
            orderId: shoppingReturnId,
        });

        if (result) {
            const shoppingReturnList = transformShoppingReturnData(result.shoppingReturn);
            setShoppingReturn(shoppingReturnList[0]);
            const warehouseOptions = result.warehouseList.map((warehouse) => ({
                label: warehouse.name,
                value: warehouse.warehouseId,
            }));

            setWarehouseOptions(warehouseOptions);
        }
    };

    const updateCommonCode = async () => {
        const result = await Swal.fire({
            icon: "question",
            title: "알람",
            text: "반품승인 요청하시겠습니까?",
            showCancelButton: true, // cancel 버튼 보이기
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "예",
            cancelButtonText: "아니오",
        });

        // 사용자가 "예"를 눌렀을 경우 API 호출
        if (result.isConfirmed) {
            const response = await postApi(ShoppingReturnList.updateMall, {
                warehouseId: selectValue,
                refundId: shoppingReturnId,
            });

            if (response.result === "success") {
                Swal.fire({
                    icon: "success",
                    title: "요청 완료",
                    confirmButtonText: "확인",
                }).then(() => {
                    postSuccess();
                });
            }
        }
    };

    return (
        <ShoppingReturnListModalStyled>
            <div className='container'>
                <dt>
                    <strong>반품지시서</strong>
                </dt>
                <table>
                    <tbody>
                        <tr>
                            <th>반품제품명</th>
                            <td>
                                <StyledInput size='modal' type='text' value={shoppingReturn.productName} readOnly />
                            </td>
                        </tr>
                        <tr>
                            <th>반품신청날짜</th>
                            <td>
                                <StyledInput
                                    size='modal'
                                    type='text'
                                    value={shoppingReturn.returnsRequestDate}
                                    readOnly
                                />
                            </td>
                        </tr>
                        <tr>
                            <th>반품 수량</th>
                            <td>
                                <StyledInput size='modal' type='text' value={shoppingReturn.count} readOnly />
                            </td>
                        </tr>
                        <tr>
                            <th>반품 금액</th>
                            <td>
                                <StyledInput
                                    size='modal'
                                    value={`${shoppingReturn.totalPrice.toLocaleString("ko-KR")}원`}
                                    readOnly
                                />
                            </td>
                        </tr>
                        <tr>
                            <th>반품 창고 지정</th>
                            <td>
                                <StyledSelectBox
                                    options={warehouseOptions}
                                    value={selectValue}
                                    onChange={setSelectValue}
                                />
                            </td>
                        </tr>
                    </tbody>
                </table>

                <div className='button-container'>
                    <button onClick={updateCommonCode}>승인요청</button>
                    <button onClick={() => setModal(!modal)}>취소</button>
                </div>
            </div>
        </ShoppingReturnListModalStyled>
    );
};
