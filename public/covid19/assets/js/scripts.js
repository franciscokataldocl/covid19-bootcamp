const datos_tabla = document.getElementById("datos_tabla");
const modalCuerpo = document.getElementById("modalCuerpo");

const getCovidData = async () => {
  try {
    const url = `http://localhost:3000/api/total`;
    const resp = await fetch(url);
    const { data: datx } = await resp.json();

    //filtro mas de 1000 casos
    const result = datx.filter((x) => x.active > 10000);

    const activeLocation = result.map((item) => item.location);
    const activeCases = result.map((item) => item.active);

    /*chart */
    const data = {
      labels: activeLocation,
      datasets: [
        {
          label: "My First dataset",
          backgroundColor: "rgb(255, 99, 132)",
          borderColor: "rgb(255, 99, 132)",
          data: activeCases,
        },
      ],
    };
    const config = {
      type: "line",
      data,
      options: {},
    };
    var myChart = new Chart(document.getElementById("myChart"), config);

    /*chart */

    //pintar todos los datos en la tabla html
    datx.forEach((item) => {
      datos_tabla.innerHTML += `
      <tr>
      
        <th scope="row">${item.location}</th>
        <td>${item.confirmed}</td>
        <td>${item.deaths}</td>
        <td>${item.recovered}</td>
        <td>${item.active}</td>
        <td><button  data-location="${item.location}" type="button" class="btn btn-info btn-show-modal" data-bs-toggle="modal" data-bs-target="#exampleModal">
        ver detalles
    </button></td>
      </tr>`;
    });
  } catch (err) {
    console.log(err);
  }
};
// getCovidData();

new Promise(function (resolve) {
  resolve(getCovidData());
}).then(function (result) {
  b();
});

const getSingleData = async (locationParameter) => {
  try {
    const url = `http://localhost:3000/api/countries/${locationParameter}`;
    const resp = await fetch(url);

    const { data: datos } = await resp.json();

    const { location, confirmed, deaths, recovered, active } = datos;
    modalCuerpo.innerHTML = `<ul>
  <li>locacion: ${location}</li>
   <li>confirmados: ${confirmed}</li>
    <li>muertos: ${deaths}</li>
     <li>recuperados: ${recovered}</li>
     <li>activos: ${active}</li>
  </ul>`;
    /*chart */
    // const data = {
    //   labels: activeLocation,
    //   datasets: [
    //     {
    //       label: "My First dataset",
    //       backgroundColor: "rgb(255, 99, 132)",
    //       borderColor: "rgb(255, 99, 132)",
    //       data: activeCases,
    //     },
    //   ],
    // };
    // const config = {
    //   type: "line",
    //   data,
    //   options: {},
    // };
    // var myChart = new Chart(document.getElementById("myChart"), config);

    /*chart */

    //pintar todos los datos en la tabla html
    // datx.forEach((item) => {
    //   datos_tabla.innerHTML += `
    //   <tr>

    //     <th scope="row">${item.location}</th>
    //     <td>${item.confirmed}</td>
    //     <td>${item.deaths}</td>
    //     <td>${item.recovered}</td>
    //     <td>${item.active}</td>
    //     <td><button  data-location="${item.location}" type="button" class="btn btn-info btn-show-modal" data-bs-toggle="modal" data-bs-target="#exampleModal">
    //     ver detalles
    // </button></td>
    //   </tr>`;
    // });
  } catch (err) {
    console.log(err);
  }
};

const b = async () => {
  const button = document.querySelectorAll(".btn-show-modal");
  let locationParameter = "";
  for (let i = 0; i < button.length; i++) {
    button[i].addEventListener("click", (e) => {
      locationParameter = e.target.getAttribute("data-location");
      // modalCuerpo.innerHTML = `${locationParameter}`;
      getSingleData(locationParameter);
    });
  }
};

// const openModal = (e) => {
//   console.log(e.getAttribute("data-location"));
// };

// await console.log(button);
