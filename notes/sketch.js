var wave;
var env;

var button;
var Aslider;
var waveType;
var playing = false;
var notes = [240,270,300,320,360,400,450,470];
// notes = [450,360,300,240,270,320,400,470]
notes = [640,270,300,320,360,400,450,470];

function setup() {
  createCanvas(10, 10);
  wave = new p5.Oscillator();

  Aslider = createSlider(100, 2000, 100);
  Dslider = createSlider(100, 2000, 100);
  Sslider = createSlider(100, 2000, 500);
  Rslider = createSlider(100, 2000, 500);

  env = new p5.Env();
  env.setADSR(0.05, 0.1, 0.5, 0.2);
  env.setRange(1.2, 0);

  wave.setType("sine");
  wave.start();
  wave.freq(440);
  wave.amp(env);

  for(i=0;i<notes.length;i++){
    var btn = document.createElement("BUTTON");
    btn.innerHTML = "<div onclick='toggle("+notes[i]+")'>"+notes[i]+"</div>";
    document.body.appendChild(btn);
  }
  var buttons = document.getElementsByTagName('button');
  for (var i = 0; i < buttons.length; i++) {
    var button = buttons[i];
    button.onclick = toggle(notes[i]);
  }
  waveType = createSelect();
  waveType.position(10, 10);
  waveType.option('sine');
  waveType.option('triangle');
  waveType.option('square');
  waveType.option('sawtooth');
  waveType.changed(waveChanged);

}

function draw() {
  var aVal = map(Aslider.value(), 100, 1000, 0.01, 0.5);
  var dVal = map(Dslider.value(), 100, 1000, 0.01, 1);
  var sVal = map(Sslider.value(), 100, 1000, 0.1, 2);
  var rVal = map(Rslider.value(), 100, 1000, 0.1, 2);
  wave.setType(waveType.value());
  env.setADSR(aVal, dVal, sVal, rVal);
  // env.setADSR(0.01, 0.1, sVal, rVal);
}

function toggle(freq) {
  wave.freq(freq);
  // wave.amp(0.2, 1);
  env.play();
}

function waveChanged(){

}
