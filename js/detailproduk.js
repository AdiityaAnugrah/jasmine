const elmBeli = document.getElementById("btnBeli");
const elmNama = document.getElementById("namaBarang");
const elmGambar = document.getElementById("gambarBarang");
const elmDeskrip = document.getElementById("deskripsiBarang");
const elmKategori = document.getElementById("kategoriBarang");
const elmContainerImg = document.getElementById("container-img-produk");

async function getBarang() {
    const queryString = window.location.search;
    const URLparams = new URLSearchParams(queryString);
    const id = URLparams.get("id");
    const response = await fetch("http://192.168.1.21:8082/barang/" + id);
    const barang = await response.json();
    console.log(barang);

    const blob = new Blob([new Uint8Array(barang.data[0].gambar.data)], {
        type: "image/webp",
    });
    const blobUrl = URL.createObjectURL(blob);
    elmGambar.src = blobUrl;
    elmNama.innerText = barang.data[0].nama;
    elmBeli.href = "http://192.168.1.21:8082/product/" + barang.data[0].id;
    elmDeskrip.innerText = barang.data[0].deskripsi;
    elmKategori.innerText =
        "Kategori : " +
        barang.data[0].kategori[0].toUpperCase() +
        barang.data[0].kategori.slice(1);
}
getBarang();

async function getGambarBarang() {
    const queryString = window.location.search;
    const URLparams = new URLSearchParams(queryString);
    const id = URLparams.get("id");
    const response = await fetch("http://192.168.1.21:8082/gambar/" + id);
    const barang = await response.json();
    console.log(barang);

    Object.values(barang.data[0]).forEach((element, index) => {
        if (element != id && element != null) {
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

    const imgProdukSelect = document.querySelectorAll(".img-produk-select");
    const imgProdukPrev = document.querySelector(".img-produk-prev");
    console.log(imgProdukSelect.length);
    if (imgProdukSelect.length > 0) {
        imgProdukSelect.forEach((element) => {
            element.addEventListener("click", () => {
                imgProdukSelect.forEach((e) => e.classList.remove("selected"));
                element.classList.add("selected");
                imgProdukPrev.src = element.childNodes[0].src;
            });
        });
    }
}
getGambarBarang();
