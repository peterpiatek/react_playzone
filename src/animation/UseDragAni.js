// noinspection JSVoidFunctionReturnValueUsed

import React, {useEffect, useState} from 'react';
import {useSprings, animated, to, useSpring} from "react-spring";
import {useDrag} from '@use-gesture/react';

const toani = (i) => ({
    x: 0,
    y: i * -4,
    scale: 1,
    rot: -10 + Math.random() * 20,
    delay: i * 100
});

const Deck = () => {

    const [items, setItems] = useState([1, 2, 3, 4, 5, 6]);
    const [toGo, setToGo] = useState(new Set());
    const [springs, api] = useSprings(items.length, i => ({
        from: {x: 0, rot: 0, scale: 1.5, y: -1000},
        ...toani(i),
    }))
    useEffect(() => {
        api.stop();
        setTimeout(() => {
            api.start(i => toani(i));
        }, 500);
    }, []);

    const cardDrag = useDrag(({
                                  args: [currentCard],
                                  down,
                                  active,
                                  direction: [dirX],
                                  movement: [mx, my],
                                  velocity: [velocityX]}) => {

        const dir = dirX > 0 ? 1 : -1;
        console.log(velocityX);
        if(!active && (velocityX > 0.25)){
            console.log('in');
            setToGo(toGo => new Set(toGo).add(currentCard));
        }

        api.start(i => {
            console.log(toGo);
            if(i === currentCard){
                const canFlyOut = toGo.has(currentCard);
                console.log(canFlyOut);
                const x = canFlyOut ? (200 + window.innerWidth) * dir : down ? mx : 0
                const scale = down ? 1.1 : 1

                return {x, scale}
            }
        })
        if(!down && toGo.size === items.length){
            setTimeout(() => {
                toGo.clear();
                api.start(i => toani(i));
            }, 500)
        }
    })



    // const [dragProps, dragApi] = useSpring(() => ({x: 0, y: 0, backgroundColor: 'aquamarine'}));
    // const bindDrag = useDrag(({active, movement: [mx, my], cancel}) => {
    //     if(mx > 400 || my > 400) {
    //         dragApi.start({backgroundColor: 'red'});
    //         cancel();
    //     }
    //     if(mx < -400 || my < -400) {
    //         dragApi.start({backgroundColor: 'blue'});
    //         cancel();
    //     }
    //     dragApi.start({x: active ? mx : 0,  y: active ? my : 0});
    // }, {
    //     // axis: 'lock',
    //     // bounds: { left: -100, right: 100, top: -50, bottom: 50 }
    // });

    return (
        <>
            {springs.map(({x, y, rot, scale}, i) => (
                <animated.div {...cardDrag(i)} className="card"
                              key={i}
                              style={{
                                  x, y,
                                  transform: to([rot, scale], (r, s) => `perspective(1500px) rotateX(30deg) rotateY(${r / 10}deg) rotateZ(${r}deg) scale(${s})`),
                              }}
                />
            ))}
            {/*<animated.div {...bindDrag()} style={dragProps} className="draggable" />*/}
            {/*<button onClick={() => api.start(i => (toani(i)))}>Play</button>*/}
        </>
    );
};

const UseDragAni = () => {
    return (
        <div className="container">
            <Deck/>
        </div>
    );
}

export default UseDragAni;
