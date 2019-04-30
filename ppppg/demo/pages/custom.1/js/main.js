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
  initClick();
})

function initClick() {
  BackClick();
  SearchClick();
  TagsClick(function (index) {
    console.log(index);
  });
  ListItemClick();
}

//标签栏初始化点击
function TagsClick(callback) {
  var select = 0;
  var selectNode = $(".tabs-panel>.tab-item");
  selectNode.each(function (index, node) {
    var el = $(node);
    el.on("click", function (event) {
      var el = event.target;
      var tag = $(el);
      if (!tag.hasClass('active')) {
        selectNode.removeClass('active');
        tag.addClass('active');
        select = index;
        callback && callback(select)
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