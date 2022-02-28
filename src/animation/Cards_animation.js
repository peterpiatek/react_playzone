import React, { useState } from 'react';
import { useSprings, animated, to as interpolate } from 'react-spring';
import { useDrag } from '@use-gesture/react';

import styles from './cards_animation.css'

const cards = [
    'https://images.unsplash.com/photo-1524502397800-2eeaad7c3fe5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8bGFkeXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60',
    'https://images.unsplash.com/photo-1627156096030-861f04ff550e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTB8fGxhZHl8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60',
    'https://images.unsplash.com/photo-1512375890245-7862e320210a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTd8fGxhZHl8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60',
    'https://images.unsplash.com/photo-1531152098621-1b075e02a7b0?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MzB8fGxhZHl8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60',
    'https://images.unsplash.com/photo-1509087859087-a384654eca4d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NDh8fGxhZHl8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60',
    'https://images.unsplash.com/photo-1589655472711-70ccd8bd285f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NjJ8fGxhZHl8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60',
]

// These two are just helpers, they curate spring data, values that are later being interpolated into css


// This is being used down there in the view, it interpolates rotation and scale into a css transform
const trans = (r, s) => `perspective(1500px) rotateX(30deg) rotateY(${r / 10}deg) rotateZ(${r}deg) scale(${s})`;

function Deck() {
    const [gone, setGone] = useState(new Set()); // The set flags all the cards that are flicked out
    // Create a bunch of springs
    const [props, api] = useSprings(cards.length, i => ({
        from: {
            x: 0,
            y: -1000,
            scale: 1.5,
            rot: 0,
        },
        x: 0,
        y: i * -4,
        scale: 1,
        rot: -10 + Math.random() * 20,
        delay: i * 100,
    }));
    // Create a gesture, we're interested in down-state, delta (current-pos - click-pos), direction and velocity
    // noinspection JSVoidFunctionReturnValueUsed
    const bind = useDrag(({ args: [index], down, movement: [mx], direction: [xDir], velocity }) => {
        const trigger = velocity[0] > 0.2 || velocity[1] > 0.2 // If you flick hard enough it should trigger the card to fly out
        // noinspection JSVoidFunctionReturnValueUsed
        const dir = xDir < 0 ? -1 : 1 // Direction should either point left or right
        if (!down && trigger) {
            setGone(gone => new Set(gone).add(index));
        } // If button/finger's up and trigger velocity is reached, we flag the card ready to fly out
        api.start(i => {
            if (index !== i) return // We're only interested in changing spring-data for the current spring
            const canFlyout = gone.has(index);
            const x = canFlyout ? (200 + window.innerWidth) * dir : down ? mx : 0 // When a card is gone it flys out left or right, otherwise goes back to zero
            const rot = mx / 100 + (canFlyout ? dir * 10 * velocity : 0) // How much the card tilts, flicking it harder makes it rotate faster
            const scale = down ? 1.1 : 1 // Active cards lift up a bit
            return {
                x,
                rot,
                scale,
                delay: undefined,
                config: { friction: 50, tension: down ? 800 : canFlyout ? 200 : 500 },
            }
        });
        // if (!down && gone.size === cards.length){
        //     setTimeout(() => {
        //         gone.clear()
        //         api.start(i => to(i))
        //     }, 600)
        // }

    })
    // Now we're just mapping the animated values to our view, that's it. Btw, this component only renders once. :-)
    return (
        <>
            {props.map(({ x, y, rot, scale }, i) => (
                <animated.div className="deck" key={i} style={{ x, y }}>
                    {/* This is the card itself, we're binding our gesture to it (and inject its index so we know which is which) */}
                    <animated.div
                        {...bind(i)}
                        style={{
                            transform: interpolate([rot, scale], trans),
                            backgroundImage: `url(${cards[i]})`,
                        }}
                    />
                </animated.div>
            ))}
        </>
    )
}

export default function Cards_animation() {
    return (
        <div className="container">
            <Deck />
        </div>
    )
}
