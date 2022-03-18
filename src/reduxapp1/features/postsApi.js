import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";

export const postsApi = createApi({
    reducerPath: 'postsApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'https://jsonplaceholder.typicode.com/' }),
    endpoints: builder => ({
        getPosts: builder.query({
            query: () => 'posts'
        })
    })
})

export const selectAllUsers = state => state.users;

export const selectUserById = (state, id) => {
    if(id){
        console.log(state.users.find(u => Number(u.id) === Number(id)));
        return state.users.find(u => u.id === id);
    }
}

export const { useGetPostsQuery } = postsApi;
