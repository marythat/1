$(function () {
  initClick();
})

function initClick() {
  LoginClick();

  var oHeight = $(document).height(); //屏幕当前的高度
  $(window).resize(function () {
    if ($(document).height() < oHeight) {
      $(".footer").css("display", "none");
    } else {
      $(".footer").css("display", "block");
    }
  });

}

function LoginClick() {
  var buttonNode = $("form .button");
  buttonNode.on("click", function () {
    console.log("提交");
    return false;
  });
}

// 备用方法
// adjust(".account input");
// adjust(".password input")
// function adjust(selector) {
//   $(selector).focus(function () {
//       $(".footer").hide();
//     })
//     .blur(function () {
//       $(".footer").show();
//     })
// }