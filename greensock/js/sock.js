setTimeout(() =>{
    gsap.from(".hero__btn",{opacity:0,y:200,duration:2})
    gsap.from(".hero__descr",{opacity:0,x:300,duration:3})
    gsap.from(".hero__title",{opacity:0,y:-500,duration:4})
    gsap.from(".photos__one",{opacity:0,x:400,duration:2})
    gsap.from(".photos__two",{opacity:0,x:400,duration:3})
    gsap.from(".photos__three",{opacity:0,x:400,duration:4})
    gsap.from(".photos__time",{opacity:0,y:-400,duration:3})
    gsap.from(".photos__social",{opacity:0,x:400,duration:3.5})
    gsap.from(".logo",{opacity:0,x:400,duration:4})
}
)