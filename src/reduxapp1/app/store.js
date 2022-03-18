import {configureStore} from "@reduxjs/toolkit";
import postsReducer from "../features/postsSlice";
import usersReducer from "../features/users/usersSlice";
import {postsApi} from "../features/postsApi";
import {setupListeners} from "@reduxjs/toolkit/query";

export const store = configureStore({
    reducer: {
        posts: postsReducer,
        users: usersReducer,
        [postsApi.reducerPath]: postsApi.reducer
    },
    middleware: getDefaultMiddleware => getDefaultMiddleware().concat(postsApi.middleware)
});

setupListeners(store.dispatch);
