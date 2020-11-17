import React from 'react'

function PrevisionHeure({condition, heure}) {


    return (
        <div className="prev prevHeure" >
            <p>{heure}H00</p>
            <small>{condition.CONDITION}</small>
            <img src={condition.ICON} alt=""/>
        </div>
    )
}

export default React.memo(PrevisionHeure)
