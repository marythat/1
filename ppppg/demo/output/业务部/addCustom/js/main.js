$(function () {
  initClick();
})
var partBtn;
var cityBtn;

function initClick() {
  partBtn = new MobileSelect({
    trigger: '#choose-part',
    title: '选择客户',
    wheels: [{
      data: ['重点客户', '一般客户', '潜在客户']
    }],
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
  cityBtn = new MobileSelect({
    trigger: '#choose-time',
    title: '选择所在区',
    wheels: [{
      data: city
    }, ],
    keyMap: {
      id: 'name',
      value: 'name',
      childs: 'sub'
    },
    callback: function (indexArr, data) {

    }
  });


  $("#submit").click(function () {
    //地址
    $("#address").val()
    //联系电话
    $("#contact-phone").val()
    //联系人
    $("#contact-one").val()
    //公司名称
    $("#company-name").val()
    // https://github.com/onlyhom/mobileSelect.js/blob/master/docs/README-CN.md
    // 获取客户分类
    partBtn.getValue();
    //获取所在区字符串
    cityBtn.getValue();
    console.log($("#company-name").val());
    console.log(cityBtn.getValue());

  })
}