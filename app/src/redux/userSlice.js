import { createSlice } from "@reduxjs/toolkit"

const useSlice = createSlice({
    name: 'user',
    initialState: {
        user: null,
    },
    reducers: {
        setToken: (state, action) => {
            state.token = action.payload;
        },
        removeToken: (state) => {
            state.user = null;
        },
    }
})

export const { setToken , removeToken } = useSlice.actions;
export default useSlice.reducer;