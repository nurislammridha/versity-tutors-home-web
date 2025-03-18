import React, { useEffect } from 'react'
import $ from 'jquery';
import Splide from '@splidejs/splide';
import '@splidejs/splide/dist/css/splide.min.css';
import { useRouter } from 'next/navigation';
const TopVisitedCategory = ({ data }) => {
    const router = useRouter()
    const handleClick = (id) => {
        const filtered = {
            lookingFor: "Tutor",
            classes: id,
        }
        const queryString = new URLSearchParams(filtered).toString();
        router.push(`/profiles?${queryString}`);
    };
    useEffect(() => {
        const sliderElement = document.getElementById('tu-categoriesslider');
        if (sliderElement && data) {
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
            return () => {
                splideInstance.destroy();
            };
        }
    }, [data]);
    return (
        <>
            <section class="tu-main-section">
                <div class="container">
                    <div class="row justify-content-center">
                        <div class="col-lg-8">
                            <div class="tu-maintitle text-center">
                                <img src="images/zigzag-line.svg" alt="img" />
                                <h4>Let’s make a quick start today</h4>
                                <h2>Choose from the top visited categories you may like</h2>
                                <p>Accusamus et iusidio dignissimos ducimus blanditiis praesentium voluptatum deleniti atque corrupti quos dolores etmquasa molestias epturi sint occaecati cupiditate non providente mikume molareshe.</p>
                            </div>
                        </div>
                    </div>
                    <div id="tu-categoriesslider" class="splide tu-categoriesslider tu-splidedots">
                        <div class="splide__track">
                            <ul class="splide__list">

                                {data && data.map((item, index) => (
                                    <li class="splide__slide" key={index}>
                                        {/* "images/index/categories/img-10.jpg" */}
                                        <a
                                            class="tu-categories_content"
                                            href
                                            onClick={() => handleClick(item?._id)}
                                        >
                                            <img src={item?.img?.url} alt="img" style={{ width: 249, height: 249 }} />
                                            <div class="tu-categories_title">
                                                <h6>{item?.categoryName}</h6>
                                                <span>{item?.subCategoryCount} Listings</span>
                                            </div>
                                        </a>
                                    </li>
                                ))}

                            </ul>
                        </div>
                    </div>
                    <div class="tu-mainbtn">
                        <a href="search-listing-two.html" class="tu-primbtn-lg"><span>Explore All categories</span><i class="icon icon-chevron-right"></i></a>
                    </div>
                </div>
            </section>
        </>
    )
}

export default TopVisitedCategory