import {createSlice, createAsyncThunk, createSelector, createEntityAdapter} from '@reduxjs/toolkit';
import axios from "axios";
import {addMinutes, parseISO} from 'date-fns';

// normalize incoming data
const normalize = (payload) => {
    return payload.reduce((byId, post) => {
        byId[post.id] = post;
        return byId
    }, {})
}

export const postsAdapter = createEntityAdapter({
    //sort ids in state.posts
    sortComparer: (a, b) => a.title.localeCompare(b.title),
});
const initialState = postsAdapter.getInitialState({ status: 'idle' });

const postsSlice = createSlice({
    name: "posts",
    initialState,
    reducers: {
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
                state.status = 'loading';
            })
            .addCase(fetchPosts.fulfilled, (state, action) => {
                // normalize incoming data
                state.status = 'success';

                const byId = normalize(action.payload);

                // moving to external fn
               //  const byId = action.payload.reduce((byId, post) => {
               //      byId[post.id] = post;
               //      return byId
               // }, {});
                let i = 0;
                for (const key in byId) {
                    byId[key].timestamp = (addMinutes(new Date, i * 5)).toISOString();
                    byId[key].reactions = {thumbsUp: 0, hooray: 0, heart: 0, rocket: 0, eyes: 0};
                    i++;
                }
                // state.entities = byId;
                // state.ids = Object.keys(byId);
                postsAdapter.upsertMany(state, byId);

                // no normalization

                // state.status = 'success';
                // const posts = action.payload.slice();
                // posts.forEach((p, i) => {
                //     p.timestamp = (addMinutes(new Date, i * 5)).toISOString();
                //     p.reactions = {thumbsUp: 0, hooray: 0, heart: 0, rocket: 0, eyes: 0}
                // });
                // state.posts = state.posts.concat(posts);
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

export const {
    selectById: selectPostById,
    selectIds: selectPostIds,
    selectEntities: selectPostEntities,
    selectAll: selectAllPosts,
    selectTotal: selectTotalPosts,
} = postsAdapter.getSelectors((state) => state.posts);

// not needed - using adapter auto-generated functions
// export const selectAllPosts = state => state.posts.posts;
// export const selectPostById = (state, id) => {
//     if(id){
//         return state.posts.posts.find(p => {
//             return Number(p.id) === Number(id);
//         })
//     } else {
//         return null
//     }
// }

/*export const selectPostsByUser = (state, userId) => {
    if(userId){
        return state.posts.posts.filter(p => Number(p.userId) === Number(userId));
    } else {
        return null
    }
}*/
//replacing selector function with memoized version - moving filtering logic here instead of being in the component
export const selectPostsByUser = createSelector(
    [selectAllPosts, (state, id) => id],
    (posts, id) => posts.filter(post => Number(post.userId) === Number(id))
)

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
