import './style.css'
import {useNavigate, useParams} from "react-router-dom";
import useUserStore from "../../stores/user.store";
import {ChangeEvent, useEffect, useRef, useState} from "react";
import {useCookies} from "react-cookie";
import {GetSignInUserResponseDto, GetUserResponseDto} from "../../apis/response/user";
import {ResponseDto} from "../../apis/response";
import {AUTH_PATH, MAIN_PATH} from "../../constant";
import {
    fileUploadRequest,
    getSignInUserRequest,
    getUserRequest,
    patchNicknameRequest,
    patchProfileImageRequest
} from "../../apis";
import {PatchNicknameRequestDto, PatchProfileImageRequestDto} from "../../apis/request/user";


//          component: 유저 페이지          //
export default function User() {

    //          state: 조회하는 유저 이메일 path variable 상태           //
    const { searchEmail } = useParams();
    //          state: 로그인 유저 정보 상태           //
    const { user, setUser } = useUserStore();
    //          state: 본인 여부 상태           //
    const [isMyPage, setMyPage] = useState<boolean>(false);

    //          function: 네비게이트 함수          //
    const navigator = useNavigate();

    //          component: 유저 정보 컴포넌트          //
    const UserInfo = () => {

        //          state: 프로필 이미지 input ref 상태           //
        const fileInputRef = useRef<HTMLInputElement | null>(null);
        //          state: cookie 상태           //
        const [cookies, setCookie] = useCookies();
        //          state: 이메일 상태           //
        const [email, setEmail] = useState<string>('');
        //          state: 프로필 이미지 상태           //
        const [profileImage, setProfileImage] = useState<string | null>('');
        //          state: 기존 닉네임 상태           //
        const [existingNickname, setExistingNickname] = useState<string>('');
        //          state: 닉네임 상태           //
        const [nickname, setNickname] = useState<string>('');
        //          state: 닉네임 변경 상태           //
        const [showChangeNickname, setShowChangeNickname] = useState<boolean>(false);

        //          function: get user response 처리 함수          //
        const getUserResponse = (responseBody: GetUserResponseDto | ResponseDto) => {
            const { code } = responseBody;
            if (code === 'NU') alert('존재하지 않는 유저입니다.');
            if (code === 'DBE') alert('데이터베이스 오류입니다.');
            if (code !== 'SU') {
                navigator(MAIN_PATH());
                return;
            }

            const { email, nickname, profileImage } = responseBody as GetUserResponseDto;
            setEmail(email);
            setNickname(nickname);
            setExistingNickname(nickname);
            setProfileImage(profileImage);
        };
        //          function: patch nickname response 처리 함수          //
        const patchNicknameResponse = (code: string) => {
            if (code === 'AF' || code === 'NU') {
                alert('로그인이 필요합니다.');
                navigator(AUTH_PATH());
                return;
            }
            if (code === 'VF') alert('빈 값일 수 없습니다.');
            if (code === 'DN') alert('중복되는 닉네임입니다.');
            if (code === 'DBE') alert('데이터베이스 오류입니다.');
            if (code !== 'SU') {
                setNickname(existingNickname);
                return;
            }

            if (!searchEmail) return;
            getUserRequest(searchEmail).then(getUserResponse);

            const accessToken = cookies.accessToken;
            if (!accessToken) return;
            getSignInUserRequest(accessToken).then(getSignInUserResponse);

            setShowChangeNickname(false);
        };
        //          function: file upload response 처리 함수          //
        const fileUploadResponse = (url: string | null) => {
            const accessToken = cookies.accessToken;
            if (!accessToken) return;

            const requestBody: PatchProfileImageRequestDto = {
                profileImage: url
            };
            patchProfileImageRequest(requestBody, accessToken).then(patchProfileImageResponse);
        };
        //          function: patch profile image response 처리 함수          //
        const patchProfileImageResponse = (code: string) => {
            if (code === 'NU' || code === 'AF') {
                navigator(AUTH_PATH());
                return;
            }
            if (code === 'DBE') alert('데이터베이스 오류입니다.');
            if (code !== 'SU') return;

            if (!searchEmail) return;
            getUserRequest(searchEmail).then(getUserResponse);

            const accessToken = cookies.accessToken;
            if (!accessToken) return;
            getSignInUserRequest(accessToken).then(getSignInUserResponse);
        };
        //          function: get sign in user response 처리 함수 //
        const getSignInUserResponse = (responseBody: GetSignInUserResponseDto | ResponseDto) => {
            const { code } = responseBody;
            if (code !== 'SU') {
                setCookie('accessToken', '', { expires: new Date(), path: MAIN_PATH() });
                setUser(null);
                return;
            }

            setUser({ ...responseBody as GetSignInUserResponseDto });
        };

        //          event handler: 프로필 이미지 클릭 이벤트 처리          //
        const onProfileImageClickHandler = () => {
            if (!isMyPage) return;
            if (!fileInputRef.current) return;
            fileInputRef.current.click();
        };
        //          event handler: 닉네임 변경 버튼 클릭 이벤트 처리          //
        const onChangeNicknameButtonClickHandler = () => {
            if (!showChangeNickname) {
                setShowChangeNickname(true);
                return;
            }

            const isEqual = nickname === existingNickname;
            if (isEqual) {
                setShowChangeNickname(false);
                return;
            }

            const accessToken = cookies.accessToken;
            if (!accessToken) return;

            const requestBody: PatchNicknameRequestDto = { nickname };
            patchNicknameRequest(requestBody, accessToken).then(patchNicknameResponse);
        }

        //          event handler: 프로필 이미지 변경 이벤트 처리          //
        const onProfileImageChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
            if (!event.target.files || !event.target.files.length) return;

            const file = event.target.files[0];
            const data = new FormData();
            data.append('file', file);

            fileUploadRequest(data).then(fileUploadResponse);
        };
        //          event handler: 닉네임 변경 이벤트 처리          //
        const onNicknameChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
            const nickname = event.target.value;
            setNickname(nickname);
        };

        //          effect: 조회하는 유저의 이메일이 변경될 때 마다 실행할 함수          //
        useEffect(() => {
            if (!searchEmail) {
                navigator(MAIN_PATH());
                return;
            }
            getUserRequest(searchEmail).then(getUserResponse);
        }, [searchEmail]);

        //          render: 유저 정보 컴포넌트 렌더링          //
        return (
            <div id='user-info-wrapper'>
                <div className='user-info-container'>
                    <div className={isMyPage ? 'user-info-profile-image-box-mypage' : 'user-info-profile-image-box'} onClick={onProfileImageClickHandler}>
                        <input ref={fileInputRef} type='file' accept='image/*' style={{ display: 'none' }} onChange={onProfileImageChangeHandler} />
                        {profileImage === null ? (
                            <div className='user-info-profile-default-image'>
                                <div className='user-info-profile-icon-box'>
                                    <div className='image-box-white-icon'></div>
                                </div>
                            </div>
                        ) : (
                            <div className='user-info-profile-image' style={{ backgroundImage: `url(${profileImage})` }}></div>
                        )}
                    </div>
                    <div className='user-info-meta-box'>
                        <div className='user-info-nickname-box'>
                            {showChangeNickname ? (
                                <input className='user-info-nickname-input' type='text' size={nickname.length + 1} value={nickname} onChange={onNicknameChangeHandler} />
                            ) : (
                                <div className='user-info-nickname'>{nickname}</div>
                            )}
                            {isMyPage && (
                                <div className='icon-button' onClick={onChangeNicknameButtonClickHandler}>
                                    <div className='edit-light-icon'></div>
                                </div>
                            )}
                        </div>
                        <div className='user-info-email'>{email}</div>
                    </div>
                </div>
            </div>
        );

    };

    //          render: 유저 페이지 렌더링          //
    return (
        <>
            <UserInfo />
        </>
    )
}