const graficoChile = document.getElementById("graficoChile");
const loading = document.getElementById("loading");

//get confirmados
const getChileConfirmed = async (jwt) => {
  try {
    const response = await fetch("http://localhost:3000/api/confirmed", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    });

    const { data } = await response.json();
    return (confirmed = data);
  } catch (err) {
    console.error(`Error: ${err}`);
  }
};

//get deaths
const getChileDeaths = async (jwt) => {
  try {
    const response = await fetch("http://localhost:3000/api/deaths", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    });

    const { data } = await response.json();
    return (deaths = data);
  } catch (err) {
    console.error(`Error: ${err}`);
  }
};

//get recovered
const getChileRecovered = async (jwt) => {
  try {
    const response = await fetch("http://localhost:3000/api/recovered", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    });

    const { data } = await response.json();
    return (recovered = data);
  } catch (err) {
    console.error(`Error: ${err}`);
  }
};

const tokenValue = localStorage.getItem("llave");
const p1 = getChileConfirmed(tokenValue);
const p2 = getChileDeaths(tokenValue);
const p3 = getChileRecovered(tokenValue);

Promise.all([p1, p2, p3]).then((values) => {
  //promesas resueltas de la consulta a las 3 API
  const fechas = values[0].map((fecha) => fecha.date);
  const confirmados = values[0].map((confirmado) => confirmado.total);
  const muertos = values[1].map((muerto) => muerto.total);
  const recuperados = values[2].map((recuperado) => recuperado.total);

  graficoChile.innerHTML = `<canvas id="line-chart" width="800" height="450"></canvas>`;

  //crear chart
  new Chart(document.getElementById("line-chart"), {
    type: "line",
    responsive: "true",
    data: {
      labels: fechas,
      datasets: [
        {
          data: confirmados,
          label: "Confirmados",
          borderColor: "#099ff4",
          fill: true,
        },
        {
          data: muertos,
          label: "Muertos",
          borderColor: "#ea5f5e",
          fill: true,
        },
        {
          data: recuperados,
          label: "Recuperados",
          borderColor: "#22b080",
          fill: true,
        },
      ],
    },
    options: {
      title: {
        display: true,
        text: "World population per region (in millions)",
      },
    },
  });
 loading.remove();
});
