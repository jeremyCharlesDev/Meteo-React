import React from 'react'

function BtnLike({city, likeCity, setLikeCity}) {


    const btnlike = likeCity.findIndex((element) => element === city) !== -1 ? <i className="fas fa-heart"></i> : <i className="far fa-heart"></i>;

    const togglesaveCity = () => {
        const findcity = (element) => element === city;
        if(likeCity.findIndex(findcity) === -1){
            setLikeCity([...likeCity, city])
            localStorage.setItem("ville", JSON.stringify([...likeCity, city]))
        } else {
            setLikeCity([...likeCity.filter(ville => ville !== city)])
            localStorage.setItem("ville", JSON.stringify([...likeCity.filter(ville => ville !== city)]))
        }
    }





    return (
        <div>
            <button onClick={togglesaveCity} className="btnLike">{btnlike}</button>
        </div>
    )
}

export default React.memo(BtnLike)
