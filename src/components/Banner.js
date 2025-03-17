import React from 'react'

const Banner = () => {
    return (
        <div class="tu-bannervthree">
            <div class="tu-particles">
                <div id="tu-particle"></div>
            </div>
            <div class="tu-dottedimage">
                <img src="images/index/banner/img-04.png" alt="img" />
            </div>
            <div class="tu-linedimage">
                <img src="images/index/banner/img-05.png" alt="img" />
            </div>
            <div class="container">
                <div class="align-items-center">
                    <div class="tu-banner_title">
                        <h1 className='text-center'>A good <span>#education</span> is always a base of a bright future</h1>
                        <p className='text-center' style={{ maxWidth: "100%" }}>Consectur adipiscing elitsedo eiusmod tempor incididuntem utaborate dolore magna aliqua ad minim veniamque.</p>

                        <div class="search-box p-4 rounded-4 shadow d-flex justify-content-between align-items-end flex-wrap gap-3">

                            <div class="d-flex flex-column flex-grow-1">
                                <label class="form-label fw-semibold text-purple">I'm looking for</label>
                                <select class="form-select">
                                    <option>Tutor</option>
                                    <option>Option 1</option>
                                    <option>Option 2</option>
                                </select>
                            </div>

                            <div class="d-flex flex-column flex-grow-1">
                                <label class="form-label fw-semibold text-purple">Select Subjects</label>
                                <select class="form-select">
                                    <option>Select Subject</option>
                                    <option>Single</option>
                                    <option>Married</option>
                                </select>
                            </div>
                            <div class="d-flex flex-column flex-grow-1">
                                <label class="form-label fw-semibold text-purple">Select Area</label>
                                <select class="form-select">
                                    <option>Select Division</option>
                                    <option>Single</option>
                                    <option>Married</option>
                                </select>
                            </div>



                            <div class="d-flex align-items-end">
                                <button class="btn btn-gradient px-4 py-2 d-flex align-items-center gap-2 rounded-pill">
                                    <i class="fa fa-search"></i> Search Profile
                                </button>
                            </div>

                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default Banner