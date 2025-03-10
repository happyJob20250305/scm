import { useRecoilState } from "recoil";
import { findModalState } from "../../../../stores/modalState";
import { useState } from "react";
import axios, { AxiosResponse } from "axios";
import { JoinStyled2 } from "../Join/styled2";

interface IPostResponse {
    result: string;
    resultModel?: {
        loginID: string;
    };
    authNumId?: string;
}
interface IFindFormData {
    emailID: string;
    emailPwd: string;
    id: string;
    code: string;
    password: string;
    password1: string;
}
export const FindModal = () => {
    const [findModal, setFindModal] = useRecoilState<boolean>(findModalState);
    const [findFlag, setFindFlag] = useState<boolean>(true);
    const [emailSendPwd, setEmailSendPwd] = useState<boolean>(false);
    const [emailSendID, setEmailSendID] = useState<boolean>(false);
    const [changePw, setChangePw] = useState<boolean>(false);
    const [authEmailCode, setAuthEmailCode] = useState<string>("");
    const [userID, setUserID] = useState<string>("");
    const [formData, setFormData] = useState<IFindFormData>({
        emailID: "",
        emailPwd: "",
        id: "",
        code: "",
        password: "",
        password1: "",
    });

    const [pwIdCheck, setPwIdCheck] = useState<boolean>(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const registerIdCheck = () => {
        if (formData.id === "") {
            alert("아이디를 입력해 주세요");
            return;
        }
        const data = { loginID: formData.id };
        axios.post("/registerIdCheckJson.do", data).then((res: AxiosResponse<IPostResponse>) => {
            if (res.data.result === "SUCCESS") {
                alert("아이디가 존재합니다");
                setPwIdCheck(true);
            } else {
                alert("아이디가 존재하지 않습니다");
            }
        });
    };

    const sendPwdEmail = () => {
        if (formData.emailPwd === "") {
            alert("이메일을 입력해주세요!");
            return true;
        }

        const data = { email: formData.emailPwd, loginID: formData.id };

        axios.post("/selectFindInfoPwJson.do", data).then((res: AxiosResponse<IPostResponse>) => {
            if (res.data.result === "FALSE") {
                alert("이메일이 틀렸습니다.");
            } else {
                alert("해당 이메일로 인증번호를 전송하였습니다.");
                setEmailSendPwd(true);
                findMailSendPwd();
            }
        });
    };

    const findMailSendPwd = () => {
        const data = { emailPwd: formData.id, email: formData.emailPwd, authNumIdPwd: formData.code };
        axios.post("/sendmailJson.do", data).then((res: AxiosResponse<IPostResponse>) => {
            setAuthEmailCode(res.data.authNumId);
        });
    };

    const sendCompletePwd = () => {
        if (formData.code === "") {
            alert("인증번호를 입력해주세요!");
            return;
        } else if (formData.code !== authEmailCode) {
            alert("인증번호가 틀렸습니다.");
            return;
        } else if (formData.code === authEmailCode) {
            alert("인증번호가 맞습니다");
            setChangePw(true);
        }
    };

    const changePwd = () => {
        if (formData.password === "") {
            alert("변경할 비밀번호를 입력하세요.");
            return;
        } else if (formData.password1 === "") {
            alert("비밀번호 확인을 입력하세요.");
            return;
        }
        const passwordRules = /^.*(?=^.{8,15}$)(?=.*\d)(?=.*[a-zA-Z])(?=.*[!@#$%^&+=]).*$/;

        if (!passwordRules.test(formData.password)) {
            alert("비밀번호는 숫자, 영문자, 특수문자 조합으로 8~15자리를 사용해야 합니다.");
            return;
        } else if (formData.password !== formData.password1) {
            alert("비밀번호와 비밀번호확인이 맞지 않습니다.");
            return;
        }

        const data = { loginID: formData.id, chPassword: formData.password };
        axios.post("/changePwd.do", data).then((res: AxiosResponse<IPostResponse>) => {
            if (res.data.result === "success") {
                alert("비밀번호 변경 완료!");
                setFindModal(!findModal);
            } else {
                alert("비밀번호 변경 실패");
            }
        });
    };

    const selectFindId = () => {
        if (formData.emailID === "") {
            alert("이메일을 입력해주세요!");
            return;
        }

        const data = { email: formData.emailID };
        axios.post("/selectFindInfoIdJson.do", data).then((res: AxiosResponse<IPostResponse>) => {
            if (res.data.result === "SUCCESS") {
                setUserID(res.data.resultModel.loginID);
                findMailSendPwd();
                alert("해당 이메일로 인증번호를 전송하였습니다.");
                setEmailSendID(true);
            } else {
                alert("잘못된 이메일을 입력하셨습니다!");
            }
        });
    };

    const findId = () => {
        if (formData.code === "") {
            alert("인증번호를 입력해주세요!");
            return;
        } else if (formData.code !== authEmailCode) {
            alert("인증번호가 틀렸습니다.");
            return;
        } else if (formData.code === authEmailCode) {
            setFindModal(!findModal);
            alert(`귀하의 아이디는 "${userID}" 입니다.`);
        }
    };

    return (
        <JoinStyled2>
            <div className='container'>
                {!changePw ? (
                    <>
                        {/* <div style={{ textAlign: "center", marginBottom: "20px" }}>
                            <button onClick={() => setFindFlag(true)}>
                                <span>아이디찾기</span>
                            </button>
                            <button onClick={() => setFindFlag(false)}>
                                <span>비밀번호찾기</span>
                            </button>
                        </div> */}

                        {findFlag ? (
                            <>
                                <div style={{ textAlign: "center", marginBottom: "25px" }}>
                                    <strong
                                        className='findTitle'
                                        onClick={() => setFindFlag(true)}
                                        style={{ fontSize: "150%" }}
                                    >
                                        아이디찾기
                                    </strong>
                                    /
                                    <span className='findTitle' onClick={() => setFindFlag(false)}>
                                        비밀번호찾기
                                    </span>
                                </div>
                                <table>
                                    <tr>
                                        <th>
                                            이메일<span className='font_red'>*</span>
                                        </th>
                                        <td>
                                            <input
                                                type='text'
                                                name='emailID'
                                                value={formData.emailID}
                                                onChange={handleChange}
                                            />
                                        </td>
                                        <td>
                                            <input
                                                type='button'
                                                value='이메일전송'
                                                onClick={selectFindId}
                                                style={{ width: "85px", height: "25px" }}
                                            />
                                        </td>
                                    </tr>
                                    {emailSendID ? (
                                        <tr>
                                            <th>
                                                인증번호<span className='font_red'>*</span>
                                            </th>
                                            <td>
                                                <input
                                                    type='text'
                                                    name='code'
                                                    value={formData.code}
                                                    onChange={handleChange}
                                                />
                                            </td>
                                            <td>
                                                <input
                                                    type='button'
                                                    value='인증하기'
                                                    onClick={findId}
                                                    style={{ width: "85px", height: "25px" }}
                                                />
                                            </td>
                                        </tr>
                                    ) : (
                                        <></>
                                    )}
                                </table>
                            </>
                        ) : (
                            <>
                                <div style={{ textAlign: "center", marginBottom: "25px" }}>
                                    <span className='findTitle' onClick={() => setFindFlag(true)}>
                                        아이디찾기
                                    </span>
                                    /
                                    <strong
                                        className='findTitle'
                                        onClick={() => setFindFlag(false)}
                                        style={{ fontSize: "150%" }}
                                    >
                                        비밀번호찾기
                                    </strong>
                                </div>
                                <table>
                                    <tr>
                                        <th>
                                            아이디<span className='font_red'>*</span>
                                        </th>
                                        <td>
                                            <input type='text' name='id' value={formData.id} onChange={handleChange} />
                                        </td>
                                        <td>
                                            <input
                                                type='button'
                                                value='아이디체크'
                                                onClick={registerIdCheck}
                                                style={{ width: "85px", height: "25px" }}
                                            />
                                        </td>
                                    </tr>
                                    {pwIdCheck ? (
                                        <tr>
                                            <th>
                                                이메일<span className='font_red'>*</span>
                                            </th>
                                            <td>
                                                <input
                                                    type='text'
                                                    name='emailPwd'
                                                    value={formData.emailPwd}
                                                    onChange={handleChange}
                                                />
                                            </td>
                                            <td>
                                                <input
                                                    type='button'
                                                    value='이메일전송'
                                                    onClick={sendPwdEmail}
                                                    style={{ width: "85px", height: "25px" }}
                                                />
                                            </td>
                                        </tr>
                                    ) : (
                                        <></>
                                    )}
                                    {emailSendPwd ? (
                                        <tr>
                                            <th>
                                                인증번호<span className='font_red'>*</span>
                                            </th>
                                            <td>
                                                <input
                                                    type='text'
                                                    name='code'
                                                    value={formData.code}
                                                    onChange={handleChange}
                                                />
                                            </td>
                                            <td>
                                                <input
                                                    type='button'
                                                    value='인증하기'
                                                    onClick={sendCompletePwd}
                                                    style={{ width: "85px", height: "25px" }}
                                                />
                                            </td>
                                        </tr>
                                    ) : (
                                        <></>
                                    )}
                                </table>
                            </>
                        )}
                    </>
                ) : (
                    <table>
                        <tr>
                            <th>
                                새 비밀번호<span className='font_red'>*</span>
                            </th>
                            <td>
                                <input
                                    type='password'
                                    className='inputTxt p100'
                                    name='password'
                                    placeholder='숫자, 영문자, 특수문자 조합으로 8~15자리'
                                    value={formData.password}
                                    onChange={handleChange}
                                    style={{ width: "274px" }}
                                />
                            </td>
                        </tr>
                        <tr>
                            <th>
                                비밀번호 확인<span className='font_red'>*</span>
                            </th>
                            <td>
                                <input
                                    type='password'
                                    className='inputTxt p100'
                                    name='password1'
                                    placeholder='숫자, 영문자, 특수문자 조합으로 8~15자리'
                                    value={formData.password1}
                                    onChange={handleChange}
                                    style={{ width: "274px" }}
                                />
                            </td>
                        </tr>
                    </table>
                )}
                <div style={{ textAlign: "center", marginTop: "15px" }}>
                    {changePw ? <button onClick={changePwd}>비밀번호 변경</button> : <></>}

                    <button style={{ width: "100px" }} onClick={() => setFindModal(!findModal)}>
                        <span>취소</span>
                    </button>
                </div>
            </div>
        </JoinStyled2>
    );
};
