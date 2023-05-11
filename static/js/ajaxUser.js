$(document).ready(function () {
  ///contact sms send  script
  $("#formSubmit").on("click", function (e) {
    e.preventDefault();
    var name = $("#name").val();
    var email = $("#email").val();
    var decs = $("#sms_decs").val();
    if (name == "") {
      $("#name").addClass("is-invalid");
    } else if (email == "") {
      $("#email").addClass("is-invalid");
    } else if (decs == "") {
      $("#sms_decs").addClass("is-invalid");
    } else {
      var smsData = $("#get_sms").serialize();
      $.ajax({
        url: "messageSend.php",
        type: "POST",
        data: smsData,
        success: function (data) {
          if (data == 1) {
            $("#get_sms")[0].reset();
            swal({
              title: "Message Send!",
              text: " Message Has been send!",
              icon: "success",
              button: "OK",
            });
          } else {
            swal({
              title: "Message not Send!",
              text: "message send unsuccessfull!",
              icon: "error",
              button: "OK",
            });
          }
        },
      });
    }
  });
  //display protfolio deatils
  //modal box show
  $(document).on("click", "#modalBoxShow", function (e) {
    e.preventDefault();
    var post_id = $(this).data("id");
    $.ajax({
      url: "protfolio-post-load.php",
      type: "POST",
      data: { post_id: post_id },
      success: function (data) {
        // console.log(data);
        $("#myModal").html(data);
      },
    });
    $("#modalbox").show();
  });
  //modal hide
  $(document).on("click", ".modal-close-icon", function () {
    $("#modalbox").hide();
  });
  ///document ready end
});
