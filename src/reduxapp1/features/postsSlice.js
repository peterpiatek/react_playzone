import {createSlice, nanoid} from '@reduxjs/toolkit';
import {sub} from "date-fns";

// https://jsonplaceholder.typicode.com/posts

const fetchPosts = () => {
    return (dispatch, getState) => {
        // dispatch(action());
    }
}

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
        posts: [{id: 2, title: "Second post", content: 'Hello again',
                timestamp: sub(new Date(), {minutes: 5}).toISOString(),
                reactions: {thumbsUp: 0, hooray: 0, heart: 0, rocket: 0, eyes: 0}}
        ],
        status: 'idle',
        error: null
    },
    reducers: {
        savePost: {
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
        },
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
        }
    }
})

export const selectAllPosts = state => state.posts;
export const selectPostById = (state, id) => {
    if(id){
        console.log(state);
        return state.posts.posts.find(p => p.id === id)
    } else {
        return null
    }
}

export const { savePost, updatePost, deletePost, reactionUpdate } = postsSlice.actions;

export default postsSlice.reducer;
