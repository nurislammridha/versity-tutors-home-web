import { useLanguage } from '@/context/LanguageContext'
import { useRouter } from 'next/navigation'
import React, { useEffect, useRef, useState } from 'react'

const DashboardHeader = ({ isLogin, clientData, isMobileMenuOpen, setIsMobileMenuOpen }) => {
    const router = useRouter()
    const [isLanMenu, setLanMenu] = useState(false)
    const { language, changeLanguage, t } = useLanguage()
    return (
        <>
            <header className="tu-header">
                <nav className="navbar navbar-expand-xl tu-navbar mo-nav">
                    <div className="container-fluid">
                        <a
                            className="navbar-brand"
                            onClick={() => router.push("/")}
                        >
                            <img src="/images/logo.png" alt="Logo" />
                        </a>

                        <button
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            className="tu-menu" aria-label="Main Menu" data-bs-target="#navbarSupportedContent" data-bs-toggle="collapse">
                            <i className="icon icon-menu"></i>
                        </button>
                        <div className="collapse navbar-collapse tu-themenav mo-hide" id="navbarSupportedContent">
                            <ul className="navbar-nav">
                                <li class="menu-item-has-children nav-item" onMouseEnter={() => setLanMenu(true)} onMouseLeave={() => setLanMenu(false)}>
                                    <a>{language === 'en' ? 'English' : 'বাংলা'}</a>
                                    {isLanMenu &&
                                        <ul class="sub-menu">
                                            <li>
                                                <a onClick={() => {
                                                    changeLanguage('en')
                                                    setLanMenu(false)
                                                }}>English</a>
                                            </li>
                                            <li>
                                                <a onClick={() => {
                                                    changeLanguage('bn')
                                                    setLanMenu(false)
                                                }}>বাংলা</a>
                                            </li>

                                        </ul>
                                    }

                                </li>

                            </ul>
                        </div>
                        <ul className="nav-item tu-afterlogin mo-hide">

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

export default DashboardHeader