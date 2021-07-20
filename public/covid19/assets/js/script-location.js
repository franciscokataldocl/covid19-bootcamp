switch (window.location.href) {
  case "http://localhost:3000/covid19/":
    //Declaraciones ejecutadas cuando el resultado de expresión coincide con el valor1
    const home = document.getElementsByClassName("home");

    home[0].classList.add("menu-active");
    break;
  case "http://localhost:3000/covid19/situacion-chile.html":
    const situacion = document.getElementsByClassName("situacion");

    situacion[0].classList.add("menu-active");
    break;
}
