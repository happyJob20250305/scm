import { ChangeEvent, FC, useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { modalState } from "../../../../../stores/modalState";
import { OrdersModalStyled } from "./styled";
import { StyledInput } from "../../../../common/StyledInput/StyledInput";
import { IOrdersDetail, IOrdersDetailResponse } from "../../../../../models/interface/IOrders";
import axios, { AxiosResponse } from "axios";

interface IOrdersModalProps {
    orderId: number;
    setOrderId: React.Dispatch<React.SetStateAction<number>>;
    postSuccess: () => void;
}

export const OrdersModal: FC<IOrdersModalProps> = ({ orderId, setOrderId, postSuccess }) => {
    const [modal, setModal] = useRecoilState<boolean>(modalState);
    // const [imageUrl, setImageUrl] = useState<string>("");
    const [fileName, setFileName] = useState<string>("");
    const [ordersDetail, setOrdersDetail] = useState<IOrdersDetail>();

    useEffect(() => {
        orderId && searchOrdersDetail();

        return () => {
            setOrderId(0);
        };
    }, []);

    const searchOrdersDetail = () => {
        axios
            .post("/tasks/orderDetailJson.do", { orderId: orderId })
            .then((res: AxiosResponse<IOrdersDetailResponse>) => {
                setOrdersDetail(res.data.detailValue);
            });
    };

    return (
        <OrdersModalStyled>
            <div className='container'>
                <table>
                    <tbody>
                        <tr>
                            <th>제품 번호</th>
                            <td>
                                <StyledInput
                                    size='modal'
                                    name='productId'
                                    type='text'
                                    defaultValue={ordersDetail?.orderId}
                                    readOnly
                                />
                            </td>
                            <th>
                                제품명<span className='font_red'>*</span>
                            </th>
                            <td>
                                <StyledInput
                                    size='modal'
                                    name='count'
                                    type='text'
                                    defaultValue={ordersDetail?.productName}
                                    readOnly
                                />
                            </td>
                        </tr>
                        <tr>
                            <th>발주업체명</th>
                            <td colSpan={5}>
                                <StyledInput
                                    size='modal'
                                    name='customerName'
                                    type='text'
                                    defaultValue={ordersDetail?.supplyName}
                                    readOnly
                                    style={{ width: "100%" }}
                                />
                            </td>
                        </tr>
                        <tr>
                            <th>날짜</th>
                            <td>
                                <StyledInput
                                    size='modal'
                                    name='deliveryManager'
                                    type='text'
                                    defaultValue={ordersDetail?.orderDate?.split(" ")[0]}
                                    readOnly
                                />
                            </td>
                            <th>개수</th>
                            <td>
                                <StyledInput
                                    size='modal'
                                    name='paymentStatus'
                                    type='text'
                                    defaultValue={ordersDetail?.count}
                                    readOnly
                                />
                            </td>
                        </tr>
                    </tbody>
                </table>
                <div className='button-container'>
                    <button onClick={() => setModal(!modal)}>나가기</button>
                </div>
            </div>
        </OrdersModalStyled>
    );
};
