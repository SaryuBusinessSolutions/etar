// variables
let scroll;
let fuse;
let swiper;

// events
document.addEventListener('DOMContentLoaded', () => {
  loadFuse();
  navbarfix();
  locomotiveInit();
  swiperWraper();
  textSplit();
});

window.onload = ()=>{
  loaded();
}

function loadFuse(){
  const options = {
    keys: ['url', 'title', 'content']
  }
  fuse = new Fuse([], options)

  fetch('/siteSearch.json')
    .then(body => body.json())
    .then(data => {
      fuse.setCollection(data);
    })
    .catch((error) => {
      console.log(error);
    });
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

function navTogle(navOpen) {
  let nav  = document.querySelector('[x-data*="navOpen"]')._x_dataStack[0];

  if(!navOpen) nav.$data.navOpen = !nav.$data.navOpen;
  navOpen ? document.body.classList.add('overflow-hidden') : document.body.classList.remove('overflow-hidden');
  navOpen ? swiper.disable() : swiper.enable();
  document.querySelectorAll('.navlink').forEach((navlink, index) => {
    setTimeout(() => {
      navlink.classList.toggle('translate-x-full');
      navlink.classList.toggle('md:translate-x-[200%]');
    }, 100*index);
  });
  setTimeout(() => {
    if (navOpen) nav.$data.navOpen = !nav.$data.navOpen;
  }, 600);
}

function swiperWraper(){
  swiper = new Swiper('.swiper', {
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

function textSplit(){
  try {
    document.querySelectorAll('[split]').forEach(split => {
      console.log(split.innerText);
    });
  } catch (error) {
    console.log(error)
  } 
}