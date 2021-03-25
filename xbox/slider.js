
  $('.slick-example').slick({
infinite: true,
dots: false,
autoplay:true,
speed:7000,
slidesToShow: 3,
slidesToScroll: 1,
responsive: [
    {
      breakpoint: 1074,
      settings: {
        slidesToShow: 2,
      }
    },
    {
      breakpoint: 938,
      settings: {
        slidesToShow: 1,
      }
    }
]
});
