import React from 'react';
import ReactDOM from 'react-dom';
// import './animation/index.css';
// import Cards_animation from './animation/Cards_animation';
// import UseDragAni from "./animation/UseDragAni";

import {BrowserRouter} from "react-router-dom";

import {store} from "./reduxapp1/app/store";
import {Provider} from "react-redux";
import App from "./reduxapp1/App";
import {fetchUsers} from "./reduxapp1/features/users/usersSlice";

store.dispatch(fetchUsers())

ReactDOM.render(
  <React.StrictMode>
      <Provider store={store}>
          <App />
      </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

