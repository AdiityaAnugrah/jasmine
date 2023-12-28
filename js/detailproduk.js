const elmBeli = document.getElementById("btnBeli");
const elmNama = document.getElementById("namaBarang");
const elmGambar = document.getElementById("gambarBarang");
const elmDeskrip = document.getElementById("deskripsiBarang");
const elmKategori = document.getElementById("kategoriBarang");
const elmContainerImg = document.getElementById("container-img-produk");
const elmFotoVarian = document.getElementById("varian-group");
// const imgProdukSelect = document.querySelectorAll(".img-produk-select");
// const imgProdukPrev = document.querySelector(".img-produk-prev");
const elmVarian = document.getElementById("varian-group");
let jmlVarian = 0;

async function getBarang() {
  const queryString = window.location.search;
  const URLparams = new URLSearchParams(queryString);
  const id = URLparams.get("id");
  const response = await fetch("http://192.168.1.36:8082/barang/" + id);
  const barang = await response.json();
  console.log(barang);
  jmlVarian = barang.data[0].jml_varian;

  const blob = new Blob([new Uint8Array(barang.data[0].gambar.data)], {
    type: "image/webp",
  });
  const blobUrl = URL.createObjectURL(blob);
  elmGambar.src = blobUrl;
  elmNama.innerText = barang.data[0].nama;
  elmBeli.href = "http://192.168.1.36:8082/product/" + barang.data[0].id;
  elmDeskrip.innerText = barang.data[0].deskripsi;
  elmKategori.innerText =
    "Kategori : " +
    barang.data[0].kategori[0].toUpperCase() +
    barang.data[0].kategori.slice(1);

  const varian = JSON.parse(barang.data[0].varian);
  console.log(varian);
  for (let i = 1; i <= varian.length; i++) {
    const elmInput = document.createElement("input");
    if (i == 1) {
      elmInput.setAttribute("checked", "");
    }
    elmInput.setAttribute("id", "btnradio" + i);
    elmInput.value = i - 1;
    elmInput.setAttribute("type", "radio");
    elmInput.classList.add("btn-check");
    elmInput.setAttribute("name", "btnradio");
    elmInput.setAttribute("autocomplete", "off");
    const elmLabel = document.createElement("label");
    elmLabel.classList.add("btn");
    elmLabel.classList.add("btn-outline-danger");
    elmLabel.setAttribute("for", "btnradio" + i);
    elmLabel.innerHTML = varian[i - 1];
    console.log(elmInput, elmLabel);
    elmFotoVarian.appendChild(elmInput);
    elmFotoVarian.appendChild(elmLabel);
  }
  const elmDimensi = document.getElementById("dimensi");
  const dimensi = barang.data[0].dimensi.split("X");
  console.log(dimensi);
  elmDimensi.innerHTML = `${dimensi[0]} cm x ${dimensi[1]} cm x ${dimensi[2]} cm `;
}
getBarang();

async function getGambarBarang() {
  const queryString = window.location.search;
  const URLparams = new URLSearchParams(queryString);
  const id = URLparams.get("id");
  const response = await fetch("http://192.168.1.36:8082/gambar/" + id);
  const barang = await response.json();
  console.log(barang);

  Object.values(barang.data[0]).forEach((element, index) => {
    if (element != id && element != null && element.data.length > 0) {
      const blob = new Blob([new Uint8Array(element.data)], {
        type: "image/webp",
      });
      const blobUrl = URL.createObjectURL(blob);
      const imgProdukSelect = document.createElement("div");
      imgProdukSelect.classList.add("img-produk-select");
      if (index == 1) imgProdukSelect.classList.add("selected");
      const imgnya = document.createElement("img");
      imgnya.src = blobUrl;
      imgProdukSelect.appendChild(imgnya);
      elmContainerImg.appendChild(imgProdukSelect);
    }
  });
  const elmVarianSelect = document.querySelectorAll(".btn-check");
  const imgProdukSelect = document.querySelectorAll(".img-produk-select");
  const imgProdukPrev = document.querySelector(".img-produk-prev");
  console.log(jmlVarian);
  if (imgProdukSelect.length > 0) {
    imgProdukSelect.forEach((element, index) => {
      element.addEventListener("click", () => {
        imgProdukSelect.forEach((e) => e.classList.remove("selected"));
        element.classList.add("selected");
        imgProdukPrev.src = element.childNodes[0].src;
        const hitungBagi4 = Math.floor(index / Number(jmlVarian));
        elmVarianSelect.forEach((e) => (e.checked = false));
        elmVarianSelect[hitungBagi4].checked = true;
      });
    });
  }
  elmVarian.addEventListener("change", (e) => {
    imgProdukSelect.forEach((e) => e.classList.remove("selected"));
    imgProdukSelect[Number(e.target.value) * Number(jmlVarian)].classList.add(
      "selected"
    );
    imgProdukPrev.src =
      imgProdukSelect[
        Number(e.target.value) * Number(jmlVarian)
      ].childNodes[0].src;
  });
}

getGambarBarang();
