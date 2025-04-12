
import { useLanguage } from '@/context/LanguageContext'
import { NotificationAsClicked, NotificationByClient, SeenNotification } from '@/redux/_redux/CommonAction'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

const SecondaryHeader = ({ isLogin, clientData }) => {
    const router = useRouter()
    const dispatch = useDispatch()
    const [isMenu, setMenu] = useState(false)
    const [isLanMenu, setLanMenu] = useState(false)
    const { language, changeLanguage, t } = useLanguage()
    const [isNotification, setNotification] = useState(false)
    const notificationList = useSelector((state) => state.homeInfo.notificationList);
    const { unreadCount, result: list } = notificationList || {}
    const handleLogout = () => {
        localStorage.setItem("isLogin", false)
        localStorage.setItem("clientData", null)
        router.push("/login")
    }
    const handleOpenNotification = () => {
        setNotification(!isNotification)
        unreadCount > 0 && dispatch(NotificationAsClicked(clientData?._id))
    }
    const handleSeen = (item) => {
        setNotification(false)
        router.push(item.redirectUrl)
        dispatch(SeenNotification(item?._id))
    }

    useEffect(() => {
        clientData && dispatch(NotificationByClient(clientData?._id))
    }, [clientData])

    console.log('notificationList', notificationList)
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
                                    {t.ourServices}
                                </a>

                            </li>
                            <li class="nav-item">
                                <a href="#classes" class="nav-link" >{t.ourClasses}</a>

                            </li>
                            <li class="nav-item">
                                <a href="#stories" class="nav-link" >{t.successStories}</a>
                            </li>
                            <li class="nav-item">
                                <a href="#featured" class="nav-link" >{t.featuredTutor}</a>
                            </li>
                            <li class="nav-item">
                                <a href="#subjects" class="nav-link" >{t.allSubjects}</a>
                            </li>

                        </ul>
                    </div>
                    <ul class="nav-item tu-afterlogin">
                        {/* <li>
                            <a class="nav-link"
                                onClick={() => handleOpenNotification()}
                            ><span class="icon icon-bell">{unreadCount > 0 && <i class="tu-messagenoti">{unreadCount}</i>}</span></a>
                            {isNotification &&
                                <ul class="sub-notification list-group">
                                    {list && list.length > 0 ? list.map((item, index) => (
                                        item?.isSeen ? <li class="list-group-item notification-item seen"
                                            onClick={() => router.push(item.redirectUrl)}
                                        >
                                            <span>{item?.title}</span>
                                        </li> :
                                            <li class="list-group-item notification-item unseen"
                                                onClick={() => handleSeen(item)}
                                            >
                                                <strong>{item?.title}</strong> - Click to view
                                            </li>
                                    ))
                                        : (
                                            <li class="list-group-item notification-item seen"

                                            >
                                                <span>No notification found</span> - Thank you for joining us!
                                            </li>
                                        )}
                                </ul>
                            }
                        </li> */}
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
                        {isLogin ? (
                            <li class="menu-item-has-children" onMouseEnter={() => setMenu(true)} onMouseLeave={() => setMenu(false)}>
                                <strong>
                                    <a class="nav-link" onClick={() => router.push('/dashboard?name=personal')}><img src={clientData?.avatar?.url} alt="image-description" /></a></strong>
                                {isMenu && <ul class="sub-menu">
                                    <li>
                                        <a onClick={() => router.push('/dashboard?name=personal')}><i class="icon icon-user"></i>{t.personalDetails}</a>
                                    </li>
                                    <li>
                                        <a onClick={() => router.push('/dashboard?name=contact')}><i class="icon icon-phone"></i>{t.contactDetails}</a>
                                    </li>
                                    <li>
                                        <a onClick={() => router.push('/dashboard?name=education')}><i class="icon icon-book"></i>{t.educationCap}</a>
                                    </li>
                                    <li>
                                        <a onClick={() => router.push('/dashboard?name=subject')}><i class="icon icon-book-open"></i>{clientData?.isTutorAccount ? t.subjectICanTeach : t.subjectINeedLearn}</a>
                                    </li>
                                    <li>
                                        <a onClick={() => router.push('/dashboard?name=whoBooked')}><i class="icon icon-user"></i>{t.whoBookedMe}</a>
                                    </li>
                                    <li>
                                        <a onClick={() => router.push('/dashboard?name=myBooking')}><i class="icon icon-calendar"></i>{t.myBookingStatus}</a>
                                    </li>
                                    <li>
                                        <a onClick={() => router.push('/dashboard?name=myConnections')}><i class="icon icon-user-plus"></i>{t.myConnections}</a>
                                    </li>
                                    <li>
                                        <a onClick={() => router.push('/dashboard?name=wishList')}><i class="icon icon-heart"></i>{t.mySavingsList}</a>
                                    </li>
                                    <li>
                                        <a onClick={() => router.push('/dashboard?name=settings')}><i class="icon icon-settings"></i>{t.settings}</a>
                                    </li>
                                    <li>
                                        <a onClick={() => handleLogout()}><i class="icon icon-log-out"></i>{t.logout}</a>
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