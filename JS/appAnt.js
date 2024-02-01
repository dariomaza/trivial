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

let apiURL =  "https://opentdb.com/api.php?amount=20&category=9&difficulty=medium"/* document.getElementById("apiURL").innerHTML; */
let questionContainer = document.getElementById("questionContainer");
console.log(apiURL);

fetch(apiURL)
.then(response => response.json())
.then(json => {
    let preguntas = json.results;
    setPreguntas(preguntas);
})
.then(
    procesarPreguntas()
)
.catch(error => {
    console.error(error);
})


function mostrarPregunta(pregunta) {

    let respuestas = [];
    pregunta.incorrect_answers.forEach(element => {
        respuestas.push(element);
    });
    respuestas.push(pregunta.correct_answer);
    
    respuestas = shuffle(respuestas);
    
    let title = document.createElement("h2");
    title.innerHTML =pregunta.question;
    questionContainer.append(title);
    respuestas.forEach(respuesta => {
        let res = document.createElement("p");
        res.innerHTML = respuesta;
        questionContainer.append(res);
    })
}

let index = 0;
console.log(index);
let preguntasArray = []
function setPreguntas(preguntas){
    preguntasArray = preguntas;
}

function procesarPreguntas() {
    let preguntasArray = getPreguntas()
    let pregunta = preguntas[0];
    mostrarPregunta(pregunta);
}

let btn_next = document.getElementById("btn_next");
btn_next.addEventListener("click",e => {
    e.preventDefault();
    index++;
    procesarPreguntas(index)
})