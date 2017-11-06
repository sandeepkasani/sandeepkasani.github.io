var colors = ['lime','royaltee', 'steel', 'universal'];
var selectedcolor = "lime";

$( document ).ready(function() {
    console.log( "ready!" );
    initProdDisplay(selectedcolor);
});
 var initProdDisplay =  function(selectedcolor){
   var product_pic_html = '';
   var product_thumb_html = '';
   for(i=1; i<6;i++){
     var active = "";
     if(i==1){
       active = "active";
     }
     product_pic_html = product_pic_html + '<div class="tab-pane '+active+'" id="pic-'+i+'"><img src="./knots_product_files/images/'+selectedcolor+'/'+i+'_'+selectedcolor+'.jpg"></div>';
     product_thumb_html = product_thumb_html + '<li class="'+active+'"><a data-target="#pic-'+i+'" data-toggle="tab"><img src="./knots_product_files/images/'+selectedcolor+'/thumb_'+selectedcolor+'.jpg"></a></li>';
   }
   $("#product-pics").html(product_pic_html);
   $("#product-thumbs").html(product_thumb_html);
   $('.color-thumb').show();
   $('.color-thumb').filter(function(){
        $(this).parent().show();
        return $(this).data('color') === selectedcolor;
    })
    .parent().hide();
 }

 $('.color-thumb').click(function() {
      var color = $(this).data('color');
      initProdDisplay(color);
});
