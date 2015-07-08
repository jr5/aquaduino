
var http = require('http');
var serialport = require('serialport'),// include the library
SerialPort = serialport.SerialPort, // make a local instance of it
// get port name from the command line:
portName = process.argv[2];
var deviceName = process.argv[3];
var dbName= "sensordata1";
if(!deviceName){
	console.log("Plese specify <COMPORT> <DEVICENAME>");
	return;
	}
 


var myPort = new SerialPort(portName, {
   baudRate: 9600,
   // look for return and newline at the end of each data packet:
   parser: serialport.parsers.readline("\r\n")
 });
 
myPort.on('open', showPortOpen);
myPort.on('data', saveLatestData);
myPort.on('close', showPortClose);
myPort.on('error', showError);



function showPortOpen() {
   console.log('port open. Data rate: ' + myPort.options.baudRate);
}

function saveLatestData(data) {
   //Parse Data
   

   var arr = data.split(" ");

   var now = new Date();
   var pData = { 
   sensor : deviceName + "." + arr[0],
   data : arr[1],
   dt: now.toJSON() 
   };
   
   postData(pData);
   
}

function postData(pData){
console.log("Post data function.");
var options = {
  host: '127.0.0.1',
  port: 5984,
  path: '/' + dbName,
  method: 'POST',
  headers: { 'Content-Type': 'application/json' }
};

var req = http.request(options, function(res) {
  console.log('STATUS: ' + res.statusCode);
  console.log('HEADERS: ' + JSON.stringify(res.headers));
  res.setEncoding('utf8');
  res.on('data', function (chunk) {
    console.log('BODY: ' + chunk);
  });
});
console.log("Post json next");


var pJSON = JSON.stringify(pData);
console.log("JSON : " + pJSON);

req.write(pJSON);
req.end();
//req.close();
console.log("Wrote.");

}

function showPortClose() {
   console.log('port closed.');
}

function showError(error) {
   console.log('Serial port error: ' + error);
}