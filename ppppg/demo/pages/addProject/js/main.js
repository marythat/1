$(function () {
  initClick();
})

function initClick() {
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

  $('.man-select').on("click", "li", function (event) {
    console.log($(event.target));

    return false;
  });

  // $('#choose-man').on("click", function () {
  //   console.log("去下");
  //   $("#choose-man>.man-tags").append(tagNode)
  //   return false;
  // });


  //主负责人点击
  $('#choose-man').on("click", ".man-tag .tag-close", function (event) {
    $(event.target).parent().remove();
    event.stopPropagation();
    return false;
  });
}
var selectData = ["张三", "李四", "王二", "33", "444", "555", "666"];

function MutiSelect() {
  var selectArray = [];
  $("#muti-select").fadeIn();
  var panel = $("#muti-select");
  var mask = $("#muti-select .mask");
  var canel = $("#muti-select .canel");
  var confrim = $("#muti-select .confrim");
  var content = $("#muti-select .muti-content");
  var item = $("#muti-select .muti-content .muti-item");
  mask.click(function () {
    // panel.hide();
    $("#muti-select").fadeOut();
  });
  canel.click(function () {
    $("#muti-select").fadeOut();
    // panel.hide();
  });
  confrim.click(function () {
    $("#muti-select").fadeOut();
    // panel.hide();
  });
  content.on("click", ".muti-item", function (event, data) {
    $(this).toggleClass("select");
    var id = $(this).data("id");
    var iid = selectArray.indexOf(id);
    if (iid == -1) {
      selectArray.push(id);
    } else {
      selectArray.splice(iid, 1);
    }
    console.log(selectArray);
    $("#choose-man>.man-tags").html("");
    selectArray.forEach(function (value) {
      var tagNode = `
        <span class="man-tag">
        ${selectData[value]}
        <span class="tag-close"></span>
        </span>
      `
      $("#choose-man>.man-tags").append(tagNode)
    })
  })
}
MutiSelect();