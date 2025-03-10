import { createContext, FC, ReactNode, useState } from "react";

interface ISearchKeyword {
    searchKeyword?: object;
    setSearchKeyword?: React.Dispatch<React.SetStateAction<object>>;
}

export const OrdersReturnListContext = createContext<ISearchKeyword>({});

export const OrdersReturnListProvider: FC<{
    children: React.ReactNode | React.ReactNode[];
}> = ({ children }) => {
    const [searchKeyword, setSearchKeyword] = useState<object>({});
    return (
        <OrdersReturnListContext.Provider value={{ searchKeyword, setSearchKeyword }}>
            {children}
        </OrdersReturnListContext.Provider>
    );
};
