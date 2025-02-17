import React from 'react'

const PersonalDetails = () => {
    return (
        <>
            <div className="col-lg-8 col-xl-9">
                <div className="tu-profilewrapper">
                    <div className="tu-boxwrapper" style={{ marginTop: 0 }}>
                        <div className="tu-boxarea">
                            <div className="tu-boxsm">
                                <div className="tu-boxsmtitle">
                                    <h4>Personal details</h4>
                                </div>
                            </div>
                            <div className="tu-box">
                                <form className="tu-themeform tu-dhbform">
                                    <fieldset>
                                        <div className="tu-themeform__wrap">
                                            <div className="form-group-wrap">
                                                <div className="form-group form-group-half">
                                                    <label className="tu-label">First name</label>
                                                    <div className="tu-placeholderholder">
                                                        <input type="text" className="form-control" required="" placeholder="Your first name" />
                                                        <div className="tu-placeholder">
                                                            <span>Your first name</span>
                                                            <em>*</em>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="form-group form-group-half">
                                                    <label className="tu-label">Last name</label>
                                                    <div className="tu-placeholderholder">
                                                        <input type="text" className="form-control" required="" placeholder="Your last name" />
                                                        <div className="tu-placeholder">
                                                            <span>Your last name</span>
                                                            <em>*</em>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="form-group form-group-half">
                                                    <label className="tu-label">Your tagline</label>
                                                    <div className="tu-placeholderholder">
                                                        <input type="text" className="form-control" required="" placeholder="Add your tagline" />
                                                        <div className="tu-placeholder">
                                                            <span>Add your tagline</span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="form-group form-group-half">
                                                    <label className="tu-label">Hourly fee</label>
                                                    <div className="tu-placeholderholder">
                                                        <input type="number" className="form-control" required="" placeholder="Your hourly fee" />
                                                        <div className="tu-placeholder">
                                                            <span>Your hourly fee</span>
                                                            <em>*</em>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="form-group form-group-3half">
                                                    <label className="tu-label">Country</label>
                                                    <div className="tu-select">
                                                        <select id="selectv8" data-placeholder="Select Country from list" data-placeholderinput="Select Country from list" className="form-control" required>
                                                            <option label="Select Country from list"></option>
                                                            <option value="Belize">Belize</option>
                                                            <option value="Benin">Benin</option>
                                                            <option value="Bermuda">Bermuda</option>
                                                            <option value="Bhutan">Bhutan</option>
                                                            <option value="Bolivia">Bolivia</option>
                                                            <option value="Bonaire">Bonaire</option>
                                                            <option value="Bosnia & Herzegovina">Bosnia & Herzegovina</option>
                                                            <option value="Botswana">Botswana</option>
                                                            <option value="Brazil">Brazil</option>
                                                            <option value="British Indian Ocean Ter">British Indian Ocean Ter</option>
                                                            <option value="Brunei">Brunei</option>
                                                            <option value="Bulgaria">Bulgaria</option>
                                                            <option value="Burkina Faso">Burkina Faso</option>
                                                            <option value="Burundi">Burundi</option>
                                                            <option value="Cambodia">Cambodia</option>
                                                            <option value="Cameroon">Cameroon</option>
                                                            <option value="Canada">Canada</option>
                                                            <option value="Canary Islands">Canary Islands</option>
                                                            <option value="Cape Verde">Cape Verde</option>
                                                            <option value="Cayman Islands">Cayman Islands</option>
                                                            <option value="Central African Republic">Central African Republic</option>
                                                            <option value="Chad">Chad</option>
                                                            <option value="Channel Islands">Channel Islands</option>
                                                            <option value="Chile">Chile</option>
                                                            <option value="China">China</option>
                                                            <option value="Christmas Island">Christmas Island</option>
                                                            <option value="Cocos Island">Cocos Island</option>
                                                        </select>
                                                    </div>
                                                </div>
                                                <div className="form-group form-group-3half">
                                                    <label className="tu-label">City</label>
                                                    <div className="tu-select">
                                                        <select id="selectv9" data-placeholder="Select city" data-placeholderinput="Select city" className="form-control" required>
                                                            <option label="Select City from list"></option>
                                                            <option value="Belize">Belize</option>
                                                            <option value="Benin">Benin</option>
                                                            <option value="Bermuda">Bermuda</option>
                                                            <option value="Bhutan">Bhutan</option>
                                                            <option value="Bolivia">Bolivia</option>
                                                            <option value="Bonaire">Bonaire</option>
                                                            <option value="Bosnia & Herzegovina">Bosnia & Herzegovina</option>
                                                            <option value="Botswana">Botswana</option>
                                                            <option value="Brazil">Brazil</option>
                                                            <option value="British Indian Ocean Ter">British Indian Ocean Ter</option>
                                                            <option value="Brunei">Brunei</option>
                                                            <option value="Bulgaria">Bulgaria</option>
                                                            <option value="Burkina Faso">Burkina Faso</option>
                                                            <option value="Burundi">Burundi</option>
                                                            <option value="Cambodia">Cambodia</option>
                                                            <option value="Cameroon">Cameroon</option>
                                                            <option value="Canada">Canada</option>
                                                            <option value="Canary Islands">Canary Islands</option>
                                                            <option value="Cape Verde">Cape Verde</option>
                                                            <option value="Cayman Islands">Cayman Islands</option>
                                                            <option value="Central African Republic">Central African Republic</option>
                                                            <option value="Chad">Chad</option>
                                                            <option value="Channel Islands">Channel Islands</option>
                                                            <option value="Chile">Chile</option>
                                                            <option value="China">China</option>
                                                            <option value="Christmas Island">Christmas Island</option>
                                                            <option value="Cocos Island">Cocos Island</option>
                                                        </select>
                                                    </div>
                                                </div>
                                                <div className="form-group form-group-3half">
                                                    <label className="tu-label">Zipcode</label>
                                                    <div className="tu-placeholderholder">
                                                        <input type="number" className="form-control" required placeholder="Enter zipcode" />
                                                        <div className="tu-placeholder">
                                                            <span>Enter zipcode</span>
                                                            <em>*</em>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="form-group">
                                                    <label className="tu-label">Languages</label>
                                                    <div className="tu-select">
                                                        <select id="selectv5" data-placeholder="Select languages you know" className="form-control" required>
                                                            <option label="Select languages you know"></option>
                                                            <option value="Belize">Belize</option>
                                                            <option value="Benin">Benin</option>
                                                        </select>
                                                    </div>
                                                    <ul className="tu-labels">
                                                        <li><span>Arabic <a href="javascript:void(0);"><i className="icon icon-x"></i></a></span></li>
                                                        <li><span>English <a href="javascript:void(0);"><i className="icon icon-x"></i></a></span></li>
                                                        <li><span>Chinese <a href="javascript:void(0);"><i className="icon icon-x"></i></a></span></li>
                                                        <li><span>Hebrew <a href="javascript:void(0);"><i className="icon icon-x"></i></a></span></li>
                                                        <li><span>Spanish <a href="javascript:void(0);"><i className="icon icon-x"></i></a></span></li>
                                                        <li><span>German <a href="javascript:void(0);"><i className="icon icon-x"></i></a></span></li>
                                                    </ul>
                                                </div>
                                                <div className="form-group">
                                                    <label className="tu-label">I can teach on</label>
                                                    <ul className="tu-status-filter">
                                                        <li>
                                                            <div className="tu-status-contnent">
                                                                <div className="tu-check tu-checksm">
                                                                    <input type="checkbox" id="home" name="expcheck" checked="" />
                                                                    <label for="home">My home</label>
                                                                </div>
                                                            </div>
                                                        </li>
                                                        <li>
                                                            <div className="tu-status-contnent">
                                                                <div className="tu-check tu-checksm">
                                                                    <input type="checkbox" id="home1" name="expcheck" checked="" />
                                                                    <label for="home1">Student's home</label>
                                                                </div>
                                                            </div>
                                                        </li>
                                                        <li>
                                                            <div className="tu-status-contnent">
                                                                <div className="tu-check tu-checksm">
                                                                    <input type="checkbox" id="online" name="expcheck" />
                                                                    <label for="online">Online</label>
                                                                </div>
                                                            </div>
                                                        </li>
                                                    </ul>
                                                </div>
                                                <div className="form-group">
                                                    <label className="tu-label">A brief introduction</label>
                                                    <div className="tu-placeholderholder">
                                                        <textarea className="form-control" placeholder="Enter description"></textarea>
                                                        <div className="tu-placeholder">
                                                            <span>Enter description</span>
                                                        </div>
                                                    </div>
                                                    <div className="tu-input-counter">
                                                        <span>Characters left:</span>
                                                        <b>500</b>
                                                        /
                                                        <em> 500</em>
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
                        <a href="profile-setting-b.html" className="tu-primbtn-lg tu-primbtn-orange">Save & update</a>
                    </div>
                </div>
            </div>
        </>
    )
}

export default PersonalDetails