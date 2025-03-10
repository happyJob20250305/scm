import { ShoppingModalStyled } from "./styled";
import { useRecoilState } from "recoil";
import { modalState } from "../../../../../stores/modalState";
import { ChangeEvent, FC, useEffect, useRef, useState } from "react";
import { IShopping, IShoppingDetail, IShoppingDetailResponse } from "../../../../../models/interface/IShopping";
import axios, { AxiosResponse } from "axios";
import { StyledInput } from "../../../../common/StyledInput/StyledInput";

interface IShoppingModalProps {
    deliveryId: number;
    setDeliveryId: React.Dispatch<React.SetStateAction<number>>;
    postSuccess: () => void;
}

export const ShoppingModal: FC<IShoppingModalProps> = ({ deliveryId, setDeliveryId, postSuccess }) => {
    const [modal, setModal] = useRecoilState<boolean>(modalState);
    const [imageUrl, setImageUrl] = useState<string>("");
    const [fileName, setFileName] = useState<string>("");
    const formRef = useRef<HTMLFormElement>(null);
    const [shoppingDetail, setShoppingDetail] = useState<IShoppingDetail>();
    // const [deliveryOrderList, setDeliveryOrderList] = useState<IShopping[]>([]);

    useEffect(() => {
        deliveryId && searchShoppingDetail();

        return () => {
            setDeliveryId(0);
        };
    }, []);

    const searchShoppingDetail = () => {
        axios
            .post("/tasks/deliveryDetailBody.do", { orderId: deliveryId })
            .then((res: AxiosResponse<IShoppingDetailResponse>) => {
                setShoppingDetail(res.data.detailValue);
            });
    };

    const handlerFile = (e: ChangeEvent<HTMLInputElement>) => {
        const fileInfo = e.target.files;
        if (fileInfo?.length > 0) {
            const fileSplit = fileInfo[0].name.split(".");
            const fileType = fileSplit[1].toLowerCase();

            if (fileType === "jpg" || fileType === "gif" || fileType === "png") {
                setImageUrl(URL.createObjectURL(fileInfo[0]));
            }
            setFileName(fileInfo[0].name);
        }
    };

    return (
        <ShoppingModalStyled>
            <div className='container'>
                <table>
                    <tbody>
                        <tr>
                            <th rowSpan={3}>
                                <label htmlFor='file-upload'>
                                    <img
                                        className='product-image'
                                        src={imageUrl || "default_image_url"}
                                        alt='상품 이미지'
                                    />
                                </label>
                                <input
                                    id='file-upload'
                                    type='file'
                                    accept='image/jpg, image/jpeg, image/png, image/gif'
                                    style={{ display: "none" }}
                                    onChange={handlerFile}
                                />
                            </th>
                            <th>주문 번호</th>
                            <td>
                                <StyledInput
                                    size='modal'
                                    name='productId'
                                    type='text'
                                    defaultValue={deliveryId}
                                    readOnly
                                />
                            </td>
                            <th>
                                주문 수량<span className='font_red'>*</span>
                            </th>
                            <td>
                                <StyledInput
                                    size='modal'
                                    name='count'
                                    type='text'
                                    defaultValue={shoppingDetail?.count}
                                    readOnly
                                />
                            </td>
                        </tr>
                        <tr>
                            <th>고객기업</th>
                            <td>
                                <StyledInput
                                    size='modal'
                                    name='customerName'
                                    type='text'
                                    defaultValue={shoppingDetail?.customerName}
                                    readOnly
                                />
                            </td>

                            <th>
                                제품명<span className='font_red'>*</span>
                            </th>
                            <td>
                                <StyledInput
                                    size='modal'
                                    name='productName'
                                    type='text'
                                    defaultValue={shoppingDetail?.productName}
                                    readOnly
                                />
                            </td>
                        </tr>
                        <tr>
                            <th>배송 담당자</th>
                            <td>
                                <StyledInput
                                    size='modal'
                                    name='deliveryManager'
                                    type='text'
                                    defaultValue={shoppingDetail?.deliveryManager}
                                    readOnly
                                />
                            </td>
                            <th>입금여부</th>
                            <td>
                                <StyledInput
                                    size='modal'
                                    name='paymentStatus'
                                    type='text'
                                    defaultValue={shoppingDetail?.paymentStatus}
                                    readOnly
                                />
                            </td>
                        </tr>
                        <tr>
                            <th colSpan={5}>제품 상세 정보</th>
                        </tr>
                        <tr>
                            <td colSpan={5}>
                                <textarea className='text-area' readOnly></textarea>
                            </td>
                        </tr>
                    </tbody>
                </table>

                <div className='button-container'>
                    <button onClick={() => setModal(!modal)}>나가기</button>
                </div>
            </div>
        </ShoppingModalStyled>
    );
};
