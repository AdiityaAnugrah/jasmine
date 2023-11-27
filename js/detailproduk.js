const elmBeli = document.getElementById("btnBeli");
const elmNama = document.getElementById("namaBarang");
const elmGambar = document.getElementById("gambarBarang");
const elmDeskrip = document.getElementById("deskripsiBarang");
const elmKategori = document.getElementById("kategoriBarang");

async function getBarang() {
  const queryString = window.location.search;
  const URLparams = new URLSearchParams(queryString);
  const id = URLparams.get("id");
  const response = await fetch("http://192.168.1.7:8082/barang/" + id);
  const barang = await response.json();
  console.log(barang);

  const blob = new Blob([new Uint8Array(barang.data[0].gambar.data)], {
    type: "image/webp",
  });
  const blobUrl = URL.createObjectURL(blob);
  elmGambar.src = blobUrl;
  elmNama.innerText = barang.data[0].nama;
  elmBeli.href = "http://192.168.1.7:8080/product/" + barang.data[0].id;
  elmDeskrip.innerText = barang.data[0].deskripsi;
  elmKategori.innerText =
    "Kategori : " +
    barang.data[0].kategori[0].toUpperCase() +
    barang.data[0].kategori.slice(1);
}

getBarang();
