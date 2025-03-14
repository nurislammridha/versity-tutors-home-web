import { useRouter } from 'next/navigation'
import React, { useEffect, useRef } from 'react'

const PrimaHeader = ({ isLogin, clientData }) => {
    const router = useRouter()
    return (
        <>
            <header className="tu-header">
                <nav className="navbar navbar-expand-xl tu-navbar">
                    <div className="container-fluid">
                        <strong>
                            <a
                                className="navbar-brand"
                                href
                                onClick={() => router.push("/")}
                            ><img src="/images/logo.png" alt="Logo" /></a>
                        </strong>
                        <button className="tu-menu" aria-label="Main Menu" data-bs-target="#navbarSupportedContent" data-bs-toggle="collapse">
                            <i className="icon icon-menu"></i>
                        </button>
                        <div className="collapse navbar-collapse tu-themenav" id="navbarSupportedContent">
                            <ul className="navbar-nav">
                                {/* <li className="nav-item">
                                    <a className="nav-link" href="search-listing.html">
                                        Online classNamees
                                        <span className="tu-tag">NEW</span>
                                    </a>
                                </li> */}
                                {/* <li className="nav-item">
                                    <a className="nav-link" href="search-listing.html">Learning material<span className="tu-tag tu-bggreen">FREE</span></a>
                                </li> */}
                                {isLogin && <li className="nav-item">
                                    <a
                                        className="nav-link"
                                        href
                                        onClick={() => router.push('/profiles')}
                                    >
                                        {clientData?.isTutorAccount ? "Student Profile" : "Tutor Profile"}
                                    </a>
                                </li>}
                                {/* <li className="menu-item-has-children nav-item">
                                    <a className="active" href="#">Pages</a>
                                    <ul className="sub-menu">
                                        <li className="menu-item-has-children">
                                            <a href="javascript:void(0)">Home Pages</a>
                                            <ul className="sub-menu">
                                                <li>
                                                    <a href="index.html">Home</a>
                                                </li>
                                                <li>
                                                    <a href="index-without-login.html">Home v2 <em className="tu-menutag">without login</em></a>
                                                </li>
                                                <li>
                                                    <a href="indexv2.html">Home v3</a>
                                                </li>
                                                <li>
                                                    <a href="indexv3.html">Home v4</a>
                                                </li>
                                            </ul>
                                        </li>
                                        <li className="menu-item-has-children">
                                            <a href="javascript:void(0)">Provider listings</a>
                                            <ul className="sub-menu">
                                                <li>
                                                    <a href="search-listing.html">Provider listings v1</a>
                                                </li>
                                                <li>
                                                    <a href="search-listing-two.html">Provider listings v2</a>
                                                </li>
                                            </ul>
                                        </li>
                                        <li>
                                            <a href="tutor-detail.html">Tutor Detail</a>
                                        </li>
                                        <li className="menu-item-has-children">
                                            <a href="javascript:void(0);">Blogs</a>
                                            <ul className="sub-menu">
                                                <li>
                                                    <a href="blog-grid-left.html">Blog list</a>
                                                </li>
                                                <li>
                                                    <a href="blog-grid-right.html">Blog list <em className="tu-menutag">Right sidebar</em></a>
                                                </li>
                                                <li>
                                                    <a href="blog-detail-left.html">Blog detail</a>
                                                </li>
                                                <li>
                                                    <a href="blog-detail-right.html">Blog detail <em className="tu-menutag">Right sidebar</em></a>
                                                </li>
                                            </ul>
                                        </li>
                                        <li className="menu-item-has-children">
                                            <a href="javascript:void(0);">Other pages</a>
                                            <ul className="sub-menu">
                                                <li>
                                                    <a href="how-it-work.html">How it work</a>
                                                </li>
                                                <li>
                                                    <a href="package.html">Packges</a>
                                                </li>
                                                <li>
                                                    <a href="login.html">Login</a>
                                                </li>
                                                <li>
                                                    <a href="signup.html">Sign up</a>
                                                </li>
                                                <li>
                                                    <a href="lost-password.html">Lost password</a>
                                                </li>
                                            </ul>
                                        </li>
                                    </ul>
                                </li> */}
                            </ul>
                        </div>
                        <ul className="nav-item tu-afterlogin">
                            {/* <li>
                                <a className="nav-link" href="index.html"><span className="icon icon-message-square"><i className="tu-messagenoti">4</i></span></a>
                            </li> */}
                            {/* <li>
                                <a className="nav-link" href="index.html"><span className="icon icon-bell"><i className="tu-messagenoti">3</i></span></a>
                            </li> */}
                            {isLogin ?
                                <li className="menu-item-has-children">
                                    <strong>
                                        <a
                                            className="nav-link"
                                            onClick={() => router.push('/dashboard')}
                                        >
                                            <img src={clientData?.avatar?.url} alt="image-description" />
                                        </a></strong>
                                    {/* <ul className="sub-menu">
                                        <li>
                                            <a href="profile-setting-a.html"><i className="icon icon-user"></i>Personal details</a>
                                        </li>
                                        <li>
                                            <a href="profile-setting-b.html"><i className="icon icon-phone"></i>Contact details</a>
                                        </li>
                                        <li>
                                            <a href="profile-setting-c.html"><i className="icon icon-book"></i>Education</a>
                                        </li>
                                        <li>
                                            <a href="profile-setting-d.html"><i className="icon icon-book-open"></i>Subjects I can teach</a>
                                        </li>
                                        <li>
                                            <a href="profile-setting-e.html"><i className="icon icon-image"></i>Media gallery</a>
                                        </li>
                                    </ul> */}
                                </li>
                                :
                                <li>
                                    <a
                                        className="nav-link"
                                        onClick={() => router.push('/login')}
                                    >
                                        Login
                                    </a>
                                </li>
                            }
                        </ul>
                    </div>
                </nav>
            </header>
        </>
    )
}

export default PrimaHeader