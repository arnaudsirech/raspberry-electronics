var http = require('http').createServer(handler); 
var fs = require('fs');
var io = require('socket.io')(http);
var Gpio = require('pigpio').Gpio, //include pigpio to interact with the GPIO
motor = new Gpio(17, {mode: Gpio.OUTPUT}); // Motor should be connected on GPIO 17
//RESET RGB LED

http.listen(80); //listening to port 80

function handler(req, res) {
  
  fs.readFile(__dirname + '/public/rgb.html', function(err, data) {
    //read file rgb.html in public folder
    if (err) {
      res.writeHead(404, {'Content-Type': 'text/html'}); //display 404 on error
      return res.end('404 Not Found');
    }
    res.writeHead(200, {'Content-Type': 'text/html'});
    return res.end();
  });
}

io.sockets.on('connection', function(socket) {
  // Web Socket Connection
  console.count('User has connected');

  // Getting inputs from user on the web page

  socket.on('motorOn', function() {
    motor.digitalWrite(1);
  });

  socket.on('motorOff', function() {
    motor.digitalWrite(0);
  });
});

process.on('SIGINT', function() {
  motor.digitalWrite(0); // Gpio off
  process.exit(); //exit completely
});
