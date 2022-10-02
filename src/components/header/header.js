import React from 'react'
import './header.css'
import instaLogo from '../../img/in.png'
import Form from '../form/form'
const Header = () => {
  return (
<>
<div className="header_app">
<img src={instaLogo}alt="instalogo"/>
<Form/>
</div>
</>
  )
}

export default Header