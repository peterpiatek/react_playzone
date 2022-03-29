import React from 'react';
import {BrowserRouter, Routes, Route} from "react-router-dom";
import Navbar from "./app/Navbar";
import PostsList from "./features/posts/PostsList";
import AddPostForm from "./features/posts/AddPostForm";
import SinglePostPage from "./features/posts/SinglePostPage";
import UserList from "./features/users/UserList";
import UserPosts from "./features/users/UserPosts";
import NotificationsList from "./features/notifications/NotificationsList";

const App = () => {
    return (
        <BrowserRouter>
            <Navbar />
            <Routes>
                <Route exact path="/" element={<PostsList/>} />
                <Route exact path="/post/new" element={<AddPostForm/>} />
                <Route exact path="/post/:id" element={<SinglePostPage/>} />
                <Route exact path="/post/edit/:id" element={<AddPostForm/>} />
                <Route exact path='/users' element={<UserList/>} />
                <Route exact path='/users/:id' element={<UserPosts/>} />
                <Route exact path='/notifications' element={<NotificationsList/>} />
            </Routes>
        </BrowserRouter>
    );
};

export default App;
