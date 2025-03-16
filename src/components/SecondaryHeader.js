import React from 'react'

const SecondaryHeader = () => {
    return (
        <header class="tu-header tu-headerv2" style={{ marginTop: -5, backgroundColor: "#0a0f26" }}>
            <nav class="navbar navbar-expand-xl tu-navbar tu-navbarvtwo">
                <div class="container-fluid">
                    <strong>
                        <a class="navbar-brand" href="index.html"><img src="images/logo_white.png" alt="Logo" /></a>
                    </strong>
                    <button class="tu-menu" aria-label="Main Menu" data-bs-target="#navbarSupportedContent" data-bs-toggle="collapse">
                        <i class="icon icon-menu"></i>
                    </button>
                    <div class="collapse navbar-collapse tu-themenav" id="navbarSupportedContent">
                        <ul class="navbar-nav">
                            <li class="nav-item">
                                <a class="nav-link" href="search-listing.html">
                                    Online classes
                                    <span class="tu-tag">NEW</span>
                                </a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" href="search-listing.html">Learning material<span class="tu-tag tu-bggreen">FREE</span></a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" href="#tu-sucesstorsection">Success stories</a>
                            </li>
                            <li class="menu-item-has-children nav-item">
                                <a class="active" href="javascript:void(0);">Pages</a>
                                <ul class="sub-menu">
                                    <li class="menu-item-has-children">
                                        <a href="javascript:void(0)">Home Pages</a>
                                        <ul class="sub-menu">
                                            <li>
                                                <a href="index.html">Home</a>
                                            </li>
                                            <li>
                                                <a href="index-without-login.html">Home v2 <em class="tu-menutag">without login</em></a>
                                            </li>
                                            <li>
                                                <a href="indexv2.html">Home v3</a>
                                            </li>
                                            <li>
                                                <a href="indexv3.html">Home v4</a>
                                            </li>
                                        </ul>
                                    </li>
                                    <li class="menu-item-has-children">
                                        <a href="javascript:void(0)">Provider listings</a>
                                        <ul class="sub-menu">
                                            <li>
                                                <a href="search-listing.html">Provider listings v1</a>
                                            </li>
                                            <li>
                                                <a href="search-listing-two.html">Provider listings v2</a>
                                            </li>
                                        </ul>
                                    </li>
                                    <li>
                                        <a href="tutor-detail.html">Tutor Detail</a>
                                    </li>
                                    <li class="menu-item-has-children">
                                        <a href="javascript:void(0);">Blogs</a>
                                        <ul class="sub-menu">
                                            <li>
                                                <a href="blog-grid-left.html">Blog list</a>
                                            </li>
                                            <li>
                                                <a href="blog-grid-right.html">Blog list <em class="tu-menutag">Right sidebar</em></a>
                                            </li>
                                            <li>
                                                <a href="blog-detail-left.html">Blog detail</a>
                                            </li>
                                            <li>
                                                <a href="blog-detail-right.html">Blog detail <em class="tu-menutag">Right sidebar</em></a>
                                            </li>
                                        </ul>
                                    </li>
                                    <li class="menu-item-has-children">
                                        <a href="javascript:void(0);">Other pages</a>
                                        <ul class="sub-menu">
                                            <li>
                                                <a href="how-it-work.html">How it work</a>
                                            </li>
                                            <li>
                                                <a href="package.html">Packges</a>
                                            </li>
                                            <li>
                                                <a href="login.html">Login</a>
                                            </li>
                                            <li>
                                                <a href="signup.html">Sign up</a>
                                            </li>
                                            <li>
                                                <a href="lost-password.html">Lost password</a>
                                            </li>
                                        </ul>
                                    </li>
                                </ul>
                            </li>
                        </ul>
                    </div>
                    <ul class="nav-item tu-afterlogin">
                        <li>
                            <a class="nav-link" href="index.html"><span class="icon icon-message-square"><i class="tu-messagenoti">4</i></span></a>
                        </li>
                        <li>
                            <a class="nav-link" href="index.html"><span class="icon icon-bell"><i class="tu-messagenoti">3</i></span></a>
                        </li>
                        <li class="menu-item-has-children">
                            <strong><a class="nav-link" href="javascript:void(0);"><img src="images/login.png" alt="image-description" /></a></strong>
                            <ul class="sub-menu">
                                <li>
                                    <a href="profile-setting-a.html"><i class="icon icon-user"></i>Personal details</a>
                                </li>
                                <li>
                                    <a href="profile-setting-b.html"><i class="icon icon-phone"></i>Contact details</a>
                                </li>
                                <li>
                                    <a href="profile-setting-c.html"><i class="icon icon-book"></i>Education</a>
                                </li>
                                <li>
                                    <a href="profile-setting-d.html"><i class="icon icon-book-open"></i>Subjects I can teach</a>
                                </li>
                                <li>
                                    <a href="profile-setting-e.html"><i class="icon icon-image"></i>Media gallery</a>
                                </li>
                            </ul>
                        </li>
                    </ul>
                </div>
            </nav>
        </header>
    )
}

export default SecondaryHeader