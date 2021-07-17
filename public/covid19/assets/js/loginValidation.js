const userEmail = document.getElementById("userEmail");
const userPassword = document.getElementById("userPassword");
const loginButon = document.getElementById("loginButon");
const itemSesion = document.getElementById("item-sesion");
const situacionChile = document.getElementById("situacionChile");

(() => {
  const cerrarSesion = document.getElementById("cerrarSesion");
  if (localStorage.getItem("llave") != undefined) {
    console.log("la llave no esta vacia");
    itemSesion.innerHTML = `
    <a id="cerrarSesion" class="nav-link" href="#" >Cerrar Sesión</a>`;
    situacionChile.innerHTML =
      '<a class="nav-link" href="#">Situación en Chile</a>';
  } else {
    console.log("la llave esta vacia");
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
    console.log(token);
    if (token === undefined) {
      alert("datos incorrectos");
      //loading.classList.add("remove");
    } else {
      localStorage.setItem("llave", token);
      //loading.classList.remove("remove");
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
  location.reload();
});

//cerrar sesion
cerrarSesion.addEventListener("click", async (e) => {
  localStorage.removeItem("llave");
  location.reload();
});
