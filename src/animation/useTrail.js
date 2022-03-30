import React, {useState} from 'react';
import {useTrail, animated} from "react-spring";

const Trail = ({children, open}) => {

    const items = React.Children.toArray(children);

    const trail = useTrail(items.length, {
        opacity: open ? 1 : 0,
        x: open ? 0 : 20,
        from: {opacity: 0, x: 20}
    });

    return (
        <div>
            {trail.map(({height, ...styles}, index) => (
                <animated.div style={styles} >{items[index]}</animated.div>
                )
            )}
        </div>
    );
};

const App = () => {

    const [open, setOpen] = useState(false);

    return (
        <div>
            <Trail open={open}>
                <span>Hello</span>
                <span>World</span>
                <span>How are</span>
                <span>You?</span>
            </Trail>
            <button onClick={() => setOpen(!open)}>{open ? 'Close' : 'Open'}</button>
        </div>
    );
}

export default App;
