import { configureStore, createAsyncThunk } from "@reduxjs/toolkit";
import authReducer from './auth-slice';
import adminProductSlice from './admin/productSlice';
import adminOrderSlice from './admin/orderSlice';
import shopProductSlice from './shop/productSlice';
import shopCartSlice from './shop/cartSlice';
import shopAddressSlice from './shop/addressSlice';
import shopPaymentSlice from './shop/paymentSlice';
import shopSearchSlice from './shop/searchSlice';
import shopReviewSlice from './shop/reviewSlice';
import commonFeatureSlice from './commonSlice';

const store = configureStore({
    reducer:{
        auth : authReducer,

        adminProduct : adminProductSlice,
        adminOrder : adminOrderSlice,
        
        shopProducts : shopProductSlice,
        shopCart : shopCartSlice,
        shopAddress : shopAddressSlice,
        shopPayment : shopPaymentSlice,
        shopSearch : shopSearchSlice,
        shopReview : shopReviewSlice,
        commonFeature : commonFeatureSlice,
    }
});


export default store;