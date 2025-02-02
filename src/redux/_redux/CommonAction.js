import { getCartPrice, getSubTotal } from "../../assets/function/globalFunction";
import { showToast } from "../../utils/ToastHelper";
import * as Types from "./Types";
import Axios from "axios";
// export const GetHomePageData = () => (dispatch) => {
//   const url = `${process.env.NEXT_PUBLIC_API_URL}product/home-page`;
//   dispatch({ type: Types.IS_HOME_LOADING, payload: true });
//   try {
//     Axios.get(url).then((res) => {
//       if (res.data.status) {
//         dispatch({ type: Types.HOME_PAGE, payload: res.data.result });
//         dispatch({ type: Types.IS_HOME_LOADING, payload: false });
//       }
//     });
//   } catch (error) {
//     showToast("error", "Something went wrong");
//   }
// };