import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {addMinutes} from "date-fns";

let counter = 0;
const api = (t) => {
    const demoNotf = [
        {title: 'New Notification coming 7', timestamp: addMinutes(new Date, 7).toISOString(), userId: 7, read: false, isNew: true},
        {title: 'New Notification coming 5', timestamp: addMinutes(new Date, 4).toISOString(), userId: 5, read: false, isNew: true},
        {title: 'New Notification coming 3', timestamp: addMinutes(new Date, 3).toISOString(), userId: 3, read: false, isNew: true},
        {title: 'New Notification coming 1', timestamp: addMinutes(new Date, 1).toISOString(), userId: 1, read: false, isNew: true},
    ];
    return new Promise((res, rej) => {
        setTimeout(() => {
            res(demoNotf[counter]);
            counter++;
        }, 800);
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
        {title: 'Peter started to write the app', timestamp: addMinutes(new Date, 11).toISOString(), userId: 3, read: false, isNew: true},
        {title: 'App writing in progress', timestamp: addMinutes(new Date, 14).toISOString(), userId: 2, read: false, isNew: true},
    ],
    reducers: {
        allNotfRead: (state, action) => {
            state.forEach(n => {
                n.read = true;
            })
        }
    },
    extraReducers: {
        [fetchNotf.fulfilled]: (state, action) => {
            state.push(action.payload);
            state.forEach(n => {
                n.isNew = !n.read;
            })
            state.sort((a,b) => a.timestamp.localeCompare(b.timestamp));
        }
    }
});

export const { allNotfRead } = notificationsSlice.actions;

export const selectAllNotf = state => state.notifications;

export default notificationsSlice.reducer;
