import { createContext, FC, ReactNode, useState } from "react";

interface ISearchKeyword {
    searchKeyword?: object;
    setSearchKeyword?: React.Dispatch<React.SetStateAction<object>>;
}

export const OrdersContext = createContext<ISearchKeyword>({});

export const OrdersProvider: FC<{
    children: React.ReactNode | React.ReactNode[];
}> = ({ children }) => {
    const [searchKeyword, setSearchKeyword] = useState<object>({});
    return <OrdersContext.Provider value={{ searchKeyword, setSearchKeyword }}>{children}</OrdersContext.Provider>;
};
