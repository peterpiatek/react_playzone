import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axios from "axios";
import {addMinutes, parseISO} from 'date-fns';

const postsSlice = createSlice({
    name: "posts",
    // initialState: [
        // {id: 1, title: "First post", content: 'Hello',
        //     timestamp: sub(new Date(), {minutes: 10}).toISOString(),
        //     reactions: {thumbsUp: 0, hooray: 0, heart: 0, rocket: 0, eyes: 0}
        // },
        // {id: 2, title: "Second post", content: 'Hello again',
        //     timestamp: sub(new Date(), {minutes: 5}).toISOString(),
        //     reactions: {thumbsUp: 0, hooray: 0, heart: 0, rocket: 0, eyes: 0}
        // }
    // ],
    initialState: {
        posts: [
            // {id: 2, title: "Second post", content: 'Hello again',
            //     timestamp: sub(new Date(), {minutes: 5}).toISOString(),
            //     reactions: {thumbsUp: 0, hooray: 0, heart: 0, rocket: 0, eyes: 0}}
        ],
        status: 'idle',
        error: null
    },
    reducers: {
        /*savePost: {
            reducer(state, action){
                console.log(action);
                state.posts.push(action.payload);
            },
            prepare(title, content, user){
                return {
                    payload: {
                        id: nanoid(),
                        title,
                        content,
                        user,
                        timestamp: new Date().toISOString(),
                        reactions: {thumbsUp: 0, hooray: 0, heart: 0, rocket: 0, eyes: 0}
                    }
                }
            }
        },*/
        updatePost: (state, action) => {
            const { id, title, content } = action.payload;
            const editPost = state.posts.find(p => p.id === id);
            if(editPost){
                editPost.title = title;
                editPost.content = content
            }
        },
        deletePost: (state, action) => {
            state.posts.splice(state.posts.findIndex(p => String(p.id) === String(action.payload)), 1);
        },
        reactionUpdate: (state, action) => {
            const {id, name} = action.payload;
            const existingPost = state.posts.find(p => String(p.id) === String(id));
            if(existingPost){
                existingPost.reactions[name]++
            }
        },
    },
    extraReducers(builder) {
        builder
            .addCase(fetchPosts.pending, (state, action) => {
                console.log('loading');
                state.status = 'loading'
            })
            .addCase(fetchPosts.fulfilled, (state, action) => {
                console.log('success');
                state.status = 'success';
                const posts = action.payload.slice();
                posts.forEach((p, i) => {
                    p.timestamp = (addMinutes(new Date, i * 5)).toISOString();
                });
                state.posts = state.posts.concat(posts);
            })
            .addCase(fetchPosts.rejected, (state, action) => {
                state.status = 'fail'
                state.error = action.error.message
            });
        builder
            .addCase(savePost.fulfilled, (state, action) => {
                state.posts.push(action.payload);
            })
    }
})

export const selectAllPosts = state => state.posts.posts;
export const selectPostById = (state, id) => {
    if(id){
        return state.posts.posts.find(p => {
            return Number(p.id) === Number(id);
        })
    } else {
        return null
    }
}
export const selectPostsByUser = (state, userId) => {
    if(userId){
        return state.posts.posts.filter(p => Number(p.userId) === Number(userId));
    } else {
        return null
    }
}

export const savePost = createAsyncThunk('posts/savePost', async post => {
    try {
        const fetch = (post) => {
            return new Promise((res, rej) => {
                setTimeout(() => {
                    res({
                        ...post,
                        timestamp: new Date().toISOString()
                    })
                }, 1500);
            })
        }
        const res = await fetch(post);
        return res;
    } catch(e) {
        console.log(e);
    }
})

export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
    try {
        const res = await axios.get('https://jsonplaceholder.typicode.com/posts');
        return res.data;
    } catch(e) {
        console.log(e);
    }
})

export const { updatePost, deletePost, reactionUpdate } = postsSlice.actions;

export default postsSlice.reducer;
