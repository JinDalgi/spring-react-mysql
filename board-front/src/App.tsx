import React, {useState} from 'react';
import './App.css';
import BoardItem from "./components/BoardItem";
import {commentListMock, favoriteListMock, latestBoardListMock, top3BoardListMock} from './mocks';
import Top3Item from "./components/Top3Item";
import CommentItem from "./components/CommentItem";
import FavoriteItem from "./components/FavoriteItem";
import InputBox from "./components/InputBox";

function App() {

    const [value, setValue] = useState<string>('');

    return (

        <>
            {/*{latestBoardListMock.map(boardListItem =>*/}
            {/*    <BoardItem boardListItem={boardListItem}></BoardItem>)}*/}

            {/*<div style={{ display: 'flex', justifyContent: 'center', 'gap': '24px' }}>*/}
            {/*    {top3BoardListMock.map(top3ListItem =>*/}
            {/*    <Top3Item top3ListItem={top3ListItem} />)}*/}
            {/*</div>*/}

            {/*<div style={{ padding: '0 20px', display: 'flex', flexDirection: 'column', gap: '30px' }}>*/}
            {/*    {commentListMock.map(commentListMock =>*/}
            {/*    <CommentItem commentListItem={ commentListMock } />)}*/}
            {/*</div>*/}

            {/*<div style={{ display: 'flex', columnGap: '30px', rowGap: '20px' }}>*/}
            {/*    {favoriteListMock.map(favoriteListMock =>*/}
            {/*        <FavoriteItem favoriteListItem={favoriteListMock} />)}*/}
            {/*</div>*/}

            <InputBox label='Email' type='text' placeholder='이메일 주소를 입력해주세요'
                      value={value} setValue={setValue} error={false}  />
        </>
    );
}

export default App;
