import { AreaBySubDistrictId, DistrictByDivisionId, GetCategoryList, GetDivisionList, GetProfiles, GetSubCategoryByCategoryId, SubDistrictByDistrictId } from '@/redux/_redux/CommonAction';
import { useRouter, useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

const ProfilesBody = ({ clientData, isLogin }) => {
    const router = useRouter()
    const searchParams = useSearchParams();
    const lookingFor = searchParams.get('lookingFor');
    const classes = searchParams.get('classes');
    const division = searchParams.get('division');
    const district = searchParams.get('district');
    const subjects = searchParams.get('subjects');
    const dispatch = useDispatch()
    const [categoryId, setCategoryId] = useState("")
    const [subCategoryId, setSubCategoryId] = useState([])
    const [divisionId, setDivisionId] = useState("")
    const [districtId, setDistrictId] = useState("")
    const [subDistrictId, setSubDistrictId] = useState("")
    const [areaId, setAreaId] = useState("")
    const [minPrice, setMinPrice] = useState("")
    const [maxPrice, setMaxPrice] = useState("")
    const [gender, setGender] = useState("")
    const [search, setSearch] = useState("")
    const [sortBy, setSortBy] = useState("Best Match")
    const [isTutorAccount, setTutorAccount] = useState(true)
    const [currentPage, setCurrentPage] = useState(1)
    const [isTeachingLocationOnline, setTeachingLocationOnline] = useState(false)
    const [isTeachingLocationTutorHome, setTeachingLocationTutorHome] = useState(false)
    const [isTeachingLocationStudentHome, setTeachingLocationStudentHome] = useState(false)

    const categoryList = useSelector((state) => state.homeInfo.categoryList);
    const subCategoryList = useSelector((state) => state.homeInfo.subCategoryList);
    const isProfilesLoading = useSelector((state) => state.homeInfo.isProfilesLoading);
    const filteredProfile = useSelector((state) => state.homeInfo.filteredProfiles);
    const divisionList = useSelector((state) => state.homeInfo.divisionList);
    const districtList = useSelector((state) => state.homeInfo.districtList);
    const subDistrictList = useSelector((state) => state.homeInfo.subDistrictList);
    const areaList = useSelector((state) => state.homeInfo.areaList);
    const { pagination, result: filteredProfiles } = filteredProfile || { pagination: {}, result: null }
    const { total, page, limit, totalPages, } = pagination || {}
    const handlePageChange = (newPage) => {
        if (newPage > 0 && newPage <= totalPages) {
            setCurrentPage(newPage)
            // dispatch(GetProfiles({ filters: { isTutorAccount: true }, page: newPage, limit: 5 }))
        }
    };
    const handleCheckboxChange = (id) => {
        setSubCategoryId((prevIds) =>
            prevIds.includes(id) ? prevIds.filter((item) => item !== id) : [...prevIds, id]
        );
    };

    useEffect(() => {
        dispatch(GetCategoryList())
        dispatch(GetDivisionList());
        if (clientData !== null && isLogin) {
            setTutorAccount(!clientData?.isTutorAccount)
            dispatch(GetProfiles({ filters: { isTutorAccount, isApproved: isTutorAccount ? true : false }, limit: 5 }))
        } else {
            lookingFor?.length > 0 && lookingFor === "Tutor" ? setTutorAccount(true) : setTutorAccount(false)
            division?.length > 0 && setDivisionId(division)
            district?.length > 0 && setDistrictId(district)
            classes?.length > 0 && setCategoryId(classes)
            subjects?.length > 0 && setSubCategoryId(subjects)
        }
    }, [clientData, lookingFor, division, district, classes, subjects])
    useEffect(() => {
        categoryId.length > 0 && dispatch(GetSubCategoryByCategoryId(categoryId))
        districtId?.length > 0 && dispatch(SubDistrictByDistrictId(districtId));
        divisionId?.length > 0 && dispatch(DistrictByDivisionId(divisionId));
        subDistrictId?.length > 0 && dispatch(AreaBySubDistrictId(subDistrictId));
    }, [categoryId, divisionId, districtId, subDistrictId])
    useEffect(() => {
        // if (clientData !== null) {
        const obj = { search, sortBy, page: currentPage, limit: 5, filters: { isApproved: isTutorAccount ? true : false, isTutorAccount, categoryId, subCategoryId, divisionId, districtId, subDistrictId, areaId, gender } }
        if (Number(maxPrice) > 0 && Number(minPrice > 0)) obj.filters.hourlyFee = { min: minPrice, max: maxPrice }
        if (isTeachingLocationOnline) obj.filters.isTeachingLocationOnline = true
        if (isTeachingLocationStudentHome) obj.filters.isTeachingLocationStudentHome = true
        if (isTeachingLocationTutorHome) obj.filters.isTeachingLocationTutorHome = true
        dispatch(GetProfiles(obj))
        // }
    }, [currentPage, search, sortBy, categoryId, subCategoryId, divisionId, districtId, subDistrictId, areaId, maxPrice, minPrice, isTeachingLocationOnline, isTeachingLocationStudentHome, isTeachingLocationTutorHome, gender])

    // console.log('queryString', lookingFor, division, district, classes)
    return (
        <>
            <main class="tu-bgmain tu-main">
                <section class="tu-main-section">
                    <div class="container">
                        <div class="row">
                            <div class="col-lg-12">
                                <div class="tu-listing-wrapper">
                                    <div class="tu-sort">
                                        <h3>{total} Search result of <mark>{isTutorAccount ? "Tutor" : "Student"}</mark> in<span>{search}</span></h3>
                                        <div class="tu-sort-right-area">
                                            <div class="tu-sortby">
                                                <span>Sort by: </span>
                                                <div class="tu-select">
                                                    <select
                                                        class="form-control tu-selectv"
                                                        value={sortBy}
                                                        onChange={(e) => setSortBy(e.target.value)}
                                                    >
                                                        <option value={"Best Match"}>Best Match </option>
                                                        <option value={"Price low to high"}>Price low to high </option>
                                                        <option value={'Price high to low'}>Price high to low</option>
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
                                                    <a href></a>
                                                    <input
                                                        type="text"
                                                        class="form-control"
                                                        placeholder="What do you want to explore?"
                                                        value={search}
                                                        onChange={(e) => setSearch(e.target.value)}
                                                    />
                                                </div>
                                                {/* <div class="tu-select">
                                                    <i class="icon icon-layers"></i>
                                                    <select id="selectv8" data-placeholderinput="Select list" data-placeholder="Select category" class="form-control">
                                                        <option label="Select category"></option>
                                                        <option >Automotive</option>
                                                        <option >Beauty &amp; Care</option>
                                                        <option >Marketing</option>
                                                        <option >Child Care</option>
                                                        <option >House Cleaning</option>
                                                    </select>
                                                </div> */}
                                                <a href="search-listing.html" class="tu-primbtn-lg tu-primbtn-orange"><i class="icon icon-search"></i></a>
                                            </div>
                                        </div>
                                        <div class="tu-listing-search">
                                            <figure>
                                                <img src="images/listing/shape.png" alt="image" />
                                            </figure>
                                            <span>Start from here</span>
                                        </div>
                                    </div>
                                    {/* <ul class="tu-searchtags">
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
                                    </ul> */}
                                </div>
                            </div>
                            <div class="col-xl-4 col-xxl-3">
                                <aside class="tu-asidewrapper">
                                    <a href="javascript:void(0)" class="tu-dbmenu"><i class="icon icon-chevron-left"></i></a>
                                    <div class="tu-aside-menu">
                                        <div class="tu-aside-holder">
                                            <div class="tu-asidetitle" data-bs-toggle="collapse" data-bs-target="#side2" role="button" aria-expanded="true">
                                                <h5>Education level & subjects</h5>
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
                                                                <option label="Select education level"></option>
                                                                {categoryList?.length > 0 && categoryList.map((item, index) => (
                                                                    <option key={index} value={item._id}>{item.categoryName}</option>
                                                                ))}
                                                            </select>
                                                        </div>
                                                    </div>
                                                    {subCategoryList !== null && subCategoryList.length > 0 &&
                                                        <div class="tu-filterselect">
                                                            <h6>Choose subjects</h6>
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
                                                                            <label htmlFor={`expcheck${index}`}>{item.subCategoryName}</label>
                                                                        </div>
                                                                    </li>
                                                                ))}


                                                            </ul>
                                                            {/* <div class="show-more">
                                                                <a href="javascript:void(0);" class="tu-readmorebtn tu-show_more">Show all</a>
                                                            </div> */}
                                                        </div>
                                                    }

                                                </div>
                                            </div>
                                        </div>
                                        <div class="tu-aside-holder">
                                            <div class="tu-asidetitle" data-bs-toggle="collapse" data-bs-target="#side21" role="button" aria-expanded="true">
                                                <h5>Locations</h5>
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
                                                                <option label="Select division"></option>
                                                                {divisionList?.length > 0 && divisionList.map((item, index) => (
                                                                    <option key={index} value={item._id}>{item.divisionName}</option>
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
                                                                <option label="Select district"></option>
                                                                {districtList?.length > 0 && districtList.map((item, index) => (
                                                                    <option key={index} value={item._id}>{item.districtName}</option>
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
                                                                <option label="Select sub District"></option>
                                                                {subDistrictList?.length > 0 && subDistrictList.map((item, index) => (
                                                                    <option key={index} value={item._id}>{item.subDistrictName}</option>
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
                                                                <option label="Select Area"></option>
                                                                {areaList?.length > 0 && areaList.map((item, index) => (
                                                                    <option key={index} value={item._id}>{item.areaName}</option>
                                                                ))}
                                                            </select>
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
                                                            <input
                                                                type="number"
                                                                class="form-control tu-input-field"
                                                                step="1"
                                                                placeholder="Min price"
                                                                id="tu-min-value"
                                                                value={minPrice}
                                                                onChange={(e) => setMinPrice(e.target.value)}
                                                            />
                                                            <input
                                                                type="number"
                                                                class="form-control tu-input-field"
                                                                step="1"
                                                                placeholder="Max price"
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
                                        {/* <div class="tu-aside-holder">
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
                                        </div> */}
                                        {/* <div class="tu-aside-holder">
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
                                        </div> */}
                                        <div class="tu-aside-holder">
                                            <div class="tu-asidetitle" data-bs-toggle="collapse" data-bs-target="#side1ab" role="button" aria-expanded="true">
                                                <h5>Miscellaneous</h5>
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
                                                                <label for="nameaa">Online bookings</label>
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
                                                                <label for="nameaa1">Tutor Home/Batch</label>
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
                                                                <label for="nameaa2">Student Home</label>
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
                                                                <label for="namea111">Male only</label>
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
                                                                <label for="namea21">Female only</label>
                                                            </div>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="tu-filterbtns">
                                            {/* <a href="search-listing.html" class="tu-primbtn">Apply filters</a> */}
                                            {/* <a href class="tu-sb-sliver">Clear all filters</a> */}
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
                                                            <img src={item?.avatar.url} alt="imge" style={{ width: "50px", height: "50px" }} />
                                                        </figure>
                                                        <div class="tu-listing-heading">
                                                            <h5><a href onClick={() => router.push(`/details/${item._id}`)}>{item?.firstName + " " + item?.lastName}</a> <i class="icon icon-check-circle tu-greenclr" data-tippy-trigger="mouseenter" data-tippy-html="#tu-verifed" data-tippy-interactive="true" data-tippy-placement="top"></i></h5>
                                                            <div class="tu-listing-location">
                                                                <span>{item?.averageRating} <i class="fa-solid fa-star"></i><em>({item?.totalComments})</em></span><address><i class="icon icon-map-pin"></i>{item?.districtInfo?.districtName} ,{item?.divisionInfo?.divisionName}</address>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="tu-listinginfo_price">
                                                        <span>Starting from:</span>
                                                        <h4>&#2547;{item.hourlyFee}/Month</h4>
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
                                                    {/* <i class="icon icon-heart"></i><span>Add to save</span> */}
                                                </div>
                                                <div class="tu-btnarea">
                                                    {/* <a href="login.html" class="tu-secbtn">Let’s chat</a> */}
                                                    <a href class="tu-primbtn" onClick={() => router.push(`/details/${item._id}`)}>View full profile</a>
                                                </div>
                                            </div>
                                        </div>
                                    ))}


                                </div>
                                <nav className="tu-pagination">
                                    <ul>
                                        <li className={`tu-pagination-prev ${page === 1 ? "disabled" : ""}`}>
                                            <a onClick={() => handlePageChange(page - 1)}><i className="icon icon-chevron-left"></i></a>
                                        </li>
                                        {[...Array(totalPages)].map((_, index) => {
                                            const pageNum = index + 1;
                                            return (
                                                <li key={pageNum} className={page === pageNum ? "active" : ""}>
                                                    <a onClick={() => handlePageChange(pageNum)}>{pageNum}</a>
                                                </li>
                                            );
                                        })}
                                        <li className={`tu-pagination-next ${page === totalPages ? "disabled" : ""}`}>
                                            <a onClick={() => handlePageChange(page + 1)}><i className="icon icon-chevron-right"></i></a>
                                        </li>
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