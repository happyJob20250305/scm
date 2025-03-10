import React, { FC, createContext, useState } from "react";

// 초기값의 타입.
interface ISearchKeyword {
    searchTitle?: object;
    setSearchTitle?: React.Dispatch<React.SetStateAction<object>>;
}

// 다른 컴포넌트에서 사용이 가능한 값을 만든다.
export const InventoryContext = createContext<ISearchKeyword>({});

// 만들어진 값(CommonCodeContext)에 searchKeyword, setSearchKeyword을 넣어서 자식 노드에서
// 자유롭게 searchKeyword과 setSearchKeyword를 호출한다.
export const InventoryProvider: FC<{
    children: React.ReactNode | React.ReactNode[];
}> = ({ children }) => {
    const [searchTitle, setSearchTitle] = useState<object>({});
    return (
        <InventoryContext.Provider value={{ searchTitle, setSearchTitle }}>{children}</InventoryContext.Provider>
    );
};
