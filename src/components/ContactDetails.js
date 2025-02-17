import React from 'react'

const ContactDetails = () => {
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
                                                            <input type="number" className="form-control" required="" placeholder="Enter phone number" />
                                                            <div className="tu-placeholder">
                                                                <span>Enter phone number</span>
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
                                                            <input type="email" className="form-control" required="" placeholder="Enter email address" />
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
                                                            <input type="text" className="form-control" placeholder="Enter skype id" />
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
                                                            <input type="number" className="form-control" placeholder="Enter whatsapp number" />
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
                                                            <input type="text" className="form-control" placeholder="Enter website URL" />
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
                        <a href="profile-setting-c.html" className="tu-primbtn-lg tu-primbtn-orange">Save & update</a>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ContactDetails