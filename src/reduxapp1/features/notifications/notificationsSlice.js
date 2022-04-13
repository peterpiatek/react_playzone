import {createAsyncThunk, createEntityAdapter, createSlice} from "@reduxjs/toolkit";
import {addMinutes} from "date-fns";

const tempNotf = [
    {id: 1, title: 'Not 1', body: 'Not 1 body', timestamp: addMinutes(new Date(), -15).toISOString(), userId: 2, isNew: true, read: false},
    {id: 2, title: 'Not 2', body: 'Not 2 body', timestamp: addMinutes(new Date(), -12).toISOString(), userId: 3, isNew: true, read: false},
    {id: 3, title: 'Not 3', body: 'Not 3 body', timestamp: addMinutes(new Date(), -8).toISOString(), userId: 4, isNew: true, read: false},
    {id: 4, title: 'Not 4', body: 'Not 4 body', timestamp: addMinutes(new Date(), -4).toISOString(), userId: 3, isNew: true, read: false},
];
let tempNotfIndex = 0;

const fetchNot = () => {
    // time to detect only new notifications ignored in demo data
    return new Promise((res) => {
        setTimeout(() => {
            res({data: [tempNotf[tempNotfIndex]]});
            tempNotfIndex++;
        }, 800)
    })
}

const notfAdapter = createEntityAdapter({
    sortComparer: (a,b) => b.timestamp.localeCompare(a.timestamp)
})
const initialState = notfAdapter.getInitialState();

export const fetchNotifications = createAsyncThunk('notifications/fetchNotifications',
    async (_, {getState}) => {
    const [latestNot] = selectAllNot(getState());
    const latestTime = latestNot ? latestNot.timestamp : '';
    const res = await fetchNot(latestTime);
    return res.data;
})

const notificationsSlice = createSlice({
    name: 'notifications',
    initialState,
    reducers: {
        allNotificationsRead(state, action) {
            // replacing update code with state.entity from adapter
            // state.forEach(n => n.read = true);
            Object.values(state.entities).forEach(n => n.read = true)
        }
    },
    extraReducers: {
        [fetchNotifications.fulfilled]: (state, {payload}) => {
            // replacing with adapter
            // state.push(action.payload);
            notfAdapter.upsertMany(state, payload);
            // replacing update code with adapter state.entities
            // state.forEach(n => n.isNew = !n.read);
            Object.values(state.entities).forEach(n => n.isNew = !n.read);
            // normally .sort mutates an array - which is not allowed on redux state. In this case its possible because we use createSlice built in Immer
            // state.entities.sort((a,b) => b.timestamp.localeCompare(a.timestamp));
        }
    }
})

// export const selectAllNot = state => state.notifications;
export const {
    selectAll: selectAllNot
} = notfAdapter.getSelectors(state => state.notifications);

export const { allNotificationsRead } = notificationsSlice.actions;

export default notificationsSlice.reducer;
