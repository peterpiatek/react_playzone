import React from 'react';
import {useSelector, useDispatch} from "react-redux";
import {signIn, signOut} from "./userSlice";

const User = () => {

    const user = useSelector(state => state.user.user);
    const dispatch = useDispatch();

    const data = {username: 'peter@mail.com', passwprd: 'asdkjig4534'}

    return (
        <div>

            <button onClick={() => dispatch(signIn(data))}>Sign In</button>
            <button onClick={() => dispatch(signOut())}>Sign Out</button>
        </div>
    );
};

export default User;
