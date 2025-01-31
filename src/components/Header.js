"use client"
import React from 'react'
import PrimaText from "@/components/PrimaText";
import PrimaButton from "@/components/PrimaButton";
import Image from "next/image";
import facebook from '../assets/icons/facebook.png'
import you from '../assets/icons/you.png'
import instagram from '../assets/icons/instagram.png'
import tiktok from '../assets/icons/tik.png'
import twitter from '../assets/icons/twitter.png'
import logo from '../assets/icons/logo.png'
import txt from '../assets/icons/txt.png'
import cart from '../assets/icons/cart.png'
import com from '../assets/icons/comparision.png'
import wish from '../assets/icons/wish.png'
import user from '../assets/icons/user.png'
import { useRouter } from 'next/navigation';
const Header = () => {
    const router = useRouter()
    return (
        <div className="header">
            <div className="top-con">
                <div className='container'>
                    <div className='top'>
                        <ul>
                            <li>About us</li>
                            <li>Language</li>
                            <li>FAQ</li>
                        </ul>
                        <PrimaText
                            content="Scrolling Text.. Scrolling Text.. Scrolling Text.."
                            size='14px'
                        />
                        <ul>
                            <li>Track Order</li>
                            <li>Mode</li>
                            <li>Affliate Marketing</li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className='mid-con'>
                <div className='container'>
                    <div className="mid">
                        <div className='img-con' onClick={() => router.push('/')}>
                            <Image src={logo} width={55} height={55} style={{ marginRight: "10px" }} />
                            <Image src={txt} width={200} height={20} />
                        </div>
                        <div className="input">
                            <input
                                placeholder="Search here"
                                type="text"
                            />
                            <div className="search">
                                <i class="fa fa-search"></i>
                            </div>
                        </div>
                        <div className="right-icn">
                            <div className="item" onClick={() => router.push('/order')}>
                                <Image src={cart} className='img' />
                                <span></span>
                            </div>
                            <div className="item">
                                <Image src={com} className='img' />
                                <span></span>
                            </div>
                            <div className="item">
                                <Image src={wish} className='img' />
                                <span></span>
                            </div>
                            <div className="item" onClick={() => router.push('/user')}>
                                <Image src={user} className='img' />
                                <span></span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='bot-con'>
                <div className='container'>
                    <div className="bottom">
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
                        <div className="last">
                            <Image src={facebook} className="social" />
                            <Image src={instagram} className="social" />
                            <Image src={you} className="social" />
                            <Image src={tiktok} className="social" />
                            <Image src={twitter} className="social" />
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Header