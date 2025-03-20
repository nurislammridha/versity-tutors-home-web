
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'

const SecondaryHeader = ({ isLogin, clientData }) => {
    const router = useRouter()
    const [isMenu, setMenu] = useState(false)
    const handleLogout = () => {
        localStorage.setItem("isLogin", false)
        localStorage.setItem("clientData", null)
        router.push("/login")
    }
    return (
        <header class="tu-header tu-headerv2" style={{ marginTop: -5, backgroundColor: "#0a0f26" }}>
            <nav class="navbar navbar-expand-xl tu-navbar tu-navbarvtwo">
                <div class="container-fluid">
                    <strong>
                        <a class="navbar-brand" onClick={() => router.push("/")}><img src="images/logo_white.png" alt="Logo" /></a>
                    </strong>
                    <button class="tu-menu" aria-label="Main Menu" data-bs-target="#navbarSupportedContent" data-bs-toggle="collapse">
                        <i class="icon icon-menu"></i>
                    </button>
                    <div class="collapse navbar-collapse tu-themenav" id="navbarSupportedContent">
                        <ul class="navbar-nav">
                            <li class="nav-item">
                                <a href="#services" class="nav-link" >
                                    Our Services
                                </a>

                            </li>
                            <li class="nav-item">
                                <a href="#classes" class="nav-link" >Our Classes</a>

                            </li>
                            <li class="nav-item">
                                <a href="#stories" class="nav-link" >Success Stories</a>
                            </li>
                            <li class="nav-item">
                                <a href="#featured" class="nav-link" >Featured Tutor</a>
                            </li>
                            <li class="nav-item">
                                <a href="#subjects" class="nav-link" >All Subjects</a>
                            </li>

                        </ul>
                    </div>
                    <ul class="nav-item tu-afterlogin">
                        {/* <li>
                            <a class="nav-link" ="index.html"><span class="icon icon-bell"><i class="tu-messagenoti">3</i></span></a>
                        </li> */}
                        {isLogin ? (
                            <li class="menu-item-has-children" onMouseEnter={() => setMenu(true)} onMouseLeave={() => setMenu(false)}>
                                <strong>
                                    <a class="nav-link" onClick={() => router.push('/dashboard?name=personal')}><img src={clientData?.avatar?.url} alt="image-description" /></a></strong>
                                {isMenu && <ul class="sub-menu">
                                    <li>
                                        <a onClick={() => router.push('/dashboard?name=personal')}><i class="icon icon-user"></i>Personal details</a>
                                    </li>
                                    <li>
                                        <a onClick={() => router.push('/dashboard?name=contact')}><i class="icon icon-phone"></i>Contact details</a>
                                    </li>
                                    <li>
                                        <a onClick={() => router.push('/dashboard?name=education')}><i class="icon icon-book"></i>Education</a>
                                    </li>
                                    <li>
                                        <a onClick={() => router.push('/dashboard?name=subject')}><i class="icon icon-book-open"></i>{clientData?.isTutorAccount ? "Subjects I can teach" : "Subjects I need learn"}</a>
                                    </li>
                                    <li>
                                        <a onClick={() => router.push('/dashboard?name=whoBooked')}><i class="icon icon-user"></i>Who booked me</a>
                                    </li>
                                    <li>
                                        <a onClick={() => router.push('/dashboard?name=myBooking')}><i class="icon icon-calendar"></i>My booking status</a>
                                    </li>
                                    <li>
                                        <a onClick={() => router.push('/dashboard?name=myConnections')}><i class="icon icon-user-plus"></i>My connections</a>
                                    </li>
                                    <li>
                                        <a onClick={() => router.push('/dashboard?name=wishList')}><i class="icon icon-heart"></i>My savings list</a>
                                    </li>
                                    <li>
                                        <a onClick={() => router.push('/dashboard?name=settings')}><i class="icon icon-settings"></i>Settings</a>
                                    </li>
                                    <li>
                                        <a onClick={() => handleLogout()}><i class="icon icon-log-out"></i>Logout</a>
                                    </li>
                                </ul>}
                            </li>
                        ) : (
                            <li>
                                <a
                                    className="nav-link"
                                    onClick={() => router.push('/login')}
                                >
                                    Login
                                </a>
                            </li>
                        )}

                    </ul>
                </div>
            </nav>
        </header>
    )
}

export default SecondaryHeader