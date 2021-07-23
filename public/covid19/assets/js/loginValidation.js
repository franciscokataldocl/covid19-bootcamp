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

  if (sessionStorage.getItem("llave") != undefined) {
    //si la llave existe mostramos cerrar sesion en el menu
    itemSesion.innerHTML = `
    <a id="cerrarSesion" class="nav-link" href="#" >Cerrar Sesión</a>`;
    //mostramos el link a la pagina de situacion en chile
    situacionChile.innerHTML =
      '<a class="nav-link situacion" href="/covid19/situacion-chile.html">Situación en Chile</a>';
  } else {
    //si la llave no existe y se intenta ingresar a la ruta de situacion en chile, hacemos redireccion al home
    const location = window.location.href;
    if (location === "http://localhost:3000/covid19/situacion-chile.html") {
      window.location.href = "/covid19/";
    }
    //si la llave no existe mostramos el item de iniciar sesion
    itemSesion.innerHTML = `
    <a id="nav-item-login" class="nav-link" href="#" data-bs-toggle="modal" data-bs-target="#loginModal">Iniciar Sesión</a>`;
    //ocultamos el item de situacion en chile
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
      //si token es undefined mostramos un mensaje de error
      errorLogin.innerHTML = `<p class="error-form text-center animate__animated animate__shakeX">Datos incorrectos</p>`;
    } else {
      //si token existe lo almacenamos en sessionStorage
      sessionStorage.setItem("llave", token);

      location.reload();
      //eliminamos el mensaje de error del formulario en el modal
      errorLogin.innerHTML = "";
    }
  } catch (err) {
    console.error(`Error: ${err}`);
  }
};

//form click
loginButon.addEventListener("click", (e) => {
  e.preventDefault();
  //al hacer click en ingresar enviamos  los valores del input a la funcion que valida el jwt
  loginValidation(userEmail.value, userPassword.value);
});

// 7. Al hacer click sobre el link Cerrar sesión del menú se debe volver al estado inicial de
// la aplicación, eliminar el token y ocultar los link de Situación Chile y Cerrar sesión,
// además de volver a mostrar Iniciar sesión.

//cerrar sesion
//deberia instanciar esta funcion solo si se encuentra la llave en sessionStorage
cerrarSesion.addEventListener("click", (e) => {
  //al hacer click en cerrar sesion eliminamos la llave
  sessionStorage.removeItem("llave");
  //redirigimos al home
  window.location.href = "/covid19/";
});
