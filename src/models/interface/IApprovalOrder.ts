export interface IApprovalOrder {
    count: number;
    isApproved: number;
    orderDate: string;
    orderId: number;
    price: number;
    productName: string;
    supplyName: string;
}

export interface IApprovalOrderResponse {
    orderList: IApprovalOrder[];
    orderCnt: number;
}


