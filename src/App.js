import './App.css';
import {useEffect, useRef} from 'react'
import Meteo from './Components/Meteo/Meteo'
import Footer from './Components/Footer/Footer';
import gsap from "gsap"


function App() {

    let blocBack = useRef(null)

      useEffect(() => {
        const tl = new gsap.timeline();
        tl
        .from(blocBack, 2, {opacity: 0, scale: 1.1, ease: "bounce.out"})
    }, []);




  let fond = [
    "https://images.unsplash.com/photo-1562396867-92979af50031?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1000&q=80",
    "https://images.unsplash.com/photo-1460411794035-42aac080490a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80",
    "https://images.unsplash.com/photo-1481007553706-bde1ba8e91fd?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80"
  ]

  return (
    <div className="App" style={{backgroundImage: `url(${fond[Math.floor(Math.random() * fond.length)]})`}}>
      <div className="blocBack" ref={el => blocBack = el}></div>
      <Meteo/>
      <Footer/>

    </div>
  );
}

export default App;
