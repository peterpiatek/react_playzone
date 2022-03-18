import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {addMinutes} from "date-fns";

const api = (since) => {
    return new Promise((res, rej) => {
        setTimeout(() => {
            res({message: "Notification message", date: addMinutes(since, 10)});
        }, 1500);
    })
};

export const fetchNotifications = createAsyncThunk('notifications/fetchNotifications',
    async(_, {getState}) => {
        const allNotf = selectAllNotifications(getState());
        const [newestNotf] = allNotf;
        const latestTimestamp = newestNotf ? newestNotf.date : '';
        const res = await api(latestTimestamp);
        return res.data;
    }
)

const notificationsSlice = createSlice({
    name: 'notifications',
    initialState: [],
    reducers: {},
    extraReducers: {
        [fetchNotifications.fulfilled] : (state, action) => {
            state.push(action.payload);
            state.sort((a,b) => b.date.localeCompare(a.date));
        }
    }
})

export const selectAllNotifications = state => state.notifications;
