"use client";

import Banner from "@/components/Banner";

import Header from "@/components/Header";
import AllCategories from "@/components/AllCategories";
import HomeProducts from "@/components/HomeProducts";
import AllBrand from "@/components/AllBrand";
import HomePartner from "@/components/HomePartner";
import Footer from "@/components/Footer";
import FlashSale from "@/components/FlashSale";
import { ToastContainer } from "react-toastify";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GetBrands, GetHomePageData, GetSubSubCategories } from "@/redux/_redux/CommonAction";
export default function Home({ navigation }) {
  const dispatch = useDispatch()
  const [isLogin, setIsLogin] = useState(false)
  const [buyerData, setBuyerData] = useState({})
  const subSubCatList = useSelector((state) => state.homeInfo.subSubCatList);
  const isSubSubCatLoading = useSelector((state) => state.homeInfo.isSubSubCatLoading);
  const brandsList = useSelector((state) => state.homeInfo.brandsList);
  const isHomePageLoading = useSelector((state) => state.homeInfo.isHomePageLoading);
  const homeData = useSelector((state) => state.homeInfo.homeData);
  const { catWiseProducts, flashProducts, newArrival, popularProducts, trendingProducts } = homeData || {}
  useEffect(() => {
    dispatch(GetSubSubCategories())
    dispatch(GetBrands())
    dispatch(GetHomePageData())
    setBuyerData(JSON.parse(localStorage.getItem('buyerData')))
    const val = localStorage.getItem("isLogin")
    val === "true" ? setIsLogin(true) : setIsLogin(false)
  }, [])

  return (
    <div className="parent_container">
      {/* header */}
      <Header />
      {/* hero section */}
      <Banner list={subSubCatList} loading={isSubSubCatLoading} />
      {/* all categories section */}
      <AllCategories list={subSubCatList} loading={isSubSubCatLoading} />
      {/* trending products */}
      <HomeProducts title="Trending Products" loading={isHomePageLoading} list={trendingProducts} isLogin={isLogin} buyerData={buyerData} />
      <HomeProducts title="Popular Products" loading={isHomePageLoading} list={popularProducts} isLogin={isLogin} buyerData={buyerData} />
      <FlashSale list={flashProducts} />
      {/* <HomeProducts title="Combo Package / Kit" /> */}
      <HomeProducts title="New Arrival" loading={isHomePageLoading} list={newArrival} isViewMore={false} isLogin={isLogin} buyerData={buyerData} />
      {/* <HomeProducts title="Free Delivery" /> */}
      {!isHomePageLoading && catWiseProducts?.length > 0 && catWiseProducts.map((item, index) =>
        (item?.products?.length > 0 && <HomeProducts key={index} title={item.category} list={item?.products} isViewMore={false} isLogin={isLogin} buyerData={buyerData} />)
      )}

      {/* <HomeProducts title="Ready Made Project" /> */}
      {/* all brands */}
      <AllBrand list={brandsList} />
      {/* official partner */}
      <HomePartner />
      <Footer />
      {/* <div style={{ paddingBottom: "200px" }}></div> */}
      <ToastContainer />
    </div>
  );
}
