export interface IShoppingReturn {
    refundId: number;
    productName: string;
    price: number;
    count: number;
    totalPrice: number;
    returnsRequestDate: string;
    isApproved: number;
}

export interface IShoppingReturnBodyResponse {
    shoppingReturnList: IShoppingReturn[];
    shoppingReturnListCnt: number;
}

export interface shoppingReturnDetailList {
    refundId: number;
    productName: string;
    price: number;
    count: number;
    totalPrice: number;
    returnsRequestDate: string;
    isApproved: number;
}

export interface IShoppingReturnDetailResponse {
    shoppingReturnDetailList: shoppingReturnDetailList;
}
