import gsap from "gsap"

function animate(elem) {

    gsap.from([elem],{ 
        duration: .5,
        autoAlpha: 0,
        x: gsap.utils.wrap([100, -100]), 
        ease: "circ.in",
        y: 100,
        stagger: .1
    })

}

export default animate
