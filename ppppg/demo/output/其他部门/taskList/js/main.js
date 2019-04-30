function throttle(fn, delay, mustRunDelay) {
  var timer = null;
  var t_start;
  return function () {
    var context = this,
      args = arguments,
      t_curr = +new Date();
    clearTimeout(timer);
    if (!t_start) {
      t_start = t_curr;
    }
    if (t_curr - t_start >= mustRunDelay) {
      fn.apply(context, args);
      t_start = t_curr;
    } else {
      timer = setTimeout(function () {
        fn.apply(context, args);
      }, delay);
    }
  };
};

$(function () {
  var pageHeight = window.innerHeight;
  var slideHeight = $(".swiper-container").offset().top;
  $("#page1").height(pageHeight - slideHeight);
  $("#page2").height(pageHeight - slideHeight);
  $(".swiper-container-list").height(pageHeight - slideHeight);
  $(".swiper-container-list0").height(pageHeight - slideHeight);
  initClick();
})

function initClick() {
  BackClick();
  SearchClick();
  TagsClick(function (index) {
    console.log(index);
  });
  ListItemClick();
  upDownInit(function (next, itemNode) {
    //上拉加载，数据刷新后记得回调next();
    for (var i = 0; i < 5; i++) {
      $(itemNode).after('<div class="item">上拉加载</div>');
    }
    next();
  }, function (next, itemNode) {
    //下拉刷新，数据刷新后记得回调next();
    for (var i = 0; i < 5; i++) {
      $(itemNode).before('<div class="item">下拉刷新</div>');
    }
    next();
  });
}

//标签栏初始化点击
function TagsClick(callback) {
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

//返回初始化点击
function BackClick() {
  var backNode = $(".navbar>.back");
  backNode.on("click", function () {
    console.log("返回");
  })
}

//搜索框输入节流
function SearchClick() {
  var formNode = $("form.search-box");
  formNode.submit(function () {
    var inputValue = $("#search-text").val();
    // 搜索字符串验证
    if (/([a-z]|[A-Z]){1,8}/.test(inputValue)) {
      console.log(inputValue);
    }
    return false;
  });
  var searchNode = $(".search-box>input");
  searchNode.bind('input propertychange', throttle(function () {
    // console.log("文本");
  }, 50, 100))
}

//List中item点击事件
function ListItemClick() {
  $(".list").on("click", '.item', function () {
    console.log("点击");
  });
}

function upDownInit(pullUp, pullDown) {
  //条目空间
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

            function next() {
              $(listCom + " .loadtip").html('上拉加载更多...');
              list.update(); // 重新计算高度;
              num = $(listList + ' .item').length;
            }
            var itemNode = listList + " .item:last";
            pullUp && pullUp(next, itemNode);
          }

          // 下拉刷新模拟
          if (list.translate >= 50) {
            $(listUpDesc).hide();
            $(listCom + " .init-loading").html('正在刷新...').show();
            $(listCom + " .loadtip").html('上拉加载更多');
            loadFlag = true;

            function next() {
              $(listCom + " .init-loading").html('刷新成功！');
              setTimeout(function () {
                $(listCom + " .init-loading").html('').hide();
                $(listUpDesc).show();
              }, 800);
              $(listCom + " .loadtip").show(0);

              //刷新操作
              list.update(); // 重新计算高度;
              num = $(listList + ' .item').length;
              updateLoadMoreText();
            }
            var itemNode = listList + " .item:first";
            pullDown && pullDown(next, itemNode);
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