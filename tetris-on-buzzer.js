const Gpio = require('pigpio').Gpio;

var ledPio = require('pigpio').Gpio, //include pigpio to interact with the GPIO

ledRed = new ledPio(4, {mode: ledPio.OUTPUT}), //use GPIO pin 4 as output for RED
ledGreen = new ledPio(17, {mode: ledPio.OUTPUT}), //use GPIO pin 17 as output for GREEN
ledBlue = new ledPio(27, {mode: ledPio.OUTPUT}), //use GPIO pin 27 as output for BLUE

redRGB = 1, //set starting value of RED variable to off (0 for common cathode)
greenRGB = 1, //set starting value of GREEN variable to off (0 for common cathode)
blueRGB = 0; //set starting value of BLUE variable to off (0 for common cathode)

ledRed.digitalWrite(0); // Turn RED LED off
ledGreen.digitalWrite(1); // Turn GREEN LED off
ledBlue.digitalWrite(1); // Turn BLUE LED off

const raspi = require('raspi');
const pwm = require('raspi-pwm');
let time = 0;

//songlist

const mario = [
  'mi4', 'mi4','mi4',
  'do4','mi4','sol4','sol3',
  'do4', 'sol3', 'mi3',
  'la3', 'si3', 'la$3', 'la3',
  'sol3','mi4','sol4','la4',
  'fa4','sol4','mi4','do4','re4','si3'
];

const tetris = [
  'E', 'B', 'C', 'D', 'C', 'B', 'A',
  'A', 'C', 'E', 'D', 'C', 'B',
  'C', 'D', 'E', 'C', 'A', 'A',
  'D', 'F', 'A4', 'G', 'F', 'E',
  'C', 'E', 'D', 'C', 'B',
  'B', 'C', 'D', 'E', 'C', 'A', 'A',
  'E', 'B', 'C', 'D', 'C', 'B', 'A',
  'A', 'C', 'E', 'D', 'C', 'B',
  'C', 'D', 'E', 'C', 'A', 'A',
  'D', 'F', 'A4', 'G', 'F', 'E',
  'C', 'E', 'D', 'C', 'B',
  'B', 'C', 'D', 'E', 'C', 'A', 'A'
]

const notes = {

  do3: 261,
  do$3 : 277,
  re3: 293,
  re$3: 311,
  mi3: 329,
  fa3: 349,
  fa$3: 369,
  sol3: 392,
  sol$3: 415,
  la3: 440,
  la$3: 466,
  si3: 493,


  do4: 523,
  re4: 587,
  mi4: 659,
  fa4: 698,
  sol4: 783,
  la4: 880,
  si4: 987,



  do5: 1046,
  re5: 1174,
  mi5: 1318,
  fa5: 1396,
  sol5: 1567,
  la5: 1760,
  si5: 1975

};


const buzzer = new pwm.PWM('GPIO18');

raspi.init(() => {


  function refreshBuzzer(){
    buzzer.write(0.5);
  }

  function tone(note){

    if(note=='do4' || note=='C'){
      //gamme 4
      buzzer._frequencyValue = notes.do4;
    }else if(note=='re4' || note=='D' ){
      buzzer._frequencyValue = notes.re4;
    }else if(note=='mi4'|| note=='E'){
      buzzer._frequencyValue = notes.mi4;
    }else if(note=='fa4' || note=='F'){
      buzzer._frequencyValue = notes.fa4;
    }else if(note=='sol4' || note=='G'){
      buzzer._frequencyValue = notes.sol4;
    }else if(note=='la4' || note=='A4'){
      buzzer._frequencyValue = notes.la4;
    }else if(note=='si4'){
      buzzer._frequencyValue = notes.si4;
    }else if(note=='do3'){
      // gamme 3
      buzzer._frequencyValue = notes.do3;
    }else if(note=='do$3'){
      buzzer._frequencyValue = notes.do$3;
    }else if(note=='re3'){
      buzzer._frequencyValue = notes.re3;
    }else if(note=='re$3'){
      buzzer._frequencyValue = notes.re$3;
    }else if(note=='mi3'){
      buzzer._frequencyValue = notes.mi3;
    }else if(note=='fa3'){
      buzzer._frequencyValue = notes.fa3;
    }else if(note=='fa$3'){
      buzzer._frequencyValue = notes.fa$3;
    }else if(note=='sol3'){
      buzzer._frequencyValue = notes.sol3;
    }else if(note=='sol$3'){
      buzzer._frequencyValue = notes.sol$3;
    }else if(note=='la3'  || note=='A'){
      buzzer._frequencyValue = notes.la3;
    }else if(note=='la$3'){
      buzzer._frequencyValue = notes.la$3;
    }else if(note=='si3' || note=='B'){
      buzzer._frequencyValue = notes.si3;
    }else if(note=='end'){
      buzzer._dutyCycleValue = 0;
      buzzer.write(0);
    }

    refreshBuzzer();

  }

  function playWithDelay(song){

    time = 0;


    for(let i = 0; i <= song.length; i++){
      setTimeout(function(){
        tone(song[i]);

        ledRed.digitalWrite(Math.round(Math.random()));
        ledGreen.digitalWrite(Math.round(Math.random()));
        ledBlue.digitalWrite(Math.round(Math.random()));

        ledRed.pwmWrite(Math.floor(Math.random() * 256)); //set RED LED to specified value
        ledGreen.pwmWrite(Math.floor(Math.random() * 256)); //set GREEN LED to specified value
        ledBlue.pwmWrite(Math.floor(Math.random() * 256)); //set BLUE LED to specified value
      }, time);


      time += 240; // change the delay between tones here
    }

  }






  playWithDelay(tetris);

});





process.on('exit', function(code) {
  ledRed.digitalWrite(0);
  ledGreen.digitalWrite(0);
  ledBlue.digitalWrite(0);
  buzzer.write(0);
  buzzer._alive = false;
});
