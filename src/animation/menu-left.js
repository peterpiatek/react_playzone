import React, {useState} from 'react';
import {useSpring, animated} from "react-spring";

const App = () => {

    const [menuOpen, setMenuOpen] = useState(false);

    const props = useSpring({
        transform: menuOpen ? 'translateX(0%)' : 'translateX(-100%)',
        boxShadow: menuOpen ? '5px 0 8px rgba(0,0,0,0.15)' : '0px 0 0px rgba(0,0,0,0)'
    });

    return (
        <div className="m-container">
            <animated.h1 className="m-menu" style={props}>Hello</animated.h1>
            <button onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? 'Close' : 'Open'}</button>
        </div>
    );
};

export default App;
