$(function () {
  initClick();
})

function initClick() {
  LoginClick();
}

function LoginClick() {
  var buttonNode = $("form .button");
  buttonNode.on("click", function () {
    console.log("提交");
    return false;
  });
}