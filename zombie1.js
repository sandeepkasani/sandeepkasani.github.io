var croppingImg = function(src, $dim) {
    var tmpCanvas = document.createElement('canvas');
	tmpCanvas.setAttribute("id","canvas");
    var tmpCtx = tmpCanvas.getContext('2d');
    var thumbImg = document.createElement('img');
    
    tmpCanvas.width = tmpCanvas.height = $dim*4 || 50;
    document.body.appendChild(tmpCanvas);
    
    thumbImg.src = src;
    thumbImg.onload = function() {
        tmpCtx.save();
        tmpCtx.beginPath();
        tmpCtx.arc(250, 250, 2 * $dim, 0, Math.PI*2, true);   
        tmpCtx.closePath();
        tmpCtx.clip();
        
        tmpCtx.drawImage(thumbImg, 0, 0, 4 * $dim, 4 * $dim);
        
        tmpCtx.beginPath();
        tmpCtx.arc(0, 0, 2 * $dim, 0, Math.PI*2, true);
        tmpCtx.clip();
        tmpCtx.closePath();
        tmpCtx.restore();
    };
};


var src = 'http://localhost:8080/teju/mask.png';
var $dim = 125;
croppingImg(src, $dim);

//for(let i=1; i < 34; i++){
  //let src = 'http://localhost:8080/teju/t('+i+').jpg';
  //croppingImg(src, $dim);
  //var link = document.createElement('a');
  //link.download = 't'+i+'.png';
  //link.href = document.getElementById('canvas').toDataURL()
  //link.click();
//}
    