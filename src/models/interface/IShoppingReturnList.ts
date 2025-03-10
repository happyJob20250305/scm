export interface IShoppingReturn {
    count: number;
    isApproved: number;
    name: string;
    price: number;
    productName: string;
    refundId: number;
    returnsRequestDate: string;
    totalPrice: number;
}

export interface IShoppingReturnListResponse {
    shoppingReturnList: IShoppingReturn[];
    shoppingReturnListCnt: number;
}

export interface IWareHouse {
    address: string;
    detailAddress: string;
    email: string;
    manager: string;
    name: string;
    phone: string;
    totalProductStock: number;
    warehouseId: number;
    zipCode: number;
}

export interface ISelectOption {
    label: string;
    value: number | string;
}

export interface ITempSearchTitle {
    searchProduct: number | string;
    searchSupply: number | string;
    searchWarehouse: number | string;
}

export interface IShoppingReturnModalResponse {
    shoppingReturn: IShoppingReturn[];
    warehouseList: IWareHouse[];
}
