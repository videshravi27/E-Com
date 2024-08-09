import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        items: [],
    },
    reducers: {
        setCart: (state, action) => {
            state.items = action.payload;
        },
        addItem: (state, action) => {
            state.items.push(action.payload);
            // console.log("=> action", action)
        }
    }
})

export const { setCart, addItem } = cartSlice.actions;  // named export many
export default cartSlice.reducer;  // default export only 1