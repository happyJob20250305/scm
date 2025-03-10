import styled from "styled-components";

export const JoinStyled = styled.div`
    .btn_icon {
        display: inline-block;
        overflow: hidden;
        width: 29px;
        height: 29px;
        font-size: 0;
        text-indent: -9999px;
        background: url(/images/admin/comm/set_icon.png) no-repeat;
        vertical-align: middle;
    }
    .btn_set {
        display: inline-block;
        overflow: hidden;
        width: 29px;
        height: 29px;
        font-size: 0;
        text-indent: -9999px;
        background: url(/images/admin/comm/set_btn.png) no-repeat;
        vertical-align: middle;
    }

    .btn_area {
        position: relative;
        width: 100%;
    }
    .btn_areaC {
        position: relative;
        width: 100%;
        text-align: center;
    }
    .btn_areaR {
        position: relative;
        width: 100%;
        text-align: right;
    }

    a.btnType {
        display: inline-block;
        padding-left: 10px;
        background: url(/images/admin/comm/set_btnBg.png) 0 0px no-repeat;
    }
    a.btnType span {
        display: inline-block;
        padding-right: 10px;
        min-width: 80px;
        height: 31px;
        line-height: 31px;
        font-family: "나눔바른고딕", NanumBarunGothic;
        font-size: 15px;
        color: #fff;
        text-align: center;
        font-weight: 400;
        background: url(/images/admin/comm/set_btnBg.png) 100% 0px no-repeat;
    }

    a.btnType.gray {
        background-position: 0px 0px;
    }
    a.btnType.gray span {
        background-position: 100% 0px;
    }

    a.btnType.blue {
        background-position: 0px -41px;
    }
    a.btnType.blue span {
        background-position: 100% -41px;
    }

    a.btnType2 {
        display: inline-block;
        width: 70px;
        height: 28px;
        line-height: 30px;
        border-bottom: 2px solid #bbc2cd;
        text-align: center;
        background: #fff;
        vertical-align: middle;
    }
    a.btnType2.color1 {
        background: #fde7e7;
        border-color: #dbb3b3;
    }
    a.btnType2.color2 {
        background: #e9f5fb;
        border-color: #b4d6e7;
    }
    a.btnType2.color3 {
        background: #e9fde8;
        border-color: #dbb3b3;
    }
    a.btnType2.color4 {
        background: #839fb9;
        color: #fff;
    }

    a.btnType3 {
        display: inline-block;
        padding: 0 10px;
        min-width: 50px;
        height: 30px;
        line-height: 30px;
        border: 1px solid #333;
        text-align: center;
        background: #666;
        color: #fff;
        vertical-align: middle;
        box-sizing: border-box;
    }
    a.btnType3.color1 {
        border-color: #59626c;
        background: url(/images/admin/comm/btn_bg1.png) 0 0 repeat-x;
        color: #fff;
    }
    a.btnType3.color2 {
        border-color: #175795;
        background: url(/images/admin/comm/btn_bg2.png) 0 0 repeat-x;
        color: #fff;
    }
    a.btnType3.color3 {
        height: 40px;
        width: 90px;
        color: #fff;
        margin-top: 10px;
        margin-left: 10px;
        padding-top: 5px;
    }

    .btnTypeBox {
        display: inline-block;
        padding: 0 10px;
        min-width: 50px;
        height: 30px;
        line-height: 30px;
        border: 1px solid #d3d3d3;
        text-align: center;
        background: #fff;
        color: #666;
        vertical-align: middle;
        box-sizing: border-box;
    }
    .btnTypeBox.focus_close {
        background: #3db4ec;
    }
    .btnTypeBox.focus_close .name {
        color: #fff;
    }
    .btnTypeBox.focus_close .del {
        color: #fff;
    }
    .focus_close .del {
        display: inline-block;
        margin-left: 10px;
        width: 13px;
        height: 13px;
        background: url(/images/admin/comm/img_close_bak.png) center center no-repeat;
        background-size: 100%;
        vertical-align: middle;
    }

    a.btn_icon.search {
        background: url(/images/admin/comm/btn_search.png) 50% 50% no-repeat;
    }
    a.btn_icon.btn_calendar {
        background: url(/images/admin/comm/btn_calendar01.gif) 50% 50% no-repeat;
    }
    .btn_icon.mail {
        background: url(/images/admin/comm/mail.png) 50% 50% no-repeat;
    }

    .btn_set.plue {
        width: 20px;
        height: 20px;
        border: 1px solid #868686;
        background: #fff url(/images/admin/comm/icon_plus.png) 50% 50% no-repeat;
    }
    .font_red {
        color: #fe1414;
    }
    .font_green {
        color: #339702;
    }
    .font_purple {
        color: #bb0196;
    }
    .font_blue {
        color: #134f9e;
    }
    .font_sky {
        color: #3db4ec;
    }
    .font_orange {
        color: #ff8040;
    }
    .font_gray {
        color: #868686;
    }
    .font_black {
        color: #333;
    }
    .font_white {
        color: #fff;
    }
    .font_appliance {
        color: #5fb8ff;
    }
    .font_passive {
        color: #ff9800;
    }
    .font_remake {
        color: #cddc39;
    }
    .font_fixied {
        color: #b3a2c7;
    }
    .font_blank {
        color: #f3f3f3;
    }

    .font10 {
        font-size: 10px !important;
    }
    .font12 {
        font-size: 12px !important;
    }
    .font16 {
        font-size: 16px !important;
        line-height: 16px !important;
    }
    .font19 {
        font-size: 19px !important;
    }
    .bold {
        font-weight: bold;
    }
    .line_through {
        text-decoration: line-through;
    }
    .skip {
        display: block;
        height: 1px;
        width: 1px;
        margin: 0 -1px -1px 0;
        padding: 0;
        overflow: hidden;
        font-size: 0;
        line-height: 0;
    }
    .skip:hover,
    .skip:active,
    .skip:focus {
        width: 100%;
        height: auto;
        margin: 0;
        padding: 5px 0;
        text-indent: 10px;
        font-weight: bold;
        font-size: 12px;
        color: #333;
        font-family: Tahoma;
        line-height: 1;
        text-decoration: none !important;
    }

    .bgnone {
        background: none !important;
    }

    .fl {
        float: left;
    }
    .fr {
        float: right;
    }
    .both {
        clear: both;
    }
    .dp_ib {
        display: inline-block;
    }

    .textC {
        text-align: center !important;
    }
    .textR {
        text-align: right !important;
    }
    .textL {
        text-align: left !important;
    }

    .w30 {
        width: 30px !important;
    }
    .w50 {
        width: 50px !important;
    }
    .w60 {
        width: 60px !important;
    }
    .w70 {
        width: 70px !important;
    }
    .w80 {
        width: 80px !important;
    }
    .w95 {
        width: 95px !important;
    }
    .w100 {
        width: 100px !important;
    }
    .w110 {
        width: 110px !important;
    }
    .w150 {
        width: 150px !important;
    }
    .w200 {
        width: 200px !important;
    }
    .w220 {
        width: 220px !important;
    }
    .w250 {
        width: 250px !important;
    }
    .w350 {
        width: 350px !important;
    }
    .w450 {
        width: 450px !important;
    }

    .p15 {
        width: 15% !important;
    }
    .p45 {
        width: 45% !important;
    }
    .p92 {
        width: 92% !important;
    }
    .p94 {
        width: 94% !important;
    }
    .p98 {
        width: 98% !important;
    }
    .p100 {
        width: calc(100% - 4px) !important;
    }

    .h80 {
        height: 80px !important;
    }

    .pl0 {
        padding-left: 0px !important;
    }
    .pl10 {
        padding-left: 10px !important;
    }
    .pl20 {
        padding-left: 20px !important;
    }
    .pl30 {
        padding-left: 30px !important;
    }

    .ml5 {
        margin-left: 5px !important;
    }
    .ml10 {
        margin-left: 10px !important;
    }
    .ml20 {
        margin-left: 20px !important;
    }
    .mb5 {
        margin-bottom: 5px !important;
    }
    .mb10 {
        margin-bottom: 10px !important;
    }
    .mb20 {
        margin-bottom: 20px !important;
    }
    .mb30 {
        margin-bottom: 30px !important;
    }
    .mb50 {
        margin-bottom: 50px !important;
    }
    .mt5 {
        margin-top: 5px !important;
    }
    .mt10 {
        margin-top: 10px !important;
    }
    .mt20 {
        margin-top: 20px !important;
    }
    .mt30 {
        margin-top: 30px !important;
    }
    .mt50 {
        margin-top: 50px !important;
    }
    table.row {
        width: 100%;
    }
    table.row > tbody > tr > th {
        padding: 0 15px;
        height: 37px;
        font-weight: bold;
        border: 1px solid #e5e5e5;
        background-color: #f4f4f4;
    }
    table.row > tbody > tr > td {
        height: 27px;
        padding: 5px 10px;
        border: 1px solid #e5e5e5;
        color: #868686;
    }

    table {
        font-family: "나눔바른고딕", NanumBarunGothic;
        background-color: #fff;
    }
    table.col {
        width: 100%;
    }
    table.col thead {
        border: 1px solid #e5e5e5;
        background: #dce1e6;
    }
    table.col thead th {
        position: relative;
        height: 27px;
        padding: 5px 10px;
        border: 1px solid #bbc2cd;
        font-weight: bold;
        text-align: center;
    }
    table.col thead tr.sub th {
        position: relative;
        height: 27px;
        padding: 5px 10px;
        border: 1px solid #bbc2cd;
        background: #ecf1f5;
        font-weight: 400;
        text-align: center;
    }
    table.col tbody tr:nth-child(2n) {
        background: #f3f3f3;
    }
    table.col tbody td {
        height: 27px;
        padding: 5px 10px;
        border: 1px solid #bbc2cd;
        color: #868686;
        text-align: center;
    }
    table.col tbody td a {
        color: #000;
    }
    table.col tbody td a:hover {
        text-decoration: underline;
    }
    table.col.hover tbody tr:hover {
        background: #ddd;
    }

    table.col2 {
        width: 100%;
    }
    table.col2 thead {
        border: 1px solid #e5e5e5;
        background: #dce1e6;
    }
    table.col2 thead th {
        position: relative;
        height: 27px;
        padding: 5px 10px;
        border: 1px solid #bbc2cd;
        font-weight: bold;
        text-align: center;
    }
    table.col2 thead tr.sub th {
        position: relative;
        height: 27px;
        padding: 5px 10px;
        border: 1px solid #bbc2cd;
        background: #ecf1f5;
        font-weight: 400;
        text-align: center;
    }
    table.col2 tbody td {
        height: 27px;
        padding: 5px 10px;
        border: 1px solid #bbc2cd;
        color: #868686;
        text-align: center;
    }
    table.col2 tbody td a {
        color: #000;
    }
    table.col2 tbody td a:hover {
        text-decoration: underline;
    }
    table.col2.hover tbody tr:hover {
        background: #ddd;
    }

    table.bodyScroll {
        float: left;
    }
    table.bodyScroll thead {
        float: left;
        border: 0;
    }
    table.bodyScroll tbody {
        float: left;
        overflow-y: auto;
    }
    table.bodyScroll tbody tr {
        display: table;
    }

    table tbody td textarea {
        width: 100%;
        padding-left: 2px;
        height: 70px;
        text-align: left;
        vertical-align: top;
    }
    table tbody td .line2 {
        display: inline-block;
        font-size: 10px;
        line-height: 10px;
        padding: 0 5px 0 15px;
    }
    table tbody td.tdView {
        height: 300px;
        text-align: left;
        vertical-align: top;
    }
    table tbody td.commentView {
        text-align: left;
        vertical-align: top;
    }
    table tbody td .btn_commentArea {
        margin-top: 30px;
        text-align: right;
    }

    table.row2 {
        width: 100%;
    }
    table.row2 > tbody > tr > th {
        padding: 0 15px;
        height: 37px;
        font-weight: bold;
        border: 1px solid #e5e5e5;
        background-color: #f4f4f4;
    }
    table.row2 > tbody > tr > td {
        height: 27px;
        padding: 5px 10px;
        border: 1px solid #e5e5e5;
        color: #868686;
    }

    table.row3 {
        width: 100%;
    }
    table.row3 > tbody > tr > th {
        padding: 0 15px;
        height: 37px;
        font-weight: bold;
        border: 1px solid #bbc2cd;
        background-color: #dce1e6;
    }
    table.row3 > tbody > tr > td {
        height: 27px;
        padding: 5px 10px;
        border: 1px solid #bbc2cd;
        color: #868686;
    }

    table.qna {
    }
    table.qna tr.view {
        display:;
    }
    table.qna tr.view td {
        position: relative;
        padding: 20px 20px 20px 60px;
        text-align: left;
        vertical-align: top;
    }
    table.qna tbody tr:nth-child(3),
    table.qna tbody tr:nth-child(7),
    table.qna tbody tr:nth-child(11),
    table.qna tbody tr:nth-child(15),
    table.qna tbody tr:nth-child(19),
    table.qna tbody tr:nth-child(23),
    table.qna tbody tr:nth-child(27) {
        background: #f3f3f3;
    }
    table.qna tbody tr:nth-child(2n) {
        background: #fff5f0;
    }

    table tbody .bg_red {
        background: #fde7e7 !important;
    }
    table tbody .bg_blue {
        background: #e9f5fb !important;
    }
    table tbody .bg_gray {
        background: #e9ebef !important;
    }

    .tableBtn_areaC {
        padding: 5px;
        border: 1px solid #bbc2cd;
        text-align: center;
        background: #dce1e6;
    }

    @font-face {
        font-family: "NanumGothicBold";
        font-style: normal;
        font-weight: 700;
        src: url(//themes.googleusercontent.com/static/fonts/earlyaccess/nanumgothic/v3/NanumGothic-Bold.eot);
        src:
            url(//themes.googleusercontent.com/static/fonts/earlyaccess/nanumgothic/v3/NanumGothic-Bold.eot?#iefix)
                format("embedded-opentype"),
            url(//themes.googleusercontent.com/static/fonts/earlyaccess/nanumgothic/v3/NanumGothic-Bold.woff2)
                format("woff2"),
            url(//themes.googleusercontent.com/static/fonts/earlyaccess/nanumgothic/v3/NanumGothic-Bold.woff)
                format("woff"),
            url(//themes.googleusercontent.com/static/fonts/earlyaccess/nanumgothic/v3/NanumGothic-Bold.ttf)
                format("truetype");
    }

    /* NanumBarunGothic 기본 폰트 */
    @font-face {
        font-family: "NanumBarunGothic";
        src: url("/fonts/NanumBarunGothic.eot") format("eot");
        src: url("/fonts/NanumBarunGothic.woff") format("woff");
    }
    /* NanumBarunGothic 굵은 폰트 */
    @font-face {
        font-family: "NanumBarunGothicBold";
        src: url("/fonts/NanumBarunGothicBold.eot") format("eot");
        src: url("/fonts/NanumBarunGothicBold.woff") format("woff");
    }

    #mask {
        position: absolute;
        left: 0;
        top: 0;
        z-index: 9000;
        background-color: #000;
        display: none;
    }

    div.layerPop {
        // display: none;
        clear: both;
        position: relative;
        width: 100%;
        margin-top: 20px;
    }
    div.layerPop .closePop {
        position: absolute;
        top: 20px;
        right: 30px;
        width: 23px;
        height: 23px;
        background: url(/images/front/common/com_btn.png) 0 -423px no-repeat;
    }
    div.layerPop p.title {
        margin-bottom: 5px;
        border-bottom: 2px solid #d3d3d3;
    }
    div.layerPop p.title strong {
        font-size: 15px;
    }

    div.layerType1 {
        position: absolute;
        width: 960px;
        padding: 10px;
        margin: 0;
        border: 5px solid #3e4463;
        background-color: #fff;
        z-index: 9999;
        -moz-box-shadow: 2px 2px 3px #666;
        -webkit-box-shadow: 2px 2px 3px #666;
        box-shadow: 2px 2px 3px #666;
    }
    div.layerType1 .closePop {
        position: absolute;
        top: -5px;
        right: -21px;
        width: 21px;
        height: 22px;
        background: #3e4463 url(/images/admin/comm/set_btn.png) -453px -47px no-repeat;
    }

    div.layerType2 {
        position: absolute;
        width: 656px;
        padding: 0px;
        margin: 0;
        border: 3px solid #3e4463;
        background-color: #f3f3f3;
        z-index: 9999;
        -moz-box-shadow: 2px 2px 3px #666;
        -webkit-box-shadow: 2px 2px 3px #666;
        box-shadow: 2px 2px 3px #666;
    }
    div.layerType2 > dl dt {
        height: 40px;
        line-height: 40px;
        padding: 0px 20px;
        background-color: #3e4463;
    }
    div.layerType2 > dl dt strong {
        font-size: 17px;
        color: #fff;
    }
    div.layerType2 > dl dd {
        padding: 40px 30px;
    }
    div.layerType2 > dl dd table.row > tbody > tr > th {
        background: #bbc2cd;
    }
    div.layerType2 .closePop,
    div.layerType2 .closePop2 {
        position: absolute;
        top: 12px;
        right: 13px;
        width: 15px;
        height: 15px;
        background: url(/images/admin/comm/set_btn.png) -456px -50px no-repeat;
    }

    div.layerType3 {
        position: absolute;
        width: 1100px;
        padding: 10px;
        margin: 0;
        border: 5px solid #3e4463;
        background-color: #fff;
        z-index: 9999;
        -moz-box-shadow: 2px 2px 3px #666;
        -webkit-box-shadow: 2px 2px 3px #666;
        box-shadow: 2px 2px 3px #666;
    }
    div.layerType3 .closePop {
        position: absolute;
        top: -5px;
        right: -21px;
        width: 21px;
        height: 22px;
        background: #3e4463 url(/images/admin/comm/set_btn.png) -453px -47px no-repeat;
    }

    #wrap_pop {
        position: relative;
        font-family: "나눔바른고딕", NanumBarunGothic;
    }
    #wrap_pop #header {
        border: 0;
    }
    #wrap_pop .content {
    }

    #wrap_pop div.content_in {
        padding: 5px;
        background: #78b2ca;
    }

    #wrap_pop div.content_in table th {
        background: #ecf7fb;
    }

    #wrap_pop p.right {
        margin: 10px 20px;
        text-align: right;
    }

    #wrap_pop div.info_chk {
        margin: 10px 0;
        padding: 30px 20px;
        background: #f3f3f3;
    }
    #wrap_pop div.info_chk ol > li {
        padding: 15px 0px;
    }
    #wrap_pop div.info_chk ul {
        padding: 10px;
    }
    #wrap_pop div.info_chk ul li {
        padding: 5px 0;
    }

    div.check_box {
        position: relative;
    }
    div.check_box li {
        margin: 5px 0;
    }
    div.check_box li > ul > li {
        margin-left: 15px;
    }
    div.check_box .td_topRight_area {
        position: absolute;
        top: 0;
        right: 0;
    }

    #wrap_pop .payArea_left {
        display: inline-block;
        width: calc(100% - 330px);
    }
    #wrap_pop .payArea_left .payChak {
        padding: 10px 0 10px 20px;
    }
    #wrap_pop .payArea_left .payChak dt {
        line-height: 30px;
        font-weight: bold;
        font-size: 15px;
    }
    #wrap_pop .payArea_left .payChak dd {
        padding: 15px;
        border: 1px solid #e2e6ed;
        background: #f9fafb;
    }

    #wrap_pop .payArea_right {
        float: right;
        width: 300px;
    }
    #wrap_pop .payArea_right .right_content {
        padding: 20px 15px;
        border: 3px solid #e4a8a8;
        background: #fde7e7;
    }

    .content {
        width: 650px;
    }
    .signtitle {
        text-align: center;
    }
    * {
        padding: 0;
        margin: 0;
        box-sizing: border-box;
        font-family: "Alata", sans-serif;
    }

    .shadow {
        -webkit-box-shadow: 27px 43px 43px -26px rgba(89, 89, 89, 0.39);
        -moz-box-shadow: 27px 43px 43px -26px rgba(89, 89, 89, 0.39);
        box-shadow: 27px 43px 43px -26px rgba(89, 89, 89, 0.39);
    }
    p.logo {
        text-align: center;
    }
    #background_board {
        width: 100vw;
        height: 100vh;
        background: #eff0f2;
        display: flex;
        justify-content: center;
        align-items: center;
        /* background: url(/images/admin/login/login2.png) no-repeat; */
    }

    .login_form {
        background: #f5f5f5;
        width: 1302px;
        height: 650px;
        display: flex;
        flex-direction: row;
        box-shadow: 10px black;
        border-radius: 10px;
    }

    .login-form-right-side {
        width: 50%;
        border-radius: 10px 0px 0px 10px;
        padding: 75px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        color: white;
        background-image: radial-gradient(ellipse farthest-corner at 0 140%, #5d9dff 0%, #2178ff 70%, #3585ff 70%);
    }
    .login-form-right-side h1 {
        color: white;
        width: 100%;
        text-align: right;
        opacity: 0.9;
        font-size: 14px;
    }
    .login-form-right-side p {
        color: white;
        padding-top: 50px;
        font-size: 16px;
        text-align: left;
        opacity: 0.9;
    }

    .login-form-left-side {
        width: 50%;
        border-radius: 0px 10px 10px 0px;
        display: flex;

        flex-direction: column;
        align-items: center;
        padding: 40px;
        background: rgb(255, 255, 255);
        background: linear-gradient(
            287deg,
            rgba(255, 255, 255, 1) 0%,
            rgba(243, 244, 244, 1) 0%,
            rgba(255, 255, 255, 1) 100%
        );
    }

    .login-form-left-side fieldset {
        position: relative;
        top: 25%;
    }
    .layerPosition {
        position: absolute !important;
        top: 10% !important; /* 화면 높이의 20%에서 시작 */
        left: 50% !important; /* 가로 중앙 */
        transform: translate(-50%, 0); /* 가로만 정확히 중앙 정렬 */
    }
    @media screen and(min-width:768px) {
        .layerTest :before {
            display: absolute;
            vertical-allign: center;
            top: 145px;
        }
    }

    .login_form .id #EMP_ID,
    .login_form .pw #EMP_PWD {
        width: 235px;
        height: 40px;
        line-height: 39px;
        border: 0px;
        color: #5c6371;
        background: #e5e9f2;
        border-radius: 10px;
        appearance: textfield;
        padding: 0 15px;
    }

    .login_form .id label,
    .login_form .pw label {
        display: inline-block;
        width: 70px;
        height: 39px;
        line-height: 39px;
        vertical-align: middle;
        font-family: "NanumBarunGothic";
        font-size: 15px;
    }

    .login_form p.pw {
        margin-top: 12px;
    }

    .login_form .member_info {
        width: 600px;
        position: relative;
        top: 10px;
        right: 44px;
    }

    a.btn_login {
        position: absolute;
        top: 155px;
        width: 325px;
        height: 52px;
        line-height: 52px;
        background: #37ade4;
        color: #fff;
        text-align: center;
        font-size: 24px;
        left: 150px;
        border-radius: 5rem;
        letter-spacing: 0.1rem;
    }

    a.btn_log {
        margin: 0 5px;
    }

    p.copy {
        width: 442px;
        margin: 20px auto 0;
    }

    p.copy span {
        float: right;
    }

    .dashboard > ul > li .col > dl > dd {
        margin-left: 150px;
    }

    width: 100%;
    height: 100%;
    // position: fixed;
    display: flex;
    justify-content: center;
    align-items: center;
    background: rgba(0, 0, 0, 0.5);
    z-index: 910;
    font-weight: bold;

    .container {
        background: white;
        padding: 20px;
        border-radius: 8px;
        box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.25);
        width: auto;
    }

    table {
        width: 100%;
        border-collapse: collapse;
    }

    th,
    td {
        border: 1px solid #ddd;
        padding: 10px;
        text-align: left;
    }

    th {
        background: #f4f4f4;
        text-align: center;
    }

    .product-image {
        width: 100px;
        height: 100px;
        object-fit: contain;
        border: 1px solid #ddd;
        background: white;
    }

    .text-area {
        width: 100%;
        height: 60px;
        padding: 8px;
        border: 1px solid #ccc;
        border-radius: 4px;
        resize: none;
        box-sizing: border-box;
    }

    .button-container {
        display: flex;
        justify-content: space-between;
        margin-top: 10px;
    }

    button {
        flex: 1;
        background-color: #3bb2ea;
        border: none;
        color: white;
        padding: 10px;
        margin: 0 5px;
        font-size: 16px;
        cursor: pointer;
        border-radius: 6px;
        box-shadow: 0 2px #999;
        transition: 0.3s;

        &:hover {
            background-color: #45a049;
        }

        &:active {
            background-color: #3e8e41;
            box-shadow: 0 2px #666;
            transform: translateY(2px);
        }
    }

    .font_red {
        color: #fe1414;
    }
`;
