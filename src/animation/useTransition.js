import {useEffect, useState} from "react";
import './App.css';
import bg1 from './img/bg1.jpg';
import bg2 from './img/bg2.jpg';
import bg3 from './img/bg3.jpg';
import useInterval from 'react-useinterval';
import {useTransition, animated} from "react-spring";

const UseTransition = () => {
    const [index, setIndex] = useState(0);
    const imagesUrls = [bg1, bg2, bg3];

    const increment = () => setIndex(state => (state + 1) % imagesUrls.length);

    const transitions = useTransition(imagesUrls[index], {
        from: {opacity: 0, transform: 'scale(1)'},
        enter: {opacity: 1, transform: 'scale(1)'},
        leave: {opacity: 0, transform: 'scale(1.2)'}
    });

    useInterval(increment, 2000);

    return (
        <div className="App">
            {
                transitions((props, item) => {
                    return <animated.div
                        className="slide"
                        style={{
                            backgroundImage: `url(${item})`,
                            ...props
                        }}
                    />
                })
            }
        </div>
    );

}

export default UseTransition;
