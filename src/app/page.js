"use client";
import Script from "next/script";
import { useEffect, useRef, useState } from "react";
import { ToastContainer } from "react-toastify";
import Typed from 'typed.js';
import $ from 'jquery';
import Splide from '@splidejs/splide';
import '@splidejs/splide/dist/css/splide.min.css';
import PrimaHeader from "@/components/PrimaHeader";
import PrimaFooter from "@/components/PrimaFooter";
import { useRouter } from "next/navigation";
import FeaturedTutor from "@/components/FeaturedTutor";
import SecondaryHeader from "@/components/SecondaryHeader";
import Banner from "@/components/Banner";
import TopVisitedCategory from "@/components/TopVisitedCategory";
import BetterLearningBetterResult from "@/components/BetterLearningBetterResult";
import SuccessStory from "@/components/SuccessStory";
export default function Home({ navigation }) {
  const router = useRouter()
  const el = useRef(null); // Reference for the target element
  const typedInstance = useRef(null);
  const [isLogin, setIsLogin] = useState(false)
  const [clientData, setClientData] = useState(null)
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
      // Cleanup function to destroy the slider on unmount
      return () => {
        splideInstance.destroy();
      };
    }

  }, []);

  useEffect(() => {
    setIsLogin(localStorage.getItem('isLogin') === "true" ? true : false)
    setClientData(JSON.parse(localStorage.getItem("clientData")))
  }, [])


  return (<>
    <SecondaryHeader />

    {/* <!-- BANNER START --> */}
    <Banner />
    {/* <!-- BANNER END --> */}
    {/* <!-- MAIN START --> */}
    <main class="tu-main">
      <BetterLearningBetterResult />
      {/* <!-- QUICK START --> */}
      <TopVisitedCategory />
      {/* <!-- QUICK END --> */}

      {/* <!-- SUCCESS START --> */}
      <SuccessStory />
      {/* <!-- SUCCESS END --> */}
      {/* <!--  PROFESSIONOLL  START --> */}
      {/* <section class="tu-main-section">
        <div class="container">
          <div class="row justify-content-center">
            <div class="col-lg-8">
              <div class="tu-maintitle text-center">
                <img src="images/zigzag-line.svg" alt="img" />
                <h4>Our featured instructors</h4>
                <h2>Every instructor is professional and highly qualified</h2>
                <p>Accusamus et iusidio dignissimos ducimus blanditiis praesentium voluptatum deleniti atque corrupti quos dolores etmquasa molestias epturi sint occaecati cupiditate non providente mikume molareshe.</p>
              </div>
            </div>
          </div>
          <div id="tu-featurelist" class="splide tu-featurelist  tu-splidedots ">
            <div class="splide__track">
              <ul class="splide__list">
                <li class="splide__slide">
                  <div class="tu-featureitem">
                    <figure>
                      <a href="tutor-detail.html"><img src="images/index/qualified/img-01.jpg" alt="image-description" /></a>
                      <span class="tu-featuretag">FEATURED</span>
                    </figure>
                    <div class="tu-authorinfo">
                      <div class="tu-authordetail">
                        <figure>
                          <img src="images/index/professionol/img-01.jpg" alt="image-description" />
                        </figure>
                        <div class="tu-authorname">
                          <h5><a href="tutor-detail.html"> Dwayne Garrett</a>  <i class="icon icon-check-circle tu-greenclr" data-tippy-trigger="mouseenter" data-tippy-html="#tu-verifed" data-tippy-interactive="true" data-tippy-placement="top"></i></h5>
                          <span>Arlington, TN</span>
                        </div>
                        <ul class="tu-authorlist">
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
                          <li>
                            <span>Experience:<em>5 years</em></span>
                          </li>
                        </ul>
                      </div>
                      <div class="tu-instructors_footer">
                        <div class="tu-rating">
                          <i class="fas fa-star"></i>
                          <h6>5.0</h6>
                          <span>(4,448)</span>
                        </div>
                        <div class="tu-instructors_footer-right">
                          <a href="javascript:void(0);"><i class="icon icon-heart"></i></a>
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
                <li class="splide__slide">
                  <div class="tu-featureitem">
                    <figure>
                      <a href="tutor-detail.html"><img src="images/index/qualified/img-02.jpg" alt="image-description" /></a>
                      <span class="tu-featuretag">FEATURED</span>
                    </figure>
                    <div class="tu-authorinfo">
                      <div class="tu-authordetail">
                        <figure>
                          <img src="images/index/professionol/img-02.jpg" alt="image-description" />
                        </figure>
                        <div class="tu-authorname">
                          <h5><a href="tutor-detail.html">Gwendolyn Parker</a> <i class="icon icon-check-circle tu-greenclr" data-tippy-trigger="mouseenter" data-tippy-html="#tu-verifed" data-tippy-interactive="true" data-tippy-placement="top"></i></h5>
                          <span>Las Vegas, TN</span>
                        </div>
                        <ul class="tu-authorlist">
                          <li>
                            <span>Starting from:<em>$1,385.10/hr</em></span>
                          </li>
                          <li>
                            <span>Mobile:<em>xxx-xxxxx-11</em></span>
                          </li>
                          <li>
                            <span>Whatsapp:<em>xxx-xxxxx-80</em></span>
                          </li>
                          <li>
                            <span>Qualification:<em>B.Tech/B.E.</em></span>
                          </li>
                          <li>
                            <span>Experience:<em>6 years</em></span>
                          </li>
                        </ul>
                      </div>
                      <div class="tu-instructors_footer">
                        <div class="tu-rating">
                          <i class="fas fa-star"></i>
                          <h6>5.0</h6>
                          <span>(4,448)</span>
                        </div>
                        <div class="tu-instructors_footer-right">
                          <a href="javascript:void(0);"><i class="icon icon-heart"></i></a>
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
                <li class="splide__slide">
                  <div class="tu-featureitem">
                    <figure>
                      <a href="tutor-detail.html"><img src="images/index/qualified/img-03.jpg" alt="image-description" /></a>
                      <span class="tu-featuretag">FEATURED</span>
                    </figure>
                    <div class="tu-authorinfo">
                      <div class="tu-authordetail">
                        <figure>
                          <img src="images/index/professionol/img-03.jpg" alt="image-description" />
                        </figure>
                        <div class="tu-authorname">
                          <h5> <a href="tutor-detail.html"> Glen Burns</a> <i class="icon icon-check-circle tu-greenclr" data-tippy-trigger="mouseenter" data-tippy-html="#tu-verifed" data-tippy-interactive="true" data-tippy-placement="top"></i></h5>
                          <span>Chicago, OH</span>
                        </div>
                        <ul class="tu-authorlist">
                          <li>
                            <span>Starting from:<em>$1,336.83/hr</em></span>
                          </li>
                          <li>
                            <span>Mobile:<em>xxx-xxxxx-11</em></span>
                          </li>
                          <li>
                            <span>Whatsapp:<em>xxx-xxxxx-46</em></span>
                          </li>
                          <li>
                            <span>Qualification:<em>B.Tech/B.E.</em></span>
                          </li>
                          <li>
                            <span>Experience:<em>6 years</em></span>
                          </li>
                        </ul>
                      </div>
                      <div class="tu-instructors_footer">
                        <div class="tu-rating">
                          <i class="fas fa-star"></i>
                          <h6>5.0</h6>
                          <span>(4,448)</span>
                        </div>
                        <div class="tu-instructors_footer-right">
                          <a href="javascript:void(0);"><i class="icon icon-heart"></i></a>
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
                <li class="splide__slide">
                  <div class="tu-featureitem">
                    <figure>
                      <a href="tutor-detail.html"><img src="images/index/qualified/img-04.jpg" alt="image-description" /></a>
                      <span class="tu-featuretag">FEATURED</span>
                    </figure>
                    <div class="tu-authorinfo">
                      <div class="tu-authordetail">
                        <figure>
                          <img src="images/index/professionol/img-04.jpg" alt="image-description" />
                        </figure>
                        <div class="tu-authorname">
                          <h5><a href="tutor-detail.html"> William Williams</a> <i class="icon icon-check-circle tu-greenclr" data-tippy-trigger="mouseenter" data-tippy-html="#tu-verifed" data-tippy-interactive="true" data-tippy-placement="top"></i></h5>
                          <span>Nashville, IL</span>
                        </div>
                        <ul class="tu-authorlist">
                          <li>
                            <span>Starting from:<em>$1,198.12/hr</em></span>
                          </li>
                          <li>
                            <span>Mobile:<em>xxx-xxxxx-54</em></span>
                          </li>
                          <li>
                            <span>Whatsapp:<em>xxx-xxxxx-88</em></span>
                          </li>
                          <li>
                            <span>Qualification:<em>B.Tech/B.E.</em></span>
                          </li>
                          <li>
                            <span>Experience:<em>7 years</em></span>
                          </li>
                        </ul>
                      </div>
                      <div class="tu-instructors_footer">
                        <div class="tu-rating">
                          <i class="fas fa-star"></i>
                          <h6>5.0</h6>
                          <span>(4,448)</span>
                        </div>
                        <div class="tu-instructors_footer-right">
                          <a href="javascript:void(0);"><i class="icon icon-heart"></i></a>
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
                <li class="splide__slide">
                  <div class="tu-featureitem">
                    <figure>
                      <a href="tutor-detail.html"><img src="images/index/qualified/img-01.jpg" alt="image-description" /></a>
                      <span class="tu-featuretag">FEATURED</span>
                    </figure>
                    <div class="tu-authorinfo">
                      <div class="tu-authordetail">
                        <figure>
                          <img src="images/index/professionol/img-01.jpg" alt="image-description" />
                        </figure>
                        <div class="tu-authorname">
                          <h5><a href="tutor-detail.html"> Dwayne Garrett</a> <i class="icon icon-check-circle tu-greenclr" data-tippy-trigger="mouseenter" data-tippy-html="#tu-verifed" data-tippy-interactive="true" data-tippy-placement="top"></i></h5>
                          <span>Arlington, TN</span>
                        </div>
                        <ul class="tu-authorlist">
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
                          <li>
                            <span>Experience:<em>5 years</em></span>
                          </li>
                        </ul>
                      </div>
                      <div class="tu-instructors_footer">
                        <div class="tu-rating">
                          <i class="fas fa-star"></i>
                          <h6>5.0</h6>
                          <span>(4,448)</span>
                        </div>
                        <div class="tu-instructors_footer-right">
                          <a href="javascript:void(0);"><i class="icon icon-heart"></i></a>
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
                <li class="splide__slide">
                  <div class="tu-featureitem">
                    <figure>
                      <a href="tutor-detail.html"><img src="images/index/qualified/img-02.jpg" alt="image-description" /></a>
                      <span class="tu-featuretag">FEATURED</span>
                    </figure>
                    <div class="tu-authorinfo">
                      <div class="tu-authordetail">
                        <figure>
                          <img src="images/index/professionol/img-02.jpg" alt="image-description" />
                        </figure>
                        <div class="tu-authorname">
                          <h5><a href="tutor-detail.html"> Dwayne Garrett</a>  <i class="icon icon-check-circle tu-greenclr" data-tippy-trigger="mouseenter" data-tippy-html="#tu-verifed" data-tippy-interactive="true" data-tippy-placement="top"></i></h5>
                          <span>Arlington, TN</span>
                        </div>
                        <ul class="tu-authorlist">
                          <li>
                            <span>Starting from:<em>$1,385.10/hr</em></span>
                          </li>
                          <li>
                            <span>Mobile:<em>xxx-xxxxx-11</em></span>
                          </li>
                          <li>
                            <span>Whatsapp:<em>xxx-xxxxx-80</em></span>
                          </li>
                          <li>
                            <span>Qualification:<em>B.Tech/B.E.</em></span>
                          </li>
                          <li>
                            <span>Experience:<em>6 years</em></span>
                          </li>
                        </ul>
                      </div>
                      <div class="tu-instructors_footer">
                        <div class="tu-rating">
                          <i class="fas fa-star"></i>
                          <h6>5.0</h6>
                          <span>(4,448)</span>
                        </div>
                        <div class="tu-instructors_footer-right">
                          <a href="javascript:void(0);"><i class="icon icon-heart"></i></a>
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
          <div class="tu-mainbtn">
            <a href="search-listing-two.html" class="tu-primbtn-lg"><span>Explore all instructors</span><i class="icon icon-chevron-right"></i></a>
          </div>
        </div>
      </section> */}
      <FeaturedTutor />
      {/* <!-- PROFESSIONOLL  END -->  */}
    </main>
    {/* <!-- MAIN END --> */}
    <PrimaFooter isHome />

  </>);
}
