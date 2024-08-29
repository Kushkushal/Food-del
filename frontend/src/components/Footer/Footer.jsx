// eslint-disable-next-line no-unused-vars
import React from 'react'
import './Footer.css'
import { assets } from '../../assets/assets'
const Footer = () => {
    return (
        <div className='footer' id='footer'>
            <div className="footer-content">
                <div className="footer-content-left">
                    <img className="logo" src={assets.logo} alt="logo" />
                    <p>Kushal</p>
                    
                    <div className="footer-social-icons">
                        <img src={assets.facebook_icon} alt="" />
                        <img src={assets.twitter_icon} alt="" />
                        <img src={assets.linkedin_icon}alt="" />
                    </div>

                </div>
                <div className="footer-content-center">
<h2>COMPANAY</h2>
<ul>
    <li>Home</li>
    <li>About Us</li>
    <li>Delibery</li>
    <li>Privacy Policy</li>
</ul>
                </div>
                <div className="footer-content-right">
<h2>GET IN TOUCH</h2>
<ul>
    <li>+91 8123090954</li>
    <li>contact@gmail.com</li>
</ul>
                </div>

            </div>
<hr />
<p className="footer-copyright">Copuright 2024 @ Deligro.com - All Right Reserved.</p>
        </div>
    )
}

export default Footer
