export interface IProducts {
    productId: number;
    supplyId: number;
    productNumber: string;
    name: string;
    sellPrice: number;
    description: string;
    categoryName: string;
    supplyName: string;
}

export interface IProductsDetail extends IProducts {
    fileName: string | null;
    filePath: string | null;
    logicalPath: string | null;
    fileSize: number;
    fileType: string | null;
}

export interface IProductsListBodyResponse {
    products: IProducts[];
    productsCnt: number;
    userType: string;

}

export interface IProductsBodyResponse {
    detailValue: IProducts;
    attachmentValue: IProductsDetail;
}

export interface ICategory {
    detailName: string;
}

export interface ISupplyList {
    name: string;
}

export interface IPostResponse {
    result: "success" | "fail";
}