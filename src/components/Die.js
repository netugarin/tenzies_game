import React from 'react';

const Die = (props) => {
    const styles = {
        backgroundColor: props.isHeld ? "#59E391" : "#FFFFFF"
    }

    return (
        <div className="die" style={styles} onClick={() => props.hold(props.id)}>
            <h1>{props.value}</h1>
        </div>
    );
};

export default Die;