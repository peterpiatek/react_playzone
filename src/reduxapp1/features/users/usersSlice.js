import {createAsyncThunk, createEntityAdapter, createSlice} from '@reduxjs/toolkit';
import axios from "axios";

export const usersAdapter = createEntityAdapter({
    sortComparer: (a, b) => a.name.localeCompare(b.name)
});
const initialState = usersAdapter.getInitialState();

export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
    const res = await axios.get('https://jsonplaceholder.typicode.com/users');
    return res.data;
})

const usersSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder.addCase( fetchUsers.fulfilled, usersAdapter.setAll)
    }
})
// replacing with adapter auto-generated functions
// export const selectAllUsers  = state => state.users;
// export const selectUserById = (state, userId) => state.users.find(u => u.id.toString() === userId.toString());

export const {
    selectById: selectUserById,
    selectIds: selectUserIds,
    selectEntities: selectUserEntities,
    selectAll: selectAllUsers,
    selectTotal: selectTotalUsers,
} = usersAdapter.getSelectors((state) => state.users)

export default usersSlice.reducer;
