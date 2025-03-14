import { InquirySearch } from "../../components/page/Management/Inquiry/InquirySearch/InquirySearch";
import { ContentBox } from "../../components/common/ContentBox/ContentBox";
import { useEffect, useState } from "react";
import { InquiryInfo } from "../../api/api";
import { InquiryProvider } from "../../api/Provider/Inquiry/InquiryProvider";

import { useContext } from "react";
import { InquiryContext } from "../../api/Provider/Inquiry/InquiryProvider";
import { InquiryMain } from "../../components/page/Management/Inquiry/InquiryMain/InquiryMain";
export const Inquiry = () => {
  
    return (
        <>
            <InquiryProvider>
                <ContentBox variant='primary' fontSize='large'>
                    문의내역
                </ContentBox>
                <InquirySearch />
                <InquiryMain/>
            </InquiryProvider>
        </>
    );
};
