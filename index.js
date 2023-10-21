const { app, BrowserWindow, ipcMain, Menu } = require("electron");
const path = require("path");
const url = require("url");


let loginWindow, homeWindow, defaultUser;

defaultUser = [
  {
    remember: true,
    Username: "Eren",
    Password: 1234,
    Avatar: "https://raw.githubusercontent.com/Eren-Seyfi/Electron-Login-Page/main/pp.jpg",
  },
];

app.on("ready", () => {
  LoginPageWindow();
  Menu.setApplicationMenu(null);
});

// ===================================================== Login Page =====================================================

function LoginPageWindow() {
  loginWindow = new BrowserWindow({
    webPreferences: {
      preload: path.join(__dirname, "./frontend/assets/js/login.js"),
    },
  });

  loginWindow.loadURL(
    url.format({
      pathname: path.join(__dirname, "./frontend/pages/login.html"),
      protocol: "file:",
      slashes: true,
    })
  );

  // ========= Login kontrol merkezi =========
  ipcMain.on("LoginForm", (error, data) => {
    if (data.Username == "admin" && data.Password == "1234") {
      // Kullanıcı Beni hatırla derse çalışacak olan döngü
      if (data.Remember) {
        LoginControl();
      } else {
        LoginControl();
      }
    } else {
      loginWindow.webContents.send("LoginControl", false);
    }
  });

  // Frontende veri göndermek için
  function LoginControl() {
    loginWindow.webContents.send("LoginControl", true);
    setTimeout(function () {
      HomePageWindow();
      loginWindow.destroy();
      loginWindow.on("close", () => {
        loginWindow = null;
      });
    }, 6000);
  }

  // ========= Ekranda gösterilecek kullanıcı merkezi =========
  loginWindow.webContents.send("Remember", defaultUser);
 // loginWindow.webContents.openDevTools();
}
// ===================================================== Home Page =====================================================
function HomePageWindow() {
  homeWindow = new BrowserWindow({
    webPreferences: {
      preload: path.join(__dirname, "./frontend/assets/js/home.js"),
    },
  });

  homeWindow.loadURL(
    url.format({
      pathname: path.join(__dirname, "./frontend/pages/home.html"),
      protocol: "file:",
      slashes: true,
    })
  );

  // homeWindow.webContents.openDevTools()
}
