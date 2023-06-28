const menuBtn = document.querySelector(".header__btn");
const overlay = document.querySelector(".overlay");
const headerMenu = document.querySelector(".header__menu");
const heroButton = document.getElementById("button__hero");
const modalCloseBtn = document.getElementById("hero__modal_close");
const modal = document.querySelector(".hero__modal");
const modalLink = document.querySelector(".hero__modal_link");
const heroInput = document.getElementById("hero__input");
let menuOpen = false;
let modalOpen = false;

menuBtn.addEventListener("click", function () {
  if (!menuOpen) {
    menuBtn.classList.add("open");
    overlay.classList.remove("fade-out");
    overlay.classList.add("fade-in");
    headerMenu.classList.remove("fade-out");
    headerMenu.classList.add("fade-in");
    menuOpen = true;
  } else {
    menuBtn.classList.remove("open");
    overlay.classList.remove("fade-in");
    overlay.classList.add("fade-out");
    headerMenu.classList.remove("fade-in");
    headerMenu.classList.add("fade-out");
    setTimeout(fade, 400);

    function fade() {
      headerMenu.classList.remove("fade-out");
    }
    menuOpen = false;
  }
});

overlay.addEventListener("click", function () {
  menuBtn.classList.remove("open");
  overlay.classList.remove("fade-in");
  overlay.classList.add("fade-out");
  headerMenu.classList.remove("fade-in");
  headerMenu.classList.add("fade-out");
  menuOpen = false;
});

async function fetchData(url) {
  try {
    const request = await fetch("https://api-ssl.bitly.com/v4/shorten", {
      method: "POST",
      headers: {
        Authorization: `Bearer a91f1024ddbf26b399ae08e9e80e95676f78ec33`,
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
  if (!modalOpen) {
    modal.classList.remove("hidden");
    fetchData(heroInput.value);

    // modalLink.textContent = heroInput.value;
    modalOpen = true;
  } else {
    modal.classList.add("hidden");
    modalOpen = false;
  }
});

modalCloseBtn.addEventListener("click", function () {
  if (modalOpen) {
    modal.classList.add("hidden");
    modalOpen = false;
  } else {
    modal.classList.remove("hidden");
    modalOpen = true;
  }
});
