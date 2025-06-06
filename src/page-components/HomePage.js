"use client";
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
import { useDispatch, useSelector } from "react-redux";
import { GetHomeData } from "@/redux/_redux/CommonAction";
export default function HomePage({ navigation }) {
    const router = useRouter()
    const dispatch = useDispatch()
    const el = useRef(null); // Reference for the target element
    const typedInstance = useRef(null);
    const [isLogin, setIsLogin] = useState(false)
    const [clientData, setClientData] = useState(null)
    const homeData = useSelector((state) => state.homeInfo.homeData);
    const isHomeDataLoading = useSelector((state) => state.homeInfo.isHomeDataLoading);
    const { topCat, count, subCatGroup } = homeData || {}
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
        dispatch(GetHomeData())
    }, [])

    console.log('homeData', homeData)
    return (<>
        <SecondaryHeader isLogin={isLogin} clientData={clientData} />
        {/* <!-- Preloader Start --> */}
        {isHomeDataLoading &&
            <div class="tu-preloader">
                <div class="tu-preloader_holder">
                    <img src="images/favicon.png" alt="laoder img" />
                    <div class="tu-loader"></div>
                </div>
            </div>
        }
        {/* <!-- BANNER START --> */}
        <Banner />
        {/* <!-- BANNER END --> */}
        {/* <!-- MAIN START --> */}
        <main class="tu-main">
            <div id="services"><BetterLearningBetterResult data={count} /></div>
            {/* <!-- QUICK START --> */}
            <div id="classes"><TopVisitedCategory data={topCat} /></div>
            {/* <!-- QUICK END --> */}

            {/* <!-- SUCCESS START --> */}
            <div id="stories"><SuccessStory /></div>
            {/* <!-- SUCCESS END --> */}
            {/* <!--  PROFESSIONOLL  START --> */}
            <div id="featured"><FeaturedTutor /></div>
            {/* <!-- PROFESSIONOLL  END -->  */}
        </main>
        {/* <!-- MAIN END --> */}
        <PrimaFooter isHome data={subCatGroup} />

    </>);
}
