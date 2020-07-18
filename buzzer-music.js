const Gpio = require('pigpio').Gpio;
const raspi = require('raspi');
const pwm = require('raspi-pwm');


const notes = {
  do: 523,
  re: 587,
  mi: 659,
  fa: 698,
  sol: 783,
  la: 880,
  si: 987,
  do5: 1046

};

const buzzer = new pwm.PWM('GPIO18');

raspi.init(() => {


  function refreshBuzzer() {
    buzzer.write(0.1);
  }

  function tone(note) {

    if (note == 'do') {
      buzzer._frequencyValue = notes.do;
    } else if (note == 're') {
      buzzer._frequencyValue = notes.re;
    } else if (note == 'mi') {
      buzzer._frequencyValue = notes.mi;
    } else if (note == 'fa') {
      buzzer._frequencyValue = notes.fa;
    } else if (note == 'sol') {
      buzzer._frequencyValue = notes.sol;
    } else if (note == 'la') {
      buzzer._frequencyValue = notes.la;
    } else if (note == 'si') {
      buzzer._frequencyValue = notes.si;
    } else if (note == 'do5') {
      buzzer._frequencyValue = notes.do5;
    } else if (note == 'end') {
      buzzer._dutyCycleValue = 0;
    }

    refreshBuzzer();

  }


  function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }


  function gammeDeDo() {

    tone('do');

    setTimeout((function () {
      tone('re');
    }), 1000);

    setTimeout((function () {
      tone('mi');
    }), 2000);

    setTimeout((function () {
      tone('fa');
    }), 3000);

    setTimeout((function () {
      tone('sol');
    }), 4000);

    setTimeout((function () {
      tone('la');
    }), 5000);

    setTimeout((function () {
      tone('si');
    }), 6000);

    setTimeout((function () {
      tone('do5');
    }), 7000);

    setTimeout((function () {
      tone('end');
    }), 7000);


  }

  gammeDeDo();


});

process.on('exit', function (code) {
  buzzer.write(0);
});
