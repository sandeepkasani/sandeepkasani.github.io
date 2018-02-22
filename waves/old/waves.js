angular.module('waves',[]).
  config(function($routeProvider) {
    $routeProvider.
      when('/', {controller:MyCtrl, templateUrl:'include.html'})
      .when('/playground', {controller:playController, templateUrl:'playground.html'});
  });


function MyCtrl($scope) {
  // No model ...
  $scope.msg="hello world!!!"
  $scope.config={
    "freqrency":10,
    "amplitude":300,
    "wavelength":500,
    "height":600,
    "width":1000,
  };

  var canvas = document.getElementById('myCanvas');
  var context = canvas.getContext('2d');
  var x=0, y=0;
  var phase=0; amplitude=$scope.config.amplitude;

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
      context.moveTo(x, 300);
      context.lineTo(x, y);
      // context.arc(x,y,2,0,Math.PI*2,true);
      context.fillStyle = color;
      context.fill();
      context.strokeStyle = color;
      context.stroke();
  };

  var that = this;
  (function init(){
    $scope.drawAxis();
    setInterval(function() {
        // cosine();
        // sine();
        for(var i=0; i<$scope.functionsToPlot.length;i++){
          var plot = $scope.functionsToPlot[i];
          if(plot.wave==="sine"){
            sine(plot);
          }
          else if(plot.wave==="cosine"){
            cosine(plot);
          }
        }
        x=x+1;
        // phase = phase + 2*Math.PI/$scope.config.wavelength;
     }, $scope.config.freqrency);
  })();

  $scope.clear = function(wave) {
      context.fillStyle="#fff";
      context.fillRect(0,0,$scope.config.width,$scope.config.height);
      context.fillStyle="#888";
      x=0;
      for(var i=0; i<$scope.functionsToPlot.length;i++){
        $scope.functionsToPlot[i].phase = 0;
      }
      $scope.drawAxis();
  }

  context.stroke();

  function sine(plot){
    y=300 - plot.amplitude*Math.sin(plot.phase);
    plot.phase = plot.phase + 2*Math.PI/plot.wavelength;
    draw(x,y, plot.color);
  }
  function cosine(plot){
    y=300 - plot.amplitude*Math.cos(plot.phase);
    plot.phase = plot.phase + 2*Math.PI/plot.wavelength;
    draw(x,y, plot.color);
  }

  $scope.functionsToPlot=[
    {
      "amplitude":300,
      "wavelength":1000,
      "wave":"cosine",
      "color":"red",
      "phase":0
    },
    {
      "amplitude":200,
      "wavelength":500,
      "wave":"cosine",
      "color":"blue",
      "phase":0
    },
    {
      "amplitude":100,
      "wavelength":500,
      "wave":"cosine",
      "color":"black",
      "phase":0
    },
  ]
}

function playController($scope) {
  $scope.msg="Lets play";

  var canvas = document.getElementById('myCanvas');
  var context = canvas.getContext('2d');
  var x=0, y=0;
  var phase=0;

  $scope.config={
    "height":600,
    "width":1000,
    "freqrency":10,
    "radius":300,
    "phase":200,
    "cx":500,
    "cy":300
  };

  $scope.circles=[
    {
      "radius":300,
      "phase":200,
      "cx":500,
      "cy":300
    },
    {
      "radius":200,
      "phase":100,
      "cx":500,
      "cy":300
    }
  ]


  var img= new Image;
  // img.src= "http://www.i2clipart.com/cliparts/d/f/1/b/clipart-sun-abstract-design-df1b.png";
  img.src="sun.png"

  $scope.drawCircle = function(cx, cy, r){
    var dotx =  cx + r*Math.sin(phase);
    var doty =  cy + r*Math.cos(phase);
    context.beginPath();
    // context.moveTo(cx,cy);
    // context.lineTo(dotx, doty);
    //context.arc(dotx,doty,5,0,Math.PI*2,true);
    context.drawImage(img, dotx, doty, 20, 20);
    context.fillStyle="#000";
    context.fill();
    context.stroke();
  }

  $scope.clear = function() {
      context.fillStyle="#fff";
      context.fillRect(0,0,$scope.config.width,$scope.config.height);
      context.fillStyle="#888";
      x=0;
  }

  $scope.addCircle = function(){
    $scope.circles.push(
      {
        "radius":50,
        "phase":200,
        "cx":100,
        "cy":100
      }
    );
  }

  var that= this;
  (function init(){
    setInterval(function() {
      for(var i=0; i<$scope.circles.length;i++){
        $scope.drawCircle($scope.circles[i].cx,$scope.circles[i].cy, $scope.circles[i].radius);
      }
      phase = phase + Math.PI/$scope.config.phase;
    },10);
  })();

}
