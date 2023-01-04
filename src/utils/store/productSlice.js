import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";

export const STATUSES = Object.freeze({
                                          IDLE: 'idle',
                                          ERROR: 'error',
                                          LOADING: 'loading',
                                      }); //enum alternative. initialState is object because api can be error, loading, etc.
                                          //no one can change so Object.freeze

const productSlice = createSlice({
                                    name:"product",
                                    initialState : {
                                                      data:[],
                                                      status: STATUSES.IDLE,
                                                   },
                                    reducers:{
                                                /*setProducts(state, action)
                                                {
                                                    state.data = action.payload;
                                                },
                                                setStatus(state, action)
                                                {
                                                      state.status = action.payload;
                                                }*/
                                             },
                  extraReducers: (builder) => {
                                                builder
                                                        .addCase(fetchProducts.pending, (state, action) => {
                                                            state.status = STATUSES.LOADING;
                                                        })
                                                        .addCase(fetchProducts.fulfilled, (state, action) => {
                                                            state.data = action.payload;
                                                            state.status = STATUSES.IDLE;
                                                        })
                                                        .addCase(fetchProducts.rejected, (state, action) => {
                                                            state.status = STATUSES.ERROR;
                                                        });
                                                },
                                });


// export const {setProducts, setStatus} = productSlice.actions;
export default productSlice.reducer;


//Thunk 01:10 video

export const fetchProducts = createAsyncThunk('products/fetch', async () => {
    const res = await axios.get('http://localhost:5001/api/products');
    return res.data;
});


/*export function fetchProducts()
{
    return async function fetchProductThunk(dispatch, getState)
    {
        dispatch(setStatus(STATUSES.LOADING));
        try
        {
            const res = await fetch("http://localhost:5001/api/products");
            const data = await res.json();
            dispatch(setProducts(data));
            dispatch(setStatus(STATUSES.IDLE));
        }catch (err) {
            console.log(err);
            dispatch(setStatus(STATUSES.ERROR));
        }
    };
}*/
