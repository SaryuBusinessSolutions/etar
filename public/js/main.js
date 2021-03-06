// variables
var w = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
var h = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
let scroll;
let productFuse;
let swiper;

// events
document.addEventListener('DOMContentLoaded', () => {
  loadProductFuse();
  swiperWraper();
  playPauseVideo();
});

window.onload = () => {
  loaded();
  loadCategory();
  locomotiveInit();
}

window.onscroll = ()=>{
}

// function
function strToRegex(string) {
  return string.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&')
}

function loadProductFuse() {
  const options = {
    threshold: 0.3,
    useExtendedSearch: true,
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
    let navHeight = document.querySelector('#navbar').scrollHeight;
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

function setCategory(event){
  document.cookie = "category=" + event.target.getAttribute('category') + "; path=/";
}

function sendResponse(event) {
  if (document.submitted) {
    document.submitted = undefined;
    document.volunteer_form.reset();
    showNotification('Response recorded')
  } else {
    document.submitted = true;
  }
}

function loadCategory() {
  function getCookie(cname) {
    let name = cname + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
  }
  setTimeout(() => {
    if (document.querySelector('[x-data*="search"]')) {
      document.querySelector('[x-data*="search"]')._x_dataStack[0].search = getCookie('category').toLowerCase();
      searchProduct(getCookie('category').toLowerCase());
    }
    document.cookie = "category=" + getCookie('category').toLowerCase() + "; max-age=0;  path=/";
  }, 500);
}

function playPauseVideo() {
  let videos = document.querySelectorAll(".video");
  videos.forEach((video) => {
    // We can only control playback without insteraction if video is mute
    video.muted = true;
    // Play is a promise so we need to check we have it
    let playPromise = video.play();
    if (playPromise !== undefined) {
      playPromise.then((_) => {
        let observer = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              if (
                entry.intersectionRatio !== 1 &&
                !video.paused
              ) {
                video.pause();
              } else if (video.paused) {
                video.play();
              }
            });
          }, {
            threshold: 0.2
          }
        );
        observer.observe(video);
      });
    }
  });
}

function composeContactMail(formData) {
  let subject, body;
  if (formData.has('news_mail')) {
    subject = formData.has('news_mail') ? "Newsletter subscription by  " + formData.get('news_mail') : "";
    body = "<h2 style='text-align: center;'>Form Data</h2><br>";
    body += formData.has('news_mail') ? "<p><strong>email :</strong> " + formData.get('news_mail') + "</p>" : "";
    return {
      subject,
      body
    };
  }
  subject = formData.has('first_name') ? "New Form Submision by " + formData.get('first_name') : "New Form Submision";
  body = "<h2 style='text-align: center;'>Form Data</h2><br>";
  body += formData.has('first_name') ? "<p><strong>first name :</strong> " + formData.get('first_name') + "</p>" : "";
  body += formData.has('last_name') ? "<p><strong>last name :</strong> " + formData.get('first_name') + "</p>" : "";
  body += formData.has('email') ? "<p><strong>email :</strong> " + formData.get('email') + "</p>" : "";
  body += formData.has('message') ? "<p><strong>message :</strong> " + formData.get('message') + "</p>" : "";
  return {
    subject,
    body
  };
}

function submitForm(event) {
  event.preventDefault();
  let formData = new FormData(event.target);
  let {
    subject,
    body
  } = composeContactMail(formData,);
  formData.append("subject", subject);
  formData.append("body", body);
  event.target.reset()
  alert("sending")
  fetch("https://api.saryuweb.com/email", {
    method: "POST",
    body: formData,
  }).then((response) => {
    return response.text();
  }).then((data) => {
    console.log(data);
    alert("message sent")
  }).catch((error) => {
    console.log(error);
    alert("error occured")
  })
}