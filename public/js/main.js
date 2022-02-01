// variables
let scroll;
let productFuse;
let swiper;

// events
document.addEventListener('DOMContentLoaded', () => {
  loadProductFuse();
  navbarfix();
  swiperWraper();
});

window.onload = () => {
  loaded();
  locomotiveInit();
}

window.onscroll = ()=>{
  // scroll.update();
}

// function
function strToRegex(string) {
  return string.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&')
}

function loadProductFuse() {
  const options = {
    threshold: 0.3,
    keys: ['name', 'type']
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

function loaded() {
  document.querySelector("#preloader").remove();
}

function navbarfix() {
  try {
    let navHeight = document.querySelector('navbar').scrollHeight;
    document.querySelector("#navfix").style.height = navHeight + "px";
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
      repeat: true,
      speed: 0.3,
      reloadOnContextChange: true,
      smartphone: {
        smooth: false,
      },
      tablet: {
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
  let nav = document.querySelector('[x-data*="navOpen"]')._x_dataStack[0];
  if (!navOpen) {
    nav.$data.navOpen = true;
    document.body.classList.add('overflow-hidden');
    swiper.disable();
    scroll.stop()
  } else {
    setTimeout(() => {
      nav.$data.navOpen = false;
      document.body.classList.remove('overflow-hidden');
      swiper.enable();
      scroll.start()
    }, 600);
  }
  document.querySelectorAll('.navlink').forEach((navlink, index) => {
    setTimeout(() => {
      navlink.classList.toggle('translate-x-[200%]');
      navlink.classList.toggle('md:translate-x-[600%]');
    }, 100 * index);
  });
}

function swiperWraper() {
  swiper = new Swiper('.swiper', {
    autoHeight: true,
    loop: true,
    slidesPerView: "auto",
    autoplay: {
      delay: 2000,
      disableOnInteraction: false,
      pauseOnMouseEnter: false,
    },
  });
}

function searchProduct(value) {
  if (value.length > 0) {
    let result = productFuse.search(strToRegex(value));
    document.querySelector('[x-data*="search"]')._x_dataStack[0].lists = result;
  } else {
    document.querySelector('[x-data*="search"]')._x_dataStack[0].lists = [];
  }
  setTimeout(() => {
    scroll.update()
  }, 100);
}

function textSplit() {
  try {
    document.querySelectorAll('[split]').forEach(split => {
      console.log(split.innerText);
    });
  } catch (error) {
    console.log(error)
  }
}