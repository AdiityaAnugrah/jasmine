const elmContainer = document.getElementById("container-card-produk");
const elmPagination = document.getElementById("pagination");

const queryString = window.location.search;
const URLparams = new URLSearchParams(queryString);

async function getAllBarang() {
    const queryString = window.location.search;
    const URLparams = new URLSearchParams(queryString);
    const kategori = URLparams.get("kategori");
    const subkategori = URLparams.get("subkategori");
    let page = URLparams.get("page");
    if (!page) page = 1;
    let barangs;
    let barangall;
    if (kategori) {
        const response = await fetch(
            "http://192.168.1.32:8082/kategori/" + kategori + "/" + page,
            {
                headers: {
                    Authorization:
                        "Bearer {2YkUfjkBhSDocbv4p08ATxo02KI_7Bk2fku2L9VJvqYy1RUZ4}",
                },
                method: "GET",
            }
        );
        barangs = await response.json();

        const response1 = await fetch(
            "http://192.168.1.32:8082/kategori/" + kategori,
            {
                headers: {
                    Authorization:
                        "Bearer {2YkUfjkBhSDocbv4p08ATxo02KI_7Bk2fku2L9VJvqYy1RUZ4}",
                },
                method: "GET",
            }
        );
        barangall = await response1.json();
    } else if (subkategori) {
        const response = await fetch(
            "http://192.168.1.32:8082/subkategori/" + subkategori + "/" + page,
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
        const response = await fetch(
            "http://192.168.1.32:8082/get20barang/" + page,
            {
                headers: {
                    Authorization:
                        "Bearer {2YkUfjkBhSDocbv4p08ATxo02KI_7Bk2fku2L9VJvqYy1RUZ4}",
                },
                method: "GET",
            }
        );
        barangs = await response.json();

        const response1 = await fetch(
            "http://192.168.1.32:8082/getallbarang/",
            {
                headers: {
                    Authorization:
                        "Bearer {2YkUfjkBhSDocbv4p08ATxo02KI_7Bk2fku2L9VJvqYy1RUZ4}",
                },
                method: "GET",
            }
        );
        barangall = await response1.json();
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

        const hitungbarang = barangall.data.length;
        const hitungPage = hitungbarang / 20;
        const pageskrg = Number(page);
        if (pageskrg > 1) {
            const liPrev = document.createElement("li");
            liPrev.classList.add("page-item");
            const aPrev = document.createElement("a");
            aPrev.classList.add("page-link");
            aPrev.classList.add("text-dark");
            if (kategori) {
                aPrev.href =
                    "produk.html?kategori=" +
                    kategori +
                    "&page=" +
                    (Number(pageskrg) - 1);
            } else aPrev.href = "produk.html?page=" + (Number(pageskrg) - 1);
            aPrev.ariaLabel = "Previous";
            const spanPrev = document.createElement("span");
            spanPrev.ariaHidden = "true";
            spanPrev.innerHTML = "&laquo;";

            aPrev.appendChild(spanPrev);
            liPrev.appendChild(aPrev);
            elmPagination.appendChild(liPrev);
        }

        for (let i = 0; i < Math.floor(hitungPage) + 1; i++) {
            console.log(i);
            const liPage = document.createElement("li");
            liPage.classList.add("page-item");
            const aPage = document.createElement("a");
            aPage.classList.add("page-link");
            aPage.classList.add("text-dark");
            if (kategori) {
                aPage.href =
                    "produk.html?kategori=" + kategori + "&page=" + (i + 1);
            } else aPage.href = "produk.html?page=" + (i + 1);
            aPage.innerHTML = i + 1;
            liPage.appendChild(aPage);
            elmPagination.appendChild(liPage);
        }

        if (pageskrg < Math.floor(hitungPage) + 1) {
            const liNext = document.createElement("li");
            liNext.classList.add("page-item");
            const aNext = document.createElement("a");
            aNext.classList.add("page-link");
            aNext.classList.add("text-dark");
            if (kategori) {
                aNext.href =
                    "produk.html?kategori=" +
                    kategori +
                    "&page=" +
                    (Number(pageskrg) + 1);
            } else aNext.href = "produk.html?page=" + (Number(pageskrg) + 1);
            aNext.ariaLabel = "Next";
            const spanPrev = document.createElement("span");
            spanPrev.ariaHidden = "true";
            spanPrev.innerHTML = "&raquo;";

            aNext.appendChild(spanPrev);
            liNext.appendChild(aNext);
            elmPagination.appendChild(liNext);
        }
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

        const response = await fetch("http://192.168.1.32:8082/cari", {
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
