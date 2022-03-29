import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {addMinutes} from "date-fns";

const api = (t) => {
    return new Promise((res, rej) => {
        setTimeout(() => {
            res({
                title: 'New Notification coming',
                timestamp: addMinutes(new Date, 0).toISOString(),
                userId: 1
            });
        }, 2000);
    })
}

export const fetchNotf = createAsyncThunk(
    'notifications/fetchNotifications',
    async (_, { getState }) => {
        const allNotifications = selectAllNotf(getState());
        const [latestNotification] = allNotifications;
        const latestTimestamp = latestNotification ? latestNotification.timestamp : '';
        const response = await api(latestTimestamp);
        return response;
    }
)

const notificationsSlice = createSlice({
    name: 'notifications',
    initialState: [
        {title: 'App writing in progress', timestamp: addMinutes(new Date, 5).toISOString(), userId: 2},
        {title: 'Peter started to write the app', timestamp: addMinutes(new Date, 8).toISOString(), userId: 3}
    ],
    reducers: {},
    extraReducers: {
        [fetchNotf.fulfilled]: (state, action) => {
            state.push(action.payload);
            state.sort((a,b) => b.timestamp.localeCompare(a.timestamp));
        }
    }
});

export const selectAllNotf = state => state.notifications;

export default notificationsSlice.reducer;
