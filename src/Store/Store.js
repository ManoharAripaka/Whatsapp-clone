import { configureStore } from "@reduxjs/toolkit";
import DataStore from "./DataStore";

export default configureStore({
    reducer: {data : DataStore},
})


// import { configureStore } from '@reduxjs/toolkit'

// import rootReducer from './reducer'

// const store = configureStore({
//   reducer: rootReducer,
//   middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
// })