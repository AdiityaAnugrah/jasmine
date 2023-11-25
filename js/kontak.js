const elmNama = document.querySelector('input[name="nama"]');
const elmEmail = document.querySelector('input[name="email"]');
const elmPesan = document.querySelector('textarea[name="pesan"]');
const elmForm = document.querySelector("form");
elmForm.addEventListener("submit", (e) => {
  e.preventDefault();
  async function submitPesan() {
    const datanya = {
      nama: elmNama.value,
      email: elmEmail.value,
      pesan: elmPesan.value,
    };
    var formBody = [];
    for (var property in datanya) {
      var encodedKey = encodeURIComponent(property);
      var encodedValue = encodeURIComponent(datanya[property]);
      formBody.push(encodedKey + "=" + encodedValue);
    }
    formBody = formBody.join("&");

    const response = await fetch("http://192.168.1.7:8082/kontak", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
      },
      body: formBody,
    });

    console.log(response.json());
  }
  submitPesan();
});
