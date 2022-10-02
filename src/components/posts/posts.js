import React from 'react'
import './posts.css'
// import post from '../../img/كيفية-تنزيل-Instagram-Reels-على-جهاز-الكمبيوتر-والهاتف-الذكي.webp'
import { Avatar } from '@mui/material'
function Posts({imgeUrl,caption,userName}) {
  return (
    <>
    <div className="container posts">
        <div className="postHeader">
            <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
        <h3>{userName}</h3>
        </div>
        <img className='postImg' src={imgeUrl}alt="posts"/>
        <h4 className='postText'><strong>{userName}</strong>{caption}</h4>
    </div>
    </> 
  )
}

export default Posts