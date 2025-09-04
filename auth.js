<!-- =========================
FILE: auth.js
Beschreibung: auf jeder geschützten Seite einbinden (z. B. index.html ganz unten)
Funktion: prüft Login, sonst -> login.html
========================= -->
<script type="module">
  import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-app.js";
  import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-auth.js";

  // dieselbe Config wie in login.html
  const firebaseConfig = {
    apiKey: "DEIN_API_KEY",
    authDomain: "DEIN_PROJECT_ID.firebaseapp.com",
    projectId: "DEIN_PROJECT_ID",
    appId: "DEINE_APP_ID",
  };
  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);

  // UI erst zeigen, wenn Auth abgefragt ist (optional: Loader darstellen)
  document.documentElement.style.visibility = "hidden";

  onAuthStateChanged(auth, (user) => {
    if (!user) {
      // nicht eingeloggt → zur Login-Seite
      location.replace("login.html");
    } else {
      // eingeloggt → Seite anzeigen
      document.documentElement.style.visibility = "visible";
      // optional: Logout-Button verdrahten, wenn vorhanden
      const logoutBtn = document.getElementById("logoutBtn");
      if (logoutBtn) logoutBtn.onclick = () => signOut(auth).then(()=>location.replace("login.html"));
    }
  });
</script>
