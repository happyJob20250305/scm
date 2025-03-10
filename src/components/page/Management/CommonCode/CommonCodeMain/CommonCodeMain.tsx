import { useContext, useEffect, useState } from "react";
import { CommonCodeMainStyled } from "./styled";
import { CommonCodeCotext } from "../../../../../api/Provider/CommonCodeProvider";
import { StyledButton } from "../../../../common/StyledButton/StyledButton";
import { useRecoilState } from "recoil";
import { modalState } from "../../../../../stores/modalState";
import { CommonCodeModal } from "../CommonCodeModal/CommonCodeModal";
import { Portal } from "../../../../common/potal/Portal";
import { useNavigate } from "react-router-dom";
import { searchApi } from "../../../../../api/CommonCodeApi/searchApi";
import { CommonCode } from "../../../../../api/api";
import { ICommonCode, ICommonCodeResponse } from "../../../../../models/interface/ICommonCode";
import { Column, StyledTable } from "../../../../common/StyledTable/StyledTable";

export const CommonCodeMain = () => {
    const { searchKeyword } = useContext(CommonCodeCotext);
    const [commonCodeList, setCommonCodeList] = useState<ICommonCode[]>([]);
    const [modal, setModal] = useRecoilState(modalState);
    const [groupId, setGroupId] = useState<number>(0);
    const navigate = useNavigate();

    const columns = [
        { key: "groupIdx", title: "번호" },
        { key: "groupCode", title: "그룹코드" },
        { key: "groupName", title: "그롭코드명" },
        { key: "note", title: "그룹코드설명" },
        { key: "createdDate", title: "등록일" },
        { key: "useYn", title: "사용여부" },
        { key: "actions", title: "비고" },
    ] as Column<ICommonCode>[];

    useEffect(() => {
        searchCommonCode();
    }, [searchKeyword]);

    const searchCommonCode = async (currentPage?: number) => {
        currentPage = currentPage || 1;

        const result = await searchApi<ICommonCodeResponse>(CommonCode.searchList, {
            ...searchKeyword,
            currentPage,
            pageSize: 5,
        });

        if (result) {
            setCommonCodeList(result.commonCode);
        }
    };

    const handlerModal = (id: number, e: React.MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation();
        setModal(!modal);
        setGroupId(id);
    };

    const postSuccess = () => {
        setModal(!modal);
        searchCommonCode();
    };

    return (
        <CommonCodeMainStyled>
            <StyledTable
                data={commonCodeList}
                columns={columns}
                onRowClick={(row) => navigate(`${row.groupIdx}`, { state: { groupCode: row.groupCode } })} // ✅ 특정 테이블에서만 실행!
                renderAction={(row) => (
                    <StyledButton size='small' onClick={(e) => handlerModal(row.groupIdx, e)}>
                        수정
                    </StyledButton>
                )}
            />
            {modal && (
                <Portal>
                    <CommonCodeModal groupId={groupId} postSuccess={postSuccess} setGroupId={setGroupId} />
                </Portal>
            )}
        </CommonCodeMainStyled>
    );
};
