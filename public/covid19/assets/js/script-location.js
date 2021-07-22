switch (window.location.href) {
  case "http://localhost:3000/covid19/":
    const home = document.getElementsByClassName("home");

    home[0].classList.add("menu-active");
    break;
  case "http://localhost:3000/covid19/situacion-chile.html":
    const situacion = document.getElementsByClassName("situacion");

    situacion[0].classList.add("menu-active");
    break;
}
