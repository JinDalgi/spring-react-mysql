import React from "react";
import defaultProfileImage from "../../assets/images/default-profile-image.png";
import {FavoriteListItem} from "../../types/interface";
import './style.css';

interface Props {
    favoriteListItem: FavoriteListItem;
}

// component : Favorite List Item 컴포넌트 //
export default function FavoriteItem({ favoriteListItem}: Props) {

    // state: properties //
    const { profileImage, nickname } = favoriteListItem;

    // render : Favorite List Item 랜더링 //
    return (
        <div className='favorite-list-item'>
            <div className='favorite-list-item-profile-box'>
                <img className='favorite-list-item-profile-image' src={profileImage ? profileImage : defaultProfileImage}></img>
            </div>
            <div className='favorite-list-item-nickname'>{nickname}</div>
        </div>
    )
}