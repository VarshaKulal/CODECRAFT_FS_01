const baseUrl = "http://localhost:3000";

// Register
const btnRegister = document.getElementById("btn-register");
if (btnRegister) {
  btnRegister.addEventListener("click", async () => {
    const username = document.getElementById("reg-username").value.trim();
    const password = document.getElementById("reg-password").value;
    const role = document.getElementById("reg-role").value;

    try {
      const res = await fetch(baseUrl + "/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password, role })
      });
      const text = await res.text();
      showMsg(text);
    } catch (err) {
      showMsg("⚠️ " + err.message);
    }
  });
}

// Login
const btnLogin = document.getElementById("btn-login");
if (btnLogin) {
  btnLogin.addEventListener("click", async () => {
    const username = document.getElementById("login-username").value.trim();
    const password = document.getElementById("login-password").value;

    try {
      const res = await fetch(baseUrl + "/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password })
      });
      const text = await res.text();

      if (text.includes("Login successful")) {
        window.location.href = "welcome.html";
      } else {
        showMsg(text);
      }
    } catch (err) {
      showMsg("⚠️ " + err.message);
    }
  });
}

// Dashboard / Admin Access
const btnDashboard = document.getElementById("btn-dashboard");
if (btnDashboard) {
  btnDashboard.addEventListener("click", async () => {
    const res = await fetch(baseUrl + "/dashboard");
    showMsg(await res.text());
  });
}

const btnAdmin = document.getElementById("btn-admin");
if (btnAdmin) {
  btnAdmin.addEventListener("click", async () => {
    const res = await fetch(baseUrl + "/admin");
    showMsg(await res.text());
  });
}

// Logout
const btnLogout = document.getElementById("btn-logout");
if (btnLogout) {
  btnLogout.addEventListener("click", async () => {
    const res = await fetch(baseUrl + "/logout", { method: "POST" });
    alert(await res.text());
    window.location.href = "login.html";
  });
}

function showMsg(s) {
  const msg = document.getElementById("message");
  if (msg) msg.innerText = s;
}
