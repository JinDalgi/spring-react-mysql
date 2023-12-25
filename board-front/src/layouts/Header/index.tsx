import './style.css'
import {useLocation, useNavigate, useParams} from "react-router-dom";
import {
    AUTH_PATH,
    BOARD_DETAIL_PATH, BOARD_PATH,
    BOARD_UPDATE_PATH,
    BOARD_WRITE_PATH,
    MAIN_PATH,
    SEARCH_PATH,
    USER_PATH
} from "../../constant";
import {useState, ChangeEvent, useRef, KeyboardEvent, useEffect} from "react";
import {useCookies} from "react-cookie";
import useUserStore from "../../stores/user.store";
import {LoginUser} from "../../types/interface";


//          component: 헤더 컴포넌트          //
export default function Header() {

    //          state: path name 상태          //
    const { pathname } = useLocation();
    //          state: 로그인 유저 상태          //
    const { user, setUser } = useUserStore();
    //          state: cookie 상태          //
    const [cookies, setCookies] = useCookies();

    //          variable: 인증 페이지 논리 변수          //
    const isAuthPage = pathname === AUTH_PATH();
    //          variable: 유저 페이지 논리 변수          //
    const isUserPage = pathname.startsWith(USER_PATH(''));

    //          function: 네비게이트 함수          //
    const navigator = useNavigate();

    //          event handler: 로고 클릭 이벤트 처리          //
    const onLogoClickHanlder = () => {
        navigator(MAIN_PATH());
    }

    //          component: 검색 컴포넌트          //
    const Search = () => {
        //          state: 검색 버튼 상태          //
        const [showInput, setShowInput] = useState<boolean>(false);
        //          state: 검색 값 상태          //
        const [searchValue, setSearchValue] = useState<string>('');

        //          event handler: 검색 값 변경 이벤트 처리          //
        const onSearchValueChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
            const searchValue = event.target.value;
            setSearchValue(searchValue);
        }
        //          event handler: 검색 인풋 Enter key down 이벤트 처리          //
        const onSearchEnterKeyDownHandler = (event: KeyboardEvent<HTMLInputElement>) => {
            if (event.key !== 'Enter') return;
            if (!searchValue) return;
            navigator(SEARCH_PATH(searchValue));
        }
        //          event handler: 검색 버튼 클릭 이벤트 처리          //
        const onSearchButtonClickHandler = () => {
            if (!showInput) {
                setShowInput(true);
                return;
            }
            if (!searchValue) {
                setShowInput(false);
                return;
            }
            navigator(SEARCH_PATH(searchValue));
        }

        //          render: 검색 컴포넌트 렌더링 (인풋이 보임 상태일 때)         //
        if (showInput)
            return (
                <div className='header-search-input-box'>
                    <input className='header-search-input' type='text' value={searchValue} onChange={onSearchValueChangeHandler} onKeyDown={onSearchEnterKeyDownHandler} />
                    <div className='icon-button' onClick={onSearchButtonClickHandler}>
                        <div className='search-icon'></div>
                    </div>
                </div>
            );
        //          render: 검색 컴포넌트 렌더링 (인풋이 보임 상태가 아닐 때)         //
        return (
            <div className='icon-button' onClick={onSearchButtonClickHandler}>
                <div className='search-icon'></div>
            </div>
        );
    };

    //          component: 로그인 상태에 따라 로그인 혹은 마이페이지 버튼 컴포넌트          //
    const LoginMyPageButton = () => {

        //          event handler: 마이페이지 버튼 클릭 이벤트 처리         //
        const onMyPageButtonClickHandler = () => {
            if (!user) return;
            navigator(USER_PATH(user.email));
        }
        //          event handler: 로그인 버튼 클릭 이벤트 처리         //
        const onLoginButtonClickHandler = () => {
            navigator(AUTH_PATH());
        }

        //          render: 마이페이지 버튼 컴포넌트 렌더링 (로그인 상태일 때)         //
        if (cookies.accessToken)
            return (
                <div className='mypage-button' onClick={onMyPageButtonClickHandler}>마이페이지</div>
            );
        //          render: 로그인 버튼 컴포넌트 렌더링 (로그인 상태가 아닐 때)         //
        return (
            <div className='login-button' onClick={onLoginButtonClickHandler}>로그인</div>
        );
    };

    //          component: 유저 페이지 버튼 컴포넌트          //
    const UserPageButtons = () => {

        //          state: path variable의 email 상태          //
        const { searchEmail } = useParams();

        //          variable: 마이페이지 여부 논리 변수          //
        const isMyPage = user && user.email === searchEmail;

        //          event handler: 로그아웃 버튼 클릭 이벤트 처리          //
        const onLogoutButtonClickHandler = () => {
            setCookies('accessToken', '', { path: '/', expires: new Date() });
            setUser(null);
        }

        //          render: 본인 페이지 일 때 버튼 컴포넌트 렌더링          //
        if (isMyPage)
            return (<div className='logout-button' onClick={onLogoutButtonClickHandler}>로그아웃</div>);
        //          render: 타인 페이지 일 때 버튼 컴포넌트 렌더링          //
        return (<LoginMyPageButton />);
    }

    //          effect: 마운트시에만 실행될 함수          //
    useEffect(() => {
        if (cookies.email) {
            const user: LoginUser = { email: cookies.email, nickname: '주코야키', profileImage: null };
            setUser(user);
        }
    }, []);

    //          render: 헤더 컴포넌트 렌더링          //
    return (
        <div id='header'>
            <div className='header-container'>
                <div className='header-left-box' onClick={onLogoClickHanlder}>
                    <div className='header-logo-icon-box'>
                        <div className='logo-dark-icon'></div>
                    </div>
                    <div className='header-logo-text'>{'Hoons Board'}</div>
                </div>
                <div className='header-right-box'>
                    { isAuthPage && (<Search />) }
                    { isUserPage && (<UserPageButtons />) }
                </div>
            </div>
        </div>
    )
}