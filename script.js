
let fac= new Date()
let ops={
  hour: 'numeric', minute: 'numeric', second: 'numeric',
  day: "numeric",
  month: "long",
  year: "numeric",
  weekday: "long",
  dayPeriod: "long",

  timeZone: "America/New_York",
  timeZoneName: "long"
}

let old= new Intl.DateTimeFormat("en-Us", ops).format(fac)

let america= document.querySelector(".america")
america.innerText= old

// ----------------------- 

ops.timeZone= "Europe/Kiev"

let kiev= new Date()
let kk= new Intl.DateTimeFormat("uk-UA", ops).format(kiev)

let ukraine= document.querySelector(".ukraine")
ukraine.innerText= kk

ops.timeZone= "Europe/Rome"

let rome= new Date()

let rom= new Intl.DateTimeFormat("it-IT", ops).format(rome)

let romme= document.querySelector(".rome")
romme.innerText= rom

/* ------------------------------------------------------------------------ */

const d = new Date(new Date().toLocaleString("en-US", {timeZone: "America/New_York"}));

//We set Properties to e used in the CSS animation keyframes
let delayseconds= d.getSeconds()
document.querySelector(".captain").style.animationDelay= ( (delayseconds*-1) + "s" )

let delayminutes= d.getMinutes() * 60
document.querySelector(".arm_minute").style.animationDelay= ( (delayminutes*-1) + "s" )

let delayhours= d.getHours() * 3600
document.querySelector(".arm_hour").style.animationDelay= ( (delayhours*-1) + "s" )

/* ------------------------------------------------- */

let ore= document.querySelector(".centro_ora")
let minuti= document.querySelector(".centro_minuto")
let secondi= document.querySelector(".centro_secondo")

let marche= document.getElementById("marche")
let orologio= document.querySelector(".orologio")

/* here we draw all of the clock dots */
for(let x= 0; x<= 60; x++ ){

  let uno= document.createElement("div")
  uno.className= "punto"

  /* we create a CSS style selector + property for each dot with different rotate */
  marche.appendChild( uno )
  const cssTemplateString1 = `.punto:nth-child(${x}){ transform: rotate( calc(6deg * ${x} ) ) }`;

  const styleTag = document.createElement("style");
  styleTag.innerHTML = cssTemplateString1;
  document.head.insertAdjacentElement('beforeend', styleTag);
  //and we append it the head of the HTML document
}

let digital1= document.querySelector(".digitale")

/* we get the seconds degree */
let inizio= new Date()
let primo_secondo= inizio.getSeconds() * 6

/* the previous second is only the started one, we use it start the clocks*/
function tempo(){
  let momento= new Date()

/* we wont use the current second for the seconds degree, we just add degrees to the first
so we don't have any 0degrees re-starts that messes up the timin-function chosen */
  primo_secondo+= 6
  secondi.style.transform = `rotate(${primo_secondo}deg) translateY(-45px)`

/* the transform-origin is center, so we translateY() for a better clockarms */
  let minute = momento.getMinutes();
  const minuteDeg = (minute * 6); 
  minuti.style.transform = `rotate(${minuteDeg}deg) translateY(-35px)`;

  //being a 12 hours clock we get a 1/12 of the circle on 30degree
  let hour = momento.getHours();
  const hourDeg = hour* 30 + minute/ 2; 
  ore.style.transform = `rotate(${hourDeg}deg) translateY(-30px)`;

  let second = momento.getSeconds();

  let se = (second< 10) ? second= "0" + second : second
  let mi= (minute<10) ? minute= "0" + minute : minute
  let ho= (hour<10) ? hour= "0" + hour : hour

  digital1.innerHTML = '<div>' + hour + ' : ' + minute + ' : ' + '<span>' + second +'</span>'+ '</div>';
}

setInterval( tempo, 1000);

/* ---------------------------------------------- */

var hoursContainer = document.querySelector('.set_hour')
var minutesContainer = document.querySelector('.set_minute')
var secondsContainer = document.querySelector('.set_second')

function updateTime () {
    var now = new Date(new Date().toLocaleString("en-US", {timeZone: "Europe/Kiev"})); 

    /* we get numbers that we convert to strings */
    var nowHours = now.getHours().toString()
    var nowMinutes = now.getMinutes().toString()
    var nowSeconds = now.getSeconds().toString()

    updateContainer(hoursContainer, nowHours)
    updateContainer(minutesContainer, nowMinutes)
    updateContainer(secondsContainer, nowSeconds)
}

function updateContainer (container, newTime) {
    //container is 2 div for each time secton
    //newTime string of 2 letters, we split in 2 arrays every seconds
    var time = newTime.split('')

    //if single number array we add a [0] at start
    if (time.length === 1) {
      time.unshift('0')
    }

    //we select the CURRENT first div with old time textcontent
    //we update with the new time[0] if they are not the same (minutes/hours)
    //firstElementChild is just to enter the first/second tag in container
    var first = container.firstElementChild
    if (first.firstElementChild.textContent !== time[0]) {
      updateNumber(first, time[0])
    }

    //we do same for second div
    var last = container.lastElementChild
    if (last.firstElementChild.textContent !== time[1]) {
      updateNumber(last, time[1])
    }
}
  
function updateNumber (element, number) {

  //we clonate a new element to slide INTO with updated time
  //element.firstElementChild is the old current time
  var second = element.firstElementChild.cloneNode(true)
  second.textContent = number

  //we add the cloned below the current and animate the old to be scrolleds
  element.appendChild(second)
  element.classList.add('move')

  //after the single scrolling animation is done, we remove it untill it happens again
  setTimeout(function () {
    element.classList.remove('move')
  }, 980)

  //we "delete" the old number FIRST after its passed
  setTimeout(function () {
    element.removeChild(element.firstElementChild)
  }, 980)
}

setInterval(updateTime, 1000)

let UA= new Date()
//in the formatting some values come separate, so we can split
let opzioni={
  weekday: "short",
  day: "numeric",
  month: "numeric"
}

let numeri= new Intl.DateTimeFormat('en-UK', opzioni).format(UA).split(",")

let giorno= document.querySelector(".giorno")
giorno.innerText= numeri[0]

/* we can add OPTIONS to the basic toLocalString */
let UAyear = new Date(new Date().toLocaleString("en-US", {timeZone: "Europe/Kiev"})); 

let data= document.querySelector(".data")
data.innerText= numeri[1]

/* remember to select the exact element so to share the css properties */
let anno= document.querySelector(".anno")
anno.innerText= UAyear.getFullYear()
