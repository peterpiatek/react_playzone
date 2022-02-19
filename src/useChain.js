import React, {useEffect, useState} from 'react';
import {animated, useChain, useSpring, useSpringRef, useTransition} from 'react-spring';
import useInterval from 'react-useinterval';

const App = () => {

    const containerRef = useSpringRef();
    const props = useSpring({
        from: {opacity: 0},
        opacity: 1,
        ref: containerRef
    });
    const boxes = [];
    const [boxnum, setBoxnum] = useState([]);

    const addBox = () => {
        setBoxnum(boxnum => [...boxnum, boxnum.length + 1]);
    }

    useEffect(() => {
        const generateBox = () => {
            if (boxnum.length <= 24) {
                setTimeout(() => {
                    setBoxnum(boxnum => [...boxnum, boxnum.length + 1]);
                    generateBox();
                }, 100);
            }
        }
        // generateBox();
    }, [])

    const boxRef = useSpringRef();
    const transitions = useTransition(boxnum, {
        from: {opacity: 0, transform: 'scale(1.3)', top: '-30px'},
        enter: {opacity: 1, transform: 'scale(1)', top: '0px'},
        leave: {opacity: 0, transform: 'scale(0.5)'},
        delay: 100,
        ref: boxRef
    });

    useChain([containerRef, boxRef]);

    const removeBox = (id) => {
        console.log(id);
        setBoxnum(boxnum => {
            // console.log(boxnum.filter(i => i !== id));
            // return boxnum.filter(i => i !== id);
            const newBoxnum = [...boxnum];
            newBoxnum.splice(id, 1);
            setBoxnum(newBoxnum);
        });
    }

    return (
            <animated.div className="c-container" style={props}>
                {transitions((props, item) => {
                    return <animated.div key={item} onClick={() => removeBox(item)} className="c-box" style={props}> {item} </animated.div>
                })}
                <div>
                    <button onClick={addBox}>Add box</button>
                </div>
            </animated.div>
    );
};

export default App;
