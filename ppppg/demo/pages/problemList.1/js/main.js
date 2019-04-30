$(function () {
  TabsInit();
});

function TabsInit() {
  var pageHeight = window.innerHeight;
  var slideHeight = $(".swiper-container").offset().top;
  $("#page1").height(pageHeight - slideHeight);
  $("#page2").height(pageHeight - slideHeight);
  var mySwiper = new Swiper('.swiper-container', {
    initialSlide: 0,
    watchSlidesVisibility: true,
    autoHeight: true,
    on: {
      slideChange: function () {
        var active = this.activeIndex;
        var selectNode = $(".tabs-panel>.tab-item");
        selectNode.removeClass('active');
        $(selectNode[active]).addClass('active');
      },
    },
  })

  //标签栏初始化点击
  var selectNode = $(".tabs-panel>.tab-item");
  selectNode.each(function (index, node) {
    var el = $(node);
    el.on("click", function (event) {
      var el = event.target;
      var tag = $(el);
      if (!tag.hasClass('active')) {
        selectNode.removeClass('active');
        tag.addClass('active');
        mySwiper.slideTo(index, 500, false);
      }
    })
  })
}