import {createSlice} from "@reduxjs/toolkit";

const cartSlice = createSlice({
                                  name:"cart",
                                  initialState: [],

                                  reducers :{
                                              add(state, action)
                                              {
                                                // state.push(action.payload); simple Add
                                                let addItemIndex = state.findIndex((addItem) => addItem.id === action.payload.id);

                                                if(addItemIndex >= 0)
                                                {
                                                  state[addItemIndex].addCartQuantity += 1;
                                                }else
                                                 {
                                                   let addTempProduct = {...action.payload, addCartQuantity : 1}
                                                   state.push(addTempProduct);
                                                 }
                                              },

                                              remove(state, action)
                                              {
                                                return state.filter((item) => item.id !== action.payload);
                                                /*let removeItem = state.cart.filter((item) => item.id !== action.payload);
                                                return {
                                                          cart : removeItem
                                                       };*/
                                              },

                                              clearCart(state, action)
                                              {
                                                /*return {
                                                          cart : []
                                                        };*/
                                                return state = [];
                                              },

                                              setDecrease(state, action)
                                              {
                                                console.log("setDecrease", action.payload);
                                                return state.map((curElem) =>{
                                                                           if(curElem.id === action.payload.id)
                                                                          {
                                                                            let decQuantity = curElem.addCartQuantity - 1;
                                                                            if(decQuantity <= 1)
                                                                            {
                                                                              decQuantity = 1;
                                                                            }
                                                                            return {...curElem, addCartQuantity: decQuantity};
                                                                          }else
                                                                           {
                                                                             return curElem;
                                                                           }
                                                                      }
                                                          );
                                              },

                                              setIncrease(state, action)
                                              {
                                                console.log("setIncrease", action.payload);
                                                return  state.map((curElem) =>{
                                                                          if(curElem.id === action.payload.id)
                                                                          {
                                                                            let incQuantity = curElem.addCartQuantity + 1;
                                                                            if(incQuantity >= curElem.quantity)
                                                                            {
                                                                              incQuantity = curElem.quantity;
                                                                            }
                                                                            return {...curElem, addCartQuantity: incQuantity};
                                                                          }else
                                                                           {
                                                                             return curElem;
                                                                           }
                                                                      }
                                                          );
                                              },

                                              /*cartItemPriceTotal(state, action)
                                              {
                                                  return state.reduce((accum, curElem) =>{
                                                                                                                          accum.total_quantity += curElem.addCartQuantity;
                                                                                                                          accum.total_price += curElem.price.mrp;
                                                                                                                          let temp_discount = curElem.price.mrp - curElem.price.cost;
                                                                                                                          accum.total_discount += temp_discount;
                                                                                                                          return accum;
                                                                                                                      },{
                                                                                                                          total_quantity : 0,
                                                                                                                          total_price : 0,
                                                                                                                          total_discount : 0
                                                                                                                        }
                                                                                                  );
                                                          return {
                                                                      total_quantity,
                                                                      total_price,
                                                                      total_discount
                                                                  }
                                              }*/

                                            }
                              });


export const { add, remove, clearCart, setIncrease, setDecrease } = cartSlice.actions;
export default cartSlice.reducer;
