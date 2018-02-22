angular.module('waves').controller('spiralController', wavesController);

function spiralController($scope) {
  $scope.msg="hello world!!!"
  $scope.config={
    "freqrency":5,
    "amplitude":300,
    "wavelength":500,
    "height":600,
    "width":1000,
    "bounce":true,
    "shadex":false,
    "shadey":false,
    "shadeCenter":true,
    "shadeCoord":false,
    "shadeCx":0,
    "shadeCy":300,
    "stroke":true
  };

  var canvas = document.getElementById('myCanvas');
  var context = canvas.getContext('2d');
  var x=0, y=0;
  var phase=0; amplitude=$scope.config.amplitude;
  var increment = 1;

  function draw(x,y, color) {
      context.beginPath();
      context.strokeStyle = color;
      if($scope.config.stroke){
        context.arc(x,y,2,0,Math.PI*2,true);
        context.fillStyle = color;
        context.fill();
        context.stroke();
      }
      if($scope.config.shadex){
        context.moveTo(x, 300);
        context.lineTo(x, y);
        context.stroke();
      }
      if($scope.config.shadey){
        context.moveTo(500, y);
        context.lineTo(x, y);
        context.stroke();
      }
      if($scope.config.shadeCenter){
        context.moveTo(500, 300);
        context.lineTo(x, y);
        context.stroke();
      }
      if($scope.config.shadeCoord){
        context.moveTo($scope.config.shadeCx, $scope.config.shadeCy);
        context.lineTo(x, y);
        context.stroke();
      }
  };

  (function init(){
    //$scope.drawAxis();
    setInterval(function() {
        for(var i=0; i<$scope.functionsToPlot.length;i++){
          var plot = $scope.functionsToPlot[i];
          if(plot.wave==="spiral"){
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
      //$scope.drawAxis();
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

  $scope.addSpiral = function(){
    $scope.functionsToPlot.push(
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
