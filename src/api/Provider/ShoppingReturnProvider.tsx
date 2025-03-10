import { createContext, FC, ReactNode, useState } from "react";

interface ISearchKeyword {
    searchKeyword?: object;
    setSearchKeyword?: React.Dispatch<React.SetStateAction<object>>;
}

export const ShoppingReturnContext = createContext<ISearchKeyword>({});

export const ShoppingReturnProvider: FC<{
    children: React.ReactNode | React.ReactNode[];
}> = ({ children }) => {
    const [searchKeyword, setSearchKeyword] = useState<object>({});
    return (
        <ShoppingReturnContext.Provider value={{ searchKeyword, setSearchKeyword }}>
            {children}
        </ShoppingReturnContext.Provider>
    );
};
