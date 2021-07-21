const userEmail = document.getElementById("userEmail");
const userPassword = document.getElementById("userPassword");
const loginButon = document.getElementById("loginButon");
const itemSesion = document.getElementById("item-sesion");
const situacionChile = document.getElementById("situacionChile");
const errorLogin = document.getElementById("errorLogin");

// 2. Al hacer click en Iniciar sesión se debe levantar un modal con un formulario que le
// pida al usuario ingresar un correo y una contraseña.

(() => {
  const cerrarSesion = document.getElementById("cerrarSesion");

  if (localStorage.getItem("llave") != undefined) {
    itemSesion.innerHTML = `
    <a id="cerrarSesion" class="nav-link" href="#" >Cerrar Sesión</a>`;
    situacionChile.innerHTML = '<a class="nav-link situacion" href="/covid19/situacion-chile.html">Situación en Chile</a>';
  } else {
    itemSesion.innerHTML = `
    <a id="nav-item-login" class="nav-link" href="#" data-bs-toggle="modal" data-bs-target="#loginModal">Iniciar Sesión</a>`;
    situacionChile.innerHTML = "";
  }
})();

// 3. Implementar la lógica para obtener el JWT cuando se ingrese el correo y contraseña
// a través del formulario.
// ● Llamar a la API para obtener el JWT.
// ● Persistir el JWT.
// ● Cuando exista un JWT, se debe ocultar la opción del menú que dice Iniciar
// sesión, se debe agregar una que diga Situación Chile y otra de Cerrar sesión.

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

// 7. Al hacer click sobre el link Cerrar sesión del menú se debe volver al estado inicial de
// la aplicación, eliminar el token y ocultar los link de Situación Chile y Cerrar sesión,
// además de volver a mostrar Iniciar sesión.

//cerrar sesion
cerrarSesion.addEventListener("click", async (e) => {
  localStorage.removeItem("llave");
  window.location.href = "/covid19/";
});
