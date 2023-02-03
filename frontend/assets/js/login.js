const { ipcRenderer } = require("electron");

window.addEventListener("DOMContentLoaded", () => {
  let Btn = document.getElementById("LoginBtn");
  let User = document.getElementById("floatingInput");
  let Pass = document.getElementById("floatingPassword");
  let Rem = document.getElementById("remember-me");

  let Allertcontrol = document.getElementById("alert-control");

  let LoadingAnimation =
    '<p class="text-center mt-4">Kontrol ediliyor</p><div class="sk-folding-cube"><div class="sk-cube1 sk-cube"></div><div class="sk-cube2 sk-cube"></div><div class="sk-cube4 sk-cube"></div><div class="sk-cube3 sk-cube"></div></div>';

  User.focus(); // Username inputuna focus
  // login butonuna tıklama ve kullanıcı bilgisi kontrol noktası
  Btn.addEventListener("click", () => {
    Allertcontrol.innerHTML = LoadingAnimation; // Kontrol animasyonu
    // Şifre uzunluğu kontrolü
    if (User.value.length >= 4 && Pass.value.length >= 4) {
      LoginSubmit(User, Pass, Rem); // Backende Username , Şifre ve beni hatırla kısmını iletim yeri
    } else {
      // Kullanıcı adı veya şifre boş bırakılınca çıkacak uyarı kısmı ve girdilerin temizlendiği yer
      setTimeout(function () {
        Allertcontrol.innerHTML =
          '<p class="text-warning text-center mt-5">Lütfen boş bırakmayın</p>';
        User.value = "";
        Pass.value = "";
        Rem.checked = false;
        setTimeout(function () {
          document.getElementById("alert-close").click(); // Uyarı kısmını kapatan butona tıklama
        }, 2000); // 2 sn bekleme

      }, 3000); // 3 sn bekleme

    }
  });
// kullanıcı bilgilerini backende ileten ve girdi kutucuklarını temizleyer
  function LoginSubmit(UserData, PassData, RemData) {
    ipcRenderer.send("LoginForm", {
      Username: UserData.value,  // inputtan alınan Username bilgisi
      Password: PassData.value, // inputtan alınan Password bilgisi
      Remember: RemData.checked, // inputtan alınan beni hatırla bilgisi
    });

    // inputların değerlerini silindiği kısım
    UserData.value = "";
    PassData.value = "";
    RemData.checked = false;
  }

// Backendde kontrol edilen bilginin geri dönüş yapınca 
  ipcRenderer.on("LoginControl", (err, data) => {
    if (data) {
      setTimeout(function () {

        Allertcontrol.innerHTML =
          '<p class="text-success text-center mt-5">Başarıyla yönlendiriliyorsunuz ...</p>';
        setTimeout(function () {
          document.getElementById("alert-close").click();
        }, 2000);
      }, 3000);
    } else {

      setTimeout(function () {
        Allertcontrol.innerHTML =
          '<p class="text-danger text-center mt-5"> Kullanıcı Adı veya Şifre Hatalı</p>';
        setTimeout(function () {
          document.getElementById("alert-close").click();
        }, 2000);
      }, 3000);
    }
  });

  
});


// Kayıtlı kullanıcı varmı kontrol
ipcRenderer.on("Remember", (err, data) => {
 
  if (data[0].remember) {
    document.getElementById("LoginRequest").classList.add("w-50")
    document.getElementById("account").innerHTML =`<div class="user-avatar text-center" id="avatar-login"> <img src="${data[0].Avatar}" /><h5>${data[0].Username}</h5></div>  `;
   
  } else {
    document.querySelector("body").removeChild(document.getElementById("account"));
    document.getElementById("LoginRequest").classList.add("w-100")
  }
});
