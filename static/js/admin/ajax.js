$(document).ready(function () {
  //add cate modal show
  $("#addCate").on("click", function (e) {
    e.preventDefault();
    $("#cateaddmodal").show().fadeIn();
  });
  //add cate modal hide
  $("#close-btn").on("click", function () {
    $("#cateaddmodal").hide().fadeOut();
  });
  //cate load data
  function CategoryLoad() {
    $.ajax({
      url: "/admin/categorise/",
      type: "POST",
      success: function (data) {
        let table = "";
        if (data.length > 0) {
          let index = 0;
          data.forEach((cate) => {
            table += `
                <tr>
                  <td>${(index += 1)}</td>
                    <td>${cate.name}</td>
                    <td>${cate.post_no}</td>
                    <td>
                    <a href="javascript:void(0)" data-id="${
                      cate.id
                    }" id="edit_category">edit</a>
                    <a href="javascript:void(0)" data-id="${
                      cate.id
                    }" id="delete_category">delete</a>
                    </td>
                </tr>
            `;
          });
        } else {
          table += `
          <tr>
             <td colspan="4">
                <div class="alert alert-danger text-center">
                  <h3>No Data Found</h3>
                </div>
              </td>
            </tr>
          `;
        }

        $("#table_body").html(table);
      },
      error: function (error) {
        console.log(error);
      },
    });
  }
  CategoryLoad();
  //new Category add
  $("#submitBtn").on("click", function (e) {
    e.preventDefault();
    var catename = $("#cate_name").val();
    if (catename == "") {
      $("#cate_name").addClass("is-invalid");
    } else {
      const form = $("#formadd_cate")[0];
      const formdata = new FormData(form);
      $.ajax({
        url: "/admin/categorise/add/",
        type: "POST",
        data: formdata,
        contentType: false,
        processData: false,
        success: function (data) {
          if (data == "1") {
            swal({
              title: "Data Added!",
              text: "data add successfully!",
              icon: "success",
              button: "OK",
            });
            $("#formadd_cate")[0].reset();
            $("#cateaddmodal").hide().fadeOut();

            CategoryLoad();
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
  $(document).on("click", "#delete_category", function (e) {
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
          url: "/admin/categorise/delete/" + cateid + "/",
          type: "POST",
          success: function (data) {
            // console.log(data);
            if (data == "1") {
              // alert(data);
              swal("Your Data has been deleted!", {
                icon: "success",
              });
              CategoryLoad();
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
  $(document).on("click", "#edit_category", function (e) {
    e.preventDefault();
    var cate_id = $(this).data("id");
    $.ajax({
      url: "/admin/categorise/edit/" + cate_id + "/",
      type: "GET",
      success: function (data) {
        // console.log(data[0].name);
        $("#categoryName").val(data[0].name);
        $("#cate_id").val(data[0].id);
        $("#cateeditmodal").show();
      },
    });
  });
  ///update category
  $(document).on("click", "#update_cate", function (e) {
    e.preventDefault();

    var cate_name = $("#categoryName").val();
    var cate_id = $("#cate_id").val();
    // alert(cate_name);
    if (cate_name == "") {
      $("#categoryName").addClass("is-invalid");
    } else {
      $.ajax({
        url: "/admin/categorise/edit/" + cate_id + "/",
        type: "POST",
        data: { cate_name: cate_name },
        success: function (data) {
          if (data == 1) {
            swal("Data Updated", "Data has been updated", "success");
            CategoryLoad();
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
  function get_skills() {
    $.ajax({
      url: "/admin/skills/",
      type: "POST",
      success: function (data) {
        let table = "";
        if (data.length > 0) {
          index = 0;
          data.forEach((skill) => {
            table += `
            <tr>
            <td>${(index += 1)}</td>
            <td>${skill.name}</td>
            <td>${skill.exprience} %</td>
            <td>${skill.category}</td>
            <td>
                 <a href="javascript:void(0)" data-id="${
                   skill.id
                 }" id="edit_skill">edit</a>
                <a href="javascript:void(0)" data-id="${
                  skill.id
                }" id="delete_skill">delete</a>
                </td>
            </tr>
            
            `;
          });
        } else {
          table += `
          <tr>
             <td colspan="5">
                <div class="alert alert-danger text-center">
                  <h3>No Data Found</h3>
                </div>
              </td>
            </tr>
          `;
        }
        $("#skillTable_body").html(table);
      },
    });
  }
  get_skills();

  ///add skill modal show
  $("#skill_Add").on("click", function (e) {
    e.preventDefault();
    $.ajax({
      url: "/admin/skills/add/",
      type: "GET",
      success: function (data) {
        let table = '<option value="0">Select Category</option>';
        data.forEach((category) => {
          table += `
          <option value="${category.id}">${category.name}</option>
          `;
        });
        $("#skill_category").html(table);
        $("#skillAddModal").modal("show").fadeIn();
      },
    });
  });
  //add skill data
  $("#skillAdd").on("click", function (e) {
    e.preventDefault();
    var name = $("#skill-name").val();
    var exp = $("#skill-exp").val();
    if (name == "") {
      $("#skill-name").addClass("is-invalid");
    } else if (exp == "") {
      $("#skill-exp").addClass("is-invalid");
    } else {
      var dataall = $("#addSkillForm").serialize();
      $.ajax({
        url: "/admin/skills/add/",
        type: "POST",
        data: dataall,
        success: function (data) {
          if (data == "1") {
            swal({
              title: "Data Added!",
              text: "data add successfully!",
              icon: "success",
              button: "OK",
            });
            $("#addSkillForm")[0].reset();
            $("#skillAddModal").modal("hide").fadeOut();
            get_skills();
          } else {
            swal({
              title: "Data Not Added!",
              text: "data add unsuccess!",
              icon: "error",
              button: "OK",
            });
            $("#addSkillForm")[0].reset();
            $("#skillAddModal").modal("hide").fadeIn();
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
      url: "/admin/skills/edit/" + skill_id + "/",
      type: "GET",
      success: function (data) {
        // console.log(data[0].categories);
        $("#ud-skill-name").val(data[0].skill[0].name);
        $("#ud-skill-exp").val(data[0].skill[0].exprience);
        $("#ud-skill-id").val(data[0].skill[0].id);
        let category = "";
        data[0].categories.forEach((cate) => {
          category += `
          <option ${data[0].skill[0].category == cate.id ? "selected" : ""} 
          value="${cate.id}">${cate.name}</option>
          `;
        });
        $("#ud_skill_category").html(category);
        $("#skillUpdateModal").modal("show").fadeIn();
      },
    });
  });

  // update skill data save
  $(document).on("click", "#skillUpdate", function (e) {
    e.preventDefault();
    let name = $("#ud-skill-name").val();
    let exp = $("#ud-skill-exp").val();
    let skill_id = $("#ud-skill-id").val();
    // alert(name);
    if (name == "") {
      $("#ud-skill-name").addClass("is-invalid");
    } else if (exp == "") {
      $("#ud-skill-exp").addClass("is-invalid");
    } else {
      var dataall = $("#updateSkillForm").serialize();
      $.ajax({
        url: "/admin/skills/edit/" + skill_id + "/",
        type: "POST",
        data: dataall,
        success: function (data) {
          // console.log(data);
          if (data == "1") {
            swal({
              title: "Data Updated!",
              text: "data Update successfully!",
              icon: "success",
              button: "OK",
            });
            $("#updateSkillForm")[0].reset();
            $("#skillUpdateModal").modal("hide").fadeOut();
            get_skills();
          } else {
            swal({
              title: "Data Not Updated!",
              text: "data Update unsuccess!",
              icon: "error",
              button: "OK",
            });
            $("#updateSkillForm")[0].reset();
            $("#skillUpdateModal").modal("hide").fadeOut();
          }
        },
      });
    }
  });
  ///delete skill data
  $(document).on("click", "#delete_skill", function (e) {
    e.preventDefault();
    const skill_id = $(this).data("id");
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
          url: "/admin/skills/delete/" + skill_id + "/",
          type: "POST",
          success: function (data) {
            if (data == "1") {
              swal("Your Data has been deleted!", {
                icon: "success",
              });
              get_skills();
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
