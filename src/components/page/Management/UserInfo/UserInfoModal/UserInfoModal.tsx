import { UserInfoModalStyle } from "./styled";
import { modalState } from "../../../../../stores/modalState";
import { ContentBox } from "../../../../common/ContentBox/ContentBox";
import { StyledInput } from "../../../../common/StyledInput/StyledInput";
import DaumPostcode from "react-daum-postcode";
import { useEffect, useState } from "react";
import { detailCodeListhApi } from "../../../../../api/UserInfoApi/detailCodeListApi";
import { UserInfo } from "../../../../../api/api";
import { IDetailCodeListResponse, IDuplicUserIdResponse } from "../../../../../models/interface/IUserInfo";
import { StyledButton } from "../../../../common/StyledButton/StyledButton";
import { useRef } from "react";
import { duplicUserIdCheckApi } from "../../../../../api/UserInfoApi/duplicUserIdCheckApi";
import axios from "axios";
// window.daum 타입 확장

export const UserInfoModal = () => {
    // 상태 관리
    const [userData, setUserData] = useState({
        user_type: "",
        classType: "",
        statusYn: "",
        group_code: "",
        detailCode: "",
        loginID: "",
        password: "",
        password1: "",
        name: "",
        manager: "",
        userTel1: "",
        userTel2: "",
        userTel3: "",
        birthday: "",
        userEmail: "",
        user_zipcode: "",
        user_address: "",
        user_dt_address: "",
    });

    const alertMessage = {
        user_type: "",
        classType: "",
        statusYn: "",
        group_code: "직원 유형을 입력해주세요",
        detailCode: "직원 유형을 입력해주세요",
        loginID: "아이디를 입력해주세요",
        password: "비번 을 입력해주세요",
        password1: "비번 을 입력해주세요",
        name: "이름/회사명을 입력해주세요",
        manager: "담당자 명을 입력해주세요",
        userTel1: "전화번호 앞자리를 입력해주세요",
        userTel2: "전화번호 중간자리를 입력해주세요",
        userTel3: "전화번호 마지막 자리를 입력해주세요",
        birthday: "생년 월일을 입력해주세요",
        userEmail: "이메일을 입력해주세요",
        user_zipcode: "우편번호 찾기를 입력해주세요",
        user_address: "우편번호 찾기를 입력해주세요",
        user_dt_address: "상세주로를 입력해주세요",
    };

    // 유효성을 요하는 변수들 idRef, emailRef
    const idRef = useRef<HTMLInputElement>(null);
    const emailRef = useRef<HTMLInputElement>(null);

    const [selectValue, setSelectValue] = useState<string>("선택");
    const [detailCodeList, setDetailCodeList] = useState<any>();

    const [isValid, setIsValid] = useState(true); // 유효성 상태
    const [errorMessage, setErrorMessage] = useState(""); // 오류 메시지

    //다음 우편번호찾기
    const [isDaumLoaded, setIsDaumLoaded] = useState(false);

    useEffect(() => {
        //  console.log("바뀐다.!:   " + selectValue);
        if (selectValue != "선택") {
            handlerdetailCodeList();
        }
    }, [selectValue]);

    useEffect(() => {
        console.log(userData);
    }, [userData]);

    useEffect(() => {}, [userData]);

    const handlerdetailCodeList = async () => {
        const param = {
            groupCode: selectValue,
        };

        const res: IDetailCodeListResponse = await detailCodeListhApi(UserInfo.detailsearch, param);
        // console.log(res.detailCode);
        setDetailCodeList(res.detailCode);
    };

    //이벤트가 꼬여 셀렉트 그룹코드 체인지 따로 만듬..
    const handleGroupChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        console.log(`네임: ${name}     밸류: ${value}`);

        const box = { ...userData };
        box.group_code = value;

        if (name === "group_code") {
            let label = value; //
            // select 요소인 경우 selectedOptions 사용
            if (e.target instanceof HTMLSelectElement) {
                label = e.target.selectedOptions[0]?.text;
            }
            console.log(label);

            if (label === "SCM 담당자") {
                box.user_type = "S";
                box.classType = "SCM담당자";
            } else if (label === "구매 담당자") {
                box.user_type = "P";
                box.classType = "구매담당자";
            } else if (label === "회사 임원") {
                box.user_type = "E";
                box.classType = "회사임원";
            } else if (label === "배송 담당자") {
                box.user_type = "D";
                box.classType = "배송담당자";
            } else if (label === "기업 고객") {
                box.user_type = "C";
                box.classType = "기업고객";
            }

            setUserData(box);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        console.log(`네임: ${name}     밸류: ${value}`);
        setUserData((prevData) => ({
            ...prevData,
            [name]: value,
        }));

        if (name === "group_code") {
            let label = value; //
            // select 요소인 경우 selectedOptions 사용
            if (e.target instanceof HTMLSelectElement) {
                label = e.target.selectedOptions[0]?.text;
            }
            console.log(label);
            const box = { ...userData };

            if (label === "SCM 담당자") {
                box.user_type = "S";
                box.classType = "SCM담당자";
            } else if (label === "구매 담당자") {
                box.user_type = "P";
                box.classType = "구매담당자";
            } else if (label === "회사 임원") {
                box.user_type = "E";
                box.classType = "회사임원";
            } else if (label === "배송 담당자") {
                box.user_type = "D";
                box.classType = "배송담당자";
            } else if (label === "기업 고객") {
                box.user_type = "C";
                box.classType = "기업고객";
            }

            setUserData(box);
        }
    };

    const checkDuplicFnc = async () => {
        const idValiCheck = IdValidateInput(idRef.current.value);

        if (!idValiCheck) {
            setIsValid(false);
            return;
        }
        //loginID:idRef.current.value
        const res: IDuplicUserIdResponse = await duplicUserIdCheckApi(UserInfo.checkDuplicUserId, {
            loginID: idRef.current.value,
        });

        alert(res.duplicCnt);
        if (res.duplicCnt === 0) {
            const box = { ...userData };
            box.loginID = idRef.current.value;
            setUserData(box);
            alert("사용 가능한 아이디 입니다.");
        } else {
            const box = { ...userData };
            box.loginID = "";
            setUserData(box);
            alert("이미 사용중인 아이디 입니다.");
        }

        //false로 해야 아디 또 적을시 이함수가 실행됨
        setIsValid(false);
    };

    const IdValidateInput = (value: string): boolean => {
        // 숫자와 영문자 조합, 5~20자리 또는 영문자만 5~20자리 허용
        const regex = /^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z\d]{5,20}$|^[a-zA-Z]{5,20}$/;
        if (!regex.test(value)) {
            setIsValid(false);
            setErrorMessage("숫자와 영문자 조합 또는 영문자만 5~20자리 입력 가능합니다.");
            return false;
        } else {
            setIsValid(true);
            setErrorMessage("사용가능한 아이디 입니다.");
            return true;
        }
    };

    const checkDuplicEmailFnc = async () => {
        const emailVailCheck = EmailValidateInput(emailRef.current.value);
        const box = { ...userData };

        if (!emailVailCheck) {
            box.userEmail = "";
            setUserData(box);
            return;
        }

        await axios.post("/check_emailBody.do", { user_email: emailRef.current.value }).then((res) => {
            if (res.data.duplicCnt === 1) {
                alert("이미 존재하는 아이디 입니다.");
                box.userEmail = "";
                setUserData(box);
                return;
            }
            box.userEmail = emailRef.current.value;
            setUserData(box);
        });
    };

    const EmailValidateInput = (value: string): boolean => {
        const emailRules: RegExp = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;
        if (!emailRules.test(value)) {
            alert("이메일 형식을 확인해주세요");

            return false;
        }

        return true;
    };
    // 주소 관련
    const [isPostcodeOpen, setIsPostcodeOpen] = useState(false);
    const zipcodeRef = useRef<HTMLInputElement>(null);
    const addressRef = useRef<HTMLInputElement>(null);
    const dtAddressRef = useRef<HTMLInputElement>(null);

    const handleAddressSelect = (data: any) => {
        let address = data.roadAddress; // 도로명 주소
        if (!address) address = data.jibunAddress; // 지번 주소
        console.log("우편번호: " + data.zonecode);
        console.log("주소: " + address);

        // ref를 이용하여 우편번호와 주소 직접 입력
        if (zipcodeRef.current) zipcodeRef.current.value = data.zonecode; // 우편번호
        if (addressRef.current) addressRef.current.value = address; // 주소
        if (dtAddressRef.current) dtAddressRef.current.value = ""; // 상세주소 초기화

        const box = { ...userData };
        box.user_zipcode = data.zonecode;
        box.user_address = address;
        setUserData(box);
        // 팝업 닫기
        setIsPostcodeOpen(false);
    };

    // 1차 2차 패서워드 검증 관련
    // 유효성을 요하는 변수들 idRef, emailRef
    const firstPwdRef = useRef<HTMLInputElement>(null);
    const secondePwdRef = useRef<HTMLInputElement>(null);

    const validatePassword = () => {
        // 비밀번호 형식: 숫자, 영문자, 특수문자 조합으로 8~15자리
        const passwordRegex = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,15}$/;

        if (!passwordRegex.test(firstPwdRef.current.value)) {
            alert("비밀번호는 숫자, 영문자, 특수문자 조합으로 8~15자리여야 합니다.");
            return false;
        }

        if (!passwordRegex.test(secondePwdRef.current.value)) {
            alert("비밀번호는 숫자, 영문자, 특수문자 조합으로 8~15자리여야 합니다.");
            return false;
        }

        if (firstPwdRef.current.value !== secondePwdRef.current.value) {
            alert("비밀번호와 비밀번호 확인이 일치하지 않습니다.");
            return false;
        }
        return true;
    };

    // 전화번호 관련
    const tell1Ref = useRef<HTMLInputElement>(null);
    const tell2Ref = useRef<HTMLInputElement>(null);
    const tell3Ref = useRef<HTMLInputElement>(null);

    const insertUserInfo = () => {
        for (let key in userData) {
            console.log(key + ": ");
            if (
                key != "manager" &&
                key != "user_dt_address" &&
                key != "classType" &&
                key != "user_type" &&
                key != "statusYn"
            ) {
                if (userData[key] === "") {
                    alert(`${alertMessage[key]}`);
                    return;
                }
            }
        }
    };

    return (
        <UserInfoModalStyle>
            {/* 1열 */}
            <div className='container'>
                <label>
                    <span>직원유형*</span>
                </label>
                <select
                    name='group_code'
                    onChange={(e) => {
                        // console.log(e.target.selectedOptions[0].text);
                        setSelectValue(e.target.value);
                        handleGroupChange(e);
                    }}
                    defaultValue={selectValue ? selectValue : "c"}
                >
                    <option value={"c"}>선택</option>
                    <option value={"E10001X1"}>SCM 담당자</option>
                    <option value={"E10001X1"}>구매 담당자</option>
                    <option value={"E10001X1"}>회사 임원</option>
                    <option value={"R20001P1"}>배송 담당자</option>
                    <option value={"G00001A1"}>기업 고객</option>
                </select>
                <br />
                <label>
                    <span>아이디*</span>
                </label>
                <StyledInput placeholder='숫자, 영문자 조합으로 6~20자리' ref={idRef} />
                <StyledButton onClick={checkDuplicFnc}>중복확인</StyledButton>
                {isValid ? errorMessage : errorMessage}
                <label>
                    <span>이름/회사명*</span>
                </label>
                <StyledInput name='name' onChange={handleChange} />
                <label>
                    <span>담당자명</span>
                </label>
                <StyledInput name='manager' onChange={handleChange} />
                <label>
                    <span>성별*</span>
                </label>
                <select name='sex' onChange={handleChange}>
                    <option value=''>선택</option>
                    <option value='1'>남자</option>
                    <option value='2'>여자</option>
                </select>
                <label>
                    <span>이메일*</span>
                    <StyledInput ref={emailRef} />
                    <StyledButton onClick={checkDuplicEmailFnc}>중복확인</StyledButton>
                </label>

                <label>
                    <span>우편번호찾기*</span>
                    <StyledInput ref={zipcodeRef} readOnly />

                    <StyledButton onClick={() => setIsPostcodeOpen(true)}>우편번호 찾기</StyledButton>
                    <span>주소*</span>
                    <StyledInput ref={addressRef} readOnly />
                    <span>상세주소*</span>
                    <StyledInput name='user_dt_address' ref={dtAddressRef} onChange={handleChange} />

                    {isPostcodeOpen && (
                        <DaumPostcode
                            onComplete={handleAddressSelect} // 주소 선택 완료 시 호출되는 함수
                        />
                    )}
                </label>
            </div>

            {/* 2열 */}
            <div className='container'>
                <label>
                    <span>담당업무*</span>
                </label>
                <select name='detailCode' onChange={handleChange}>
                    <option value={"c"}>선택</option>
                    {detailCodeList ? (
                        detailCodeList.map((ele: any, idx: number) => {
                            // console.log(ele.detailIdx);
                            return (
                                <option key={ele.detailCode + idx} value={ele.value}>
                                    {ele.detailName}
                                </option>
                            );
                        })
                    ) : (
                        <option value='d'>d</option>
                    )}
                </select>
                <label>
                    <span>비밀번호*</span>
                </label>
                {/* as 이즈 존중으로 비번은 그냥 제출 시에 양문자가 같은지 확인하도록 한다. */}
                <StyledInput
                    name='password'
                    ref={firstPwdRef}
                    placeholder='숫자, 영문자, 특수문자 조합으로 8~15자리 '
                />
                <label>
                    <span>비밀번호 확인*</span>
                </label>
                <StyledInput
                    name='passwordcheck'
                    ref={secondePwdRef}
                    placeholder='숫자, 영문자, 특수문자 조합으로 8~15자리 '
                />
                <label>
                    <span>전화번호*</span>
                </label>
                <StyledInput maxLength={3} type='text' id='tel1' name='user_tel1' ref={tell1Ref} /> -
                <StyledInput maxLength={4} type='text' id='tel2' name='user_tel2' ref={tell2Ref} /> -
                <StyledInput maxLength={4} type='text' id='tel3' name='user_tel3' ref={tell3Ref} />
                <label>
                    <StyledButton onClick={insertUserInfo}>등록</StyledButton>
                </label>
            </div>
        </UserInfoModalStyle>
    );
};
