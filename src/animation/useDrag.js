import { useSpring, animated } from 'react-spring';
import { useDrag } from '@use-gesture/react';

function App() {
    const [{ x, y }, api] = useSpring(() => ({ x: 0, y: 0 }))

    // Set the drag hook and define component movement based on gesture data
    const bind = useDrag(({ down, movement: [mx, my] }) => {
        api.start({ x: down ? mx : 0, y: down ? my : 0, immediate: down });
    });

    // Bind it to a component
    return <div className="c-container">
        <animated.div className="drag-square" {...bind()} style={{ x, y }} />
    </div>
}

export default App;
