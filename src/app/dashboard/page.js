"use client"
import ContactDetails from '@/components/ContactDetails'
import Education from '@/components/Education'
import PersonalDetails from '@/components/PersonalDetails'
import PrimaFooter from '@/components/PrimaFooter'
import PrimaHeader from '@/components/PrimaHeader'
import SubjectICanTeach from '@/components/SubjectICanTeach'
import React, { useState } from 'react'
import { ToastContainer } from 'react-toastify'

const page = () => {
    const [state, setState] = useState("personal")
    return (
        <>
            <PrimaHeader />
            <main className="tu-main tu-bgmain">
                <div className="tu-main-section">
                    <div className="container">
                        <div className="row gy-4">
                            <div className="col-lg-4 col-xl-3">
                                <aside className="tu-asider-holder">
                                    <div className="tu-asidebox">
                                        <figure>
                                            <img src="images/profile/img-01.jpg" alt="image-description" />
                                            <figcaption className="tu-uploadimage">
                                                <input type="file" id="dropbox" name="dropbox" />
                                                <label for="dropbox"><i className="icon icon-camera"></i></label>
                                            </figcaption>
                                        </figure>
                                        <div className="tu-uploadinfo text-center">
                                            <h6>
                                                Your profile photo should not be larger that 500px X 500px & weight should not exceede 100kb
                                            </h6>
                                            <div className="tu-uploadimgbtn">
                                                <input type="file" name="file" className="tu-primbtn" id="uploadimg" />
                                                <label for="uploadimg" className="tu-primbtn">Upload photo</label>
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
                                            ><i className="icon icon-book-open"></i><span>Subjects I can teach</span></a>
                                        </li>
                                        {/* <li className="nav-item">
                                            <a href="profile-setting-e.html" className="nav-link"><i className="icon icon-image"></i><span>Media gallery</span></a>
                                        </li> */}
                                    </ul>
                                </aside>
                            </div>
                            {state === "personal" && <PersonalDetails />}
                            {state === "contact" && <ContactDetails />}
                            {state === "education" && <Education />}
                            {state === "subject" && <SubjectICanTeach />}
                        </div>
                    </div>
                </div>
            </main>
            <PrimaFooter />

            <ToastContainer />
        </>
    )
}

export default page