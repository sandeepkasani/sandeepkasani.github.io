// function toggleChevron(e) {
//     $(e.target)
//         .prev('.panel-heading')
//         .find("i.indicator")
//         .toggleClass('glyphicon-chevron-down glyphicon-chevron-up');
// }
// $('#accordion').on('hidden.bs.collapse', toggleChevron);
// $('#accordion').on('shown.bs.collapse', toggleChevron);


$(".hover-dropdown, .hover-dropdown>child").on('mouseover',function(){
  $($(this).find(".dropdown-menu")[0]).addClass("row").css("display","block");
});
$(".hover-dropdown, .hover-dropdown>child").on('mouseout',function(){
  $($(this).find(".dropdown-menu")[0]).css("display","none").removeClass("row");
});



//nav-link
