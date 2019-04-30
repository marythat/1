var partBtn;
var quesBtn;

$(function () {
  partBtn = new MobileSelect({
    // https://github.com/onlyhom/mobileSelect.js/issues
    trigger: '#choose-part',
    title: '选择部门',
    wheels: [{
      data: ['人事部', '人力资源部', '客房部']
    }],
    position: [2] //初始化定位
  });

  quesBtn = new MobileSelect({
    // https://github.com/onlyhom/mobileSelect.js/issues
    trigger: '#choose-ques',
    title: '选择问题',
    wheels: [{
      data: ['1', '2', '3']
    }],
    position: [2] //初始化定位
  });

  $('#submit').on("click", function () {
    console.log("确定");
    return false;
  })
})