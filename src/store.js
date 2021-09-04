// import {configureStore} from "@reduxjs/toolkit"
// import userReducer from './features/userSlice'

// const store = configureStore({
//     reducer:{
//         user:userReducer
//     }
// })

// export default store;

import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./features/userSlice";

export default configureStore({
  reducer: {
    user: userReducer,
  },
});
