$(document).ready(function () {
  ///contact sms send  script
  $("#MailSubmit").on("click", function (e) {
    e.preventDefault();
    var name = $("#name").val();
    var email = $("#email").val();
    var decs = $("#sms_decs").val();
    if (email == "") {
      $("#email").addClass("is-invalid");
    } else if (name == "") {
      $("#name").addClass("is-invalid");
    } else if (decs == "") {
      $("#sms_decs").addClass("is-invalid");
    } else {
      var smsData = $("#get_sms").serialize();
      $.ajax({
        url: "/mail/add/",
        type: "POST",
        data: smsData,
        success: function (data) {
          if (data == "1") {
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
      url: "/protfolio/show/" + post_id + "/",
      type: "POST",
      success: function (data) {
        console.log(data);
        let post = "";
        post += `
        <div class="modal-header">
           <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
        <div>
        <img src="/static/uploads/${data[0].image}" class="img-fluid" alt="POST IMAGE">
        </div>
        <div class="py-2">
          <h2 class="modal-title">${data[0].title}</h2>
         </div>
           <p class="pb-2">
           ${data[0].desc}
           </p>`;

        if (data[0].isLive !== "") {
          post += ` <a href="${data[0].isLive}" class="btn btn-secondary" >Live Server</a>`;
        }
        if (data[0].sourceCode !== "") {
          post += `
                 <a href="${data[0].sourceCode}" class="btn btn-primary" >Source Code</a>
          `;
        }
        post += ` </div>`;
        $(".modal-content").html(post);
        $("#postModal").modal("show").fadeIn();
      },
    });
  });

  ///document ready end
});
