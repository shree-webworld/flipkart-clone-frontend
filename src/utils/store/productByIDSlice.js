import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";

export const STATUSES = Object.freeze({
                                          IDLE: 'idle',
                                          ERROR: 'error',
                                          LOADING: 'loading',
                                      }); //enum alternative. initialState is object because api can be error, loading, etc.
                                          //no one can change so Object.freeze

const productByIDSlice = createSlice({
                                    name:"productByID",
                                    initialState : {
                                                      data:[],
                                                      status: STATUSES.IDLE,
                                                   },

                  extraReducers: (builder) => {
                                                builder
                                                        .addCase(fetchProductsByID.pending, (state, action) => {
                                                            state.status = STATUSES.LOADING;
                                                        })
                                                        .addCase(fetchProductsByID.fulfilled, (state, action) => {
                                                            state.data = action.payload;
                                                            state.status = STATUSES.IDLE;
                                                        })
                                                        .addCase(fetchProductsByID.rejected, (state, action) => {
                                                            state.status = STATUSES.ERROR;
                                                        });
                                                },
                                });


export default productByIDSlice.reducer;


//Thunk
export const fetchProductsByID = createAsyncThunk('products/fetchByID', async (id) => {
    const res = await axios.get(`http://localhost:5001/api/products/${id}`);
    return res.data;
});
