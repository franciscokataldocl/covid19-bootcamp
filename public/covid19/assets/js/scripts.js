const datos_tabla = document.getElementById("datos_tabla");
const modalCuerpo = document.getElementById("modalCuerpo");
const pais = document.getElementById("pais");

const getTotalData = async () => {
  try {
    const url = `http://localhost:3000/api/total`;
    const resp = await fetch(url);

    const { data: datx } = await resp.json();

    //filtro mas de 10000 casos
    const result = datx.filter((x) => x.active > 10000);

    const activeLocation = result.map((item) => item.location);

    const confirmedCases = result.map((item) => item.confirmed);
    const deathCases = result.map((item) => item.death);
    const activeCases = result.map((item) => item.active);
    const recoveredCases = result.map((item) => item.recovered);

    /*chart */

    new Chart(document.getElementById("bar-chart-grouped"), {
      type: "bar",
      data: {
        labels: activeLocation,
        datasets: [
          {
            label: "confirmed",
            backgroundColor: "#6b5ecd",
            data: confirmedCases,
          },
          {
            label: "deaths",
            backgroundColor: "#099ff4",
            data: deathCases,
          },
          {
            label: "recovered",
            backgroundColor: "#ea5f5e",
            data: recoveredCases,
          },
          {
            label: "active",
            backgroundColor: "#22b080",
            data: activeCases,
          },
        ],
      },
      options: {
        title: {
          display: true,
          text: "Population growth (millions)",
        },
      },
    });

    datx.forEach((item) => {
      datos_tabla.innerHTML += `
      <tr class="animate__animated animate__fadeInUp">
      
        <th scope="row">${item.location}</th>
        <td>${item.confirmed}</td>
        <td>${item.deaths}</td>
        <td>${item.recovered}</td>
        <td>${item.active}</td>
        <td><button  data-location="${item.location}" type="button" class="btn btn-info btn-show-modal button-modal" data-bs-toggle="modal" data-bs-target="#exampleModal">
        Detalles
    </button></td>
      </tr>`;
    });
  } catch (err) {
    console.log(err);
  }
};

new Promise(function (resolve) {
  resolve(getTotalData());
}).then(function (result) {
  getModalButtons();
});

const getSingleData = async (locationParameter) => {
  try {
    const url = `http://localhost:3000/api/countries/${locationParameter}`;
    const resp = await fetch(url);

    //DESTRUCTURING
    const { data: datos } = await resp.json();

    document.getElementById("charModal").innerHTML = "";
    document.getElementById("charModal").innerHTML = `
    <canvas id="doughnut-chart" width="800" height="450"></canvas>
    `;

    const { location, confirmed, deaths, recovered, active } = datos;
    pais.innerHTML = location;
    new Chart(document.getElementById("doughnut-chart"), {
      type: "doughnut",
      data: {
        labels: ["Confirmados", "Muertos", "Recuperados", "Activos"],
        datasets: [
          {
            label: "",
            backgroundColor: [
              "#6b5ecd",
              "#099ff4",
              "#ea5f5e",
              "#22b080",
              "#363342",
            ],
            data: [confirmed, deaths, recovered, active],
          },
        ],
      },
      options: {
        title: {
          display: true,
          text: "Predicted world population (millions) in 2050",
        },
      },
    });
  } catch (err) {
    console.log(err);
  }
};

const getModalButtons = async () => {
  const button = document.querySelectorAll(".btn-show-modal");
  let locationParameter = "";

  for (let i = 0; i < button.length; i++) {
    button[i].addEventListener("click", (e) => {
      console.log(e);

      locationParameter = e.target.getAttribute("data-location");
      // modalCuerpo.innerHTML = `${locationParameter}`;

      getSingleData(locationParameter);
    });
  }
};
