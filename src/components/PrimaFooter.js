import { useRouter } from 'next/navigation';
import React from 'react'

const PrimaFooter = ({ isHome = false, data = null }) => {
    const router = useRouter()
    const handleClick = (id) => {
        const filtered = {
            lookingFor: "Tutor",
            classes: id,
        }
        const queryString = new URLSearchParams(filtered).toString();
        router.push(`/profiles?${queryString}`);
    };
    const handleSub = (id, subCat) => {
        const filtered = {
            lookingFor: "Tutor",
            classes: id,
            subjects: subCat
        }
        const queryString = new URLSearchParams(filtered).toString();
        router.push(`/profiles?${queryString}`);
    };
    return (
        <>
            <footer>
                <div className="tu-footer">
                    {isHome && (
                        <div className="container" id='subjects'>
                            <div className="tu-footer_maintitle">
                                <h5>Explore tutor from our huge collection</h5>
                                <h3>Approach tutors by your favourite subjects</h3>
                            </div>
                            <div className="row tu-footer_row">
                                {data !== null && data.map((item, index) => (
                                    <div className="col-sm-6 col-md-4 col-lg-3" key={index}>
                                        <h5 className="tu-footertitle">{item?.categoryName}</h5>
                                        <ul className="tu-footerlist">
                                            {item?.subCategory.slice(0, 5).map((item2, index2) => (
                                                <li key={index2}>
                                                    <a

                                                        onClick={() => handleSub(item?._id, item2._id)}
                                                    >
                                                        {item2?.subCategoryName}</a></li>
                                            ))}
                                            <li className="tu-footerlist-explore">
                                                <a

                                                    onClick={() => handleClick(item?._id)}
                                                >Explore all</a></li>
                                        </ul>
                                    </div>
                                ))}

                            </div>
                        </div>
                    )}

                </div>
                <div className="tu-footerdark">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-7">
                                <strong className="tu-footerlogo">
                                    <a ><img src="/images/logo_white.png" alt="Logo" /></a>
                                </strong>
                                <p className="tu-footerdescription">Accusamus etidio dignissimos ducimus blanditiis praesentium volupta eleniti atquete corrupti quolores etmquasa molestias epturi sinteam occaecati cupiditate non providente mikume molareshe.</p>
                                <ul className="tu-socialmedia">
                                    <li className="tu-facebookv3"><a target="_blank"><i className="fab fa-facebook-f"></i></a></li>
                                    <li className="tu-twitterv3"><a target="_blank"><i className="fab fa-twitter"></i></a></li>
                                    <li className="tu-linkedinv3"><a target="_blank"><i className="fab fa-linkedin-in"></i></a></li>
                                    <li className="tu-dribbblev3"><a target="_blank"><i className="fab fa-dribbble"></i></a></li>
                                    <li className="tu-twitchv3"><a target="_blank"><i className="fab fa-twitch"></i></a></li>
                                </ul>
                            </div>
                            <div className="col-lg-5">
                                <h5 className="tu-footertitle">Feel free to share your question</h5>
                                <ul className="tu-footerlist tu-footericonlist">
                                    <li><a ><i className="icon icon-phone-call"></i><em>+62 877 77263549</em><span>( Mon to Sun 9am - 11pm GMT )</span></a></li>
                                    <li><a ><i className="icon icon-mail"></i><em>hello@youremailid.co.uk</em></a></li>
                                    <li><a ><i className="icon icon-printer"></i><em>+62 811 09998263</em></a></li>
                                    <li><a ><i className="fab fa-whatsapp"></i><em>(+33)7 75 55 9375</em><span>( Mon to Sun 9am - 11pm GMT )</span></a></li>
                                </ul>
                            </div>
                            <div className="col-12">
                                <div className="tu-footerlistholder  tu-seperator">
                                    <div className="tu-footercontent">
                                        <h5 className="tu-footertitle">Tutor by subjects</h5>
                                        <ul className="tu-footerlist">
                                            <li><a >General mathematics</a></li>
                                            <li><a >World languages</a></li>
                                            <li><a >Advanced placement</a></li>
                                            <li><a >Advance science play</a></li>
                                            <li><a >Social sciences</a></li>
                                            <li><a >International baccalaureate®</a></li>
                                            <li><a >Grooming technology</a></li>
                                            <li><a >Maketing business</a></li>
                                            <li><a >ACT® test prep</a></li>
                                            <li><a >English communications</a></li>
                                            <li><a >Career support</a></li>
                                            <li><a >PSAT/NMSQT® & SAT® prep</a></li>
                                            <li><a >Content writing</a></li>
                                            <li><a >Student success skills</a></li>
                                            <li className="tu-footerlist-explore"><a >Explore all</a></li>
                                        </ul>
                                    </div>
                                    <div className="tu-footercontent-two">
                                        <h5 className="tu-footertitle">Online classNamees
                                            <span className="tu-tag tu-bggreen">NEW</span>
                                        </h5>
                                        <ul className="tu-footerlist">
                                            <li><a >Online science classNamees</a></li>
                                            <li><a >Online islamiat classNamees</a></li>
                                            <li><a >Online mathemetic classNamees</a></li>
                                            <li><a >Online java classNamees</a></li>
                                            <li><a >Online computer classNamees</a></li>
                                            <li><a >IBM python Analyst</a></li>
                                            <li><a >Online geographic classNamees</a></li>
                                            <li><a >Online C programming classNamees</a></li>
                                            <li><a >Online statistic classNamees</a></li>
                                            <li className="tu-footerlist-explore"><a >Explore all</a></li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div className="col-12">
                                <div className="tu-footerlistholder  tu-seperator m-0">
                                    <div className="tu-footercontent-two">
                                        <h5 className="tu-footertitle">Useful links</h5>
                                        <ul className="tu-footerlist">
                                            <li><a >About</a></li>
                                            <li><a >Success stories</a></li>
                                            <li><a >Online classNamees</a></li>
                                            <li><a >Join our community</a></li>
                                            <li><a >Courses</a></li>
                                            <li><a >Sign in now</a></li>
                                            <li><a >Programs &amp; degrees</a></li>
                                            <li><a >How it works</a></li>
                                            <li><a >Learning materials</a></li>
                                            <li><a >F.A.Q</a></li>
                                        </ul>
                                    </div>
                                    <div className="tu-footercontent d-xl-flex">
                                        <div className="tu-footercontent_title">
                                            <h5 className="tu-footertitle">Get mobile app</h5>
                                            <p>Take education on the go. Get our mobile app for FREE! on your Apple and android devices</p>
                                            <ul className="tu-footerdevice">
                                                <li><a ><img src="/images/ios.png" alt="devices" /></a></li>
                                                <li><a ><img src="/images/android.png" alt="devices" /></a></li>
                                            </ul>
                                        </div>
                                        <div className="tu-footernewsletter">
                                            <h5 className="tu-footertitle">Signup for newsletter</h5>
                                            <p>Corrupti quolores etmquasa molestias epturite sinteam occaecati amet cupiditate mikume molareshe.</p>
                                            <div className="tu-inputbtn">
                                                <input type="email" placeholder="Enter email address" className="form-control" />
                                                <a className="tu-primbtn-icon tu-primbtn-orange"><i className="icon icon-send"></i></a>
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
                                    <li><a >Careers</a></li>
                                    <li><a >Terms of use</a></li>
                                    <li><a >Privacy policy</a></li>
                                    <li><a >Cookie notice</a></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
        </>
    )
}

export default PrimaFooter