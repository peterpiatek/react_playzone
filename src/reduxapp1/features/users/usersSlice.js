import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import axios from "axios";

export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
    const res = await axios.get('https://jsonplaceholder.typicode.com/users');
    return res.data;
})

const usersSlice = createSlice({
    name: 'users',
    initialState: [],
    reducers: {},
    extraReducers(builder) {
        builder.addCase( fetchUsers.fulfilled, (state, action) => {
            return action.payload;
        })
    }
})

export const selectAllUsers = state => state.users;

export const selectUserById = (state, id) => state.users.find(u => String(u.id) === String(id));

export default usersSlice.reducer;
