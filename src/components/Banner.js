import { useLanguage } from '@/context/LanguageContext'
import { DistrictByDivisionId, GetCategoryList, GetDivisionList } from '@/redux/_redux/CommonAction'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

const Banner = () => {
    const router = useRouter()
    const dispatch = useDispatch()
    const categoryList = useSelector((state) => state.homeInfo.categoryList);
    const divisionList = useSelector((state) => state.homeInfo.divisionList);
    const districtList = useSelector((state) => state.homeInfo.districtList);
    const [filtered, setFiltered] = useState({
        lookingFor: "Tutor",
        classes: "",
        division: "",
        district: ""
    })
    const handleChange = (name, val) => {
        setFiltered({ ...filtered, [name]: val })
    }
    const handleClick = () => {
        const queryString = new URLSearchParams(filtered).toString();
        router.push(`/profiles?${queryString}`);
    };
    const { language, t } = useLanguage()
    useEffect(() => {
        dispatch(GetCategoryList())
        dispatch(GetDivisionList());
    }, [])
    useEffect(() => {
        if (filtered.division.length > 0) {
            dispatch(DistrictByDivisionId(filtered.division))
        }
    }, [filtered.division])

    // console.log('filtered', filtered)
    return (
        <div class="tu-bannervthree">
            <div class="tu-particles">
                <div id="tu-particle"></div>
            </div>
            <div class="tu-dottedimage">
                <img src="images/index/banner/img-04.png" alt="img" />
            </div>
            <div class="tu-linedimage">
                <img src="images/index/banner/img-05.png" alt="img" />
            </div>
            <div class="container">
                <div class="align-items-center">
                    <div class="tu-banner_title">
                        <h1 className='text-center'>{t.aGood} <span>#{t.education}</span> {t.isAlwaysAbaseOfABrightFuture}</h1>
                        <p className='text-center' style={{ maxWidth: "100%" }}>{t.subTitle}</p>

                        <div class="search-box p-4 rounded-4 shadow d-flex justify-content-between align-items-end flex-wrap gap-3">

                            <div class="d-flex flex-column flex-grow-1">
                                <label class="form-label fw-semibold text-purple">{t.iAmLookingFor}</label>
                                <select
                                    class="form-select"
                                    onChange={(e) => handleChange("lookingFor", e.target.value)}
                                >
                                    {/* <option >Select Type</option> */}
                                    <option value={"All"}>{t.all}</option>
                                    <option value={"Tutor"}>{t.tutor}</option>
                                    <option value={"Student"}>{t.student}</option>
                                </select>
                            </div>

                            <div class="d-flex flex-column flex-grow-1">
                                <label class="form-label fw-semibold text-purple">{t.selectClasses}</label>
                                <select
                                    class="form-select"
                                    onChange={(e) => handleChange("classes", e.target.value)}
                                >
                                    <option>{t.all}</option>
                                    {categoryList?.length > 0 && categoryList.map((item, index) => (
                                        <option key={index} value={item._id}>{language === 'en' ? item.categoryName : item.categoryNameBn}</option>
                                    ))}
                                </select>
                            </div>
                            <div class="d-flex flex-column flex-grow-1">
                                <label class="form-label fw-semibold text-purple">{t.selectArea}</label>
                                {filtered.division.length === 0 &&
                                    (<select
                                        class="form-select"
                                        onChange={(e) => handleChange("division", e.target.value)}
                                    >
                                        <option>{t.selectDivision}</option>
                                        {divisionList?.length > 0 && divisionList.map((item, index) => (
                                            <option key={index} value={item._id}>{language === 'en' ? item.divisionName : item?.divisionNameBn}</option>
                                        ))}
                                    </select>)

                                }
                                {filtered.division.length > 0 &&
                                    (<select
                                        class="form-select"
                                        onChange={(e) => handleChange("district", e.target.value)}
                                    >
                                        <option>{t.selectDistrict}</option>
                                        {districtList?.length > 0 && districtList.map((item, index) => (
                                            <option key={index} value={item._id}>{language === 'en' ? item.districtName : item.districtNameBn}</option>
                                        ))}
                                    </select>)

                                }


                            </div>



                            <div class="d-flex align-items-end">
                                <button
                                    class="btn btn-gradient px-4 py-2 d-flex align-items-center gap-2 rounded-pill"
                                    onClick={() => handleClick()}
                                >
                                    <i class="fa fa-search"></i> {t.searchProfile}
                                </button>
                            </div>

                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default Banner