let scroll;

// events
document.addEventListener('DOMContentLoaded', () => {
  navbarfix()
  locomotiveInit()
  swiperWraper()
});

window.onload = ()=>{
  loaded();
}


// function
function loaded(){
  document.querySelector("#preloader").remove();
}

function navbarfix(){
  try {
    let navHeight = document.querySelector('navbar').scrollHeight;
    document.querySelector("#navfix").style.height = navHeight+"px";
    document.querySelector("#maxhfix").style.minHeight = document.querySelector("#maxhfix").clientHeight - navHeight + "px";
  } catch (error) {
    console.log(error);
  }
}

function locomotiveInit() {
  try {
    scroll = new LocomotiveScroll({
      el: document.querySelector('[data-scroll-container]'),
      smooth: true,
      repeat : true,
      speed: 0.33,
      reloadOnContextChange: true,
      smartphone:{
        smooth: false,
      },
      tablet:{
        smooth: false,
      }
    });
    document.querySelector('.c-scrollbar').classList.add('z-50')
    document.querySelector('.c-scrollbar_thumb').classList.add('!bg-neutral-400')
  } catch (error) {
    console.log(error);
  }
}

function navTogle(event, navOpen) {
  navOpen ? scroll.stop() : scroll.start();
  navOpen ? document.body.classList.add('overflow-hidden') : document.body.classList.remove('overflow-hidden');
}

function swiperWraper(){
  const swiper = new Swiper('.swiper', {
    autoHeight:true,
    loop: true,
    slidesPerView: "auto",
    autoplay: {
      delay : 2000,
      disableOnInteraction : false,
      pauseOnMouseEnter : false,
    },
  });
}