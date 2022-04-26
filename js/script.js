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

const sec = 5;
let niceMemory = 0;
const pcNumArray = [];
const correctUserNum = [];

init();


/**
 * Funzione che funge da start del programma (Crea N numero di celle)
 */
function init() {
  for(let i = 1; i <= 5; i++){
   const numberToRemeber =  createNumberCell();
   pcNumArray.push(numberToRemeber);
  }
  console.log('array dei numeri da ricordare', pcNumArray);

}

// Aggiunta classe Hide agli span dopo 5 secondi
setTimeout(hide, 5000);

// Inserimento numeri per l'utente dopo 5 secondi
setTimeout(userPrompt, 5200);


/**
 * Prompt per far inserire all'utente i numeri che ricorda
 */
function userPrompt() {
  console.log(`sono passati ${sec} secondi, quali numeri ricordi?`)
  for (let i = 0; i < pcNumArray.length; i++) {
    const userNumber = prompt('Inserisci i numeri che ricordi!');
    userNumberCell(userNumber)
    score();
  }
  removeHide();
}


/**
 * Stampa quanto punti l'utente ha fatto
 */
function score() {
  if (niceMemory === 1) {
    document.getElementById('numeri-giusti').innerHTML = `Hai indovinato ${niceMemory} solo numero! {${correctUserNum}}`
  }else if (niceMemory > 1 && niceMemory < 5) {
    document.getElementById('numeri-giusti').innerHTML = `Hai indovinato ${niceMemory} numeri! {${correctUserNum}}`
  }else if (niceMemory === 5) {
    document.getElementById('numeri-giusti').innerHTML = `Hai indovinato tutti i numeri! {${correctUserNum}}`
  }else{
    document.getElementById('numeri-giusti').innerHTML = `Non hai indovinato nessun numero :(`
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
  numberCell.innerText = generateRandomNumber(1, 100);
  document.querySelector('.container').append(Cell);
  Cell.append(numberCell);
  return numberCell.innerText;
}


/**
 * Generatore celle con numeri interni (span) dell'utente
 * @param {Number} num 
 */
function userNumberCell(num) {
  const userContainer = document.querySelector('.mb_container');
  const userCell = document.createElement('div');
  const userNumberCell = document.createElement('span');
  userCell.className = 'number-cell';
  if(pcNumArray.includes(num)){
    niceMemory++;
    userCell.classList.add('green');
    correctUserNum.push(num);
  }
  userNumberCell.innerText = num;
  userContainer.append(userCell);
  userCell.append(userNumberCell);
}


/**
 * Aggiunta classe "hide" agli span
 */
function hide() {
  for (let i = 1; i <= 5; i++) {
    document.querySelector('.numbers').className = 'hide';
  }
  return
}


/**
 * Rimozione classe "hide" agli span
 */
 function removeHide() {
  for (let i = 0; i < 5; i++) {
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