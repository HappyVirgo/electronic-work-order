import React, { useRef } from 'react';
import IdleTimer from 'react-idle-timer'

const IdleTimerComponent = ({renderIdle}) => {
    const idleTimerRef = useRef(null)
    const onIdle = () => {
        console.log("User is idle")
        //renderIdle()
    }
    return (
        <div>
            <IdleTimer 
                ref={idleTimerRef}
                timeout={5 * 1000}
                onIdle={onIdle}
            />
        </div>
    );
};

export default IdleTimerComponent;