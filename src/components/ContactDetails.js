import { ContactSubmit } from '@/redux/_redux/CommonAction'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

const ContactDetails = () => {
    const dispatch = useDispatch()
    const [clientData, setClientData] = useState("")
    const [phone, setPhone] = useState("")
    const [email, setEmail] = useState("")
    const [skype, setSkype] = useState("")
    const [whatsapp, setWhatsapp] = useState("")
    const [website, setWebsite] = useState("")
    const isPersonalLoading = useSelector((state) => state.homeInfo.isPersonalLoading);
    const handleSubmit = () => {
        dispatch(ContactSubmit({ phone, email, skype, whatsapp, website }, clientData._id))
    }
    useEffect(() => {
        setClientData(JSON.parse(localStorage.getItem("clientData")))
    }, []);
    useEffect(() => {
        setPhone(clientData?.phone || "")
        setEmail(clientData?.email || "")
        setSkype(clientData?.skype || "")
        setWhatsapp(clientData?.whatsapp || "")
        setWebsite(clientData?.website || "")
    }, [clientData]);
    return (
        <>
            <div className="col-lg-8 col-xl-9">
                <div className="tu-profilewrapper">
                    <div className="tu-boxwrapper" style={{ marginTop: 0 }}>
                        <div className="tu-boxarea">
                            <div className="tu-boxsm">
                                <div className="tu-boxsmtitle">
                                    <h4>Contact details</h4>
                                </div>
                            </div>
                            <div className="tu-box">
                                <form className="tu-themeform tu-dhbform">
                                    <fieldset>
                                        <div className="tu-themeform__wrap">
                                            <div className="form-group-wrap">
                                                <div className="form-group form-group-half">
                                                    <label className="tu-label">Phone number</label>
                                                    <div className="tu-inputicon">
                                                        <div className="tu-facebookv3">
                                                            <i className="icon icon-phone-call"></i>
                                                        </div>
                                                        <div className="tu-placeholderholder">
                                                            <input
                                                                type="number"
                                                                className="form-control"
                                                                required=""
                                                                placeholder="Enter phone number"
                                                                value={phone}
                                                                onChange={(e) => setPhone(e.target.value)}
                                                            />
                                                            <div className="tu-placeholder">
                                                                <span>01XXXXXXXXX</span>
                                                                <em>*</em>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="form-group form-group-half">
                                                    <label className="tu-label">Email address</label>
                                                    <div className="tu-inputicon">
                                                        <div className="tu-facebookv3">
                                                            <i className="icon icon-mail"></i>
                                                        </div>
                                                        <div className="tu-placeholderholder">
                                                            <input
                                                                type="email"
                                                                className="form-control"
                                                                required=""
                                                                placeholder="Enter email address"
                                                                value={email}
                                                                onChange={(e) => setEmail(e.target.value)}
                                                            />
                                                            <div className="tu-placeholder">
                                                                <span>Enter email address</span>
                                                                <em>*</em>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="form-group form-group-half">
                                                    <label className="tu-label">Skype ID</label>
                                                    <div className="tu-inputicon">
                                                        <div className="tu-facebookv3">
                                                            <i className="fa-brands fa-skype"></i>
                                                        </div>
                                                        <div className="tu-placeholderholder">
                                                            <input
                                                                type="text"
                                                                className="form-control"
                                                                placeholder="Enter skype id"
                                                                value={skype}
                                                                onChange={(e) => setSkype(e.target.value)}
                                                            />
                                                            <div className="tu-placeholder">
                                                                <span>Enter skype id</span>
                                                                <em>*</em>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="form-group form-group-half">
                                                    <label className="tu-label">Whatsapp number</label>
                                                    <div className="tu-inputicon">
                                                        <div className="tu-facebookv3">
                                                            <i className="fa-brands fa-whatsapp"></i>
                                                        </div>
                                                        <div className="tu-placeholderholder">
                                                            <input
                                                                type="number"
                                                                className="form-control"
                                                                placeholder="Enter whatsapp number"
                                                                value={whatsapp}
                                                                onChange={(e) => setWhatsapp(e.target.value)}
                                                            />
                                                            <div className="tu-placeholder">
                                                                <span>Enter whatsapp number</span>
                                                                <em>*</em>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="form-group">
                                                    <label className="tu-label">Website</label>
                                                    <div className="tu-inputicon">
                                                        <div className="tu-facebookv3">
                                                            <i className="icon icon-globe"></i>
                                                        </div>
                                                        <div className="tu-placeholderholder">
                                                            <input
                                                                type="text"
                                                                className="form-control"
                                                                placeholder="Enter website URL"
                                                                value={website}
                                                                onChange={(e) => setWebsite(e.target.value)}
                                                            />
                                                            <div className="tu-placeholder">
                                                                <span>Enter website URL</span>
                                                                <em>*</em>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </fieldset>
                                </form>
                            </div>
                        </div>
                    </div>
                    <div className="tu-btnarea-two">
                        <span>Save & update the latest changes to the live</span>
                        <a
                            href
                            className="tu-primbtn-lg tu-primbtn-orange"
                            onClick={() => !isPersonalLoading && handleSubmit()}
                        >
                            {isPersonalLoading ? "Saving.." : "Save & update"}
                        </a>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ContactDetails