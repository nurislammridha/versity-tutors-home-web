"use client"
import React, { useEffect, useState } from 'react'
import './allProductStyle.css'
import Header from '@/components/Header'
import HeaderLink from '@/components/HeaderLink'
import Filter from '@/components/Filter'
import HomeProducts from '@/components/HomeProducts'
import { useDispatch, useSelector } from 'react-redux'
import { useRouter, useSearchParams } from 'next/navigation'
import { GetBrands, GetCategories, GetFilterProduct } from '@/redux/_redux/CommonAction'
const AllContainer = ({ search = "", setSearch }) => {
    const dispatch = useDispatch()
    const router = useRouter()
    const searchParams = useSearchParams();
    const catId = searchParams.get("catId") || null;
    const catName = searchParams.get("catName") || null;
    const subCatId = searchParams.get("subCatId") || null;
    const subCatName = searchParams.get("subCatName") || null;
    const subSubCatId = searchParams.get("subSubCatId") || null;
    const subSubCatName = searchParams.get("subSubCatName") || null;
    const [isLogin, setIsLogin] = useState(false)
    const [buyerData, setBuyerData] = useState({})
    // const { isFromCategory, isFromSubCategory, categoryId, subCategoryId: subCatId } = router.query || {}
    const proInfo = useSelector((state) => state.homeInfo.productsList);
    const products = proInfo || []
    // const { products, pagination } = proInfo || {}
    const categoriesList = useSelector((state) => state.homeInfo.categoriesList);
    const brandsList = useSelector((state) => state.homeInfo.brandsList);
    const isProductLoading = useSelector((state) => state.homeInfo.isProductLoading);
    const [isShortBy, setShortBy] = useState(false)
    const [short, setShort] = useState(0)
    const [shortName, setShortName] = useState("Select")
    // const [categoriesId, setCategoriesId] = useState(isFromCategory ? [categoryId] : [])
    // const [subCategoryId, setSubCategoryId] = useState(isFromSubCategory ? subCatId : "")
    const [brandId, setBrandId] = useState(null)
    const [sortBy, setSortBy] = useState(null)
    const [brandsId, setBrandsId] = useState([])
    const [isTrending, setTrending] = useState(false)
    const [isPopular, setPopular] = useState(false)
    const [price, setPrice] = useState(null)
    const [isClose, setClose] = useState(false)
    const handleSelect = (isCategory, id) => {
        if (isCategory) {
            //category
            let isExistCat = categoriesId.filter(el => el === id)
            if (isExistCat.length > 0) {
                setCategoriesId(l => l.filter(el => el !== id));
            } else {
                setCategoriesId(prevState => [...prevState, id]);
            }
        } else {
            console.log('isCategory', isCategory)
            //seller
            let isExistBrand = brandsId.filter(el => el === id)
            if (isExistBrand.length > 0) {
                setBrandsId(l => l.filter(el => el !== id));
            } else {
                setBrandsId(prevState => [...prevState, id]);
            }
        }
    }
    const handlePagination = (page) => {
        // dispatch(GetFilterProduct({ categoriesId, subCategoryId, brandsId, isShortBy, short, search, page, limit: 20 }));
    };
    useEffect(() => {
        // dispatch(GetFilterProduct({ categoriesId, subCategoryId, brandsId, isShortBy, short, search, page: 1, limit: 20 }))
        dispatch(GetCategories())
        dispatch(GetBrands())
    }, [])

    // useEffect(() => {
    //     if (search.length > 0) {
    //         dispatch(GetFilterProduct({ categoriesId, sellersId, isShortBy, short, search }))
    //     }
    // }, [search])
    // useEffect(() => {
    //     // if (location?.state?.isFromCategory) {
    //     //     setCategoriesId(location?.state?.categoryId)
    //     // }
    //     // dispatch(GetFilterProduct({ categoriesId, subCategoryId, brandsId, isShortBy, short, search, page: 1, limit: 20 }))
    // }, [categoriesId, brandsId, short, location, search])
    useEffect(() => {
        dispatch(GetBrands())
        setBuyerData(JSON.parse(localStorage.getItem('buyerData')))
        const val = localStorage.getItem("isLogin")
        val === "true" ? setIsLogin(true) : setIsLogin(false)
    }, [])
    useEffect(() => {
        let minPrice = null
        let maxPrice = null
        if (price !== null) {
            minPrice = price[0]
            maxPrice = price[1]
        }
        dispatch(GetFilterProduct({ categoryId: catId, subCategoryId: subCatId, subSubCategoryId: subSubCatId, brandId, sortBy, isPopular, isTrending, minPrice, maxPrice }))
    }, [catId, subCatId, subSubCatId, brandId, sortBy, isPopular, isTrending, price, price])
    // console.log('price', price)
    return (
        <div className="parent_container">
            {/* header */}
            <Header />
            <HeaderLink
                catName={catName}
                subCatName={subCatName}
                subSubCatName={subSubCatName}
                total={products?.length}
            />
            <Filter
                brandsList={brandsList}
                setBrandId={setBrandId}
                setSortBy={setSortBy}
                setTrending={setTrending}
                setPopular={setPopular}
                popular={isPopular}
                trending={isTrending}
                setPrice={setPrice}
                price={price}
            />
            <div style={{ marginTop: -25, paddingBottom: 100 }}>
                <HomeProducts
                    isViewMore={false}
                    isHeader={false}
                    list={products}
                    isLogin={isLogin}
                    buyerData={buyerData}
                />
            </div>
        </div>
    )
}

export default AllContainer