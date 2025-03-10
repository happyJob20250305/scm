import { useRef, useState } from "react";
import { JoinStyled } from "./styled";
import { useRecoilState } from "recoil";
import { modalState } from "../../../../stores/modalState";
import axios, { AxiosResponse } from "axios";
import { JoinStyled2 } from "./styled2";

declare global {
    interface Window {
        daum: any;
    }
}
interface IJoinFormData {
    action: string;
    user_type: string;
    group_code: string;
    detail_code: string;
    classType: string;
    loginID: string;
    password: string;
    password1: string;
    name: string;
    manager: string;
    userTel1: string;
    userTel2: string;
    userTel3: string;
    gender_cd: string;
    birthday: string;
    user_email: string;
    user_zipcode: string;
    user_address: string;
    user_dt_address: string;
    hp: string;
}
type IJoinPostResponse = number;

export const JoinModal = () => {
    const [modal, setModal] = useRecoilState<boolean>(modalState);

    const [formData, setFormData] = useState<IJoinFormData>({
        action: "I",
        user_type: "C",
        group_code: "G00001A1",
        detail_code: "GB0000T13",
        classType: "기업고객",
        loginID: "",
        password: "",
        password1: "",
        name: "",
        manager: "",
        userTel1: "",
        userTel2: "",
        userTel3: "",
        gender_cd: "",
        birthday: "",
        user_email: "",
        user_zipcode: "",
        user_address: "",
        user_dt_address: "",
        hp: "",
    });
    const [ckIdcheckreg, setCkIdcheckreg] = useState<number>(0);
    const [ckEmailcheckreg, setCkEmailcheckreg] = useState<number>(0);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const checkNotEmpty = (): boolean => {
        const fields = [
            { id: "loginID", message: "아이디를 입력해 주세요." },
            { id: "password", message: "비밀번호를 입력해 주세요." },
            { id: "password1", message: "비밀번호 확인을 입력해 주세요." },
            { id: "name", message: "회사명을 입력해 주세요." },
            { id: "manager", message: "담당자명을 입력해 주세요." },
            { id: "userTel1", message: "전화번호를 입력해 주세요." },
            { id: "userTel2", message: "전화번호를 입력해 주세요." },
            { id: "userTel3", message: "전화번호를 입력해 주세요." },
            { id: "gender_cd", message: "성별을 입력해 주세요." },
            { id: "birthday", message: "생년월일을 입력해 주세요." },
            { id: "user_email", message: "이메일을 입력해 주세요." },
            { id: "user_zipcode", message: "주소를 입력해 주세요." },
            { id: "user_address", message: "주소를 입력해 주세요." },
            // { id: "user_dt_address", message: "Detailed Address is required" },
        ];

        // 필드를 순차적으로 검사
        for (let i = 0; i < fields.length; i++) {
            const { id, message } = fields[i];
            if (!formData[id as keyof typeof formData] || formData[id as keyof typeof formData].trim() === "") {
                alert(message); // 공백일 경우 경고 메시지 출력
                return false; // 첫 번째로 발견된 공백에서 종료
            }
        }

        return true; // 모든 필드가 채워져 있으면 true 반환
    };

    const loginIdCheck = () => {
        const idRules = /^[a-z0-9]{6,20}$/g;
        const id = formData.loginID;
        const data = { loginID: id };

        if (id === "") {
            alert("ID를 입력해 주세요");
            return;
        } else if (!idRules.test(formData.loginID)) {
            alert("ID는 숫자, 영문자 조합으로 6~20자리를 사용해야 합니다.");
            return;
        }

        axios.post("/check_loginIDJson.do", data).then((res: AxiosResponse<IJoinPostResponse>) => {
            if (res.data === 1) {
                alert("중복된 아이디가 존재합니다!");
            } else {
                alert("사용할 수 있는 아이디입니다.");
                setCkIdcheckreg(1);
            }
        });
    };

    const emailCheck = () => {
        const emailRules = /^[0-9a-zA-Z]([-_\\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;

        if (!emailRules.test(formData.user_email)) {
            alert("이메일 형식을 확인해 주세요!");
            return;
        }
        const data = { email: formData.user_email };

        axios.post("/check_emailJson.do", data).then((res: AxiosResponse<IJoinPostResponse>) => {
            if (res.data === 1) {
                alert("중복된 이메일이 존재합니다!");
            } else {
                alert("사용 가능한 이메일입니다.");
                setCkEmailcheckreg(1);
            }
        });
    };

    const execDaumPostcode = () => {
        new window.daum.Postcode({
            oncomplete: function (data: any) {
                // 도로명 주소 및 참고 항목 처리
                const roadAddr = data.roadAddress;
                let extraRoadAddr = "";

                // 법정동명이 있을 경우 추가
                if (data.bname && /[동|로|가]$/g.test(data.bname)) {
                    extraRoadAddr += data.bname;
                }

                // 건물명이 있고, 공동주택일 경우 추가
                if (data.buildingName && data.apartment === "Y") {
                    extraRoadAddr += extraRoadAddr !== "" ? `, ${data.buildingName}` : data.buildingName;
                }

                // 최종적으로 참고 항목 처리
                if (extraRoadAddr) {
                    extraRoadAddr = ` (${extraRoadAddr})`;
                }

                // 상태 업데이트
                // setPostcode(data.zonecode);
                // setRoadAddress(roadAddr);
                // setJibunAddress(data.jibunAddress);
                // setExtraAddress(roadAddr ? extraRoadAddr : "");

                setFormData((prevState) => ({
                    ...prevState,
                    user_zipcode: data.zonecode,
                    user_address: roadAddr || data.jibunAddress,
                }));
            },
        }).open();
    };

    const CompleteRegister = () => {
        if (!checkNotEmpty()) {
            return;
        }

        const idRules = /^[a-z0-9]{6,20}$/g;
        const emailRules = /^[0-9a-zA-Z]([-_\\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;
        const passwordRules = /^.*(?=^.{8,15}$)(?=.*\d)(?=.*[a-zA-Z])(?=.*[!@#$%^&+=]).*$/;
        const tel1Rules = /^\d{2,3}$/;
        const tel2Rules = /^\d{3,4}$/;
        const tel3Rules = /^\d{4}$/;

        if (ckIdcheckreg === 0) {
            alert("아이디 중복체크를 진행해 주세요!");
            return;
        } else if (!passwordRules.test(formData.password)) {
            alert("비밀 번호는 숫자,영문자,특수문자 조합으로 8~15자리를 사용해야 합니다.");
            return;
        } else if (formData.password !== formData.password1) {
            alert("비밀번호와 비밀번호확인이 일치하지 않습니다.");
            return;
        } else if (ckEmailcheckreg === 0) {
            alert("이메일 중복체크를 진행해 주세요!");
            return;
        } else if (!tel1Rules.test(formData.userTel1)) {
            alert("첫번째 전화번호를 확인해주세요.(숫자만가능)");
            return;
        } else if (!tel2Rules.test(formData.userTel2)) {
            alert("두번째 전화번호를 확인해주세요.(숫자만가능)");
            return;
        } else if (!tel3Rules.test(formData.userTel3)) {
            alert("세번째 전화번호를 확인해주세요.(숫자만가능)");
            return;
        }
        const hp = formData.userTel1 + "-" + formData.userTel2 + "-" + formData.userTel3;
        setFormData((prevState) => {
            const newFormData = {
                ...prevState,
                hp: hp, // 새로운 hp 값을 추가
            };

            // 새로운 객체로 상태 업데이트 후 param을 생성
            const params = new URLSearchParams();

            // formData 객체의 모든 키-값을 URLSearchParams에 추가
            Object.keys(newFormData).forEach((key) => {
                if (newFormData[key]) {
                    params.append(key, newFormData[key]);
                }
            });
            const param = params.toString();
            axios.post("registerScm.do", param);

            alert("회원가입 완료");
            setModal(!modal);

            return newFormData; // 새로운 객체로 상태를 반환
        });
    };

    return (
        <JoinStyled2>
            <div id='layer1' className='layerPosition layerPop layerType2 container'>
                <form>
                    <input type='hidden' name='action' id='action' value='' />
                    <input type='hidden' name='ckIdcheckreg' id='ckIdcheckreg' value='0' />
                    <input type='hidden' name='ckEmailcheckreg' id='ckEmailcheckreg' value='0' />
                </form>

                <dl>
                    <dt className='signtitle' style={{ textAlign: "center", marginBottom: "25px" }}>
                        <strong style={{ fontSize: "200%" }}>기업 회원가입</strong>
                    </dt>
                    <dd className='content' style={{ width: "89%" }}>
                        <div className='btn_areaC'></div>

                        <table className='row'>
                            <tbody>
                                <tr className='hidden' style={{ display: "none" }}>
                                    <td>
                                        <input type='text' name='user_type' value='기업고객' readOnly />
                                    </td>
                                    <td>
                                        <input type='text' name='classType' value='기업고객' readOnly />
                                    </td>
                                    <td>
                                        <input type='text' name='group_code' value='G00001A1' readOnly />
                                    </td>
                                    <td>
                                        <input type='text' name='detail_code' value='GB0000T13' readOnly />
                                    </td>
                                </tr>

                                <tr>
                                    <th scope='row'>
                                        아이디<span className='font_red'>*</span>
                                    </th>
                                    <td colSpan={3}>
                                        <input
                                            type='text'
                                            className='inputTxt p100'
                                            name='loginID'
                                            placeholder='숫자, 영문자 조합으로 6~20자리'
                                            value={formData.loginID}
                                            onChange={handleChange}
                                            style={{ width: "350px", marginRight: "-30px" }}
                                        />
                                    </td>
                                    <td>
                                        <input
                                            type='button'
                                            value='중복확인'
                                            onClick={loginIdCheck}
                                            style={{ width: "142px", height: "25px", marginRight: "-25px" }}
                                        />
                                    </td>
                                </tr>

                                <tr>
                                    <th scope='row'>
                                        비밀번호 <span className='font_red'>*</span>
                                    </th>
                                    <td colSpan={4}>
                                        <input
                                            type='password'
                                            className='inputTxt p100'
                                            name='password'
                                            placeholder='숫자, 영문자, 특수문자 조합으로 8~15자리'
                                            value={formData.password}
                                            onChange={handleChange}
                                            style={{ width: "350px", marginRight: "-95px" }}
                                        />
                                    </td>
                                </tr>

                                <tr>
                                    <th scope='row' style={{ padding: "0 0" }}>
                                        비밀번호 확인<span className='font_red'>*</span>
                                    </th>
                                    <td colSpan={4}>
                                        <input
                                            type='password'
                                            className='inputTxt p100'
                                            name='password1'
                                            placeholder='숫자, 영문자, 특수문자 조합으로 8~15자리'
                                            value={formData.password1}
                                            onChange={handleChange}
                                            style={{ width: "350px", marginRight: "-95px" }}
                                        />
                                    </td>
                                </tr>

                                <tr>
                                    <th scope='row'>
                                        회사명 <span className='font_red'>*</span>
                                    </th>
                                    <td colSpan={4}>
                                        <input
                                            type='text'
                                            className='inputTxt p100'
                                            name='name'
                                            value={formData.name}
                                            onChange={handleChange}
                                            style={{ width: "350px", marginRight: "-95px" }}
                                        />
                                    </td>
                                </tr>

                                <tr>
                                    <th scope='row'>
                                        담당자명 <span className='font_red'>*</span>
                                    </th>
                                    <td colSpan={4}>
                                        <input
                                            type='text'
                                            className='inputTxt p100'
                                            name='manager'
                                            value={formData.manager}
                                            onChange={handleChange}
                                            style={{ width: "350px", marginRight: "-95px" }}
                                        />
                                    </td>
                                </tr>

                                <tr>
                                    <th scope='row'>
                                        전화번호<span className='font_red'>*</span>
                                    </th>
                                    <td colSpan={4}>
                                        <input
                                            className='inputTxt'
                                            style={{ width: "17%" }}
                                            maxLength={3}
                                            type='text'
                                            name='userTel1'
                                            value={formData.userTel1}
                                            onChange={handleChange}
                                        />{" "}
                                        -
                                        <input
                                            className='inputTxt'
                                            style={{ width: "20%", marginLeft: "5px" }}
                                            maxLength={4}
                                            type='text'
                                            name='userTel2'
                                            value={formData.userTel2}
                                            onChange={handleChange}
                                        />{" "}
                                        -
                                        <input
                                            className='inputTxt'
                                            style={{ width: "20.5%", marginLeft: "5px" }}
                                            maxLength={4}
                                            type='text'
                                            name='userTel3'
                                            value={formData.userTel3}
                                            onChange={handleChange}
                                        />
                                    </td>
                                </tr>

                                <tr>
                                    <th scope='row'>
                                        성별<span className='font_red'>*</span>
                                    </th>
                                    <td colSpan={4}>
                                        <select name='gender_cd' value={formData.gender_cd} onChange={handleChange}>
                                            <option value=''>선택</option>
                                            <option value='1'>남자</option>
                                            <option value='2'>여자</option>
                                        </select>
                                    </td>
                                </tr>

                                <tr>
                                    <th scope='row'>
                                        생년월일 <span className='font_red'>*</span>
                                    </th>
                                    <td colSpan={4}>
                                        <input
                                            type='date'
                                            className='inputTxt p100'
                                            name='birthday'
                                            value={formData.birthday}
                                            onChange={handleChange}
                                        />
                                    </td>
                                </tr>

                                <tr>
                                    <th scope='row'>
                                        이메일<span className='font_red'>*</span>
                                    </th>
                                    <td colSpan={3}>
                                        <input
                                            type='text'
                                            className='inputTxt p100'
                                            name='user_email'
                                            placeholder='happyjob@happyjop.com'
                                            value={formData.user_email}
                                            onChange={handleChange}
                                            style={{ width: "350px", marginRight: "-95px" }}
                                        />
                                    </td>
                                    <td>
                                        <input
                                            type='button'
                                            value='중복확인'
                                            onClick={emailCheck}
                                            style={{ width: "142px", height: "25px", marginRight: "-25px" }}
                                        />
                                    </td>
                                </tr>

                                <tr>
                                    <th scope='row'>
                                        우편번호<span className='font_red'>*</span>
                                    </th>
                                    <td colSpan={3}>
                                        <input
                                            type='text'
                                            className='inputTxt p100'
                                            name='user_zipcode'
                                            value={formData.user_zipcode}
                                            readOnly
                                            style={{ width: "350px", marginRight: "-95px" }}
                                        />
                                    </td>
                                    <td>
                                        <input
                                            type='button'
                                            value='우편번호 찾기'
                                            onClick={execDaumPostcode}
                                            style={{ width: "142px", height: "25px", marginRight: "-14px" }}
                                        />
                                    </td>
                                </tr>

                                <tr>
                                    <th scope='row'>
                                        주소<span className='font_red'>*</span>
                                    </th>
                                    <td colSpan={4}>
                                        <input
                                            type='text'
                                            className='inputTxt p100'
                                            name='user_address'
                                            value={formData.user_address}
                                            readOnly
                                            style={{ width: "350px", marginRight: "-95px" }}
                                        />
                                    </td>
                                </tr>

                                <tr>
                                    <th scope='row'>상세주소</th>
                                    <td colSpan={4}>
                                        <input
                                            type='text'
                                            className='inputTxt p100'
                                            name='user_dt_address'
                                            value={formData.user_dt_address}
                                            onChange={handleChange}
                                            style={{ width: "350px", marginRight: "-95px" }}
                                        />
                                    </td>
                                </tr>
                            </tbody>
                        </table>

                        <div className='btn_areaC mt30 button-container'>
                            {/* <a href='javascript:void(0);' className='btnType blue' onClick={CompleteRegister}>
                                <span>회원가입 완료</span>
                            </a>
                            <a href='javascript:void(0);' className='btnType gray' onClick={() => setModal(!modal)}>
                                <span>취소</span>
                            </a> */}
                            <button className='btnType blue' onClick={CompleteRegister}>
                                <span>회원가입 완료</span>
                            </button>
                            <button className='btnType gray' onClick={() => setModal(!modal)}>
                                <span>취소</span>
                            </button>
                        </div>
                    </dd>
                </dl>
            </div>
        </JoinStyled2>
    );
};
