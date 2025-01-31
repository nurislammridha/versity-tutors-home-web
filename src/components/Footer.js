import React from 'react'
import pro from '../assets/images/pro3.jpg'
import Image from 'next/image'
import PrimaText from './PrimaText'
import logo from '../assets/icons/logo.png'
import txt from '../assets/icons/txt.png'
import star from '../assets/icons/star.png'
import facebook from '../assets/icons/facebook.png'
import you from '../assets/icons/you.png'
import instagram from '../assets/icons/instagram.png'
import tiktok from '../assets/icons/tik.png'
import twitter from '../assets/icons/twitter.png'
const Footer = () => {
    return (
        <div className='footer'>
            <div className='container'>
                <div className='services'>
                    <div className='item'>
                        <Image src={pro} className='img' />
                        <PrimaText
                            content='Free Shipping'
                            size='18px'
                            weight='bold'
                            top='10px'
                        />
                        <PrimaText
                            content='For all order over BDT 2500 taka'
                            size='13px'
                            top='5px'
                        />
                    </div>
                    <div className='item'>
                        <Image src={pro} className='img' />
                        <PrimaText
                            content='Free Delivery'
                            size='18px'
                            weight='bold'
                            top='10px'
                        />
                        <PrimaText
                            content='1 Day in Dhaka, 2/3 day in all Bangladesh'
                            size='13px'
                            top='5px'
                        />
                    </div>
                    <div className='item'>
                        <Image src={pro} className='img' />
                        <PrimaText
                            content='All Bangladesh Delivery'
                            size='18px'
                            weight='bold'
                            top='10px'
                        />
                        <PrimaText
                            content='Home Delivery Every last point of Bangladesh'
                            size='13px'
                            top='5px'
                        />
                    </div>
                    <div className='item'>
                        <Image src={pro} className='img' />
                        <PrimaText
                            content='Return facility'
                            size='18px'
                            weight='bold'
                            top='10px'
                        />
                        <PrimaText
                            content='In any valid reason, Return facility available'
                            size='13px'
                            top='5px'
                        />
                    </div>
                    <div className='item'>
                        <Image src={pro} className='img' />
                        <PrimaText
                            content='Good Packaging'
                            size='18px'
                            weight='bold'
                            top='10px'
                        />
                        <PrimaText
                            content='For better delivery and Experience'
                            size='13px'
                            top='5px'
                        />
                    </div>
                </div>
                <div className='methods'>
                    <div className='method'>
                        <div className='title'>All Secure Payment Method</div>
                        <div className='images'>
                            <Image src={pro} className='img' />
                            <Image src={pro} className='img' />
                            <Image src={pro} className='img' />
                            <Image src={pro} className='img' />
                            <Image src={pro} className='img' />
                        </div>
                    </div>
                    <div className='method'>
                        <div className='title'>Our Delivery Partner</div>
                        <div className='images'>
                            <Image src={pro} className='img' />
                            <Image src={pro} className='img' />
                            <Image src={pro} className='img' />
                            <Image src={pro} className='img' />
                            <Image src={pro} className='img' />
                        </div>
                    </div>
                </div>
                <div className='infos'>
                    <div className='info'>
                        <div className='logo-con'>
                            <Image src={logo} className='logo' />
                            <Image src={txt} className='imgTxt' />
                        </div>
                        <PrimaText
                            content='LOCATION'
                            size='15px'
                            top='10px'
                        />
                        <PrimaText
                            content='CIRCUIT POINT DBD'
                            size='20px'
                            color='#2943ff'
                            top='15px'
                        />
                    </div>
                    <div className='info'>
                        <ul>
                            <li>Information</li>
                            <li>About Us</li>
                            <li>How to Order</li>
                            <li>Terms and Condition</li>
                        </ul>
                    </div>
                    <div className='info'>
                        <ul>
                            <li>Account</li>
                            <li>My Account</li>
                            <li>Register</li>
                            <li>Login</li>
                            <li>Reset Password</li>
                            <li>Order History</li>
                        </ul>
                    </div>
                    <div className='info'>
                        <ul>
                            <li>Service</li>
                            <li>Contact Us</li>
                            <li>Return</li>
                            <li>Support</li>
                            <li>Site Map</li>
                        </ul>
                    </div>
                    <div className='info'>
                        <ul>
                            <li>Shop information</li>
                            <li>Store/Order: 018000000</li>
                            <li>Support Email:ex@ex.com</li>
                            <li>Opening Time:00.00 - 00.00</li>
                            <li>(Every Day)</li>
                        </ul>
                    </div>
                </div>
                <div className='menu'>
                    <ul>
                        <li>Categories</li>
                        <li>Home</li>
                        <li>All Brand</li>
                        <li>Flash Sale</li>
                        <li>How to Order</li>
                        <li>Build Drone</li>
                        <li>Build RC Car</li>
                        <li>Blog</li>
                    </ul>
                </div>
                <div className='pubs'>
                    <div className='pub'>
                        <div className='txt'><span>Satisfaction Guaranteed</span></div>
                        <div className='img-con'>
                            <Image src={star} className='img' />
                            <Image src={star} className='img' />
                            <Image src={star} className='img' />
                            <Image src={star} className='img' />
                            <Image src={star} className='img' />
                        </div>
                    </div>
                    <div className='pub'>
                        <div className='txt'><span>Join with us social Media/Link</span></div>
                        <div className='img-con'>
                            <Image src={facebook} className='img' />
                            <Image src={instagram} className='img' />
                            <Image src={you} className='img' />
                            <Image src={tiktok} className='img' />
                            <Image src={twitter} className='img' />
                        </div>
                    </div>
                </div>
            </div>
            <div className='bottom'>
                Copyright @ 2024, Circuit Point BD, All Rights Reserved
            </div>
        </div>
    )
}

export default Footer