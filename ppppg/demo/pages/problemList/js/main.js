$(function () {
  var pageHeight = window.innerHeight;
  var slideHeight = $(".swiper-container").offset().top;
  $("#page1").height(pageHeight - slideHeight);
  $("#page2").height(pageHeight - slideHeight);
  $(".swiper-container-list").height(pageHeight - slideHeight);
  $(".swiper-container-list0").height(pageHeight - slideHeight);
  TabsInit();
  upDownInit();
});

function TabsInit() {
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

function upDownInit() {
  function List(listCom, listWrap, listSlide, listList, listUpDesc) {
    var loadFlag = true;
    $(listCom + " .message").text("暂无");
    var num = $(listList + ' .item').length;

    function updateLoadMoreText() {
      if (num == 0) {
        $(listCom + " .message").text("暂无").show();
      } else {
        $(listCom + " .message").hide();
      }
      var pageHeight = window.innerHeight;
      var loadmoreOffsetheight = $(listCom + " .loadtip").offset().top;
      if (loadmoreOffsetheight < pageHeight + 50) {
        $(listCom + " .loadtip").hide();
        loadFlag = false;
      } else {
        $(listCom + " .loadtip").show();
        loadFlag = true;

      }
    }
    updateLoadMoreText();
    var list = new Swiper(listCom, {
      init: false,
      direction: 'vertical',
      slidesPerView: 'auto',
      mousewheelControl: true,
      grabCursor: true,
      freeMode: true,
      autoHeight: true,
      on: {
        touchEnd: function (swiper) {
          var _viewHeight = $(listWrap)[0].offsetHeight;
          var _contentHeight = $(listSlide)[0].offsetHeight;
          if (list.translate <= _viewHeight - _contentHeight - 40 && loadFlag) {
            if (loadFlag) {
              $(listCom + " .loadtip").html('正在加载...');
            } else {
              $(listCom + " .loadtip").html('没有更多啦！');
            }
            //上拉加载模拟
            setTimeout(function () {
              //数据模拟
              // for (var i = 0; i < 5; i++) {
              //   $(listList).append('<div class="item">我是加载出来的...</div>');
              // }
              $(listCom + " .loadtip").html('上拉加载更多...');
              list.update(); // 重新计算高度;
            }, 500);
          }

          // 下拉刷新模拟
          if (list.translate >= 50) {
            $(listUpDesc).hide();
            $(listCom + " .init-loading").html('正在刷新...').show();
            $(listCom + " .loadtip").html('上拉加载更多');
            loadFlag = true;
            setTimeout(function () {
              //数据模拟
              for (var i = 0; i < 5; i++) {
                $(listList + " .item:first").before('<div class="item">我是加载出来的...</div>');
              }
              $(listCom + " .init-loading").html('刷新成功！');
              setTimeout(function () {
                $(listCom + " .init-loading").html('').hide();
                $(listUpDesc).show();
              }, 800);
              $(listCom + " .loadtip").show(0);

              //刷新操作
              list.update(); // 重新计算高度;
              updateLoadMoreText();
            }, 500);

          }
        },
      }
    });
    return list;
  }
  var ListArray = [];
  var listCom = ".swiper-container-list";
  var listWrap = ".swiper-container-list>.swiper-wrapper";
  var listSlide = ".swiper-container-list .swiper-slide";
  var listList = ".swiper-container-list .swiper-slide .list";
  var listUpDesc = ".swiper-container-list .refreshtip";
  var list1 = List(listCom, listWrap, listSlide, listList, listUpDesc);
  ListArray.push(list1);
  var listCom = ".swiper-container-list0";
  var listWrap = ".swiper-container-list0>.swiper-wrapper";
  var listSlide = ".swiper-container-list0 .swiper-slide";
  var listList = ".swiper-container-list0 .swiper-slide .list";
  var listUpDesc = ".swiper-container-list0 .refreshtip";
  var list2 = List(listCom, listWrap, listSlide, listList, listUpDesc);
  ListArray.push(list2);
  ListArray.forEach(function (instance) {
    instance.init();
  });
}