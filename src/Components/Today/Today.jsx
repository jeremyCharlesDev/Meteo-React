import React from 'react'

function Today({condition}) {
    let hue = Math.round((30 - (condition.tmp)) *6);

    return (
        <>
            <p>{condition.date}</p>
            <p>{condition.condition}</p>
            <img src={condition.icon_big} alt=""/>
            <p className="temp" style={{color: `hsl(${hue}, 70%, 50%)`}}>{condition.tmp}°</p>
        </>

    )

}

export default Today
