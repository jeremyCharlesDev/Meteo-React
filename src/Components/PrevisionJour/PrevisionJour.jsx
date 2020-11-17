import React from 'react'

function PrevisionJour({condition}) {
    // console.log(props);

    return (
        <div className="prev">
            <h4>{condition.day_long}</h4>
            <p>{condition.date}</p>
            <p>{condition.condition}</p>
            <img src={condition.icon} alt=""/>
            <div className='blocMinMax'>
                <div>
                    <small>MIN</small>
                    <p className="temp tmin">{condition.tmin}°</p>
                </div>
                <div>
                    <small>MAX</small>
                    <p className="temp tmax">{condition.tmax}°</p>
                </div>
            </div>
        </div>
    )
}

export default PrevisionJour
