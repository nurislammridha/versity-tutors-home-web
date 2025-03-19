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

                                onClick={() => router.push("/")}
                            ><img src="/images/logo.png" alt="Logo" /></a>
                        </strong>
                        <button className="tu-menu" aria-label="Main Menu" data-bs-target="#navbarSupportedContent" data-bs-toggle="collapse">
                            <i className="icon icon-menu"></i>
                        </button>
                        <div className="collapse navbar-collapse tu-themenav" id="navbarSupportedContent">
                            <ul className="navbar-nav">
                                {/* <li className="nav-item">
                                    <a className="nav-link" >
                                        Online classNamees
                                        <span className="tu-tag">NEW</span>
                                    </a>
                                </li> */}
                                {/* <li className="nav-item">
                                    <a className="nav-link" >Learning material<span className="tu-tag tu-bggreen">FREE</span></a>
                                </li> */}
                                {isLogin && <li className="nav-item">
                                    <a
                                        className="nav-link"

                                        onClick={() => router.push('/profiles')}
                                    >
                                        {clientData?.isTutorAccount ? "Student Profile" : "Tutor Profile"}
                                    </a>
                                </li>}
                                {/* <li className="menu-item-has-children nav-item">
                                    <a className="active" ="#">Pages</a>
                                    <ul className="sub-menu">
                                        <li className="menu-item-has-children">
                                            <a 
                                            >Home Pages</a>
                                            <ul className="sub-menu">
                                                <li>
                                                    <a 
                                                    >Home</a>
                                                </li>
                                                <li>
                                                    <a >Home v2 <em className="tu-menutag">without login</em></a>
                                                </li>
                                                <li>
                                                    <a >Home v3</a>
                                                </li>
                                                <li>
                                                    <a >Home v4</a>
                                                </li>
                                            </ul>
                                        </li>
                                        <li className="menu-item-has-children">
                                            <a 
                                            >Provider listings</a>
                                            <ul className="sub-menu">
                                                <li>
                                                    <a >Provider listings v1</a>
                                                </li>
                                                <li>
                                                    <a >Provider listings v2</a>
                                                </li>
                                            </ul>
                                        </li>
                                        <li>
                                            <a >Tutor Detail</a>
                                        </li>
                                        <li className="menu-item-has-children">
                                            <a >Blogs</a>
                                            <ul className="sub-menu">
                                                <li>
                                                    <a >Blog list</a>
                                                </li>
                                                <li>
                                                    <a >Blog list <em className="tu-menutag">Right sidebar</em></a>
                                                </li>
                                                <li>
                                                    <a >Blog detail</a>
                                                </li>
                                                <li>
                                                    <a >Blog detail <em className="tu-menutag">Right sidebar</em></a>
                                                </li>
                                            </ul>
                                        </li>
                                        <li className="menu-item-has-children">
                                            <a >Other pages</a>
                                            <ul className="sub-menu">
                                                <li>
                                                    <a >How it work</a>
                                                </li>
                                                <li>
                                                    <a >Packges</a>
                                                </li>
                                                <li>
                                                    <a >Login</a>
                                                </li>
                                                <li>
                                                    <a >Sign up</a>
                                                </li>
                                                <li>
                                                    <a >Lost password</a>
                                                </li>
                                            </ul>
                                        </li>
                                    </ul>
                                </li> */}
                            </ul>
                        </div>
                        <ul className="nav-item tu-afterlogin">
                            {/* <li>
                                <a className="nav-link" 
                                ><span className="icon icon-message-square"><i className="tu-messagenoti">4</i></span></a>
                            </li> */}
                            {/* <li>
                                <a className="nav-link" 
                                ><span className="icon icon-bell"><i className="tu-messagenoti">3</i></span></a>
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