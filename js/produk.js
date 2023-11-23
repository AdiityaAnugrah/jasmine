const elmContainer = document.getElementById("container-card-produk");

async function getAllBarang() {
  const queryString = window.location.search;
  const URLparams = new URLSearchParams(queryString);
  const kategori = URLparams.get("kategori");
  const subkategori = URLparams.get("subkategori");
  let barangs;
  if (kategori) {
    const response = await fetch(
      "http://192.168.1.7:8080/kategori/" + kategori
    );
    barangs = await response.json();
  } else if (subkategori) {
    const response = await fetch(
      "http://192.168.1.7:8080/subkategori/" + subkategori
    );
    barangs = await response.json();
  } else {
    const response = await fetch("http://192.168.1.7:8080/getallbarang");
    barangs = await response.json();
  }

  console.log(barangs);

  barangs.data.forEach((element) => {
    const cardElm = document.createElement("a");
    cardElm.classList.add("card-produk");
    const divElm = document.createElement("div");
    const imgElm = document.createElement("img");
    const blob = new Blob([new Uint8Array(element.gambar.data)], {
      type: "image/webp",
    });
    const blobUrl = URL.createObjectURL(blob);
    imgElm.src = blobUrl;
    const h3Elm = document.createElement("h3");
    h3Elm.classList.add("mb-0");
    h3Elm.innerHTML = element.nama;

    divElm.appendChild(imgElm);
    cardElm.appendChild(divElm);
    cardElm.appendChild(h3Elm);

    cardElm.addEventListener("click", () => {
      window.location.href = "/detailproduk.html?id=" + element.id;
    });

    elmContainer.appendChild(cardElm);
  });
}
getAllBarang();
