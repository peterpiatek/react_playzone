import {createSlice} from '@reduxjs/toolkit';

const usersSlice = createSlice({
    name: 'users',
    initialState: [
        {id: 1, name: 'Peter'},
        {id: 2, name: 'John'},
    ],
    reducers: {

    }
})

export default usersSlice.reducer;
