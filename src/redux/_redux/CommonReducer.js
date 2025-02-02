import * as Types from "./Types";

const initialState = {
  // productDetails: {},
  // signUpInput: {
  //   buyerName: "",
  //   mailOrPhone: "",
  //   password: "",
  //   cPassword: ""
  // },

};
const CommonReducer = (state = initialState, action) => {
  const newState = { ...state };
  switch (action.type) {
    // case Types.GET_SIGNUP_INPUT:
    //   const { name, value } = action.payload
    //   const signUpInput = { ...state.signUpInput };
    //   signUpInput[name] = value;
    //   return {
    //     ...state,
    //     signUpInput: signUpInput,
    //   };

    default:
      break;
  }
  return newState;
};
export default CommonReducer;
