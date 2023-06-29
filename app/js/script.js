const menuBtn = document.querySelector(".header__btn");
// const overlay = document.querySelector(".overlay");
const headerMenu = document.querySelector(".header__menu");
const heroButton = document.getElementById("button__hero");
const modalCloseBtn = document.getElementById("hero__modal_close");
const modal = document.querySelector(".hero__modal");
const modalLink = document.querySelector(".hero__modal_link");
const heroInput = document.getElementById("hero__input");
const copyBtn = document.querySelector(".hero__modal_copy");
const animationText = document.querySelector(".hero__animation");
const modalBox = document.querySelector(".hero__modal_box");
const heroSpanText = document.querySelector(".hero_text_box_span");
const heroTextInput = document.querySelector(".hero__text_input");

let menuOpen = false;
let modalOpen = false;

const contentWidth = heroSpanText.offsetWidth;
heroTextInput.style.width = `${contentWidth}px`;

menuBtn.addEventListener("click", function () {
  if (!menuOpen) {
    menuBtn.classList.add("open");
    // overlay.classList.remove("fade-out");
    // overlay.classList.add("fade-in");
    headerMenu.classList.remove("fade-out");
    headerMenu.classList.add("fade-in");
    menuOpen = true;
  } else {
    menuBtn.classList.remove("open");
    // overlay.classList.remove("fade-in");
    // overlay.classList.add("fade-out");
    headerMenu.classList.remove("fade-in");
    headerMenu.classList.add("fade-out");
    setTimeout(fade, 400);

    function fade() {
      headerMenu.classList.remove("fade-out");
    }
    menuOpen = false;
  }
});

// overlay.addEventListener("click", function () {
//   menuBtn.classList.remove("open");
//   overlay.classList.remove("fade-in");
//   overlay.classList.add("fade-out");
//   headerMenu.classList.remove("fade-in");
//   headerMenu.classList.add("fade-out");
//   menuOpen = false;
// });

async function fetchData(url) {
  try {
    const request = await fetch("https://api-ssl.bitly.com/v4/shorten", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.SECRET_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        long_url: url,
        // domain: "gid.ly",
        // group_guid: "gidtalker",
      }),
    });
    console.log(request);
    const response = await request.json();
    modalLink.textContent = response.link;
  } catch (error) {
    console.log("Error", error);
  }
}

heroButton.addEventListener("click", function (e) {
  e.preventDefault();
  if (!heroInput.value) {
    alert("add a link so we can shorten-it");
  } else {
    if (!modalOpen) {
      modal.classList.remove("hidden");
      animationText.classList.remove("hidden");
      fetchData(heroInput.value);

      setTimeout(() => {
        animationText.classList.add("hidden");
        modalBox.classList.remove("hidden");
      }, 5000);

      // modalLink.textContent = heroInput.value;
      modalOpen = true;
    } else {
      modal.classList.add("hidden");
      animationText.classList.remove("hidden");
      modalBox.classList.add("hidden");
      modalOpen = false;
    }
  }
});

modalCloseBtn.addEventListener("click", function () {
  if (modalOpen) {
    modal.classList.add("hidden");
    animationText.classList.remove("hidden");
    modalBox.classList.add("hidden");
    modalOpen = false;
  } else {
    modal.classList.remove("hidden");
    modalOpen = true;
  }
});

copyBtn.addEventListener("click", function () {
  navigator.clipboard.writeText(modalLink.textContent);
  alert("Copied the text: " + modalLink.textContent);
});
