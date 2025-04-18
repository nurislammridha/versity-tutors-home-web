import { useLanguage } from '@/context/LanguageContext'
import { ContactSubmit } from '@/redux/_redux/CommonAction'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

const ContactDetails = ({ clientData }) => {
    const { t, language } = useLanguage()
    const dispatch = useDispatch()
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
                                    <h4>{t.contactDetails}</h4>
                                </div>
                            </div>
                            <div className="tu-box">
                                <form className="tu-themeform tu-dhbform">
                                    <fieldset>
                                        <div className="tu-themeform__wrap">
                                            <div className="form-group-wrap">
                                                <div className="form-group form-group-half">
                                                    <label className="tu-label">{t.phoneNumber}</label>
                                                    <div className="tu-inputicon">
                                                        <div className="tu-facebookv3">
                                                            <i className="icon icon-phone-call"></i>
                                                        </div>
                                                        <div className="tu-placeholderholder">
                                                            <input
                                                                type="text"
                                                                className="form-control"
                                                                required=""
                                                                placeholder="Enter phone number"
                                                                value={phone}
                                                                onChange={(e) => setPhone(e.target.value)}
                                                            />
                                                            <div className="tu-placeholder">
                                                                <span>{t.hideMobile}</span>
                                                                {/* <em>*</em> */}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="form-group form-group-half">
                                                    <label className="tu-label">{t.emailAddress}</label>
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
                                                                <span>{t.enterEmailAddress}</span>
                                                                {/* <em>*</em> */}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="form-group form-group-half">
                                                    <label className="tu-label">{t.skypeId}</label>
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
                                                                <span>{t.enterSkypeId}</span>
                                                                {/* <em>*</em> */}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="form-group form-group-half">
                                                    <label className="tu-label">{t.whatsappNumber}</label>
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
                                                                <span>{t.enterWhatsappNumber}</span>
                                                                {/* <em>*</em> */}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="form-group">
                                                    <label className="tu-label">{t.website}</label>
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
                                                                <span>{t.enterWebsiteUrl}</span>
                                                                {/* <em>*</em> */}
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
                        <span>{t.saveUpdate}</span>
                        <a

                            className="tu-primbtn-lg tu-primbtn-orange"
                            onClick={() => !isPersonalLoading && handleSubmit()}
                        >
                            {isPersonalLoading ? t.saving : t.saveAndUpdate}
                        </a>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ContactDetails