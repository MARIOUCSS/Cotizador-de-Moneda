const form = document.querySelector("#form-search");
const moneda = document.querySelector("#moneda");
const criptomoneda = document.querySelector("#criptomonedas");
const formContainer = document.querySelector(".form-side");
const containerAnswer = document.querySelector(".container-answer");
const objbusqueda = {
  moneda: "",
  criptomoneda: "",
};
document.addEventListener("DOMContentLoaded", () => {
  consultarcripto();
  form.addEventListener("submit", submitform);
  moneda.addEventListener("change", getvalue);
  criptomoneda.addEventListener("change", getvalue);
});

function submitform(e) {
  e.preventDefault();
  const { moneda, criptomoneda } = objbusqueda;
  if (moneda === "" || criptomoneda === "") {
    MostrarError("Seleccionar Ambas Monedas...");
    return;
  }
  ConsultarApi(moneda, criptomoneda);

  console.log(moneda);
  console.log(criptomoneda);
}
const ConsultarApi = async (moneda, criptomoneda)=> {
 try {
    const res=await fetch(`https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${criptomoneda}&tsyms=${moneda}`);
    const data=await res.json();
    MostrarCotizacion(data.DISPLAY[criptomoneda][moneda]);
    //console.log(data.DISPLAY[criptomoneda][moneda]);
} catch (error) {
    console.log(error);
 }

}
function MostrarCotizacion(data) {
    containerAnswer.innerHTML='';
    const {PRICE,HIGHDAY,LOWDAY,CHANGEPCT24HOUR,LASTUPDATE}=data;
    const answer=document.createElement('div');
    answer.classList.add('display-info');
    answer.innerHTML=`
     <div class="display-info">
    <p class="main-price">Precio: <span>${PRICE}</span></p>
    <p>Precio más alto del día:: <span>${HIGHDAY}</span></p>
    <p>Precio más bajo del día: <span>${LOWDAY}</span></p>
    <p>Variación últimas 24 horas: <span>${CHANGEPCT24HOUR}%</span></p>
    <p>Última Actualización: <span>${LASTUPDATE}</span></p>
</div>  
    `
    containerAnswer.appendChild(answer)

}
function MostrarError(message) {
  const error = document.createElement("p");
  error.classList.add("error");
  error.textContent = message;
  formContainer.appendChild(error);
  setTimeout(() => {
    //Eliminamos el tag
    error.remove();
  }, 1500);
}

function getvalue(e) {
  objbusqueda[e.target.name] = e.target.value;
}
function consultarcripto() {
  fetch(
    "https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD"
  )
    .then((res) => res.json())
    .then((DAT) => {
      selectCriptos(DAT.Data);
    })
    .catch((error) => console.log(error));
}

function selectCriptos(criptos) {
  criptos.forEach((cripto) => {
    const { FullName, Name } = cripto.CoinInfo;
    const option = document.createElement("option");
    option.value = Name;
    option.textContent = FullName;
    criptomoneda.appendChild(option);
  });
}
