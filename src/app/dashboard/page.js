"use client"
import ContactDetails from '@/components/ContactDetails'
import UploadDocument from '@/components/Document'
import Education from '@/components/Education'
import MyBookingStatus from '@/components/MyBookingStatus'
import MyConnections from '@/components/MyConnections'
import PersonalDetails from '@/components/PersonalDetails'
import PrimaFooter from '@/components/PrimaFooter'
import PrimaHeader from '@/components/PrimaHeader'
import Settings from '@/components/Settings'
import SubjectICanTeach from '@/components/SubjectICanTeach'
import WhoBookedMe from '@/components/WhoBookedMe'
import WishList from '@/components/WishList'
import { FalseUpdatedProfile, UploadAvatarImg } from '@/redux/_redux/CommonAction'
import { useRouter, useSearchParams } from 'next/navigation'
import React, { Suspense, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { ToastContainer } from 'react-toastify'

const page = () => {
    const dispatch = useDispatch()
    const router = useRouter()
    const searchParams = useSearchParams();
    const name = searchParams.get('name');
    const [state, setState] = useState("document")//personal
    const [clientData, setClientData] = useState(null)
    const [avatar, setAvatar] = useState(null)
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
        if (clientData?.avatar) {
            setAvatar(clientData?.avatar)
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
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <PrimaHeader isLogin={isLogin} clientData={clientData} />
            <main className="tu-main tu-bgmain">
                <div className="tu-main-section">
                    <div className="container">
                        <div className="row gy-4">
                            <div className="col-lg-4 col-xl-3">
                                <aside className="tu-asider-holder">
                                    <div className="tu-asidebox">
                                        <figure>
                                            <img
                                                src={avatar ? avatar.url : "images/profile/img-01.jpg"}
                                                alt="image-description"
                                            />
                                            <figcaption className="tu-uploadimage">
                                                <input
                                                    type="file"
                                                    id="dropbox"
                                                    name="dropbox"
                                                    onChange={(e) => handleImageChange(e)}
                                                />
                                                <label for="dropbox"><i className="icon icon-camera"></i></label>
                                            </figcaption>
                                        </figure>
                                        <div className="tu-uploadinfo text-center">
                                            <h6>
                                                Your profile photo should not be larger that 500px X 500px & weight should not exceede 100kb
                                            </h6>
                                            <div className="tu-uploadimgbtn">
                                                <input type="file" name="file" className="tu-primbtn" id="uploadimg" />
                                                <label
                                                    // for="uploadimg"
                                                    className="tu-primbtn"
                                                    style={{ cursor: "pointer" }}
                                                    onClick={() => !isAvatarLoading && handleUpload()}
                                                >
                                                    {isAvatarLoading ? "Uploading.'." : "Upload photo"}
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                    <ul className="tu-side-tabs">
                                        <li className="nav-item ">
                                            <a
                                                className={state === "personal" ? "active nav-link" : "nav-link"}
                                                onClick={() => setState("personal")}
                                            >
                                                <i className="icon icon-user"></i><span>Personal details</span>
                                            </a>
                                        </li>
                                        <li className="nav-item">
                                            <a
                                                className={state === "contact" ? "active nav-link" : "nav-link"}
                                                onClick={() => setState("contact")}
                                            ><i className="icon icon-phone"></i><span>Contact details</span></a>
                                        </li>
                                        <li className="nav-item">
                                            <a
                                                className={state === "education" ? "active nav-link" : "nav-link"}
                                                onClick={() => setState("education")}><i className="icon icon-book"></i><span>Education</span></a>
                                        </li>
                                        <li className="nav-item">
                                            <a
                                                className={state === "subject" ? "active nav-link" : "nav-link"}
                                                onClick={() => setState("subject")}
                                            ><i className="icon icon-book-open"></i><span>{clientData?.isTutorAccount ? "Subjects I can teach" : "Subjects I need learn"}</span></a>
                                        </li>
                                        {clientData?.isTutorAccount && <li className="nav-item">
                                            <a
                                                className={state === "document" ? "active nav-link" : "nav-link"}
                                                onClick={() => setState("document")}
                                            ><i className="icon icon-file"></i><span>Upload Document</span></a>
                                        </li>}
                                        <li className="nav-item">
                                            <a
                                                className={state === "whoBooked" ? "active nav-link" : "nav-link"}
                                                onClick={() => setState("whoBooked")}
                                            ><i className="icon icon-user"></i><span>Who booked me</span></a>
                                        </li>
                                        <li className="nav-item">
                                            <a
                                                className={state === "myBooking" ? "active nav-link" : "nav-link"}
                                                onClick={() => setState("myBooking")}
                                            ><i className="icon icon-calendar"></i><span>My booking status</span></a>
                                        </li>
                                        <li className="nav-item">
                                            <a
                                                className={state === "myConnections" ? "active nav-link" : "nav-link"}
                                                onClick={() => setState("myConnections")}
                                            ><i className="icon icon-user-plus"></i><span>My connections</span></a>
                                        </li>
                                        <li className="nav-item">
                                            <a
                                                className={state === "wishList" ? "active nav-link" : "nav-link"}
                                                onClick={() => setState("wishList")}
                                            ><i className="icon icon-heart"></i><span>Saving List</span></a>
                                        </li>
                                        <li className="nav-item">
                                            <a
                                                className={state === "settings" ? "active nav-link" : "nav-link"}
                                                onClick={() => setState("settings")}
                                            ><i className="icon icon-settings"></i><span>Settings</span></a>
                                        </li>
                                        <li className="nav-item">
                                            <a
                                                className={state === "myConnections" ? "active nav-link" : "nav-link"}
                                                onClick={() => handleLogout()}
                                            ><i className="icon icon-log-out"></i><span>Logout</span></a>
                                        </li>
                                        {/* <li className="nav-item">
                                            <a href="profile-setting-e.html" className="nav-link"><i className="icon icon-image"></i><span>Media gallery</span></a>
                                        </li> */}
                                    </ul>
                                </aside>
                            </div>
                            {state === "personal" && <PersonalDetails clientData={clientData} />}
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
        </Suspense>
    )
}

export default page