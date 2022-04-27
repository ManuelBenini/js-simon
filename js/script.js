/*
**Consegna:**
Visualizzare in pagina 5 numeri casuali. Da lì parte un timer di 5 secondi.
Dopo 5 secondi l’utente deve inserire, uno alla volta, i numeri che ha visto precedentemente, tramite il prompt().
Dopo che sono stati inseriti i 5 numeri, il software dice quanti e quali dei numeri da indovinare sono stati individuati.

--------------------

1. funzione numero casuale applicata 5 volte,
2. Funzione setTimeout per 5 secondi così da far sparire i numeri,
3. chiedere all'utente di inserire i 5 numeri visti con prompt(),
4. Una volta inseriti i numeri, verificare quanti e quali sono quelli corretti e visualizzare.
*/

let secondsToWait = 5;
let correctUserNumCounter = 0;
const totalNumbers = 5;
const pcNumArray = [];
const userNumArray = [];
const correctUserNum = [];

init();



/***********************
    TIMING FUNCTIONS
*************************/

// Countdown per far sparire i numeri
const countDown = setInterval(function(){
  document.getElementById('numeri-giusti').innerHTML = `Hai ${--secondsToWait} secondi per memorizzare i seguenti numeri`
}, 1000)

// Aggiunta classe Hide agli span dopo 5 secondi
setTimeout(hide, secondsToWait * 1000);

// Messaggio dopo countdown
setTimeout(function(){
  clearInterval(countDown);
  document.getElementById('numeri-giusti').innerHTML = `Ed adesso, quali ricordi?`
}, secondsToWait * 1000)

// Inserimento numeri per l'utente (Prompt) dopo 5 secondi
setTimeout(userPrompt, (secondsToWait + 1) * 1000);





/***********************
        FUNZIONI
*************************/


/**
 * Funzione che funge da start del programma (Crea N numero di celle)
 */
 function init() {
  while(pcNumArray.length < totalNumbers){
    createNumberCell();
  }
  console.log('array dei numeri da ricordare', pcNumArray);
}


/**
 * Prompt per far inserire all'utente i numeri che ricorda
 */
function userPrompt() {
  console.log(`sono passati ${secondsToWait} secondi, quali numeri ricordi?`)

  for (let i = 0; i < pcNumArray.length; i++) {
    let flag = false;
    let userNumber = parseInt(prompt('Inserisci i numeri che ricordi!'));

    while(!flag){

      while(isNaN(userNumber)){
        userNumber = parseInt(prompt('Non hai inserito un numero, riprovare'));
      }

      if(!userNumArray.includes(userNumber)){
        userNumArray.push(parseInt(userNumber));
        flag = true;
      }else{
        userNumber = parseInt(prompt('Hai inserito due numeri uguali, inseriscine un altro!'));
        flag = false;
      }
    }

    console.log('lista numeri', userNumArray);
    userNumberCell(userNumber)
    score();
  }
  removeHide();
}


/**
 * Stampa quanto punti l'utente ha fatto
 */
function score() {
  const finalScore = document.getElementById('numeri-giusti');
  if (correctUserNumCounter === 1) {
    finalScore.innerHTML = `Hai indovinato ${correctUserNumCounter} solo numero! {${correctUserNum}}`
  }else if (correctUserNumCounter > 1 && correctUserNumCounter < totalNumbers) {
    finalScore.innerHTML = `Hai indovinato ${correctUserNumCounter} numeri! {${correctUserNum}}`
  }else if (correctUserNumCounter === totalNumbers) {
    finalScore.innerHTML = `Hai indovinato tutti i numeri! {${correctUserNum}}`
  }else{
    finalScore.innerHTML = `Non hai indovinato nessun numero :(`
  }
}


/**
 * Generatore celle con numeri interni (span) del PC
 * @returns testo numeri dello span
 */
function createNumberCell() {
  const Cell = document.createElement('div');
  Cell.className = 'number-cell';
  const numberCell = document.createElement('span');
  numberCell.className = 'numbers';
  numberCell.innerText = generateRandomNumber(100, 999);

  let flag = false;
  while (!flag)
  if (!pcNumArray.includes(numberCell.innerText)) {
    pcNumArray.push(parseInt(numberCell.innerText));
    flag = true;
  }else{
    numberCell.innerText = generateRandomNumber(100, 999);
  }

  document.querySelector('.container').append(Cell);
  Cell.append(numberCell);
}


/**
 * Generatore celle con numeri interni (span) dell'utente
 * @param {Number} num 
 */
function userNumberCell(number) {
  const userContainer = document.querySelector('.mb_container');
  const userCell = document.createElement('div');
  const userNumberCell = document.createElement('span');
  userCell.className = 'number-cell';
  if(pcNumArray.includes(number)){
    correctUserNumCounter++;
    userCell.classList.add('green');
    correctUserNum.push(number);
  }
  userNumberCell.innerText = number;
  userContainer.append(userCell);
  userCell.append(userNumberCell);
  console.log('lista numeri corretti', correctUserNum);
}


/**
 * Aggiunta classe "hide" agli span
 */
function hide() {
  for (let i = 1; i <= totalNumbers; i++) {
    document.querySelector('.numbers').className = 'hide';
  }
  return
}


/**
 * Rimozione classe "hide" agli span
 */
 function removeHide() {
  for (let i = 0; i < totalNumbers; i++) {
    document.querySelector('.hide').className = '.numbers';
  }
}


/**
 * Generatore numeri random
 * @param {Number} min 
 * @param {Number} max 
 * @returns numero randomico
 */
function generateRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}