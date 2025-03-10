export interface IApprovalOrder {
    count: number;
    isApproved: number;
    orderDate: string;
    orderId: number;
    price: number;
    productName: string;
    supplyName: string;
}

export interface IApprovalShoppingReturn {
    count: number;
    isApproved: number;
    price: number;
    productName: string;
    refundId: number;
    returnDate: string;
    shoppingDate: string;
    userName: string;
}

export interface IApprovalOrderResponse {
    orderList: IApprovalOrder[];
    orderCnt: number;
}

export interface IApprovalShoppingResponse {
    shoppingReturn: any;
    shoppingReturnCnt: number;
}
