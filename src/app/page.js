"use client";
import Script from "next/script";
import { useEffect, useRef } from "react";
import { ToastContainer } from "react-toastify";
import Typed from 'typed.js';
import $ from 'jquery';
import Splide from '@splidejs/splide';
import '@splidejs/splide/dist/css/splide.min.css';
export default function Home({ navigation }) {
  const el = useRef(null); // Reference for the target element
  const typedInstance = useRef(null);
  // const homeData = useSelector((state) => state.homeInfo.homeData);
  useEffect(() => {
    // Check if the DOM element is mounted
    if (el.current) {
      typedInstance.current = new Typed(el.current, {
        strings: ["A bright future", "Equitable societies", "Self confidence"],
        typeSpeed: 100,
        backSpeed: 100,
        loop: true,
        showCursor: false,
      });
    }

    // Cleanup to prevent memory leaks
    return () => {
      if (typedInstance.current) {
        typedInstance.current.destroy();
      }
    };
  }, []);
  useEffect(() => {
    const responsive = () => {
      const width = $('body').width();
      if (width > 1200) {
        $(".menu-item-has-children, .sub-menu .menu-item-has-children").hover(
          function () {
            $(this).children("ul").stop().slideDown(450);
          },
          function () {
            $(this).children("ul").stop().slideUp(400);
          }
        );
      }
    };

    const collapseMenu = () => {
      $('.menu-item-has-children > a, .menu-item-has-children strong').on('click', function () {
        $(this).parent('li').toggleClass('tu-open-menu');
        $(this).next().slideToggle(300);
      });
    };

    responsive();
    collapseMenu();

    $(window).resize(function () {
      responsive();
    });
  }, []);
  useEffect(() => {
    const countUp = () => {
      $('[data-to]').each(function () {
        const $this = $(this);
        const from = parseInt($this.attr('data-from')) || 0;
        const to = parseInt($this.attr('data-to')) || 0;
        const speed = parseInt($this.attr('data-speed')) || 2000;
        const refreshInterval = parseInt($this.attr('data-refresh-interval')) || 50;
        const steps = Math.ceil(speed / refreshInterval);
        const increment = (to - from) / steps;
        let current = from;
        let stepCount = 0;

        const updateCounter = setInterval(() => {
          current += increment;
          stepCount++;
          $this.text(Math.floor(current).toLocaleString());

          if (stepCount >= steps) {
            clearInterval(updateCounter);
            $this.text(to.toLocaleString());
          }
        }, refreshInterval);
      });
    };

    countUp();
  }, []);
  useEffect(() => {
    const slider = new Splide('#tu-featurelist', {
      type: 'loop',
      perPage: 4,
      perMove: 1,
      gap: 24,
      pagination: true,
      arrows: false,
      breakpoints: {
        1400: { perPage: 3 },
        991: { perPage: 2 },
        767: { perPage: 1 },
      },
    });
    slider.mount();
  }, []);
  useEffect(() => {
    const sliderElement = document.getElementById('tu-sucesstorslider');
    if (sliderElement) {
      const splideInstance = new Splide('#tu-sucesstorslider', {
        type: 'loop',
        perPage: 1,
        perMove: 1,
        gap: '100px',
        autoplay: true,
        interval: 3000,
        pagination: false,
        arrows: true,
        breakpoints: {
          1199: {
            pagination: true,
            arrows: false,
          },
        },
      });
      splideInstance.mount();
    }
  }, []);
  useEffect(() => {
    const sliderElement = document.getElementById('tu-categoriesslider');
    if (sliderElement) {
      const splideInstance = new Splide('#tu-categoriesslider', {
        type: 'loop',
        perPage: 4,
        perMove: 1,
        gap: '24px',
        pagination: true,
        arrows: false,
        breakpoints: {
          1199: {
            perPage: 3,
          },
          991: {
            perPage: 2,
          },
          575: {
            perPage: 1,
          },
        },
      });
      splideInstance.mount();
    }
  }, []);
  return (<>
    {/* <!-- Preloader Start --> */}
    {/* <div className="tu-preloader">
      <div className="tu-preloader_holder">
        <img src="/images/favicon.png" alt="laoder Image" />
        <div className="tu-loader"></div>
      </div>
    </div> */}
    {/* <!-- Preloader End --> */}
    {/* <!-- HEADER START --> */}
    <header className="tu-header">
      <nav className="navbar navbar-expand-xl tu-navbar">
        <div className="container-fluid">
          <strong>
            <a className="navbar-brand" href="index.html"><img src="/images/logo.png" alt="Logo" /></a>
          </strong>
          <button className="tu-menu" aria-label="Main Menu" data-bs-target="#navbarSupportedContent" data-bs-toggle="collapse">
            <i className="icon icon-menu"></i>
          </button>
          <div className="collapse navbar-collapse tu-themenav" id="navbarSupportedContent">
            <ul className="navbar-nav">
              <li className="nav-item">
                <a className="nav-link" href="search-listing.html">
                  Online classNamees
                  <span className="tu-tag">NEW</span>
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="search-listing.html">Learning material<span className="tu-tag tu-bggreen">FREE</span></a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#tu-sucesstorsection">Success stories</a>
              </li>
              <li className="menu-item-has-children nav-item">
                <a className="active" href="#">Pages</a>
                <ul className="sub-menu">
                  <li className="menu-item-has-children">
                    <a href="javascript:void(0)">Home Pages</a>
                    <ul className="sub-menu">
                      <li>
                        <a href="index.html">Home</a>
                      </li>
                      <li>
                        <a href="index-without-login.html">Home v2 <em className="tu-menutag">without login</em></a>
                      </li>
                      <li>
                        <a href="indexv2.html">Home v3</a>
                      </li>
                      <li>
                        <a href="indexv3.html">Home v4</a>
                      </li>
                    </ul>
                  </li>
                  <li className="menu-item-has-children">
                    <a href="javascript:void(0)">Provider listings</a>
                    <ul className="sub-menu">
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
                  <li className="menu-item-has-children">
                    <a href="javascript:void(0);">Blogs</a>
                    <ul className="sub-menu">
                      <li>
                        <a href="blog-grid-left.html">Blog list</a>
                      </li>
                      <li>
                        <a href="blog-grid-right.html">Blog list <em className="tu-menutag">Right sidebar</em></a>
                      </li>
                      <li>
                        <a href="blog-detail-left.html">Blog detail</a>
                      </li>
                      <li>
                        <a href="blog-detail-right.html">Blog detail <em className="tu-menutag">Right sidebar</em></a>
                      </li>
                    </ul>
                  </li>
                  <li className="menu-item-has-children">
                    <a href="javascript:void(0);">Other pages</a>
                    <ul className="sub-menu">
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
          <ul className="nav-item tu-afterlogin">
            <li>
              <a className="nav-link" href="index.html"><span className="icon icon-message-square"><i className="tu-messagenoti">4</i></span></a>
            </li>
            <li>
              <a className="nav-link" href="index.html"><span className="icon icon-bell"><i className="tu-messagenoti">3</i></span></a>
            </li>
            <li className="menu-item-has-children">
              <strong><a className="nav-link" href="javascript:void(0);"><img src="/images/login.png" alt="image-description" /></a></strong>
              <ul className="sub-menu">
                <li>
                  <a href="profile-setting-a.html"><i className="icon icon-user"></i>Personal details</a>
                </li>
                <li>
                  <a href="profile-setting-b.html"><i className="icon icon-phone"></i>Contact details</a>
                </li>
                <li>
                  <a href="profile-setting-c.html"><i className="icon icon-book"></i>Education</a>
                </li>
                <li>
                  <a href="profile-setting-d.html"><i className="icon icon-book-open"></i>Subjects I can teach</a>
                </li>
                <li>
                  <a href="profile-setting-e.html"><i className="icon icon-image"></i>Media gallery</a>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </nav>
    </header>
    {/* <!-- HEADER END --> */}
    {/* <!-- BANNER START --> */}
    <div className="tu-banner">
      <div className="container">
        <div className="row align-items-center g-0 gy-5">
          <div className="col-lg-6">
            <div className="tu-banner_title">
              <h1>A good <span>#education</span> is always a base of</h1>
              {/* <span className="tu-bannerinfo type"></span> */}
              <div className="tu-bannerinfo">
                <span className="type" ref={el}></span>
              </div>
              <p>Consectur adipiscing elitsedo eiusmod tempor incididuntem utaborate dolore magna aliqua ad minim veniamque.</p>
              <ul className="tu-banner_list">
                <li>
                  <div className="tu-starthere">
                    <span>Start from here</span>
                    <img src="/images/knob_line.svg" alt="logo" />
                  </div>
                  <a href="signup.html" className="tu-primbtn tu-primbtn-gradient"><span>Start as student</span><i className="icon icon-chevron-right"></i></a>
                </li>
                <li><a href="signup.html" className="tu-secbtn"><span>Join as Instructor</span><em>It’s Free!</em></a></li>
              </ul>
              <div className="tu-banner_explore">
                <i className="icon icon-shield"></i>
                <p>You can also join as parent to explore <a href="signup.html">Join today</a></p>
              </div>
            </div>
          </div>
          <div className="col-lg-6 d-none d-lg-block">
            <div className="tu-bannerv1_Image">
              <img src="/images/index/banner/img-02.png" alt="Image" />
            </div>
          </div>
        </div>
      </div>
    </div>
    {/* <!-- BANNER END --> */}
    {/* <!-- MAIN START --> */}
    <main className="tu-main">
      {/* <!-- BRANDS START --> */}
      <section>
        <div className="tu-brand">
          <div className="container">
            <ul className="tu-brand_list">
              <li><img src="/images/brand/img-01.png" alt="Image" /></li>
              <li><img src="/images/brand/img-02.png" alt="Image" /></li>
              <li><img src="/images/brand/img-03.png" alt="Image" /></li>
              <li><img src="/images/brand/img-04.png" alt="Image" /></li>
              <li><img src="/images/brand/img-05.png" alt="Image" /></li>
              <li><img src="/images/brand/img-06.png" alt="Image" /></li>
              <li><img src="/images/brand/img-07.png" alt="Image" /></li>
            </ul>
          </div>
        </div>
      </section>
      {/* <!-- BRANDS END --> */}

      {/* <!-- PLATFORM START --> */}
      <section className="tu-main-section">
        <div className="container">
          <div className="row align-items-center gy-4">
            <div className="col-md-12 col-lg-6">
              <div className="tu-maintitle p-0">
                <img src="/images/zigzag-line.svg" alt="Image" />
                <h4>Better Learning. Better Results</h4>
                <h2>Online education platform that fits for everyone</h2>
                <p>Accusamus et iusidio dignissimos ducimus blanditiis praesentium voluptatum deleniti atque corrupti quos dolores etmquasa molestias epturi sint occaecati cupiditate non providente mikume molareshe.</p>
                <a href="how-it-work.html" className="tu-primbtn-lg"><span>Explore more about us</span><i className="icon icon-chevron-right"></i></a>
              </div>
            </div>
            <div className="col-md-12 col-lg-6">
              <div className="tu-betterresult">
                <figure>
                  <img src="/images/index/platform/img-01.png" alt="image-description" />
                </figure>
                <img src="/images/index/platform/img-02.png" alt="image-description" />
                <div className="tu-resultperson">
                  <h6>Founder & CEO</h6>
                  <h5>Allen wake</h5>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* <!-- PLATFORM END --> */}
      {/* <!-- COUNTER START --> */}
      <section>
        <div className="tu-statsholder">
          <div className="container">
            <ul id="tu-counter" className="tu-stats">
              <li>
                <img src="/images/stats/img-01.png" alt="Image" />
                <div className="tu-stats_info">
                  <h4><span data-from="0" data-to="560616" data-speed="8000" data-refresh-interval="50">560,616</span></h4>
                  <p>Courses available for verified and top tutors</p>
                </div>
              </li>
              <li>
                <img src="/images/stats/img-02.png" alt="Image" />
                <div className="tu-stats_info">
                  <h4><span data-from="0" data-to="648482" data-speed="8000" data-refresh-interval="50">648,482</span></h4>
                  <p>Total tuition job posted on the platform till date</p>
                </div>
              </li>
              <li>
                <img src="/images/stats/img-03.png" alt="Image" />
                <div className="tu-stats_info">
                  <h4><span data-from="0" data-to="20" data-speed="8000" data-refresh-interval="50">20</span>+ Hours</h4>
                  <p>User daily average time spent on the platform</p>
                </div>
              </li>
              <li>
                <img src="/images/stats/img-04.png" alt="Image" />
                <div className="tu-stats_info">
                  <h4><span data-from="0" data-to="7" data-speed="8000" data-refresh-interval="50">7</span>+ Million</h4>
                  <p>Active instructor and students available on the platform</p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </section>
      {/* <!-- COUNTER END --> */}
      {/* <!-- INSTRUCTOR START --> */}
      <section className="tu-main-section">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-8">
              <div className="tu-maintitle text-center">
                <img src="/images/zigzag-line.svg" alt="Image" />
                <h4>Our featured instructors</h4>
                <h2>Every instructor is professional and highly qualified</h2>
                <p>Accusamus et iusidio dignissimos ducimus blanditiis praesentium voluptatum deleniti atque corrupti quos dolores etmquasa molestias epturi sint occaecati cupiditate non providente mikume molareshe.</p>
              </div>
            </div>
          </div>
          <div id="tu-featurelist" className="splide tu-featurelist  tu-splidedots ">
            <div className="splide__track">
              <ul className="splide__list">
                {[1, 2, 3, 4, 5, 6].map((item) => (
                  <li className="splide__slide" key={item}>
                    <div className="tu-featureitem">
                      <figure>
                        <a href="tutor-detail.html"><img src={`/images/index/qualified/img-0${item}.jpg`} alt="image-description" /></a>
                        <span className="tu-featuretag">FEATURED</span>
                      </figure>
                      <div className="tu-authorinfo">
                        <div className="tu-authordetail">
                          <figure>
                            <img src="/images/index/professionol/img-01.jpg" alt="image-description" />
                          </figure>
                          <div className="tu-authorname">
                            <h5><a href="tutor-detail.html"> Dwayne Garrett</a>  <i className="icon icon-check-circle tu-greenclr" data-tippy-trigger="mouseenter" data-tippy-html="#tu-verifed" data-tippy-interactive="true" data-tippy-placement="top"></i></h5>
                            <span>Arlington, TN</span>
                          </div>
                          <ul className="tu-authorlist">
                            <li>
                              <span>Starting from:<em>$893.30/hr</em></span>
                            </li>
                            <li>
                              <span>Mobile:<em>xxx-xxxxx-33</em></span>
                            </li>
                            <li>
                              <span>Whatsapp:<em>xxx-xxxxx-11</em></span>
                            </li>
                            <li>
                              <span>Qualification:<em>B.Tech/B.E.</em></span>
                            </li>
                          </ul>
                        </div>
                        <div className="tu-instructors_footer">
                          <div className="tu-rating">
                            <i className="fas fa-star"></i>
                            <h6>5.0</h6>
                            <span>(66,951)</span>
                          </div>
                          <div className="tu-instructors_footer-right">
                            <a href="javascript:void(0);"><i className="icon icon-heart"></i></a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </li>
                ))}

              </ul>
            </div>
          </div>
          <div className="tu-mainbtn">
            <a href="search-listing.html" className="tu-primbtn-lg"><span>Explore all instructors</span><i className="icon icon-chevron-right"></i></a>
          </div>
        </div>
      </section>
      {/* <!-- INSTRUCTOR END --> */}

      {/* <!-- SUCCESS START --> */}
      <section id="tu-sucesstorsection">
        <div className="tu-success-stories">
          <div className="container">
            <div className="tu-sucesstor_pattren">
              <img src="/images/index/success_stories/pattren.svg" alt="Image" />
            </div>
            <div className="row tu-sucesstorslider_title">
              <div className="col-lg-8">
                <div className="tu-maintitle">
                  <h2>See how our visitors & members made their <span>#Success Stories</span></h2>
                </div>
              </div>
            </div>
            <div id="tu-sucesstorslider" className="splide tu-sucesstorslider tu-splidearrow">
              <div className="splide__track">
                <ul className="splide__list">
                  {[1, 2, 3, 4, 5].map((item, index) => (
                    <li className="splide__slide">
                      <div className="tu-sucesstor">
                        <div className="tu-sucesstor_Image">
                          <figure>
                            <img src="/images/index/success_stories/img-01.jpg" alt="Image" />
                            <figcaption><img src="/images/index/success_stories/comma.svg" alt="Image" /></figcaption>
                          </figure>
                        </div>
                        <div className="tu-sucesstor_title">
                          <h3>I highly recommend this platform, amazing experience with fast delivery</h3>
                          <blockquote>“ Their teaching method is conceptual, motivating and friendly. I can clear my doubt any time. They have very deep knowledge of subject and exam pattern, with all the guidance of their tutos, I scored 98% in Mathematics and 96% in Physics. And yet qualified in IIT MAINS with 12th rank. ”</blockquote>
                          <h4>
                            Leonard Sullivan
                            <span>2nd Standard, Manchester UK</span>
                          </h4>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* <!-- SUCCESS END --> */}
      {/* <!-- CATEGORIES START --> */}
      <section className="tu-main-section">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-8">
              <div className="tu-maintitle text-center">
                <img src="/images/zigzag-line.svg" alt="Image" />
                <h4>Let’s make a quick start today</h4>
                <h2>Choose from the top visited categories you may like</h2>
                <p>Accusamus et iusidio dignissimos ducimus blanditiis praesentium voluptatum deleniti atque corrupti quos dolores etmquasa molestias epturi sint occaecati cupiditate non providente mikume molareshe.</p>
              </div>
            </div>
          </div>
          <div id="tu-categoriesslider" className="splide tu-categoriesslider tu-splidedots">
            <div className="splide__track">
              <ul className="splide__list">
                <li className="splide__slide">
                  <a className="tu-categories_content" href="search-listing-two.html">
                    <img src="/images/index/categories/img-09.jpg" alt="Image" />
                    <div className="tu-categories_title">
                      <h6>Music learning</h6>
                      <span>6,301 Listings</span>
                    </div>
                  </a>
                </li>
                <li className="splide__slide">
                  <a className="tu-categories_content" href="search-listing-two.html">
                    <img src="/images/index/categories/img-10.jpg" alt="Image" />
                    <div className="tu-categories_title">
                      <h6>Computer &amp; hardware</h6>
                      <span>4,329 Listings</span>
                    </div>
                  </a>
                </li>
                <li className="splide__slide">
                  <a className="tu-categories_content" href="search-listing-two.html">
                    <img src="/images/index/categories/img-11.jpg" alt="Image" />
                    <div className="tu-categories_title">
                      <h6>Beauty learning</h6>
                      <span>6,406 Listings</span>
                    </div>
                  </a>
                </li>
                <li className="splide__slide">
                  <a className="tu-categories_content" href="search-listing-two.html">
                    <img src="/images/index/categories/img-12.jpg" alt="Image" />
                    <div className="tu-categories_title">
                      <h6>IT &amp; development</h6>
                      <span>5,925 Listings</span>
                    </div>
                  </a>
                </li>
                <li className="splide__slide">
                  <a className="tu-categories_content" href="search-listing-two.html">
                    <img src="/images/index/categories/img-13.jpg" alt="Image" />
                    <div className="tu-categories_title">
                      <h6>Islamic education</h6>
                      <span>4,157 Listings</span>
                    </div>
                  </a>
                </li>
                <li className="splide__slide">
                  <a className="tu-categories_content" href="search-listing-two.html">
                    <img src="/images/index/categories/img-09.jpg" alt="Image" />
                    <div className="tu-categories_title">
                      <h6>Music learning</h6>
                      <span>6,301 Listings</span>
                    </div>
                  </a>
                </li>
                <li className="splide__slide">
                  <a className="tu-categories_content" href="search-listing-two.html">
                    <img src="/images/index/categories/img-10.jpg" alt="Image" />
                    <div className="tu-categories_title">
                      <h6>Computer &amp; hardware</h6>
                      <span>4,329 Listings</span>
                    </div>
                  </a>
                </li>
                <li className="splide__slide">
                  <a className="tu-categories_content" href="search-listing-two.html">
                    <img src="/images/index/categories/img-11.jpg" alt="Image" />
                    <div className="tu-categories_title">
                      <h6>Beauty learning</h6>
                      <span>6,406 Listings</span>
                    </div>
                  </a>
                </li>
                <li className="splide__slide">
                  <a className="tu-categories_content" href="search-listing-two.html">
                    <img src="/images/index/categories/img-12.jpg" alt="Image" />
                    <div className="tu-categories_title">
                      <h6>IT &amp; development</h6>
                      <span>5,925 Listings</span>
                    </div>
                  </a>
                </li>
                <li className="splide__slide">
                  <a className="tu-categories_content" href="search-listing-two.html">
                    <img src="/images/index/categories/img-13.jpg" alt="Image" />
                    <div className="tu-categories_title">
                      <h6>Islamic education</h6>
                      <span>4,157 Listings</span>
                    </div>
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="tu-mainbtn">
            <a href="search-listing-two.html" className="tu-primbtn-lg"><span>Explore All categories</span><i className="icon icon-chevron-right"></i></a>
          </div>
        </div>
      </section>
      {/* <!-- CATEGORIES END --> */}
    </main>
    {/* <!-- MAIN END --> */}
    {/* <!-- FOOTER START --> */}
    <footer>
      <div className="tu-footer">
        <div className="container">
          <div className="tu-footer_maintitle">
            <h5>Explore from our huge collection</h5>
            <h3>Approach tutors near to your house</h3>
          </div>
          <div className="row tu-footer_row">
            <div className="col-sm-6 col-md-4 col-lg-3">
              <h5 className="tu-footertitle">Tutors in Atlanta</h5>
              <ul className="tu-footerlist">
                <li><a href="search-listing.html">B.Tech IT</a></li>
                <li><a href="search-listing.html">B.Tech Chemical</a></li>
                <li><a href="search-listing.html">B.Tech Petroleum</a></li>
                <li><a href="search-listing.html">B.Tech Ceramic</a></li>
                <li><a href="search-listing.html">B.Tech Production</a></li>
                <li className="tu-footerlist-explore"><a href="search-listing.html">Explore all</a></li>
              </ul>
            </div>
            <div className="col-sm-6 col-md-4 col-lg-3">
              <h5 className="tu-footertitle">Tutors in Atlanta</h5>
              <ul className="tu-footerlist">
                <li><a href="search-listing.html">B.Tech Robotics</a></li>
                <li><a href="search-listing.html">B.Tech Industrial</a></li>
                <li><a href="search-listing.html">B.Tech Biotech</a></li>
                <li><a href="search-listing.html">B.Tech Communications</a></li>
                <li><a href="search-listing.html">B.Tech Civil</a></li>
                <li className="tu-footerlist-explore"><a href="search-listing.html">Explore all</a></li>
              </ul>
            </div>
            <div className="col-sm-6 col-md-4 col-lg-3">
              <h5 className="tu-footertitle">Tutors in Tulsa</h5>
              <ul className="tu-footerlist">
                <li><a href="search-listing.html">B.Tech Ceramic</a></li>
                <li><a href="search-listing.html">B.Tech Mechatronics</a></li>
                <li><a href="search-listing.html">B.Tech Aerospace</a></li>
                <li><a href="search-listing.html">B.Tech Mechatronics</a></li>
                <li><a href="search-listing.html">B.Tech Power</a></li>
                <li className="tu-footerlist-explore"><a href="search-listing.html">Explore all</a></li>
              </ul>
            </div>
            <div className="col-sm-6 col-md-4 col-lg-3">
              <h5 className="tu-footertitle">Tutors in Oklahoma City</h5>
              <ul className="tu-footerlist">
                <li><a href="search-listing.html">B.Tech Ceramic</a></li>
                <li><a href="search-listing.html">B.Tech Aeronautical</a></li>
                <li><a href="search-listing.html">B.Tech Communications</a></li>
                <li><a href="search-listing.html">B.Tech Electrical</a></li>
                <li><a href="search-listing.html">Content writing</a></li>
                <li className="tu-footerlist-explore"><a href="search-listing.html">Explore all</a></li>
              </ul>
            </div>
            <div className="col-sm-6 col-md-4 col-lg-3">
              <h5 className="tu-footertitle">Tutors in Virginia Beach</h5>
              <ul className="tu-footerlist">
                <li><a href="search-listing.html">B.Tech Environmental</a></li>
                <li><a href="search-listing.html">B.Tech Mech</a></li>
                <li><a href="search-listing.html">B.Tech Robotics</a></li>
                <li><a href="search-listing.html">B.Tech Transportation</a></li>
                <li><a href="search-listing.html">B.Tech Marine</a></li>
                <li className="tu-footerlist-explore"><a href="search-listing.html">Explore all</a></li>
              </ul>
            </div>
            <div className="col-sm-6 col-md-4 col-lg-3">
              <h5 className="tu-footertitle">Tutors in San Francisco</h5>
              <ul className="tu-footerlist">
                <li><a href="search-listing.html">B.Tech Marine</a></li>
                <li><a href="search-listing.html">B.Tech Environmental</a></li>
                <li><a href="search-listing.html">B.Tech Textile</a></li>
                <li><a href="search-listing.html">B.Tech ECE</a></li>
                <li><a href="search-listing.html">B.Tech CSE</a></li>
                <li className="tu-footerlist-explore"><a href="search-listing.html">Explore all</a></li>
              </ul>
            </div>
            <div className="col-sm-6 col-md-4 col-lg-3">
              <h5 className="tu-footertitle">Tutors in Mesa</h5>
              <ul className="tu-footerlist">
                <li><a href="search-listing.html">B.Tech ECE</a></li>
                <li><a href="search-listing.html">B.Tech IT</a></li>
                <li><a href="search-listing.html">B.Tech Industrial</a></li>
                <li><a href="search-listing.html">B.Tech Aeronautical</a></li>
                <li><a href="search-listing.html">B.Tech CSE</a></li>
                <li className="tu-footerlist-explore"><a href="search-listing.html">Explore all</a></li>
              </ul>
            </div>
            <div className="col-sm-6 col-md-4 col-lg-3">
              <h5 className="tu-footertitle">Tutors in Boston</h5>
              <ul className="tu-footerlist">
                <li><a href="search-listing.html">B.Tech Petroleum</a></li>
                <li><a href="search-listing.html">B.Tech Metallurgical</a></li>
                <li><a href="search-listing.html">B.Tech Mining</a></li>
                <li><a href="search-listing.html">B.Tech Power</a></li>
                <li><a href="search-listing.html">B.Tech Aerospace</a></li>
                <li className="tu-footerlist-explore"><a href="search-listing.html">Explore all</a></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div className="tu-footerdark">
        <div className="container">
          <div className="row">
            <div className="col-lg-7">
              <strong className="tu-footerlogo">
                <a href="index.html"><img src="/images/logo_white.png" alt="Logo" /></a>
              </strong>
              <p className="tu-footerdescription">Accusamus etidio dignissimos ducimus blanditiis praesentium volupta eleniti atquete corrupti quolores etmquasa molestias epturi sinteam occaecati cupiditate non providente mikume molareshe.</p>
              <ul className="tu-socialmedia">
                <li className="tu-facebookv3"><a href="https://www.facebook.com/" target="_blank"><i className="fab fa-facebook-f"></i></a></li>
                <li className="tu-twitterv3"><a href="https://twitter.com/?lang=en" target="_blank"><i className="fab fa-twitter"></i></a></li>
                <li className="tu-linkedinv3"><a href="https://www.linkedin.com" target="_blank"><i className="fab fa-linkedin-in"></i></a></li>
                <li className="tu-dribbblev3"><a href="https://dribbble.com/" target="_blank"><i className="fab fa-dribbble"></i></a></li>
                <li className="tu-twitchv3"><a href="https://www.twitch.tv/" target="_blank"><i className="fab fa-twitch"></i></a></li>
              </ul>
            </div>
            <div className="col-lg-5">
              <h5 className="tu-footertitle">Feel free to share your question</h5>
              <ul className="tu-footerlist tu-footericonlist">
                <li><a href="tel:+6287777263549"><i className="icon icon-phone-call"></i><em>+62 877 77263549</em><span>( Mon to Sun 9am - 11pm GMT )</span></a></li>
                <li><a href="mailto:hello@youremailid.co.uk"><i className="icon icon-mail"></i><em>hello@youremailid.co.uk</em></a></li>
                <li><a href="tel:+681109998263"><i className="icon icon-printer"></i><em>+62 811 09998263</em></a></li>
                <li><a href="tel:(+33)775559375"><i className="fab fa-whatsapp"></i><em>(+33)7 75 55 9375</em><span>( Mon to Sun 9am - 11pm GMT )</span></a></li>
              </ul>
            </div>
            <div className="col-12">
              <div className="tu-footerlistholder  tu-seperator">
                <div className="tu-footercontent">
                  <h5 className="tu-footertitle">Tutor by subjects</h5>
                  <ul className="tu-footerlist">
                    <li><a href="search-listing.html">General mathematics</a></li>
                    <li><a href="search-listing.html">World languages</a></li>
                    <li><a href="search-listing.html">Advanced placement</a></li>
                    <li><a href="search-listing.html">Advance science play</a></li>
                    <li><a href="search-listing.html">Social sciences</a></li>
                    <li><a href="search-listing.html">International baccalaureate®</a></li>
                    <li><a href="search-listing.html">Grooming technology</a></li>
                    <li><a href="search-listing.html">Maketing business</a></li>
                    <li><a href="search-listing.html">ACT® test prep</a></li>
                    <li><a href="search-listing.html">English communications</a></li>
                    <li><a href="search-listing.html">Career support</a></li>
                    <li><a href="search-listing.html">PSAT/NMSQT® & SAT® prep</a></li>
                    <li><a href="search-listing.html">Content writing</a></li>
                    <li><a href="search-listing.html">Student success skills</a></li>
                    <li className="tu-footerlist-explore"><a href="search-listing.html">Explore all</a></li>
                  </ul>
                </div>
                <div className="tu-footercontent-two">
                  <h5 className="tu-footertitle">Online classNamees
                    <span className="tu-tag tu-bggreen">NEW</span>
                  </h5>
                  <ul className="tu-footerlist">
                    <li><a href="javascript:void(0);">Online science classNamees</a></li>
                    <li><a href="search-listing.html">Online islamiat classNamees</a></li>
                    <li><a href="search-listing.html">Online mathemetic classNamees</a></li>
                    <li><a href="search-listing.html">Online java classNamees</a></li>
                    <li><a href="search-listing.html">Online computer classNamees</a></li>
                    <li><a href="search-listing.html">IBM python Analyst</a></li>
                    <li><a href="search-listing.html">Online geographic classNamees</a></li>
                    <li><a href="search-listing.html">Online C programming classNamees</a></li>
                    <li><a href="search-listing.html">Online statistic classNamees</a></li>
                    <li className="tu-footerlist-explore"><a href="search-listing.html">Explore all</a></li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="col-12">
              <div className="tu-footerlistholder  tu-seperator m-0">
                <div className="tu-footercontent-two">
                  <h5 className="tu-footertitle">Useful links</h5>
                  <ul className="tu-footerlist">
                    <li><a href="how-it-work.html">About</a></li>
                    <li><a href="search-listing.html">Success stories</a></li>
                    <li><a href="search-listing.html">Online classNamees</a></li>
                    <li><a href="login.html">Join our community</a></li>
                    <li><a href="search-listing.html">Courses</a></li>
                    <li><a href="login.html">Sign in now</a></li>
                    <li><a href="search-listing.html">Programs &amp; degrees</a></li>
                    <li><a href="how-it-work.html">How it works</a></li>
                    <li><a href="search-listing.html">Learning materials</a></li>
                    <li><a href="index.html">F.A.Q</a></li>
                  </ul>
                </div>
                <div className="tu-footercontent d-xl-flex">
                  <div className="tu-footercontent_title">
                    <h5 className="tu-footertitle">Get mobile app</h5>
                    <p>Take education on the go. Get our mobile app for FREE! on your Apple and android devices</p>
                    <ul className="tu-footerdevice">
                      <li><a href="javascript:void(0);"><img src="/images/ios.png" alt="devices" /></a></li>
                      <li><a href="javascript:void(0);"><img src="/images/android.png" alt="devices" /></a></li>
                    </ul>
                  </div>
                  <div className="tu-footernewsletter">
                    <h5 className="tu-footertitle">Signup for newsletter</h5>
                    <p>Corrupti quolores etmquasa molestias epturite sinteam occaecati amet cupiditate mikume molareshe.</p>
                    <div className="tu-inputbtn">
                      <input type="email" placeholder="Enter email address" className="form-control" />
                      <a href="index.html" className="tu-primbtn-icon tu-primbtn-orange"><i className="icon icon-send"></i></a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="tu-footercopyright">
          <div className="container">
            <div className="tu-footercopyright_content">
              <p>© 1994 - 2022 All Rights Reserved.</p>
              <ul className="tu-footercopyright_list">
                <li><a href="how-it-work.html">Careers</a></li>
                <li><a href="how-it-work.html">Terms of use</a></li>
                <li><a href="how-it-work.html">Privacy policy</a></li>
                <li><a href="how-it-work.html">Cookie notice</a></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </footer>
    {/* <!-- FOOTER END --> */}
    {/* <!-- Custom Tooltip Render Here --> */}
    <div className="tu-tippysm">
      <span id="tu-verifed" className="d-none">
        <span className="tu-tippytooltip">
          <span>Verified</span>
        </span>
      </span>
    </div>

  </>);
}
