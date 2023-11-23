const elmContainer = document.getElementById("container-card-produk");

async function getAllBarang() {
  const response = await fetch("http://192.168.1.20:3000/getallbarang");
  const barangs = await response.json();
  console.log(barangs.data);

  barangs.data.forEach((element) => {
    const cardElm = document.createElement("a");
    cardElm.classList.add("card-produk");
    const divElm = document.createElement("div");
    const imgElm = document.createElement("img");
    imgElm.src = "assets/img/produk/RSG 10 SAMPING KIRI.webp";
    const h3Elm = document.createElement("h3");
    h3Elm.classList.add("mb-0");
    h3Elm.innerHTML = element.nama;

    divElm.appendChild(imgElm);
    cardElm.appendChild(divElm);
    cardElm.appendChild(h3Elm);

    elmContainer.appendChild(cardElm);
  });
}
getAllBarang();
