$(document).ready(function () {
  ///add cate modal show
  $("#addCate").on("click", function (e) {
    e.preventDefault();
    $("#cateaddmodal").show().fadeIn();
  });
  //add cate modal hide
  $("#close-btn").on("click", function () {
    $("#cateaddmodal").hide().fadeOut();
  });
  //cate load data
  function loadData() {
    $.ajax({
      url: "loadCate.php",
      type: "POST",
      success: function (data) {
        $("#showcate_data").html(data);
      },
    });
  }
  loadData();
  //new Category add
  $("#submitBtn").on("click", function (e) {
    e.preventDefault();
    var catename = $("#cate_name").val();
    if (catename == "") {
      $("#cate_name").addClass("is-invalid");
    } else {
      var alldata = $("#formadd_cate").serialize();
      $.ajax({
        url: "addcategory.php",
        type: "POST",
        data: alldata,
        success: function (data) {
          if (data == 1) {
            swal({
              title: "Data Added!",
              text: "data add successfully!",
              icon: "success",
              button: "OK",
            });
            $("#formadd_cate")[0].reset();
            $("#cateaddmodal").hide().fadeOut();

            loadData();
          } else {
            swal({
              title: "Data Not Added!",
              text: "data add unsuccess!",
              icon: "error",
              button: "OK",
            });
            $("#formadd_cate")[0].reset();
            $("#cateaddmodal").hide().fadeOut();
          }
        },
      });
    }
  });
  // delete category
  $(document).on("click", "#delete", function (e) {
    e.preventDefault();
    var cateid = $(this).data("id");
    // alert(cateid);
    swal({
      title: "Are you sure?",
      text: "you will not be able to recover this data!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        $.ajax({
          url: "deletecategory.php",
          type: "POST",
          data: { cate_id: cateid },
          success: function (data) {
            // console.log(data);
            if (data == 1) {
              // alert(data);
              swal("Your Data has been deleted!", {
                icon: "success",
              });
              loadData();
            } else {
              swal("Data Not deleted!", {
                icon: "error",
              });
            }
          },
        });
      }
    });
  });
  //upadte modal hide
  $("#close-editbtn").on("click", function () {
    $("#cateeditmodal").hide();
  });
  //update category load data & show modal
  $(document).on("click", "#edit", function (e) {
    e.preventDefault();
    var cate_id = $(this).data("id");
    $.ajax({
      url: "cateupdata.php",
      type: "POST",
      data: { cate_id: cate_id },
      success: function (data) {
        $("#cateloadShow").html(data);
        $("#cateeditmodal").show();
      },
    });
  });
  ///update category
  $(document).on("click", "#submit-Btn", function (e) {
    e.preventDefault();

    var cate_name = $("#cateName").val();
    var cate_id = $("#cate_id").val();
    // alert(cate_name);
    if (cate_name == "") {
      $("#cateName").addClass("is-invalid");
    } else {
      $.ajax({
        url: "update_cate.php",
        type: "POST",
        data: { cate_id: cate_id, cate_name: cate_name },
        success: function (data) {
          if (data == 1) {
            swal("Data Updated", "Data has been updated", "success");
            loadData();
            $("#cateeditmodal").hide().fadeOut();
          } else {
            swal("Data Not Updated", "Data hasn't been updated", "error");
            $("#cateeditmodal").hide().fadeOut();
          }
        },
      });
    }
  });
  ///skill data load
  function Dataload(page) {
    $.ajax({
      url: "skillloadData.php",
      type: "POST",
      data: { page_no: page },
      success: function (data) {
        $("#skill_Load").html(data);
      },
    });
  }
  Dataload();
  //pagination code
  $(document).on("click", "#pagination a", function (e) {
    e.preventDefault();
    var page_id = $(this).attr("id");
    Dataload(page_id);
  });
  ///add skill modal show
  $("#skill_Add").on("click", function (e) {
    $("#addmodal").show().fadeIn();
  });

  ///add skill modal hide
  $("#close-btn").on("click", function () {
    $("#addmodal").hide().fadeOut();
  });
  //add skill data
  $("#submit_Btn").on("click", function (e) {
    e.preventDefault();
    var name = $("#skill-name").val();
    var exp = $("#skill-exp").val();
    if (name == "") {
      $("#skill-name").addClass("is-invalid");
    } else if (exp == "") {
      $("#skill-exp").addClass("is-invalid");
    } else {
      var dataall = $("#formadd_skill").serialize();
      $.ajax({
        url: "addskill.php",
        type: "POST",
        data: dataall,
        success: function (data) {
          if (data == 1) {
            swal({
              title: "Data Added!",
              text: "data add successfully!",
              icon: "success",
              button: "OK",
            });
            $("#formadd_skill")[0].reset();
            $("#addmodal").hide().fadeOut();
            Dataload();
          } else {
            swal({
              title: "Data Not Added!",
              text: "data add unsuccess!",
              icon: "error",
              button: "OK",
            });
            $("#formadd_skill")[0].reset();
            $("#addmodal").hide().fadeOut();
          }
        },
      });
    }
  });
  //update skill modal show
  $(document).on("click", "#edit_skill", function (e) {
    e.preventDefault();
    var skill_id = $(this).data("id");
    $.ajax({
      url: "skillAction.php",
      type: "POST",
      data: { skill_id: skill_id, editmodal_load: 0 },
      success: function (data) {
        // console.log(data);
        $("#updatemodal-form").html(data);
      },
    });
    $("#Updatemodal").show();
  });
  //update skill modal hide
  $(document).on("click", "#close-btn", function (e) {
    e.preventDefault();
    $("#Updatemodal").hide();
  });
  // update skill data save
  $(document).on("click", "#skillupdate_Btn", function (e) {
    e.preventDefault();
    var name = $("#skill-names").val();
    var exp = $("#skill-exps").val();
    // alert(name);
    if (name == "") {
      $("#skill-names").addClass("is-invalid");
    } else if (exp == "") {
      $("#skill-exps").addClass("is-invalid");
    } else {
      var dataall = $("#formupdate_skill").serialize();
      $.ajax({
        url: "skillAction.php",
        type: "POST",
        data: dataall,
        success: function (data) {
          console.log(data);
          if (data == 1) {
            swal({
              title: "Data Updated!",
              text: "data Update successfully!",
              icon: "success",
              button: "OK",
            });
            $("#formupdate_skill")[0].reset();
            $("#Updatemodal").hide().fadeOut();
            Dataload();
          } else {
            swal({
              title: "Data Not Updated!",
              text: "data Update unsuccess!",
              icon: "error",
              button: "OK",
            });
            $("#formupdate_skill")[0].reset();
            $("#Updatemodal").hide().fadeOut();
          }
        },
      });
    }
  });
  ///delete skill data
  $(document).on("click", "#delete_skill", function (e) {
    e.preventDefault();
    var skill_id = $(this).data("id");
    // alert(skill_id);
    swal({
      title: "Are you sure?",
      text: "you will not be able to recover this data!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        $.ajax({
          url: "deleteskill.php",
          type: "POST",
          data: { skill_id: skill_id },
          success: function (data) {
            if (data == 1) {
              swal("Your Data has been deleted!", {
                icon: "success",
              });
              Dataload();
            } else {
              swal("Data Not deleted!", {
                icon: "error",
              });
            }
          },
        });
      }
    });
  });
  ///show email
  function showMail(page) {
    $.ajax({
      url: "mailLoad.php",
      type: "POST",
      data: { page_no: page },
      success: function (data) {
        $("#show_mail").html(data);
      },
    });
  }
  showMail();
  ///pagination code
  $(document).on("click", "#pagination a", function (e) {
    e.preventDefault();
    var page = $(this).attr("id");
    showMail(page);
  });
  ////delete mail
  $(document).on("click", "#delete_mail", function (e) {
    e.preventDefault();
    var id = $(this).data("id");

    swal({
      title: "Are you sure?",
      text: "you will not be able to recover this imaginary file!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        $.ajax({
          url: "deleteMail.php",
          type: "POST",
          data: { id: id },
          success: function (data) {
            if (data == 1) {
              swal(
                "Your Data Has been delete !",
                "data delete successfully!",
                "success"
              );
              showMail();
            } else {
              swal(
                "Your Data Not delete !",
                "data delete unsuccessfull!",
                "error"
              );
            }
          },
        });
      }
    });
  });

  ///Post Add
  $("#post_submitBtn").on("click", function (e) {
    e.preventDefault();
    for (instance in CKEDITOR.instances) {
      CKEDITOR.instances[instance].updateElement();
    }

    var title = $("#post_title").val();
    var cate = $("#post_cate").val();
    var decs = $("#post_decs").val();
    if (title == "" || cate == "" || decs == "") {
      swal("All fill required", "", "error");
    } else {
      var data = $("#Add_post")[0];
      var alldata = new FormData(data);
      $.ajax({
        url: "addpost_core.php",
        type: "POST",
        data: alldata,
        contentType: false,
        processData: false,
        success: function (data) {
          if (data == 1) {
            $("#Add_post")[0].reset();
            // swal("Data insert Successfully!","","success");
            window.location.href = "post.php";
          } else {
            swal("Data insert unSuccess!", "", "error");
          }
        },
      });
    }
  });
  //Post Update
  $("#editpost_submitBtn").on("click", function (e) {
    e.preventDefault();
    for (instance in CKEDITOR.instances) {
      CKEDITOR.instances[instance].updateElement();
    }

    var title = $("#post_title").val();
    var cate = $("#post_cate").val();
    var decs = $("#post_decs").val();
    if (title == "" || cate == "" || decs == "") {
      swal("All fill required", "", "error");
    } else {
      var data = $("#Edit_post")[0];
      var alldata = new FormData(data);
      $.ajax({
        url: "editPost_core.php",
        type: "POST",
        data: alldata,
        contentType: false,
        processData: false,
        success: function (data) {
          if (data == 1) {
            swal("Data insert Successfully!", "", "success");
            window.location.href = "post.php";
          } else {
            swal("Data insert unSuccess!", "", "error");
          }
        },
      });
    }
  });
  ///post data load
  function postload(page) {
    $.ajax({
      url: "postLoad.php",
      type: "POST",
      data: { page_no: page },
      success: function (data) {
        $("#showPostData").html(data);
      },
    });
  }
  postload();

  ///post pagination
  $(document).on("click", "#pagination a", function (e) {
    e.preventDefault();
    var page_id = $(this).attr("id");
    postload(page_id);
  });
  //post delete
  $(document).on("click", "#delete_post", function (e) {
    e.preventDefault();
    var post_id = $(this).data("id");
    var cid = $(this).data("cid");
    // alert(skill_id);
    swal({
      title: "Are you sure?",
      text: "you will not be able to recover this data!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        $.ajax({
          url: "postDelete.php",
          type: "POST",
          data: { post_id: post_id, cid: cid },
          success: function (data) {
            if ((data = "yes")) {
              swal(
                "Your Data has been deleted!",
                "data delete successfully",
                "success"
              );
              postload();
            } else {
              swal("Data Not deleted!", {
                icon: "error",
              });
            }
          },
        });
      }
    });
  });
  ///post edit

  ///ready end
});
