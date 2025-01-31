'use client';
import { Provider } from "react-redux";
import store from '../redux/store';
import "react-toastify/dist/ReactToastify.css";
import "../services/axios";
// console.log('11119999', 11119999)
export function Providers({ children }) {
    return (<>
        <Provider store={store}>
            {children}

        </Provider>
    </>);
}