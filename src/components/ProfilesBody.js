import { GetProfiles } from '@/redux/_redux/CommonAction';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

const ProfilesBody = () => {
    const dispatch = useDispatch()
    const isProfilesLoading = useSelector((state) => state.homeInfo.isProfilesLoading);
    const filteredProfiles = useSelector((state) => state.homeInfo.filteredProfiles);
    useEffect(() => {
        dispatch(GetProfiles({ filters: { isTutorAccount: true } }))
    }, [])
    console.log('filteredProfiles', filteredProfiles)
    return (
        <>
            <main class="tu-bgmain tu-main">
                <section class="tu-main-section">
                    <div class="container">
                        <div class="row">
                            <div class="col-lg-12">
                                <div class="tu-listing-wrapper">
                                    <div class="tu-sort">
                                        <h3>132,576 Search result in<span>“Mathematic”</span>tutors</h3>
                                        <div class="tu-sort-right-area">
                                            <div class="tu-sortby">
                                                <span>Sort by: </span>
                                                <div class="tu-select">
                                                    <select class="form-control tu-selectv">
                                                        <option>Price low to high </option>
                                                        <option>Price high to low</option>
                                                    </select>
                                                </div>
                                            </div>
                                            <div class="tu-filter-btn">
                                                <a class="tu-listbtn active" href="search-listing.html"><i class="icon icon-list"></i></a>
                                                <a class="tu-listbtn" href="search-listing-two.html"><i class="icon icon-grid"></i></a>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="tu-searchbar-wrapper">
                                        <div class="tu-appendinput">
                                            <div class="tu-searcbar">
                                                <div class="tu-inputicon">
                                                    <a href="javascript:void(0);"><i class="icon icon-search"></i></a>
                                                    <input type="text" class="form-control" placeholder="What do you want to explore?" />
                                                </div>
                                                <div class="tu-select">
                                                    <i class="icon icon-layers"></i>
                                                    <select id="selectv8" data-placeholderinput="Select list" data-placeholder="Select category" class="form-control">
                                                        <option label="Select category"></option>
                                                        <option >Automotive</option>
                                                        <option >Beauty &amp; Care</option>
                                                        <option >Marketing</option>
                                                        <option >Child Care</option>
                                                        <option >House Cleaning</option>
                                                    </select>
                                                </div>
                                                <a href="search-listing.html" class="tu-primbtn-lg tu-primbtn-orange">Search now</a>
                                            </div>
                                        </div>
                                        <div class="tu-listing-search">
                                            <figure>
                                                <img src="images/listing/shape.png" alt="image" />
                                            </figure>
                                            <span>Start from here</span>
                                        </div>
                                    </div>
                                    <ul class="tu-searchtags">
                                        <li>
                                            <span>Pre-School <a href="javascript:void(0)"><i class="icon icon-x"></i></a></span>
                                        </li>
                                        <li>
                                            <span> Middle (Class 6-8) <a href="javascript:void(0)"><i class="icon icon-x"></i></a></span>
                                        </li>
                                        <li>
                                            <span>Intermediate <a href="javascript:void(0)"><i class="icon icon-x"></i></a></span>
                                        </li>
                                        <li>
                                            <span>5.0 Stars <a href="javascript:void(0)"><i class="icon icon-x"></i></a></span>
                                        </li>
                                        <li>
                                            <span>Online bookings <a href="javascript:void(0)"><i class="icon icon-x"></i></a></span>
                                        </li>
                                        <li>
                                            <span>Male only <a href="javascript:void(0)"><i class="icon icon-x"></i></a></span>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <div class="col-xl-4 col-xxl-3">
                                <aside class="tu-asidewrapper">
                                    <a href="javascript:void(0)" class="tu-dbmenu"><i class="icon icon-chevron-left"></i></a>
                                    <div class="tu-aside-menu">
                                        <div class="tu-aside-holder">
                                            <div class="tu-asidetitle" data-bs-toggle="collapse" data-bs-target="#side2" role="button" aria-expanded="true">
                                                <h5>Education level</h5>
                                            </div>
                                            <div id="side2" class="collapse show">
                                                <div class="tu-aside-content">
                                                    <div class="tu-filterselect">
                                                        <div class="tu-select">
                                                            <select id="selectv7" data-placeholder="Select education level" data-placeholderinput="Select education level" class="form-control tu-input-field">
                                                                <option label="Select category"></option>
                                                                <option value="selectparcat">Primary (Class 1-5)</option>
                                                                <option value="selectparcat">Primary (Class 6-8)</option>
                                                                <option value="selectparcat">Primary (Class 9-10)</option>
                                                                <option value="selectparcat">Language courses</option>
                                                                <option value="selectparcat">Short courses</option>
                                                            </select>
                                                        </div>
                                                    </div>
                                                    <div class="tu-filterselect">
                                                        <h6>Choose subjects</h6>
                                                        <ul class="tu-categoriesfilter">
                                                            <li>
                                                                <div class="tu-check tu-checksm">
                                                                    <input type="checkbox" id="expcheck2" name="expcheck" checked />
                                                                    <label for="expcheck2">Social studies</label>
                                                                </div>
                                                            </li>
                                                            <li>
                                                                <div class="tu-check tu-checksm">
                                                                    <input type="checkbox" id="expcheck2a" name="expcheck" />
                                                                    <label for="expcheck2a">Urdu</label>
                                                                </div>
                                                            </li>
                                                            <li>
                                                                <div class="tu-check tu-checksm">
                                                                    <input type="checkbox" id="expcheck2a1" name="expcheck" checked />
                                                                    <label for="expcheck2a1">Mathematic</label>
                                                                </div>
                                                            </li>
                                                            <li>
                                                                <div class="tu-check tu-checksm">
                                                                    <input type="checkbox" id="expcheck2a2" name="expcheck" />
                                                                    <label for="expcheck2a2">English</label>
                                                                </div>
                                                            </li>
                                                            <li>
                                                                <div class="tu-check tu-checksm">
                                                                    <input type="checkbox" id="expcheck2a3" name="expcheck" />
                                                                    <label for="expcheck2a3">Drawing</label>
                                                                </div>
                                                            </li>
                                                            <li>
                                                                <div class="tu-check tu-checksm">
                                                                    <input type="checkbox" id="expcheck2a4" name="expcheck" checked />
                                                                    <label for="expcheck2a4">Computer science</label>
                                                                </div>
                                                            </li>
                                                            <li>
                                                                <div class="tu-check tu-checksm">
                                                                    <input type="checkbox" id="expcheck2a21" name="expcheck" />
                                                                    <label for="expcheck2a21">physics</label>
                                                                </div>
                                                            </li>
                                                        </ul>
                                                        <div class="show-more">
                                                            <a href="javascript:void(0);" class="tu-readmorebtn tu-show_more">Show all</a>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="tu-aside-holder">
                                            <div class="tu-asidetitle" data-bs-toggle="collapse" data-bs-target="#side3" role="button" aria-expanded="true">
                                                <h5>Price range</h5>
                                            </div>
                                            <div id="side3" class="collapse show">
                                                <div class="tu-aside-content">
                                                    <div class="tu-rangevalue" data-bs-target="#tu-rangecollapse" role="list" aria-expanded="false">
                                                        <div class="tu-areasizebox">
                                                            <input type="number" class="form-control tu-input-field" step="1" placeholder="Min price" id="tu-min-value" />
                                                            <input type="number" class="form-control tu-input-field" step="1" placeholder="Max price" id="tu-max-value" />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="tu-distanceholder">
                                                    <div id="tu-rangecollapse" class="collapse">
                                                        <div class="tu-distance">
                                                            <div id="tu-rangeslider" class="tu-tooltiparrow tu-rangeslider"></div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="tu-aside-holder">
                                            <div class="tu-asidetitle" data-bs-toggle="collapse" data-bs-target="#side1a" role="button" aria-expanded="true">
                                                <h5>Rating</h5>
                                            </div>
                                            <div id="side1a" class="collapse show">
                                                <div class="tu-aside-content">
                                                    <ul class="tu-categoriesfilter">
                                                        <li>
                                                            <div class="tu-check tu-checksm">
                                                                <input type="checkbox" id="rate" name="rate" checked />
                                                                <label for="rate">
                                                                    <span class="tu-stars">
                                                                        <span></span>
                                                                    </span>
                                                                    <em class="tu-totalreview">
                                                                        <span>5.0/<em>5.0</em></span>
                                                                    </em>
                                                                </label>
                                                            </div>
                                                        </li>
                                                        <li>
                                                            <div class="tu-check tu-checksm">
                                                                <input type="checkbox" id="rate4" name="rate4" />
                                                                <label for="rate4">
                                                                    <span class="tu-stars tu-fourstar">
                                                                        <span></span>
                                                                    </span>
                                                                    <em class="tu-totalreview">
                                                                        <span>4.0/<em>5.0</em></span>
                                                                    </em>
                                                                </label>
                                                            </div>
                                                        </li>
                                                        <li>
                                                            <div class="tu-check tu-checksm">
                                                                <input type="checkbox" id="rate3" name="rate2" checked />
                                                                <label for="rate3">
                                                                    <span class="tu-stars tu-threestar">
                                                                        <span></span>
                                                                    </span>
                                                                    <em class="tu-totalreview">
                                                                        <span>3.0/<em>5.0</em></span>
                                                                    </em>
                                                                </label>
                                                            </div>
                                                        </li>
                                                        <li>
                                                            <div class="tu-check tu-checksm">
                                                                <input type="checkbox" id="rate2a" name="rate2a" />
                                                                <label for="rate2a">
                                                                    <span class="tu-stars tu-twostar">
                                                                        <span></span>
                                                                    </span>
                                                                    <em class="tu-totalreview">
                                                                        <span>2.0/<em>5.0</em></span>
                                                                    </em>
                                                                </label>
                                                            </div>
                                                        </li>
                                                        <li>
                                                            <div class="tu-check tu-checksm">
                                                                <input type="checkbox" id="rate1a" name="rate1a" />
                                                                <label for="rate1a">
                                                                    <span class="tu-stars tu-onestar">
                                                                        <span></span>
                                                                    </span>
                                                                    <em class="tu-totalreview">
                                                                        <span>1.0/<em>5.0</em></span>
                                                                    </em>
                                                                </label>
                                                            </div>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="tu-aside-holder">
                                            <div class="tu-asidetitle" data-bs-toggle="collapse" data-bs-target="#Location" role="button" aria-expanded="true">
                                                <h5>Location</h5>
                                            </div>
                                            <div id="Location" class="collapse show">
                                                <div class="tu-aside-content">
                                                    <div class="tu-filterselect">
                                                        <div class="tu-placeholderholder">
                                                            <input type="email" class="form-control" required="" placeholder="Full Name" />
                                                            <div class="tu-placeholder">
                                                                <span>Enter Location</span>
                                                                <em>*</em>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="tu-distanceholder">
                                                        <div class="tu-rangeslider tu-tooltiparrow">
                                                            <span>Radius in miles  <em>m</em><span class="example-val" id="slider1-span">65</span></span>
                                                            <div id="tu-rangeslidertwo"></div>
                                                        </div>

                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="tu-aside-holder">
                                            <div class="tu-asidetitle" data-bs-toggle="collapse" data-bs-target="#side1ab" role="button" aria-expanded="true">
                                                <h5>Miscellaneous</h5>
                                            </div>
                                            <div id="side1ab" class="collapse show">
                                                <div class="tu-aside-content">
                                                    <ul class="tu-categoriesfilter">
                                                        <li>
                                                            <div class="tu-check tu-checksm">
                                                                <input type="checkbox" id="nameaa" name="expcheck" checked />
                                                                <label for="nameaa">Online bookings</label>
                                                            </div>
                                                        </li>
                                                        <li>
                                                            <div class="tu-check tu-checksm">
                                                                <input type="checkbox" id="namea" name="expcheck" />
                                                                <label for="namea">Profile photos</label>
                                                            </div>
                                                        </li>
                                                        <li>
                                                            <div class="tu-check tu-checksm">
                                                                <input type="checkbox" id="namea1" name="expcheck" checked />
                                                                <label for="namea1">Male only</label>
                                                            </div>
                                                        </li>
                                                        <li>
                                                            <div class="tu-check tu-checksm">
                                                                <input type="checkbox" id="namea2" name="expcheck" />
                                                                <label for="namea2">Female only</label>
                                                            </div>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="tu-filterbtns">
                                            <a href="search-listing.html" class="tu-primbtn">Apply filters</a>
                                            <a href="search-listing.html" class="tu-sb-sliver">Clear all filters</a>
                                        </div>
                                    </div>
                                </aside>
                            </div>
                            <div class="col-xl-8 col-xxl-9">
                                <div class="tu-listinginfo-holder">
                                    {filteredProfiles !== null && filteredProfiles.length > 0 && filteredProfiles.map((item, index) => (
                                        <div class="tu-listinginfo" key={index}>
                                            <span class="tu-cardtag"></span>
                                            <div class="tu-listinginfo_wrapper">
                                                <div class="tu-listinginfo_title">
                                                    <div class="tu-listinginfo-img">
                                                        <figure>
                                                            <img src="images/listing/img-01.png" alt="imge" />
                                                        </figure>
                                                        <div class="tu-listing-heading">
                                                            <h5><a href="tutor-detail.html">{item?.firstName + " " + item?.lastName}</a> <i class="icon icon-check-circle tu-greenclr" data-tippy-trigger="mouseenter" data-tippy-html="#tu-verifed" data-tippy-interactive="true" data-tippy-placement="top"></i></h5>
                                                            <div class="tu-listing-location">
                                                                <span>5.0 <i class="fa-solid fa-star"></i><em>(4,448)</em></span><address><i class="icon icon-map-pin"></i>{item?.districtInfo?.districtName} ,{item?.divisionInfo?.divisionName}</address>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="tu-listinginfo_price">
                                                        <span>Starting from:</span>
                                                        <h4>&#2547;{item.hourlyFee}/hr</h4>
                                                    </div>
                                                </div>
                                                <div class="tu-listinginfo_description">
                                                    <p>{item.tutorBriefIntroduction}</p>
                                                </div>
                                                <div class="tu-listinginfo_service">
                                                    <h6>You can get teaching service direct at</h6>
                                                    <ul class="tu-service-list">
                                                        {item?.isTeachingLocationTutorHome &&
                                                            <li>
                                                                <span>
                                                                    <i class="icon icon-home tu-greenclr"></i>
                                                                    My home
                                                                </span>
                                                            </li>
                                                        }
                                                        {item?.isTeachingLocationStudentHome &&
                                                            <li>
                                                                <span>
                                                                    <i class="icon icon-map-pin tu-blueclr"></i>
                                                                    Student's home
                                                                </span>
                                                            </li>
                                                        }
                                                        {item?.isTeachingLocationOnline &&
                                                            <li>
                                                                <span>
                                                                    <i class="icon icon-video tu-orangeclr"></i>
                                                                    Online
                                                                </span>
                                                            </li>
                                                        }

                                                    </ul>
                                                </div>
                                            </div>
                                            <div class="tu-listinginfo_btn">
                                                <div class="tu-iconheart">
                                                    <i class="icon icon-heart"></i><span>Add to save</span>
                                                </div>
                                                <div class="tu-btnarea">
                                                    <a href="login.html" class="tu-secbtn">Let’s chat</a>
                                                    <a href="tutor-detail.html" class="tu-primbtn">View full profile</a>
                                                </div>
                                            </div>
                                        </div>
                                    ))}


                                </div>
                                <nav class="tu-pagination">
                                    <ul>
                                        <li class="tu-pagination-prev"><a href="#"><i class="icon icon-chevron-left"></i></a> </li>
                                        <li><a href="#">1</a> </li>
                                        <li><a href="#">2</a> </li>
                                        <li><a href="#">3</a> </li>
                                        <li class="active"><a href="#">4</a> </li>
                                        <li><a href="#">...</a> </li>
                                        <li><a href="#">60</a> </li>
                                        <li class="tu-pagination-next"><a href="#"><i class="icon icon-chevron-right"></i></a> </li>
                                    </ul>
                                </nav>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
        </>
    )
}

export default ProfilesBody