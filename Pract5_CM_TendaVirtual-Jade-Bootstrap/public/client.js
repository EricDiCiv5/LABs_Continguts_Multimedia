/**
 * Created by boyander on 11/10/16.
 */
$(document).ready(function(){

    $('.img-rounded').mouseenter(function() {
        $(this).animate({zoom:'1.1'},'fast');
        $(this).parent().addClass("selected");
    });
    $('.img-rounded').mouseout(function() {
        $(this).animate({zoom:'1'},'fast');
        $(this).parent().removeClass("selected");
    });
});
