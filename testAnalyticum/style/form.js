
$(document).ready(function() {
    $('.header__btn').click(function(){
        $('.header__form').toggleClass('header__form--active');
        
    });
    $('.close').click(function(){
        $('.header__form').toggleClass('header__form--active');
    });
});