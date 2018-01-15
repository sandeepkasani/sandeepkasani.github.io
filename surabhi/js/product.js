$( document ).ready(function() {
  displayProducts();
});

$(".products-nav .nav-link").on('click',function(e){
  // $(".products-nav .nav-link").removeClass('active');
  // $(this).addClass('active');
  // displayProducts();
  // e.preventDefault();
});

function displayProducts(){
  var type = getParameterByName('prodType') ? getParameterByName('prodType') : 'Pumps';
  if(type){
    var name = getParameterByName('prodName');
    if(name){
      $('#product-display').html(displayProductHTML(type, name));
    }
  }
  $('#prod-heading').html(getTypeHTML(type));
  $('#products-list').html(getProductsList(type));
}

function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}

function getTypeHTML(type){
  var prodType = typeInfo.filter(function (prodTypeInfo) {
      return (Object.keys(prodTypeInfo)[0] === type);
  });
  prodType = prodType[0];
  var html = '<h2 class="section-heading">'+Object.keys(prodType)[0]+'</h2><p class="text-muted type-info">'+prodType[type]+'</p>';
  return html;
}

function getProductsList(type){
  var html = '';
  var products = productsData.filter(function (product) {
    if(product.type === type){
      var url = window.location.origin+"/"+window.location.pathname;
      url = url + '?prodType='+product.type+'&prodName='+encodeURI(product.name);
      html = html + '<div class="col-md-3 col-sm-3 portfolio-item"><a class="portfolio-link" href="'+url+'"><img class="img-fluid" src="img/'+product.imgUrl+'" alt=""></a><div class="portfolio-caption"><p>'+product.name+'</p></div></div>';
    }
    return (product.type === type);
  });
  return html;
}

function displayProductHTML(type, name){
  var html = '';
  var products = productsData.filter(function (product) {
    if(product.type === type && product.name === name){
      html = html + '<div class="col-md-12 row"><div class="col-md-6 col-sm-6"><h2 class="product-name">'+name+'</h2><p class="product-info">'+product.info+'</div><div class="col-md-6 col-sm-6 product-image"><img class="img-fluid" src="img/'+product.imgUrl+'" alt=""></div></div>';
    }
  });
  return html;
}

var productsData = [
  {
    name: 'Industrial Monoblock Pump (MI series)',
    type: 'Pumps',
    info: 'These pumps are designed and manufactured for optimum efficiency to suit a wide range of commercial and industrial applications. Compact size and Stainless steel sleeve for less shaft wear.',
    imgUrl: 'products/blue.jpg'
  },
  {
    name: 'Pumps1',
    type: 'Pumps',
    info: 'These pumps are designed and manufactured for optimum efficiency to suit a wide range of commercial and industrial applications. Compact size and Stainless steel sleeve for less shaft wear.',
    imgUrl: 'products/blue.jpg'
  },{
    name: 'Pumps2',
    type: 'Pumps',
    info: 'These pumps are designed and manufactured for optimum efficiency to suit a wide range of commercial and industrial applications. Compact size and Stainless steel sleeve for less shaft wear.',
    imgUrl: 'products/blue.jpg'
  },{
    name: 'Pumps3',
    type: 'Pumps',
    info: 'These pumps are designed and manufactured for optimum efficiency to suit a wide range of commercial and industrial applications. Compact size and Stainless steel sleeve for less shaft wear.',
    imgUrl: 'products/blue.jpg'
  },{
    name: 'Pumps4',
    type: 'Pumps',
    info: 'These pumps are designed and manufactured for optimum efficiency to suit a wide range of commercial and industrial applications. Compact size and Stainless steel sleeve for less shaft wear.',
    imgUrl: 'products/blue.jpg'
  },{
    name: 'Pumps5',
    type: 'Pumps',
    info: 'These pumps are designed and manufactured for optimum efficiency to suit a wide range of commercial and industrial applications. Compact size and Stainless steel sleeve for less shaft wear.',
    imgUrl: 'products/blue.jpg'
  },
]

var typeInfo=[
  {'Pumps' : 'Creating a niche of Crompton Greaves pumps authorized dealer such as Industrial Monoblock Pump (MI series), Vertical Inline pumps (ILM Series), Dewatering pumps (DW Series), Horizontal Split Case pumps ( CGS Series), Multistage pumps (CGHM & CGVM Series), Pressure Boosting Systems (PBS) and many more items at its best, with utmost quality.'},
  {'WATER TREATMENT PLANT': 'Creating a niche of Crompton Greaves pumps authorized dealer such as Industrial Monoblock Pump (MI series), Vertical Inline pumps (ILM Series), Dewatering pumps (DW Series), Horizontal Split Case pumps ( CGS Series), Multistage pumps (CGHM & CGVM Series), Pressure Boosting Systems (PBS) and many more items at its best, with utmost quality.'},
  {'MEMBRANE' : 'Creating a niche of Crompton Greaves pumps authorized dealer such as Industrial Monoblock Pump (MI series), Vertical Inline pumps (ILM Series), Dewatering pumps (DW Series), Horizontal Split Case pumps ( CGS Series), Multistage pumps (CGHM & CGVM Series), Pressure Boosting Systems (PBS) and many more items at its best, with utmost quality.'},
  {'MEMBRANE HOUSING' : 'Creating a niche of Crompton Greaves pumps authorized dealer such as Industrial Monoblock Pump (MI series), Vertical Inline pumps (ILM Series), Dewatering pumps (DW Series), Horizontal Split Case pumps ( CGS Series), Multistage pumps (CGHM & CGVM Series), Pressure Boosting Systems (PBS) and many more items at its best, with utmost quality.'},
  {'pumps1' : 'Creating a niche of Crompton Greaves pumps authorized dealer such as Industrial Monoblock Pump (MI series), Vertical Inline pumps (ILM Series), Dewatering pumps (DW Series), Horizontal Split Case pumps ( CGS Series), Multistage pumps (CGHM & CGVM Series), Pressure Boosting Systems (PBS) and many more items at its best, with utmost quality.'},
  {'pumps2' : 'Creating a niche of Crompton Greaves pumps authorized dealer such as Industrial Monoblock Pump (MI series), Vertical Inline pumps (ILM Series), Dewatering pumps (DW Series), Horizontal Split Case pumps ( CGS Series), Multistage pumps (CGHM & CGVM Series), Pressure Boosting Systems (PBS) and many more items at its best, with utmost quality.'},
  {'pumps3' : 'Creating a niche of Crompton Greaves pumps authorized dealer such as Industrial Monoblock Pump (MI series), Vertical Inline pumps (ILM Series), Dewatering pumps (DW Series), Horizontal Split Case pumps ( CGS Series), Multistage pumps (CGHM & CGVM Series), Pressure Boosting Systems (PBS) and many more items at its best, with utmost quality.'}
]
