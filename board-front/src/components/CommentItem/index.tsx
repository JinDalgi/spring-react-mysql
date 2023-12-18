import React from "react";
import './style.css';
import {CommentListItem} from "../../types/interface";
import defaultProfileImage from 'assets/images/Default_Profile_Image.svg.png'
interface Props {
    commentListItem: CommentListItem;
}

// component: Comment List Item 컴포넌트 //
export default function CommentItem({ commentListItem }: Props) {

    // state: properties //
    const { nickname, profileImage, writeDatetime, content } = commentListItem;

    // render: Comment List Item 랜더링 //
    return (
        <div className='comment-list-item'>
            <div className='comment-list-item-top'>
                <div className='comment-list-profile-box'>
                    <img className='comment-list-profile-image' src={profileImage ? profileImage : defaultProfileImage}></img>
                </div>
                <div className='comment-list-item-nickname'>{nickname}</div>
                <div className='comment-list-item-divider'>{'\|'}</div>
                <div className='comment-list-item-time'>{writeDatetime}</div>
            </div>
            <div className='comment-list-item-main'>
                <div className='comment-list-item-content'>
                    {content}
                </div>
            </div>
        </div>
    )
}