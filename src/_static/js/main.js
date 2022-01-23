// variables
let scroll;
let productFuse;
let swiper;

// events
document.addEventListener('DOMContentLoaded', () => {
  loadProductFuse();
  navbarfix();
  locomotiveInit();
  swiperWraper();
});

window.onload = ()=>{
  loaded();
}


function strToRegex(string) {
  return string.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&')
}

function loadProductFuse() {
  const options = {
    threshold:0.4,
    keys: ['name','type']
  }
  productFuse = new Fuse([], options)

  searchFile = document.body.getAttribute("srcfix")
  fetch(searchFile + "siteSearch.json")
    .then(body => body.json())
    .then(data => {
      productFuse.setCollection(data);
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
      speed: 0.3,
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
      navlink.classList.toggle('translate-x-[200%]');
      navlink.classList.toggle('md:translate-x-[600%]');
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

function searchProduct(value){
  if(value.length > 0){
    let lists = productFuse.search(strToRegex(value))
    let products = document.querySelectorAll("[product]");
    products.forEach(product=>{
      product.classList.add('hidden')
      let word = product.getAttribute("product").split(',')
      lists.some(list => {
        if(word.includes(list.item.name) || word.includes(list.item.type)) {
          product.classList.remove('hidden')
          return true
        }
      })
    }); 
  }else{
    document.querySelectorAll("[product]").forEach(product => {
      product.classList.remove('hidden')
    });
  }
  scroll.update()
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