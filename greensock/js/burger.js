$(".burger").on("click", function() {
    $(".menu").toggleClass("menu--open");
  });
  $(".close").on("click",function(){
      $(".menu").removeClass("menu--open")
  });