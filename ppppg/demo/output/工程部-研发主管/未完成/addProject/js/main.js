$(function () {
  var partBtn = new MobileSelect({
    // https://github.com/onlyhom/mobileSelect.js/issues
    trigger: '#choose-part',
    title: '选择部门',
    wheels: [{
      data: ['公司项目', '客户项目']
    }],
    // position: [2] //初始化定位
    callback: function (indexArr, data) {
      $(".project.btn #choose-part").css({
        color: "#000"
      });
      $(".customer.btn").show();
      if (indexArr[0] == 0) {
        $(".customer.btn").hide();
      }
    }
  });

  var quesBtn = new MobileSelect({
    // https://github.com/onlyhom/mobileSelect.js/issues
    trigger: '#choose-ques',
    title: '选择问题',
    wheels: [{
      data: ['1', '2', '3']
    }],
    // position: [2] //初始化定位
  });

  $('#submit').on("click", function () {
    console.log("确定");
    return false;
  });
  $.selectYY_MM_DD("#choose-time", function () {

  }); //选择 YYYY-MM-dd 格式的调用 

})