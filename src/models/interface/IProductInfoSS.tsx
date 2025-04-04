export interface IInsertProductDetail {
    name: string;
    productNumber: string;
    sellPrice: number;
    description: string;
    supplierName: string;
    category: string;
    fileInput: File | null;
    supplyId: number;
    categoryCode: string;
    empty: string | null;
}

export interface IProductDetail {
    productId: "";
    supplyId: number;
    supplier: "";
    productNumber: "";
    name: "";
    sellPrice: number;
    description: "";
    createdDate: "";
    category: string;
    categoryCode: string;
    fileName: "";
    filePath: "";
    logicalPath: "";
    supplyName: "";
    detailName: "";
}

export interface IProductDetailResponse {
    detailValue: IProductDetail;
}

export interface IUpdateRequestDto {
    productId: number | string;
    name: string;
    productNumber: string;
    sellPrice: number;
    description: string;
    supplierName: number;
    category: string;
    fileInput: File | null;
    supplyId: number;
    categoryCode: string;
    empty: string;

    // productId: 24
    // name: 탈모치료제✨✨
    // productNumber: PS9999
    // sellPrice: 999999
    // description: 모자람 없는 제품! 탈모탈모빔~~~
    // supplierName: 7
    // category: HS0000T14
    // fileInput: (binary)
    // supplyId: 7
    // categoryCode: HS0000T14
    // empty: empty
}
