// Register the GSAP plugins
gsap.registerPlugin(ScrollTrigger);

const locoScroll = new LocomotiveScroll({
    el: document.querySelector(".main"),
    smooth: true
});
locoScroll.on("scroll", ScrollTrigger.update);
ScrollTrigger.scrollerProxy(".main", {
    scrollTop(value) {
        return arguments.length ? locoScroll.scrollTo(value, 0, 0) : locoScroll.scroll.instance.scroll.y;
    }, // we don't have to define a scrollLeft because we're only scrolling vertically.
    getBoundingClientRect() {
        return { top: 0, left: 0, width: window.innerWidth, height: window.innerHeight };
    },
    // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
    pinType: document.querySelector(".main").style.transform ? "transform" : "fixed"
});

var minicircle = document.querySelector(".customcircle")
var timeout;
function thirdpageanime() {

    // var about = document.querySelector(".about-block")
    gsap.from(".about-block", {
        scrollTrigger: {
            trigger: ".about-block-para",
            scroller: ".main",
            markers: false,
            start: "top 100%",
        },
        y: 10,
        duration: 1.5,
        opacity: 0,
    })
}
function secondpageanime() {
    var secondelems = document.querySelectorAll(".elem")
    secondelems.forEach((el) => {
        gsap.from(el, {
            y: 30,
            duration: 1,
            opacity: 0,

            scrollTrigger: {
                trigger: ".second",
                scroller: ".main",
                markers: false,
                start: "top 60%",
            }
        })
    })

}
function firstpageanime() {
    var tl = gsap.timeline()

    tl.from("nav", {
        y: 50,
        opacity: 0,
        duration: 0.5,
        delay: .1,
        ease: Expo.easeInout
    })
    tl.to(".boundingelem", {
        y: 0,
        duration: 0.5,
        stagger: 0.2
    })
    tl.from(".hero-footer", {
        y: 10,
        opacity: 0,
        duration: 0.8,
        delay: -.5
    })
}

function circlechapta() {
    var xprev = 0;
    var yprev = 0;
    window.addEventListener("mousemove", (dets) => {
        clearTimeout(timeout)

        var xdiff = xprev - dets.clientX
        var ydiff = yprev - dets.clientY
        xprev = dets.clientX;
        yprev = dets.clientY;


        var scalex = gsap.utils.clamp(.9, 1.3, xdiff)
        var scaley = gsap.utils.clamp(.9, 1.3, ydiff)
        minicirclefunc(scalex, scaley)

        timeout = setTimeout(() => {
            minicircle.style.transform = `translate(${dets.clientX}px, ${dets.clientY}px) scale(1,1)`
        }, 100)
    })
}

function minicirclefunc(scalex, scaley) {

    window.addEventListener("mousemove", (e) => {
        const margin = 2;

        if (e.clientX <= margin || e.clientY <= margin ||
            e.clientX >= window.innerWidth - margin ||
            e.clientY >= window.innerHeight - margin) {
            minicircle.style.opacity = '0';
        }
        else {
            minicircle.style.transform = `translate(${e.clientX}px, ${e.clientY}px) scale(${scalex},${scaley})`
            minicircle.style.opacity = '1'
        }

    })

}

function image_effect() {

    const elems = document.querySelectorAll(".elem")
    var rotate = 0;
    var differ = 0;
    elems.forEach((e) => {
        e.addEventListener("mouseenter", (dets) => {
            e.firstElementChild.style.opacity = "1"
            e.firstElementChild.style.display = "block"
            gsap.to(e.children[1], {
                x: 30,
                opacity: .2,
                duration: .5,
                ease: Power3
            })
            gsap.to(e.children[2], {
                opacity: .2,
                duration: .5,
                ease: Power3
            })
        })
        e.addEventListener("mouseleave", (dets) => {
            e.firstElementChild.style.opacity = "0"
            e.firstElementChild.style.display = "none"
            gsap.to(e.children[1], {
                x:0,
                opacity: .7,
                duration: .5,
                ease: Power3
            })
            gsap.to(e.children[2], {
                opacity: .7,
                duration: .5,
                ease: Power3
            })
        })
        e.addEventListener("mousemove", (dets) => {
            differ = dets.clientX - rotate;
            rotate = dets.clientX;
            var diff = dets.clientY - e.getBoundingClientRect().top - 120
            e.firstElementChild.style.transform = `translate(${dets.clientX - 250}px, ${Math.floor(diff)}px)`
            // e.firstElementChild.style.rotate = `${gsap.utils.clamp(-20, 20, differ * 0.1)}deg`
        })
    });

}

function rmv_cursor() {
    const btn = document.querySelector(".talk-btn")
    const second = document.querySelector(".second")
    second.addEventListener("mouseenter", () => {
        document.querySelector("#cursor").classList.remove("customcircle")
    })
    second.addEventListener("mouseleave", () => {
        document.querySelector("#cursor").classList.add("customcircle")
    })
    btn.addEventListener("mouseenter", () => {
        document.querySelector("#cursor").classList.remove("customcircle")
    })
    btn.addEventListener("mouseleave", () => {
        document.querySelector("#cursor").classList.add("customcircle")
    })
}



function hover_effect(){

    const btn = document.querySelector(".talk-btn")
    btn.addEventListener("mousemove",(dets)=>{
        const x = dets.clientX - btn.getBoundingClientRect().left;
        const y = dets.clientY - btn.getBoundingClientRect().top;

        btn.style.setProperty('--x',x + 'px')
        btn.style.setProperty('--y',y + 'px')
    })
}


function time(){
     const now = new Date();
            const hours = now.getHours().toString().padStart(2, '0');
            const minutes = now.getMinutes().toString().padStart(2, '0');
            const seconds = now.getSeconds().toString().padStart(2, '0');

            const currentTime = `${hours}:${minutes}:${seconds} PM EST`;
            document.querySelector('#time').textContent = currentTime;
}

setInterval(time, 1000)
time()
hover_effect()
rmv_cursor()
image_effect()
circlechapta()
secondpageanime()
firstpageanime()
thirdpageanime()



ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

// after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
ScrollTrigger.refresh();
