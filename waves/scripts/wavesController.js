angular.module('waves').controller('wavesController', wavesController);

function wavesController($scope) {
  $scope.msg="hello world!!!"
  $scope.config={
    "freqrency":5,
    "amplitude":300,
    "wavelength":500,
    "height":600,
    "width":1000,
    "bounce":true,
    "shade":false
  };

  var canvas = document.getElementById('myCanvas');
  var context = canvas.getContext('2d');
  var x=0, y=0;
  var phase=0; amplitude=$scope.config.amplitude;
  var increment = 1;

  $scope.drawAxis = function(){
    context.beginPath();
    context.moveTo(0, 300);
    context.lineTo(1000, 300);
    context.moveTo(500, 0);
    context.lineTo(500, 600);
    context.stroke();

    context.font = "10px Arial";
    context.fillText("-500",0,310);
    context.fillText("-250",240,310);
    context.fillText("0",495,310);
    context.fillText("250",740,310);
    context.fillText("500",980,310);
    context.fillText("300",500,10);
    context.fillText("-300",500,600);
  }

  function draw(x,y, color) {
      context.beginPath();
      context.strokeStyle = color;
      if(!$scope.config.shade){
        context.arc(x,y,2,0,Math.PI*2,true);
        context.fillStyle = color;
        context.fill();
        context.stroke();
      }
      else{
        context.moveTo(500, 300);
        context.lineTo(x, y);
        context.stroke();
      }
  };

  (function init(){
    $scope.drawAxis();
    setInterval(function() {
        for(var i=0; i<$scope.functionsToPlot.length;i++){
          var plot = $scope.functionsToPlot[i];
          if(plot.wave==="sine"){
            sine(plot);
          }
          else if(plot.wave==="cosine"){
            cosine(plot);
          }
          else if(plot.wave==="parabola"){
            parabola(plot);
          }
          else if(plot.wave==="circle"){
            circle(plot);
          }
          else if(plot.wave==="spiral"){
            spiral(plot);
          }
        }
        x=x+increment;
        if($scope.config.bounce && (x === 1000 || x=== 0)){
          increment = -1 * increment;
        }
     }, $scope.config.freqrency);
  })();

  $scope.clear = function(wave) {
      context.fillStyle="#fff";
      context.fillRect(0,0,$scope.config.width,$scope.config.height);
      context.fillStyle="#888";
      x=0;
      increment = 1;
      for(var i=0; i<$scope.functionsToPlot.length;i++){
        $scope.functionsToPlot[i].phase = 0;
      }
      $scope.drawAxis();
  }

  function sine(plot){
    y= plot.amplitude*Math.sin(plot.phase);
    y = 300 - checkAbs(plot.absolute,y);
    plot.phase = plot.phase + 2*Math.PI/plot.wavelength;
    draw(x,y, plot.color);
  }
  function cosine(plot){
    y=plot.amplitude*Math.cos(plot.phase);
    y = 300 - checkAbs(plot.absolute,y);
    plot.phase = plot.phase + 2*Math.PI/plot.wavelength;
    draw(x,y, plot.color);
  }
  function parabola(plot){
    x1 = x-500;
    y = plot.a*x1*x1 + plot.b*x1 + plot.c*100-2500;
    y = y/100;
    y = 300 - checkAbs(plot.absolute,y);
    draw(x,y, plot.color);
  }
  function circle(plot){
    var x1 = plot.cx + 500 + plot.radiusx*Math.sin(plot.phase);
    var y1;
    if(plot.clockwise){
      y1 = plot.cy + 300 + plot.radiusy*Math.cos(plot.phase);
    }
    else{
      y1 = plot.cy + 300 - plot.radiusy*Math.cos(plot.phase);
    }
    y1 = checkAbs(plot.absolute,y1);
    plot.phase = plot.phase + Math.PI/plot.omega;
    draw(x1,y1, plot.color);
  }
  function spiral(plot){
    var x1 = plot.cx + 500 + plot.radius*Math.sin(plot.phase);
    var y1;
    if(plot.clockwise){
      y1 = plot.cy + 300 + plot.radius*Math.cos(plot.phase);
    }
    else{
      y1 = plot.cy + 300 - plot.radius*Math.cos(plot.phase);
    }
    y1 = checkAbs(plot.absolute,y1);
    plot.radius = plot.radius + plot.step;
    if(plot.radius >= plot.loop){
      plot.radius = 0;
    }
    plot.phase = plot.phase + Math.PI/plot.omega;
    draw(x1,y1, plot.color);
  }

  function checkAbs(abs, y){
    if(abs == 1){
      y = Math.abs(y);
    }
    if(abs == 2){
      y = -1*Math.abs(y);
    }
    return y;
  }

  $scope.addWave = function(){
    $scope.functionsToPlot.push(
      {
        "amplitude":250,
        "wavelength":100,
        "wave":"cosine",
        "color":"green",
        "phase":0,
        "absolute":0
      }
    );
  }
  $scope.addParabola = function(){
    $scope.functionsToPlot.push(
      {
        "a":1,
        "b":0,
        "c":-100,
        "wave":"parabola",
        "color":"blue",
        "absolute":0
      }
    );
  }
  $scope.addCircle = function(){
    $scope.functionsToPlot.push(
      {
        "radiusx":300,
        "radiusy":300,
        "phase":200,
        "cx":0,
        "cy":0,
        "color":"magenta",
        "wave":"circle",
        "clockwise":true,
        "omega":0
      }
    )
  }
  $scope.deleteWave = function(index){
    $scope.clear();
    $scope.functionsToPlot.splice(index,1);
  }
  $scope.cloneWave = function(wave){
    wave = angular.copy(wave);
    $scope.functionsToPlot.push(wave);
  }

  $scope.functionsToPlot=[
    {
      "radiusx":300,
      "radiusy":300,
      "phase":0,
      "cx":0,
      "cy":0,
      "color":"magenta",
      "wave":"circle",
      "clockwise":false,
      "omega":200
    },
    {
      "amplitude":200,
      "wavelength":500,
      "wave":"sine",
      "color":"red",
      "phase":0,
      "absolute":1
    },
    {
      "amplitude":200,
      "wavelength":500,
      "wave":"sine",
      "color":"blue",
      "phase":0,
      "absolute":2
    },
    {
      "a":0.25,
      "b":0,
      "c":-250,
      "wave":"parabola",
      "color":"cyan",
      "absolute":1
    },
    {
      "a":0.25,
      "b":0,
      "c":-250,
      "wave":"parabola",
      "color":"cyan",
      "absolute":2
    },
    {
      "amplitude":100,
      "wavelength":500,
      "wave":"cosine",
      "color":"black",
      "phase":0,
      "absolute":1
    },
    {
      "amplitude":100,
      "wavelength":500,
      "wave":"cosine",
      "color":"black",
      "phase":0,
      "absolute":2
    },
    {
      "step":5,
      "loop":298,
      "wave":"spiral",
      "cx":0,
      "cy":0,
      "dotSize":3,
      "clockwise":true,
      "color":"orange",
      "radius":0,
      "phase":0,
      "omega":100
    },
    {
      "step":5,
      "loop":298,
      "wave":"spiral",
      "cx":0,
      "cy":0,
      "dotSize":3,
      "clockwise":false,
      "color":"orange",
      "radius":0,
      "phase":0,
      "omega":100
    }
  ]
}
