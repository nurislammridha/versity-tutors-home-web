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
                <div class="row align-items-center">
                    <div class="col-xl-7">
                        <div class="tu-banner_title">
                            <h1>A good <span>#education</span> is always a base of a bright future</h1>
                            <p>Consectur adipiscing elitsedo eiusmod tempor incididuntem utaborate dolore magna aliqua ad minim veniamque.</p>
                            <div class="tu-searchbar-wrapper tu-banner-search">
                                <div class="tu-appendinput">
                                    <div class="tu-starthere">
                                        <span>Start from here</span>
                                        <img src="images/knob_line.svg" alt="img" />
                                    </div>
                                    <div class="tu-searcbar">
                                        {/* <div class="tu-inputicon">
                                            <i class="icon icon-search"></i>
                                            <input type="text" class="form-control" placeholder="What do you want to explore?" />
                                        </div>
                                        <div class="tu-select">
                                            <i class="icon icon-layers"></i>
                                            <select id="selectv8" data-placeholderinput="Select list" data-placeholder="Select list type" class="form-control">
                                                <option label="Select list type"></option>
                                                <option >Automotive</option>
                                                <option >Beauty &amp; Care</option>
                                                <option >Marketing</option>
                                                <option >Child Care</option>
                                                <option >House Cleaning</option>
                                            </select>
                                        </div> */}
                                        <div class="tu-select-home tu-select ">
                                            <select
                                                id="selectv7"
                                                data-placeholder="I'm looking for"
                                                data-placeholderinput="I'm looking for"
                                                class="form-control tu-input-field"
                                            >
                                                <option label="Looking for"></option>
                                                <option label="Tutor"></option>
                                                <option label="Student"></option>
                                            </select>
                                        </div>
                                        <div class="tu-select-home tu-select">
                                            <select
                                                id="selectv7"
                                                data-placeholder="Class"
                                                data-placeholderinput="Class"
                                                class="form-control tu-input-field"
                                            >
                                                <option label="Class"></option>
                                                <option label="1-5"></option>
                                                <option label="Six"></option>
                                                <option label="Seven"></option>
                                            </select>
                                        </div>
                                        <div class="tu-select-home tu-select">
                                            <select
                                                id="selectv7"
                                                data-placeholder="Class"
                                                data-placeholderinput="Class"
                                                class="form-control tu-input-field"
                                            >
                                                <option label="Division"></option>
                                                <option label="Khulna"></option>
                                                <option label="Khulna"></option>
                                            </select>
                                        </div>
                                        <a href="search-listing.html" class="tu-primbtn-lg tu-primbtn-orange">Search now</a>
                                    </div>
                                </div>
                            </div>
                            {/* <div class="tu-popularsearches">
                                <h5>Popular searches:</h5>
                                <ul class="tu-popsearchitem">
                                    <li><a href="search-listing.html">WordPress</a></li>
                                    <li><a href="search-listing.html">Laravel</a></li>
                                    <li><a href="search-listing.html">UI UX designer</a></li>
                                    <li><a href="search-listing.html">video animator</a></li>
                                    <li><a href="search-listing.html">Marketing</a></li>
                                </ul>
                            </div> */}
                        </div>
                    </div>
                    <div class="col-xl-5 d-none d-xl-block">
                        <figure class="tu-bannervtwo_img">
                            <img src="images/index/banner/img-07.png" alt="img description" />
                        </figure>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Banner