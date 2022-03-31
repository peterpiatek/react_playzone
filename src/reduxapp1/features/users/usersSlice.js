import {createAsyncThunk, createEntityAdapter, createSlice} from '@reduxjs/toolkit';
import axios from "axios";
import {postsAdapter} from "../postsSlice";

const normalize = (payload) => {
    return payload.reduce((byId, d) => {
        byId[d.id] = d;
        return byId
    }, {})
}

const usersAdapter = createEntityAdapter({
    sortComparer: (a, b) => a.name.localeCompare(b.name),
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
        builder.addCase( fetchUsers.fulfilled, (state, action) => {
            const byId = normalize(action.payload);
            usersAdapter.upsertMany(state, byId);
        })
    }
})

export const {
    selectById: selectUserById,
    selectIds: selectUserIds,
    selectEntities: selectUserEntities,
    selectAll: selectAllUsers,
    selectTotal: selectTotalUsers,
} = usersAdapter.getSelectors((state) => state.users);

// no need - replaced by adapter
// export const selectAllUsers = state => state.users;
// export const selectUserById = (state, id) => state.users.find(u => String(u.id) === String(id));

export default usersSlice.reducer;
