export interface ICart {
    cartdetailId: number;
    cartId: number;
    productId: number;
    productNumber: string;
    name: string;
    supplyId: number;
    count: number;
    price: number;
    requestedDeliveryDate: string;
    totalPrice?: number;
}

export interface ICartImage extends ICart{
    fileName: string | null;
    filePath: string | null;
    logicalPath: string | null;
    fileSize: number;
    fileType: string | null;
}

export interface ICartDetailWithImage {
    cartDetail: ICart;
    image: ICartImage;
}

export interface ICartListBodyResponse {
    cartCnt: number;
    cartDetailWithImage: ICartDetailWithImage[];
}