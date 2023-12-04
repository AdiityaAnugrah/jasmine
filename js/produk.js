const elmContainer = document.getElementById("container-card-produk");

async function getAllBarang() {
    const queryString = window.location.search;
    const URLparams = new URLSearchParams(queryString);
    const kategori = URLparams.get("kategori");
    const subkategori = URLparams.get("subkategori");
    let barangs;
    if (kategori) {
        const response = await fetch(
            "http://192.168.1.42:8082/kategori/" + kategori,
            {
                headers: {
                    Authorization:
                        "Bearer {2YkUfjkBhSDocbv4p08ATxo02KI_7Bk2fku2L9VJvqYy1RUZ4}",
                },
                method: "GET",
            }
        );
        barangs = await response.json();
    } else if (subkategori) {
        const response = await fetch(
            "http://192.168.1.42:8082/subkategori/" + subkategori,
            {
                headers: {
                    Authorization:
                        "Bearer {2YkUfjkBhSDocbv4p08ATxo02KI_7Bk2fku2L9VJvqYy1RUZ4}",
                },
                method: "GET",
            }
        );
        barangs = await response.json();
    } else {
        const response = await fetch("http://192.168.1.42:8082/getallbarang", {
            headers: {
                Authorization:
                    "Bearer {2YkUfjkBhSDocbv4p08ATxo02KI_7Bk2fku2L9VJvqYy1RUZ4}",
            },
            method: "GET",
        });
        barangs = await response.json();
    }

    console.log(barangs);
    if (barangs.data.length > 0) {
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
    } else {
        const pElm = document.createElement("p");
        pElm.innerText = "Produk Masih Kosong";
        pElm.classList.add("text-center");
        elmContainer.appendChild(pElm);
    }
}
getAllBarang();

const elmformsearch = document.getElementById("search-box");
const elminputsearch = document.getElementById("search-input");
elmformsearch.addEventListener("submit", (e) => {
    e.preventDefault();
    async function cariProduk() {
        var bodynya = {
            cari: elminputsearch.value,
            apalah: "cek",
        };
        var formBody = [];
        for (var property in bodynya) {
            var encodedKey = encodeURIComponent(property);
            var encodedValue = encodeURIComponent(bodynya[property]);
            formBody.push(encodedKey + "=" + encodedValue);
        }
        formBody = formBody.join("&");

        const response = await fetch("http://192.168.1.42:8082/cari", {
            method: "POST",
            headers: {
                "Content-Type":
                    "application/x-www-form-urlencoded;charset=UTF-8",
            },
            body: formBody,
        });
        const barang = await response.json();
        console.log(barang);

        elmContainer.innerHTML = "";
        if (barang.data.length > 0) {
            barang.data.forEach((element) => {
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
                    window.location.href =
                        "/detailproduk.html?id=" + element.id;
                });

                elmContainer.appendChild(cardElm);
            });
        } else {
            const pElm = document.createElement("p");
            pElm.innerText = "Data tidak ditemukan";
            pElm.classList.add("text-center");
            elmContainer.appendChild(pElm);
        }
    }
    cariProduk();
});
