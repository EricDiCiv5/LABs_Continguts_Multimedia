$(document).ready(function(){

    $('.imagen').mouseenter(function() {
        $(this).animate({opacity: '0.7'},'fast');
        $(this).parent().addClass("selected");
    });
    $('.imagen').mouseout(function() {
        $(this).animate({opacity: '1'},'fast');
        $(this).parent().removeClass("selected");
    });
});