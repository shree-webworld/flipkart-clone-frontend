import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './cartSlice';
import productReducer from './productSlice';
import productByIDReducer from './productByIDSlice';


const store = configureStore({
                                reducer: {
                                            cart: cartReducer,
                                            product: productReducer,
                                            productByID: productByIDReducer
                                         },
                            });

export default store;
