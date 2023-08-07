angular.module('waves').controller('playController', playController);

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
      "radiusx":300,
      "radiusy":300,
      "phase":200,
      "cx":500,
      "cy":300
    },
    {
      "radiusx":200,
      "radiusy":200,
      "phase":100,
      "cx":500,
      "cy":300
    }
  ]


  var img= new Image;
  // img.src= "http://www.i2clipart.com/cliparts/d/f/1/b/clipart-sun-abstract-design-df1b.png";
  img.src="sun.png"

  $scope.drawCircle = function(cx, cy, rx, ry){
    var dotx =  cx + rx*Math.sin(phase);
    var doty =  cy + ry*Math.cos(phase);
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
        "radiusx":50,
        "radiusy":50,
        "phase":200,
        "cx":500,
        "cy":300
      }
    );
  }

  var that= this;
  (function init(){
    setInterval(function() {
      for(var i=0; i<$scope.circles.length;i++){
        $scope.drawCircle($scope.circles[i].cx, $scope.circles[i].cy, $scope.circles[i].radiusx, $scope.circles[i].radiusy);
      }
      phase = phase + Math.PI/$scope.config.phase;
    },10);
  })();

}
