import React, { useRef } from 'react';
import IdleTimer from 'react-idle-timer'

const IdleTimerComponent = () => {
    const idleTimerRef = useRef(null)

    const onIdle = () => {
        console.log("User is idle")
    }
    return (
        <div>
            <IdleTimer 
                ref={idleTimerRef}
                timeout={20 * 1000}
                onIdle={onIdle}
            />
        </div>
    );
};

export default IdleTimerComponent;