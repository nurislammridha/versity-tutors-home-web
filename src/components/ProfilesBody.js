import { useLanguage } from '@/context/LanguageContext';
import { AreaBySubDistrictId, DistrictByDivisionId, GetCategoryList, GetDivisionList, GetProfiles, GetSubCategoryByCategoryId, SubDistrictByDistrictId } from '@/redux/_redux/CommonAction';
import { useRouter, useSearchParams } from 'next/navigation';
import React, { Suspense, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { convertToBanglaNumber } from '../../public/function/globalFunction';

const ProfilesBody = ({ clientData, isLogin }) => {
    const router = useRouter();
    const dispatch = useDispatch();
    const searchParams = useSearchParams();
    const { language, t } = useLanguage();

    // Initial query params from URL
    const lookingFor = searchParams.get('lookingFor'); // All, Tutor, Student
    const classes = searchParams.get('classes');
    const division = searchParams.get('division');
    const district = searchParams.get('district');
    const subjects = searchParams.get('subjects');

    // Filter states
    const [profileType, setProfileType] = useState("All");
    const [categoryId, setCategoryId] = useState("");
    const [subCategoryId, setSubCategoryId] = useState([]);
    const [divisionId, setDivisionId] = useState("");
    const [districtId, setDistrictId] = useState("");
    const [subDistrictId, setSubDistrictId] = useState("");
    const [areaId, setAreaId] = useState("");
    const [minPrice, setMinPrice] = useState("");
    const [maxPrice, setMaxPrice] = useState("");
    const [gender, setGender] = useState("");
    const [search, setSearch] = useState("");
    const [sortBy, setSortBy] = useState("Best Match");
    const [isTeachingLocationOnline, setTeachingLocationOnline] = useState(false);
    const [isTeachingLocationTutorHome, setTeachingLocationTutorHome] = useState(false);
    const [isTeachingLocationStudentHome, setTeachingLocationStudentHome] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);

    // Redux selectors
    const {
        categoryList,
        subCategoryList,
        isProfilesLoading,
        filteredProfiles: filteredProfile,
        divisionList,
        districtList,
        subDistrictList,
        areaList,
    } = useSelector((state) => state.homeInfo);

    const { pagination, result: filteredProfiles } = filteredProfile || { pagination: {}, result: null }
    const { total, page, limit, totalPages, } = pagination || {}


    const handlePageChange = (newPage) => {
        if (newPage > 0 && newPage <= totalPages) {
            setCurrentPage(newPage);
        }
    };

    const handleCheckboxChange = (id) => {
        setSubCategoryId((prevIds) =>
            prevIds.includes(id) ? prevIds.filter((item) => item !== id) : [...prevIds, id]
        );
    };

    // Fetch dependent data when IDs change
    useEffect(() => {
        if (categoryId) dispatch(GetSubCategoryByCategoryId(categoryId));
        if (divisionId) dispatch(DistrictByDivisionId(divisionId));
        if (districtId) dispatch(SubDistrictByDistrictId(districtId));
        if (subDistrictId) dispatch(AreaBySubDistrictId(subDistrictId));
    }, [categoryId, divisionId, districtId, subDistrictId]);

    // Initial fetch for categories and divisions
    useEffect(() => {
        dispatch(GetCategoryList());
        dispatch(GetDivisionList());
    }, []);

    // Set initial filters from URL
    useEffect(() => {
        if (lookingFor) setProfileType(lookingFor);
        if (division) setDivisionId(division);
        if (district) setDistrictId(district);
        if (classes) setCategoryId(classes);
        if (subjects) setSubCategoryId(subjects.split(',')); // assuming comma-separated subjects
    }, [lookingFor, division, district, classes, subjects]);

    // Fetch filtered profiles
    useEffect(() => {
        const filters = {
            categoryId,
            subCategoryId,
            divisionId,
            districtId,
            subDistrictId,
            areaId,
            gender,
        };

        // Add hourly fee range if valid
        if (Number(minPrice) > 0 && Number(maxPrice) > 0) {
            filters.hourlyFee = { min: Number(minPrice), max: Number(maxPrice) };
        }

        // Add teaching location flags
        if (isTeachingLocationOnline) filters.isTeachingLocationOnline = true;
        if (isTeachingLocationTutorHome) filters.isTeachingLocationTutorHome = true;
        if (isTeachingLocationStudentHome) filters.isTeachingLocationStudentHome = true;

        // Conditionally add isTutorAccount based on profileType
        if (profileType === 'Tutor') {
            filters.isTutorAccount = true;
        } else if (profileType === 'Student') {
            filters.isTutorAccount = false;
        }
        // else do not include it for "All"

        const obj = {
            search,
            sortBy,
            page: currentPage,
            limit: 5,
            filters,
        };

        dispatch(GetProfiles(obj));
    }, [
        currentPage,
        search,
        sortBy,
        categoryId,
        subCategoryId,
        divisionId,
        districtId,
        subDistrictId,
        areaId,
        minPrice,
        maxPrice,
        gender,
        isTeachingLocationOnline,
        isTeachingLocationTutorHome,
        isTeachingLocationStudentHome,
        profileType,
    ]);
    return (
        <>
            {isProfilesLoading ?
                <div class="tu-preloader">
                    <div class="tu-preloader_holder">
                        <img src="images/favicon.png" alt="laoder img" />
                        <div class="tu-loader"></div>
                    </div>
                </div>
                :

                <main class="tu-bgmain tu-main">
                    <section class="tu-main-section">
                        <div class="container">
                            <div class="row">
                                <div class="col-lg-12">
                                    <div class="tu-listing-wrapper">
                                        <div class="tu-sort">
                                            <h3>{language === "en" ? total : convertToBanglaNumber(total)}  {t.searchResult}<mark>{profileType}</mark> <span>{search}</span></h3>
                                            {/* <h3>{total} Search result  in<span>{search}</span></h3> */}
                                            <div class="tu-sort-right-area">
                                                <div class="tu-sortby">
                                                    <span>{t.sortPrice} : </span>
                                                    <div class="tu-select">
                                                        <select
                                                            class="form-control tu-selectv"
                                                            value={sortBy}
                                                            onChange={(e) => setSortBy(e.target.value)}
                                                        >
                                                            <option> {t.selectSortBy}</option>
                                                            {/* <option value={"Best Match"}>Best Match </option> */}
                                                            <option value={"Price low to high"}>{t.priceLowToHigh} </option>
                                                            <option value={'Price high to low'}>{t.priceHighToLow}</option>
                                                        </select>
                                                    </div>
                                                </div>

                                            </div>
                                        </div>
                                        <div class="tu-searchbar-wrapper">
                                            <div class="tu-appendinput">
                                                <div class="tu-searcbar">
                                                    <div class="tu-inputicon">
                                                        <a ></a>
                                                        <input
                                                            type="text"
                                                            class="form-control"
                                                            placeholder={t.enterSearch}
                                                            value={search}
                                                            onChange={(e) => setSearch(e.target.value)}
                                                        />
                                                    </div>

                                                    <a class="tu-primbtn-lg tu-primbtn-orange"><i class="icon icon-search"></i></a>
                                                </div>
                                            </div>
                                            <div class="tu-listing-search">
                                                <figure>
                                                    <img src="images/listing/shape.png" alt="image" />
                                                </figure>
                                                <span>{t.startFromHere}</span>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                                <div class="col-xl-4 col-xxl-3">
                                    <aside class="tu-asidewrapper">
                                        <a class="tu-dbmenu"><i class="icon icon-chevron-left"></i></a>
                                        <div class="tu-aside-menu">
                                            <div class="tu-aside-holder">
                                                <div class="tu-asidetitle" data-bs-toggle="collapse" data-bs-target="#side2" role="button" aria-expanded="true">
                                                    <h5>I am looking for</h5>
                                                </div>
                                                <div id="side2" class="collapse show">
                                                    <div class="tu-aside-content">
                                                        <div class="tu-filterselect">
                                                            <div class="tu-select">
                                                                <select
                                                                    id="selectv7"
                                                                    data-placeholder="Select education level"
                                                                    data-placeholderinput="Select education level"
                                                                    class="form-control tu-input-field"
                                                                    value={profileType}
                                                                    onChange={(e) => {
                                                                        setProfileType(e.target.value)
                                                                    }}
                                                                >
                                                                    <option value={"All"}>{t.all}</option>
                                                                    <option value={"Tutor"}>{t.tutor}</option>
                                                                    <option value={"Student"}>{t.student}</option>
                                                                </select>
                                                            </div>
                                                        </div>

                                                    </div>
                                                </div>
                                            </div>
                                            <div class="tu-aside-holder">
                                                <div class="tu-asidetitle" data-bs-toggle="collapse" data-bs-target="#side2" role="button" aria-expanded="true">
                                                    <h5>{t.educationLevel}</h5>
                                                </div>
                                                <div id="side2" class="collapse show">
                                                    <div class="tu-aside-content">
                                                        <div class="tu-filterselect">
                                                            <div class="tu-select">
                                                                <select
                                                                    id="selectv7"
                                                                    data-placeholder="Select education level"
                                                                    data-placeholderinput="Select education level"
                                                                    class="form-control tu-input-field"
                                                                    value={categoryId}
                                                                    onChange={(e) => {
                                                                        setCategoryId(e.target.value)
                                                                        setSubCategoryId([])
                                                                    }}
                                                                >
                                                                    <option label={t.selectEducationLevel}></option>
                                                                    {categoryList?.length > 0 && categoryList.map((item, index) => (
                                                                        <option key={index} value={item._id}>{language === "en" ? item.categoryName : item.categoryNameBn}</option>
                                                                    ))}
                                                                </select>
                                                            </div>
                                                        </div>
                                                        {subCategoryList !== null && subCategoryList.length > 0 &&
                                                            <div class="tu-filterselect">
                                                                <h6>{t.chooseSub}</h6>
                                                                <ul class="tu-categoriesfilter">
                                                                    {subCategoryList.map((item, index) => (
                                                                        <li key={index}>
                                                                            <div class="tu-check tu-checksm">
                                                                                <input
                                                                                    type="checkbox"
                                                                                    id={`expcheck${index}`}
                                                                                    name="expcheck"
                                                                                    checked={subCategoryId.includes(item._id)}
                                                                                    onChange={() => handleCheckboxChange(item._id)}
                                                                                />
                                                                                <label htmlFor={`expcheck${index}`}>{language === "en" ? item.subCategoryName : item.subCategoryNameBn}</label>
                                                                            </div>
                                                                        </li>
                                                                    ))}


                                                                </ul>
                                                                {/* <div class="show-more">
                                                                <a  class="tu-readmorebtn tu-show_more">Show all</a>
                                                            </div> */}
                                                            </div>
                                                        }

                                                    </div>
                                                </div>
                                            </div>
                                            <div class="tu-aside-holder">
                                                <div class="tu-asidetitle" data-bs-toggle="collapse" data-bs-target="#side21" role="button" aria-expanded="true">
                                                    <h5>{t.locations}</h5>
                                                </div>
                                                <div id="side21" class="collapse show">
                                                    <div class="tu-aside-content">
                                                        <div class="tu-filterselect">
                                                            <div class="tu-select">
                                                                <select
                                                                    id="selectv7"
                                                                    data-placeholder="Select division"
                                                                    data-placeholderinput="Select division"
                                                                    class="form-control tu-input-field"
                                                                    value={divisionId}
                                                                    onChange={(e) => {
                                                                        setDivisionId(e.target.value)
                                                                        setDistrictId("")
                                                                        setSubDistrictId("")
                                                                        setAreaId("")
                                                                    }}
                                                                >
                                                                    <option label={t.selectDivision}></option>
                                                                    {divisionList?.length > 0 && divisionList.map((item, index) => (
                                                                        <option key={index} value={item._id}>{language === "en" ? item.divisionName : item.divisionNameBn}</option>
                                                                    ))}
                                                                </select>
                                                            </div>
                                                            <div class="tu-select mt-3">
                                                                <select
                                                                    id="selectv7"
                                                                    data-placeholder="Select district"
                                                                    data-placeholderinput="Select district"
                                                                    class="form-control tu-input-field"
                                                                    value={districtId}
                                                                    onChange={(e) => {
                                                                        setDistrictId(e.target.value)
                                                                        setSubDistrictId("")
                                                                        setAreaId("")
                                                                    }}
                                                                >
                                                                    <option label={t.selectDistrict}></option>
                                                                    {districtList?.length > 0 && districtList.map((item, index) => (
                                                                        <option key={index} value={item._id}>{language === "en" ? item.districtName : item.districtNameBn}</option>
                                                                    ))}
                                                                </select>
                                                            </div>
                                                            <div class="tu-select mt-3">
                                                                <select
                                                                    id="selectv7"
                                                                    data-placeholder="Select subdistrict"
                                                                    data-placeholderinput="Select subdistrict"
                                                                    class="form-control tu-input-field"
                                                                    value={subDistrictId}
                                                                    onChange={(e) => {
                                                                        setSubDistrictId(e.target.value)
                                                                        setAreaId("")
                                                                    }}
                                                                >
                                                                    <option label={t.selectSubDis}></option>
                                                                    {subDistrictList?.length > 0 && subDistrictList.map((item, index) => (
                                                                        <option key={index} value={item._id}>{language === "en" ? item.subDistrictName : item.subDistrictNameBn}</option>
                                                                    ))}
                                                                </select>
                                                            </div>
                                                            <div class="tu-select mt-3">
                                                                <select
                                                                    id="selectv7"
                                                                    data-placeholder="Select area"
                                                                    data-placeholderinput="Select area"
                                                                    class="form-control tu-input-field"
                                                                    value={areaId}
                                                                    onChange={(e) => {
                                                                        setAreaId(e.target.value)
                                                                    }}
                                                                >
                                                                    <option label={t.selectArea}></option>
                                                                    {areaList?.length > 0 && areaList.map((item, index) => (
                                                                        <option key={index} value={item._id}>{language === "en" ? item.areaName : item.areaNameBn}</option>
                                                                    ))}
                                                                </select>
                                                            </div>
                                                        </div>


                                                    </div>
                                                </div>
                                            </div>
                                            <div class="tu-aside-holder">
                                                <div class="tu-asidetitle" data-bs-toggle="collapse" data-bs-target="#side3" role="button" aria-expanded="true">
                                                    <h5>{t.priceRange}</h5>
                                                </div>
                                                <div id="side3" class="collapse show">
                                                    <div class="tu-aside-content">
                                                        <div class="tu-rangevalue" data-bs-target="#tu-rangecollapse" role="list" aria-expanded="false">
                                                            <div class="tu-areasizebox">
                                                                <input
                                                                    type="number"
                                                                    class="form-control tu-input-field"
                                                                    step="1"
                                                                    placeholder={t.minPrice}
                                                                    id="tu-min-value"
                                                                    value={minPrice}
                                                                    onChange={(e) => setMinPrice(e.target.value)}
                                                                />
                                                                <input
                                                                    type="number"
                                                                    class="form-control tu-input-field"
                                                                    step="1"
                                                                    placeholder={t.maxPrice}
                                                                    id="tu-max-value"
                                                                    value={maxPrice}
                                                                    onChange={(e) => setMaxPrice(e.target.value)}
                                                                />
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
                                                <div class="tu-asidetitle" data-bs-toggle="collapse" data-bs-target="#side1ab" role="button" aria-expanded="true">
                                                    <h5>{t.miscellaneous}</h5>
                                                </div>
                                                <div id="side1ab" class="collapse show">
                                                    <div class="tu-aside-content">
                                                        <ul class="tu-categoriesfilter">
                                                            <li>
                                                                <div class="tu-check tu-checksm">
                                                                    <input
                                                                        type="checkbox"
                                                                        id="nameaa"
                                                                        name="expcheck"
                                                                        checked={isTeachingLocationOnline}
                                                                        onChange={() => setTeachingLocationOnline(!isTeachingLocationOnline)}
                                                                    />
                                                                    <label for="nameaa">{t.onlineBooking}</label>
                                                                </div>
                                                            </li>
                                                            <li>
                                                                <div class="tu-check tu-checksm">
                                                                    <input
                                                                        type="checkbox"
                                                                        id="nameaa1"
                                                                        name="expcheck"
                                                                        checked={isTeachingLocationTutorHome}
                                                                        onChange={() => setTeachingLocationTutorHome(!isTeachingLocationTutorHome)}
                                                                    />
                                                                    <label for="nameaa1">{t.tutorHome}</label>
                                                                </div>
                                                            </li>
                                                            <li>
                                                                <div class="tu-check tu-checksm">
                                                                    <input
                                                                        type="checkbox"
                                                                        id="nameaa2"
                                                                        name="expcheck"
                                                                        checked={isTeachingLocationStudentHome}
                                                                        onChange={() => setTeachingLocationStudentHome(!isTeachingLocationStudentHome)}
                                                                    />
                                                                    <label for="nameaa2">{t.studentHome}</label>
                                                                </div>
                                                            </li>
                                                            <li>
                                                                <div class="tu-check tu-checksm">
                                                                    <input
                                                                        type="checkbox"
                                                                        id="namea111"
                                                                        name="expcheck"
                                                                        checked={gender === "Male"}
                                                                        onChange={() => setGender("Male")}
                                                                    />
                                                                    <label for="namea111">{t.maleOnly}</label>
                                                                </div>
                                                            </li>
                                                            <li>
                                                                <div class="tu-check tu-checksm">
                                                                    <input
                                                                        type="checkbox"
                                                                        id="namea21"
                                                                        name="expcheck"
                                                                        checked={gender === "Female"}
                                                                        onChange={() => setGender("Female")}
                                                                    />
                                                                    <label for="namea21">{t.femaleOnly}</label>
                                                                </div>
                                                            </li>
                                                        </ul>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="tu-filterbtns">

                                            </div>
                                        </div>
                                    </aside>
                                </div>
                                <div class="col-xl-8 col-xxl-9">
                                    <div class="tu-listinginfo-holder">
                                        {filteredProfiles !== null && filteredProfiles.length > 0 ? filteredProfiles.map((item, index) => (
                                            <div class="tu-listinginfo" key={index}>
                                                {item?.isApproved && <span class="tu-cardtag"></span>}
                                                <div class="tu-listinginfo_wrapper">
                                                    <div class="tu-listinginfo_title">
                                                        <div class="tu-listinginfo-img">
                                                            <figure>
                                                                <img src={item?.avatar?.url} alt="imge" style={{ width: "50px", height: "50px" }} />
                                                            </figure>
                                                            <div class="tu-listing-heading">
                                                                <h5><a onClick={() => router.push(`/details/${item._id}`)}>{item?.firstName + " " + item?.lastName}</a> <i class="icon icon-check-circle tu-greenclr" data-tippy-trigger="mouseenter" data-tippy-html="#tu-verifed" data-tippy-interactive="true" data-tippy-placement="top"></i></h5>
                                                                {/* <h6>BBBB bbbb </h6> */}
                                                                <div class="tu-listing-location">
                                                                    <span>{language === "en" ? item?.averageRating : convertToBanglaNumber(item?.averageRating)} <i class="fa-solid fa-star"></i><em>({language === "en" ? item?.totalComments : convertToBanglaNumber(item?.totalComments)})</em></span>
                                                                    <span><i className="icon icon-book"></i>{item?.tagline}</span>
                                                                    <address><i class="icon icon-map-pin"></i>{language === "en" ? `${item?.districtInfo?.districtName}, ${item?.divisionInfo?.divisionName}` : `${item?.districtInfo?.districtNameBn}, ${item?.divisionInfo?.divisionNameBn}`}</address>

                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div class="tu-listinginfo_price">
                                                            <span>{t.startingFrom}:</span>
                                                            <h4>&#2547;{language === "en" ? item.hourlyFee : convertToBanglaNumber(item.hourlyFee)}/{t.month}</h4>
                                                        </div>
                                                    </div>
                                                    <div class="tu-listinginfo_description">
                                                        <p>{item.tutorBriefIntroduction}</p>
                                                    </div>
                                                    <div class="tu-listinginfo_service">
                                                        <h6>{t.youCanGet}</h6>
                                                        <ul class="tu-service-list">
                                                            {item?.isTeachingLocationTutorHome &&
                                                                <li>
                                                                    <span>
                                                                        <i class="icon icon-home tu-greenclr"></i>
                                                                        {t.myHome}
                                                                    </span>
                                                                </li>
                                                            }
                                                            {item?.isTeachingLocationStudentHome &&
                                                                <li>
                                                                    <span>
                                                                        <i class="icon icon-map-pin tu-blueclr"></i>
                                                                        {t.studentHome}
                                                                    </span>
                                                                </li>
                                                            }
                                                            {item?.isTeachingLocationOnline &&
                                                                <li>
                                                                    <span>
                                                                        <i class="icon icon-video tu-orangeclr"></i>
                                                                        {t.online}
                                                                    </span>
                                                                </li>
                                                            }

                                                        </ul>
                                                    </div>
                                                </div>
                                                <div class="tu-listinginfo_btn">
                                                    <div class="tu-iconheart">
                                                        {/* <i class="icon icon-heart"></i><span>Add to save</span> */}
                                                    </div>
                                                    <div class="tu-btnarea">
                                                        {/* <a ="login.html" class="tu-secbtn">Let’s chat</a> */}
                                                        <a class="tu-primbtn" onClick={() => router.push(`/details/${item._id}`)}>{t.viewFullProfile}</a>
                                                    </div>
                                                </div>
                                            </div>
                                        )) :
                                            (
                                                <h2 className='w-100 d-block alert alert-success'>{t.noDataFound}</h2>
                                            )}


                                    </div>
                                    {filteredProfiles !== null && filteredProfiles.length > 0 &&
                                        <nav className="tu-pagination">
                                            <ul>
                                                <li className={`tu-pagination-prev ${page === 1 ? "disabled" : ""}`}>
                                                    <a onClick={() => handlePageChange(page - 1)}><i className="icon icon-chevron-left"></i></a>
                                                </li>
                                                {[...Array(totalPages)].map((_, index) => {
                                                    const pageNum = index + 1;
                                                    return (
                                                        <li key={pageNum} className={page === pageNum ? "active" : ""}>
                                                            <a onClick={() => handlePageChange(pageNum)}>{language === "en" ? pageNum : convertToBanglaNumber(pageNum)}</a>
                                                        </li>
                                                    );
                                                })}
                                                <li className={`tu-pagination-next ${page === totalPages ? "disabled" : ""}`}>
                                                    <a onClick={() => handlePageChange(page + 1)}><i className="icon icon-chevron-right"></i></a>
                                                </li>
                                            </ul>
                                        </nav>
                                    }

                                </div>
                            </div>
                        </div>
                    </section>
                </main>
            }
        </>
    )
}

export default ProfilesBody