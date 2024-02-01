let contador = document.getElementById("contador");
let titulo = document.getElementById("titulo");

let preguntaContainer = document.getElementById("pregunta__container");
let ppalContainer = document.getElementById("ppal__container");
let startContainer = document.getElementById("start__container");

let nextBtn = document.getElementById("next_btn");
let startBtn = document.getElementById("start_btn");
const apiURL = document.getElementById("apiURL").innerText;
console.log(apiURL)
var index = 1;
var correctAnswers = 0;

startBtn.addEventListener("click",()=>{
    procesarPreguntas().then(() => {
        ppalContainer.style.display = "block";
        startContainer.style.display = "none";
        mostrarPregunta(0)

        //Iniciailizacion EventListeners de las respuestas
        initResListeners();
        let respuestasA = document.querySelectorAll(".respuesta");
        respuestasA.forEach(item => {
            item.removeAttribute("disabled");
        })
    });
})

nextBtn.addEventListener("click",()=> {
    mostrarPregunta(index);
    index++;
    contador.innerHTML = index;
    initResListeners();
    let respuestasA = document.querySelectorAll(".respuesta");
    respuestasA.forEach(item => {
        item.disabled = false
    })
    document.getElementById("correction").innerHTML = ''
})

function mostrarPregunta(index){
    let preguntas = JSON.parse(sessionStorage.getItem("preguntas"));
    if (index < preguntas.length) {
        var PreguntaJSON = preguntas[index];
    
        preguntaContainer.innerHTML = "";

        let question = document.createElement("h2");
        question.innerHTML = PreguntaJSON.question;
        preguntaContainer.append(question);

        let respuestas = [];
        respuestas.push(PreguntaJSON.correct_answer);
        PreguntaJSON.incorrect_answers.forEach(item => {
            respuestas.push(item);
        }); 
        //TODO: Shufflear respuestas antes de ponerlas en el documento 
        respuestas = shuffle(respuestas);

        for (let i = 0; i < respuestas.length; i++) {
            let p = document.createElement("button");
            p.className = "respuesta";
            p.innerHTML = respuestas[i];
            preguntaContainer.append(p);
        }
    } else { 
        preguntaContainer.innerHTML = "No quedan mas preguntas" + ` Puntuacion: ${correctAnswers}`;
        nextBtn.style.display = "none";
        titulo.style.display = "none";
    }
}

async function procesarPreguntas() {
    try {
        await obtenerPreguntas();
    } catch (error) {
        console.log(error)
    }
    
}

function obtenerPreguntas(){
    return new Promise((resolve, reject) => {
        let preguntas = [];
        fetch(apiURL)
        .then(response => response.json())
        .then(json => {
            preguntas = json.results.map(item => item);
            sessionStorage.setItem("preguntas", JSON.stringify(preguntas));
            resolve("Preguntas almacenadas");
        })
        .catch(error => {
            reject(error);
        })        
    })
}

function initResListeners() {
    let respuestasA = document.querySelectorAll(".respuesta");
    respuestasA.forEach((res) => {
        res.addEventListener("click", (e) => {
            comprobarRespuestas(res);
        });
    });
}

function comprobarRespuestas(res) { 
    const preguntas = JSON.parse(sessionStorage.getItem("preguntas"));
    let respuestasA = document.querySelectorAll(".respuesta");
    console.log("user input: " + res.innerHTML);
    console.log("correct answer: " + preguntas[index - 1].correct_answer);
    if(res.innerHTML != preguntas[index - 1].correct_answer) {
        console.log("mal")
        respuestasA.forEach(item => {
            item.setAttribute("disabled","disabled")
            item.style.backgroundColor = "red";
        })      
        document.getElementById("correction").innerHTML = `The answer was: ${preguntas[index - 1].correct_answer}`
    } else {
        respuestasA.forEach(item => {
            item.style.backgroundColor = "red";
            item.disabled = true
        })
        console.log("bien");
        res.style.backgroundColor = "green";
        correctAnswers++;
    }
}

/* function cambiarBtns(res){
    let respuestasA = document.querySelectorAll(".respuesta");
    const preguntas = JSON.parse(sessionStorage.getItem("preguntas"));  
    if(res.innerHTML === preguntas[index - 1].correct_answer) {
        respuestasA.forEach(item => {
            item.style.backgroundColor = "red";
            item.disabled = true
        })
        console.log("bien");
        res.style.backgroundColor = "green";
        correctAnswers++;
    } else {
        console.log("mal");
        respuestasA.forEach(item => {
            if(item.innerHTML === preguntas[index - 1].correct_answer) {
                item.style.backgroundColor = "green";
            }
            item.setAttribute("disabled","disabled")
            item.style.backgroundColor = "red";
        })        
    }
} */
function shuffle(array) {
    let currentIndex = array.length,  randomIndex;
  
    // While there remain elements to shuffle.
    while (currentIndex > 0) {
  
      // Pick a remaining element.
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
  
      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }
  
    return array;
  }