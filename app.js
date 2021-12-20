const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
const weekdays = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

const giveaway = document.querySelector('.giveaway');
const deadline = document.querySelector('.deadline');
const items = document.querySelectorAll('.deadline-format h4'); // grab h4 of the "deadline-format"

// console.log(items);

let tempDate = new Date();
let tempYear = tempDate.getFullYear();
let tempMonth = tempDate.getMonth();
let tempDay = tempDate.getDate();

// let futureDate = new Date(2022,1,28,11,30,0); // months are zero index
const futureDate = new Date(tempYear,tempMonth, tempDay + 10, 11,30,0) // by this way we have set the deadline of 10 days from current day (means "+10" will add 10 days countdown timer from current date i.e, 16th dec)
// console.log(futureDate);

const year = futureDate.getFullYear();
const hours = futureDate.getHours();
const minutes = futureDate.getMinutes();

let month = futureDate.getMonth();
// console.log(months[month]);
month = months[month];

const date = futureDate.getDate();

const weekday = weekdays[futureDate.getDay()];

giveaway.textContent = `giveaway ends on ${weekday}, ${date} ${month} ${year} ${hours}:${minutes}am`;

// future time in milli seconds
const futureTime = futureDate.getTime();
// console.log(futureTime);

function getRemainingTime(){
  const today = new Date().getTime();
  // console.log(today);

  const t = futureTime - today;
  // console.log(t);
  // 1s = 1000ms
  // 1m = 60s
  // 1hr = 60m
  // 1day = 24hrs

  // values in ms
  const oneDay = 24*60*60*1000;
  const oneHour = 60*60*1000;
  const oneMinute = 60*1000;

  // calculate all values
  let days = t/oneDay;
  // console.log(days);
  days = Math.floor(days);
  // console.log(days);

  let hour = (t % oneDay) / oneHour;
  // console.log(hour);
  hour = Math.floor(hour);
  // console.log(hour);

  let minutes = Math.floor((t % oneHour)/oneMinute);
  // console.log(minutes);

  let seconds = Math.floor((t % oneMinute)/1000);
  // console.log(seconds);

  // Set values array
  const values = [days, hour, minutes, seconds];

  function format(item){
    if(item<10){
      return item = `0${item}`;
    }
    return item
  }

  items.forEach(function(item, index){
    item.innerHTML = format(values[index]);
  });

  if( t < 0){
    clearInterval(countdown);
    deadline.innerHTML = `<h4 class = "expired">Sorry, this giveaway has expired</h4>`;
  }
}   

// countdown
let countdown = setInterval(getRemainingTime,1000);

getRemainingTime(); // invoke the "getRemainingTime" after the countdown because we want to clear the setInterval that we have set
