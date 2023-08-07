angular.module('waves').controller('circlesController', wavesController);

function circlesController($scope) {
  $scope.msg="hello world!!!"
  $scope.config={
    "freqrency":5,
    "amplitude":300,
    "wavelength":500,
    "height":600,
    "width":1000,
    "bounce":true,
    "shade":true,
    "stroke":true
  };

  var canvas = document.getElementById('myCanvas');
  var context = canvas.getContext('2d');
  var x=0, y=0;
  var phase=0; amplitude=$scope.config.amplitude;
  var increment = 1;

  var img= new Image;
  // img.src= "http://www.i2clipart.com/cliparts/d/f/1/b/clipart-sun-abstract-design-df1b.png";
  img.src="sun.png"
  function draw(x,y, cx, cy, color) {
      context.beginPath();
      context.strokeStyle = color;
      if($scope.config.stroke){
        //context.arc(x,y,2,0,Math.PI*2,true);
        context.drawImage(img, x-10, y-10, 20, 20);
        context.fillStyle = color;
        context.fill();
        context.stroke();
      }
      if($scope.config.shade){
        context.moveTo(500, 300);
        context.lineTo(x, y);
        context.stroke();
      }
  };

  (function init(){
    //$scope.drawAxis();
    setInterval(function() {
        for(var i=0; i<$scope.functionsToPlot.length;i++){
          var plot = $scope.functionsToPlot[i];
          if(plot.wave==="circle"){
            circle(plot);
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
        //$scope.functionsToPlot[i].phase = 0;
      }
      //$scope.drawAxis();
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
    plot.phase = plot.phase + Math.PI/plot.speed;
    draw(x1,y1,plot.cx, plot.cy, plot.color);
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

  $scope.addCircle = function(){
    $scope.functionsToPlot.push(
      {
        "radiusx":100,
        "radiusy":100,
        "phase":0,
        "cx":0,
        "cy":0,
        "color":"red",
        "wave":"circle",
        "clockwise":true,
        "speed":150,
        "isCircle":true
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
  $scope.makeCircle = function(wave){
    wave.isCircle =! wave.isCircle;
    wave.radiusy = wave.radiusx;
  }

  $scope.functionsToPlot=[
    {
      "radiusx":200,
      "radiusy":200,
      "phase":Math.PI/2,
      "cx":0,
      "cy":0,
      "color":"red",
      "wave":"circle",
      "clockwise":true,
      "speed":180
    },
    {
      "radiusx":200,
      "radiusy":200,
      "phase":0,
      "cx":0,
      "cy":0,
      "color":"green",
      "wave":"circle",
      "clockwise":true,
      "speed":180
    }
  ]
}
