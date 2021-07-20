const userEmail = document.getElementById("userEmail");
const userPassword = document.getElementById("userPassword");
const loginButon = document.getElementById("loginButon");
const itemSesion = document.getElementById("item-sesion");
const situacionChile = document.getElementById("situacionChile");
const errorLogin = document.getElementById("errorLogin");

(() => {
  const cerrarSesion = document.getElementById("cerrarSesion");

  if (localStorage.getItem("llave") != undefined) {
    itemSesion.innerHTML = `
    <a id="cerrarSesion" class="nav-link" href="#" >Cerrar Sesión</a>`;
    situacionChile.innerHTML =
      '<a class="nav-link situacion" href="/covid19/situacion-chile.html">Situación en Chile</a>';
  } else {
    itemSesion.innerHTML = `
    <a id="nav-item-login" class="nav-link" href="#" data-bs-toggle="modal" data-bs-target="#loginModal">Iniciar Sesión</a>`;
    situacionChile.innerHTML = "";
  }
})();

const loginValidation = async (email, password) => {
  try {
    const response = await fetch("http://localhost:3000/api/login", {
      method: "POST",
      body: JSON.stringify({ email: email, password: password }),
    });
    const { token } = await response.json();

    if (token === undefined) {
      errorLogin.innerHTML = `<p class="error-form text-center animate__animated animate__shakeX">Datos incorrectos</p>`;
      //loading.classList.add("remove");
    } else {
      localStorage.setItem("llave", token);

      errorLogin.innerHTML = "";
      location.reload();
    }

    return token;
  } catch (err) {
    console.error(`Error: ${err}`);
  }
};

//form click
loginButon.addEventListener("click", async (e) => {
  e.preventDefault();
  loginValidation(userEmail.value, userPassword.value);
});

//cerrar sesion
cerrarSesion.addEventListener("click", async (e) => {
  localStorage.removeItem("llave");
  window.location.href = "/covid19/";
});
