const elmNama = document.querySelector('input[name="nama"]');
const elmEmail = document.querySelector('input[name="email"]');
const elmAlmt = document.querySelector('input[name="alamat"]');
const elmNohp = document.querySelector('input[name="nohp"]');
const elmPesan = document.querySelector('textarea[name="pesan"]');
const elmForm = document.querySelector("#form-kontak  ");
elmForm.addEventListener("submit", (e) => {
  e.preventDefault();
  async function submitPesan() {
    // Inisialisasi EmailJS dengan User ID Anda
    emailjs.init("71_KWYtlNzas8cNUK");

    function kirimEmail() {
      // Mengirim email menggunakan EmailJS
      emailjs
        .send("service_vx04aeg", "template_ees12l5", {
          email: elmEmail.value,
          nama: elmNama.value,
          alamat: elmAlmt.value,
          nohp: elmNohp.value,
          message: elmPesan.value,
        })
        .then(
          function (response) {
            triggerToast("Pesan telah terkirim", "#");
          },
          function (error) {
            console.log("Gagal mengirim email:", error);
            alert("Terjadi kesalahan, email tidak terkirim!");
          }
        );
    }
    kirimEmail();
  }
  submitPesan();
});
