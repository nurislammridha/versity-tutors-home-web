"use client"
import ContactDetails from '@/components/ContactDetails'
import DashboardHeader from '@/components/DashboardHeader'
import UploadDocument from '@/components/Document'
import DocumentInfo from '@/components/DocumentInfo'
import Education from '@/components/Education'
import EducationalDetails from '@/components/EducationalDetails'
import MyBookingStatus from '@/components/MyBookingStatus'
import MyConnections from '@/components/MyConnections'
import PersonalDetails from '@/components/PersonalDetails'
import PrimaFooter from '@/components/PrimaFooter'
import PrimaHeader from '@/components/PrimaHeader'
import ProfileImageUploader from '@/components/ProfileImageUploader'
import Settings from '@/components/Settings'
import StudentPersonalDetails from '@/components/StudentPersonalDetails'
import StudentTabs from '@/components/StudentTabs'
import StudentTuitionInfo from '@/components/StudentTuitionInfo'
import SubjectICanTeach from '@/components/SubjectICanTeach'
import TuitionInfo from '@/components/TuitionInfo'
import TutorTabs from '@/components/TutorTabs'
import WhoBookedMe from '@/components/WhoBookedMe'
import WishList from '@/components/WishList'
import { useLanguage } from '@/context/LanguageContext'
import { FalseUpdatedProfile, UploadAvatarImg } from '@/redux/_redux/CommonAction'
import { useRouter, useSearchParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { ToastContainer } from 'react-toastify'

const DashboardPage = () => {
    const { t } = useLanguage()
    const dispatch = useDispatch()
    const router = useRouter()
    const searchParams = useSearchParams();
    const name = searchParams.get('name');
    const [state, setState] = useState("personal")//personal
    const [clientData, setClientData] = useState(null)
    const [isTutor, setTutor] = useState(true)
    const [avatar, setAvatar] = useState(null)
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isLogin, setIsLogin] = useState(false)
    const isAvatarLoading = useSelector((state) => state.homeInfo.isAvatarLoading);
    const isUpdatedProfile = useSelector((state) => state.homeInfo.isUpdatedProfile);
    const [img, setImg] = useState(null)

    const handleUpload = () => {
        dispatch(UploadAvatarImg(img, avatar, clientData._id));
    }
    const handleLogout = () => {
        localStorage.setItem("isLogin", false)
        localStorage.setItem("clientData", null)
        router.push("/login")
    }
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        const publicId = avatar === null ? null : avatar?.publicId
        if (file) {
            setImg(file);
            setAvatar({
                url: URL.createObjectURL(file),// Create a temporary URL for preview
                publicId
            })
        }
    };
    useEffect(() => {
        if (clientData) {
            setAvatar(clientData?.avatar)
            setTutor(clientData?.isTutorAccount)
        }
    }, [clientData])
    useEffect(() => {
        if (isUpdatedProfile) {
            setClientData(JSON.parse(localStorage.getItem("clientData")))
            dispatch(FalseUpdatedProfile())
        }
        if (name) {
            setState(name)
        }
    }, [isUpdatedProfile, name])
    useEffect(() => {
        setIsLogin(localStorage.getItem('isLogin') === "true" ? true : false)
        setClientData(JSON.parse(localStorage.getItem("clientData")))
    }, [])
    useEffect(() => {
        // Prevent scrolling when sidebar is open
        if (isMobileMenuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
    }, [isMobileMenuOpen]);
    return (
        <>
            {/* Mobile overlay */}
            {isMobileMenuOpen && <div className="sidebar-overlay" onClick={() => setIsMobileMenuOpen(false)}></div>}

            <DashboardHeader
                isLogin={isLogin}
                clientData={clientData}
                setIsMobileMenuOpen={setIsMobileMenuOpen}
                isMobileMenuOpen={isMobileMenuOpen}
            />
            <main className="tu-main tu-bgmain">
                <div className="tu-main-section">
                    <div className="container">
                        <div className="row gy-4">
                            {/* Sidebar - Desktop visible, Mobile sliding */}
                            <div className={`sidebar-wrapper ${isMobileMenuOpen ? 'open' : ''} col-lg-4 col-xl-3`}>
                                {/* Close button for mobile */}
                                <div className="sidebar-close d-lg-none mb-3 mt-3">
                                    <button className="btn btn-secondary" onClick={() => setIsMobileMenuOpen(false)}>×</button>
                                </div>
                                <aside className="tu-asider-holder">
                                    <ProfileImageUploader avatar={avatar} clientData={clientData} />



                                    <ul className="tu-side-tabs">
                                        <li className="nav-item">
                                            <a className={state === 'personal' ? 'active nav-link' : 'nav-link'} onClick={() => setState('personal')}>
                                                {/* <i className="icon icon-user"></i><span>{t.personalDetails}</span> */}
                                                <i className="icon icon-user"></i><span>{"Update Profile"} </span>
                                            </a>
                                        </li>
                                        <li className="nav-item">
                                            <a
                                                className={state === 'contact' ? 'active nav-link d-flex justify-content-between align-items-center' : 'nav-link d-flex justify-content-between align-items-center'}
                                                onClick={() => setState('contact')}
                                            >
                                                <span className="d-flex align-items-center">
                                                    <i className="icon icon-phone"></i>
                                                    <span>{t.contactDetails}</span>
                                                </span>
                                                <span className='dash-badge'>Done</span>
                                            </a>
                                        </li>

                                        <li className="nav-item">
                                            <a className={state === 'education' ? 'active nav-link' : 'nav-link'} onClick={() => setState('education')}>
                                                <i className="icon icon-book"></i><span>{t.educationCap}</span>
                                            </a>
                                        </li>
                                        <li className="nav-item">
                                            <a className={state === 'subject' ? 'active nav-link' : 'nav-link'} onClick={() => setState('subject')}>
                                                <i className="icon icon-book-open"></i><span>{isTutor ? t.subjectICanTeach : t.subjectINeedLearn}</span>
                                            </a>
                                        </li>
                                        {isTutor && (
                                            <li className="nav-item">
                                                <a className={state === 'document' ? 'active nav-link' : 'nav-link'} onClick={() => setState('document')}>
                                                    <i className="icon icon-file"></i><span>{t.uploadDocument}</span>
                                                </a>
                                            </li>
                                        )}
                                        <li className="nav-item">
                                            <a className={state === 'whoBooked' ? 'active nav-link' : 'nav-link'} onClick={() => setState('whoBooked')}>
                                                <i className="icon icon-user"></i><span>{t.whoBookedMe}</span>
                                            </a>
                                        </li>
                                        <li className="nav-item">
                                            <a className={state === 'myBooking' ? 'active nav-link' : 'nav-link'} onClick={() => setState('myBooking')}>
                                                <i className="icon icon-calendar"></i><span>{t.myBookingStatus}</span>
                                            </a>
                                        </li>
                                        <li className="nav-item">
                                            <a className={state === 'myConnections' ? 'active nav-link' : 'nav-link'} onClick={() => setState('myConnections')}>
                                                <i className="icon icon-user-plus"></i><span>{t.myConnections}</span>
                                            </a>
                                        </li>
                                        <li className="nav-item">
                                            <a className={state === 'wishList' ? 'active nav-link' : 'nav-link'} onClick={() => setState('wishList')}>
                                                <i className="icon icon-heart"></i><span>{t.mySavingsList}</span>
                                            </a>
                                        </li>
                                        <li className="nav-item">
                                            <a className={state === 'settings' ? 'active nav-link' : 'nav-link'} onClick={() => setState('settings')}>
                                                <i className="icon icon-settings"></i><span>{t.settings}</span>
                                            </a>
                                        </li>
                                        <li className="nav-item">
                                            <a className="nav-link" onClick={() => handleLogout()}>
                                                <i className="icon icon-log-out"></i><span>{t.logout}</span>
                                            </a>
                                        </li>
                                    </ul>
                                </aside>
                            </div>
                            {/* Main content area */}
                            {state === "personal" && isTutor && <TutorTabs clientData={clientData} />}
                            {state === "personal" && !isTutor && <StudentTabs clientData={clientData} />}
                            {state === "contact" && <ContactDetails clientData={clientData} />}
                            {state === "education" && <Education clientData={clientData} />}
                            {state === "subject" && <SubjectICanTeach clientData={clientData} />}
                            {state === "document" && <UploadDocument clientData={clientData} />}
                            {state === "whoBooked" && <WhoBookedMe clientData={clientData} />}
                            {state === "myBooking" && <MyBookingStatus clientData={clientData} />}
                            {state === "myConnections" && <MyConnections clientData={clientData} />}
                            {state === "wishList" && <WishList clientData={clientData} />}
                            {state === "settings" && <Settings clientData={clientData} />}
                        </div>
                    </div>
                </div>
            </main>
            <PrimaFooter />

            <ToastContainer />
        </>
    )
}

export default DashboardPage