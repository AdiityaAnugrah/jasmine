// const navbar = document.getElementsByTagName("nav")[0];
// window.addEventListener("scroll", function () {
//   console.log(window.scrollY);
//   if (this.window.scrollY > 1) {
//     navbar.classList.replace("bg-transparent", "nav-color");
//   } else if ((this.window, this.scrollY <= 0)) {
//     navbar.classList.replace("nav-color", "bg-transparent");
//   }
// });

const burgerNav = document.querySelector(".navbar-toggler");
burgerNav.addEventListener("click", () => {
  if (navbar.classList.contains("bg-transparent")) {
    navbar.classList.replace("bg-transparent", "nav-color");
  } else {
    navbar.classList.replace("nav-color", "bg-transparent");
  }
});

const elmKontainerGmbr = document.getElementById("show-gambar");
const elmGmbrShow = document.querySelector(".container-gambar-besar img");
const elmBtnStore = document.querySelector("#btn-store");

function handleProduk(nama) {
  console.log(nama);
  elmKontainerGmbr.classList.remove("hide");
  elmGmbrShow.src = `/assets/img/produk/${nama}`;
  elmBtnStore.href = "https://www.google.com/";
}

function handleClose() {
  elmKontainerGmbr.classList.add("hide");
}

function bukaDropdown(id) {
  const elementDropdown = document.getElementById(id);
  if (elementDropdown.style.height == "100%") {
    elementDropdown.style.height = "0";
  } else {
    elementDropdown.style.height = "100%";
  }
}
