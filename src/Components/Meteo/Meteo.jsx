import React, {useState, useEffect, useRef} from 'react'
import axios from 'axios';
import Today from '../Today/Today'
import BtnLike from '../BtnLike/BtnLike'
import PrevisionJour from '../PrevisionJour/PrevisionJour'
import PrevisionHeure from '../PrevisionHeure/PrevisionHeure'
import gsap from "gsap"
import Animate from '../Animate/animate'

// https://www.data.gouv.fr/fr/datasets/previsions-meteo-france/

const Meteo = () => {


    let ville = JSON.parse(localStorage.getItem("ville"));
    let defaultCity;
    ville && ville.length > 0 ? defaultCity = ville[0] : defaultCity = "angers"
    const [city, setCity] = useState(defaultCity)
    const [cityInfo, setCityInfo] = useState([])
    const [currentCondition, setCurrentCondition] = useState([])
    const [search, setSearch] = useState("")
    const [resultat, setResultat] = useState(true)
    const [likeCity, setLikeCity] = useState([])
    const [prevision, setPrevision] = useState([])
    const [hourlyData, setHourlyData] = useState([])

    const [today, setToday] = useState(true)
    const [heure, setHeure] = useState(false)
    const [semaine, setSemaine] = useState(false)

    let eltRef = useRef([]);



    useEffect(() => {

        const fetchData = async () => {
            const result = await axios.get(`https://www.prevision-meteo.ch/services/json/${city}`)
            let dataArray = result.data;
            let count = Object.keys(dataArray).length;
            if(count === 1){
                setResultat(false)
            } else {
                setResultat(true)
                setCurrentCondition(dataArray.current_condition)
                setCityInfo(dataArray.city_info)
                setPrevision([dataArray.fcst_day_1, dataArray.fcst_day_2, dataArray.fcst_day_3, dataArray.fcst_day_4])

                //data pour les heures
                let dataHour = dataArray.fcst_day_0.hourly_data
                let finalArrayHour = [];
                Object.values(dataHour).forEach((val) => {
                    finalArrayHour = [...finalArrayHour, val];
                  });
                setHourlyData(finalArrayHour)
            }
        }
        fetchData()       
                
        heure && gsap.set('.containerDataHour', {opacity: 1})
        heure && Animate([eltRef.current])


        let ville = JSON.parse(localStorage.getItem("ville"))
        ville && setLikeCity(ville)


    }, [city, currentCondition.tmp, heure])



    const handleChange = (e) => {
        setSearch(e.target.value)
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        setCity(search)
        setSearch("")
    }


    const showCityLike = (city) => {
        setCity(city);
    }

    const btncitylike = ville ? 
            ville.map((like, index) => (
                    <button key={index} onClick={() => showCityLike(like)}>{like.toUpperCase()}</button>
                ))
       :
            likeCity.map((like, index) => (
                <button key={index} onClick={() => showCityLike(like)}>{like.toUpperCase()}</button>
            ))
        
    

    let num = 0

    const handleAffiche = (val) => {
        if(val === "today"){
            setSemaine(false);
            setHeure(false);
            setToday(true);
        } else if(val === "heure"){
            setSemaine(false);
            setHeure(true);
            setToday(false);
        } else if(val === "semaine"){
            setSemaine(true);
            setHeure(false);
            setToday(false);
        }
    }


    return (
        
        <main className="container">
            <form onSubmit={handleSubmit}>
                <input type="text" name={search} value={search} onChange={handleChange} placeholder="Rechercher une ville"/>
                <button><i className="fas fa-search"></i></button>
            </form>

            {btncitylike.length > 0 && <div className="itemCityLike">{btncitylike}</div>}

            {resultat ? 

            (
            <div className="content">
                <h1 style={{width: "100%", textAlign:"center"}}>{cityInfo.name}</h1>

                <nav>
                    <ul>
                        <li className={today ? "active liste" : "liste"} onClick={() => handleAffiche("today")}>Météo aujourd'hui</li>
                        <li className={heure ? "active liste": "liste"} onClick={() => handleAffiche("heure")}>Prévision aujourd'hui h/h</li>
                        <li className={semaine ? "active liste" : "liste"} onClick={() => handleAffiche("semaine")}>Prévision de la semaine</li>
                    </ul>
                </nav>

                {today &&
                    <div className="infoMeteo">
                        <BtnLike city={city} likeCity={likeCity} setLikeCity={setLikeCity}/>
                        <Today condition={currentCondition}/>
                    </div>
                }

                {semaine &&
                    <div className="containerPrev">

                            {prevision.map((prev, index) => (
                                <div key={index}>
                                    <PrevisionJour condition={prev}/>
                                </div>
                            ))}
                    </div>
                }

                {heure &&
                    <div className="containerDataHour">
                        <h3 style={{width: "100%", textAlign:"center"}}>Prévision heure par heure</h3>
                            {hourlyData.map((prev, index) => (
                                <div key={index} className="blocDataHour" ref={el => eltRef.current[index] = el}>
                                    <PrevisionHeure condition={prev} heure={num++}/>
                                </div>
                            ))}
                    </div>
                }
                
            </div>
            )
            
            :
    
            (<div className="error">Cette ville ne retourne aucun résultats</div>)}
        </main>
        
            

    )
}

export default Meteo
