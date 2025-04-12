import React, { useEffect } from 'react'
import $ from 'jquery';
import Splide from '@splidejs/splide';
import '@splidejs/splide/dist/css/splide.min.css';
import { useLanguage } from '@/context/LanguageContext';
const SuccessStory = () => {
    const { t } = useLanguage()
    useEffect(() => {
        const sliderElement = document.getElementById('tu-sucesstorieslider');
        if (sliderElement) {
            const splide2 = new Splide('#tu-sucesstorieslider', {
                type: 'loop',
                perPage: 2,
                perMove: 1,
                gap: '24px',
                pagination: true,
                arrows: false,
                breakpoints: {
                    575: {
                        perPage: 1, // Optional: 1 item on very small screens
                    },
                },
            });
            splide2.mount();
            return () => {
                splide2.destroy();
            };
        }
    }, []);
    return (
        <>
            <section id="tu-sucesstorsection">
                <div className="tu-success-stories tu-success-storiesvtwo">
                    <div className="container">
                        <div className="tu-sucesstor_pattren">
                            <img src="images/index/success_stories/pattren.svg" alt="img" />
                        </div>
                        <div className="row tu-sucesstorslider_title">
                            <div className="col-lg-8">
                                <div className="tu-maintitle">
                                    <h2> {t.seeHowOur} <span>#{t.successStories}</span></h2>
                                </div>
                            </div>
                        </div>
                        <div id="tu-sucesstorieslider" className="splide tu-sucesstorieslider tu-splidearrow tu-splidedots">
                            <div className="splide__track">
                                <ul className="splide__list ">
                                    {[1, 2, 3, 4].map((item, index) => (
                                        <li className="splide__slide" key={index} style={{ marginBottom: 20 }}>
                                            <div className="tu-sucesstor_title tu-sucesstories">
                                                <img src="images/index/success_stories/users/img-01.jpg" alt="img" />
                                                <h5>{t.highlyRecommended}</h5>
                                                <blockquote>{t.highlyRecommendedQ}</blockquote>
                                                <h4>
                                                    {t.cName}
                                                    <span>{t.cAddress}</span>
                                                </h4>
                                                <div className="tu-sucesstories_comma">
                                                    <img src="images/index/success_stories/commav2.svg" alt="img" />
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
        </>
    )
}

export default SuccessStory