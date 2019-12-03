"user strict";
const socket = io();

$(document).ready(() => {
  let cookie = getCookie("isDark");
  if (cookie === "true") {
    $("<link>")
      .attr({
        rel: "stylesheet",
        type: "text/css",
        href: "css/styleDark.css"
      })
      .insertAfter("link:last");
    $("#darkBtn").attr("aria-pressed", true);
    $("#darkBtn").addClass("active");
  } else {
    setCookie("isDark", "false", 365);
    $('link[href*="css/styleDark.css"]').remove();
  }

  $("nav").on("click", "#darkBtn", e => {
    let status = $("#darkBtn").attr("aria-pressed");
    if (status === "false") {
      $("<link>")
        .attr({
          rel: "stylesheet",
          type: "text/css",
          href: "css/styleDark.css"
        })
        .insertAfter("link:last");
      setCookie("isDark", "true", 365);
    } else {
      setCookie("isDark", "false", 365);
      $('link[href*="css/styleDark.css"]').remove();
    }
  });

  $("#submitBtn").on("click", e => {
    e.preventDefault();

    rawData = `https://www.instagram.com/${$("#targetUrls").val()}`;
    datas = rawData.split("\n");

    $("#loading").show();

    $.ajax({
      type: "Post",
      url: "api/",
      dataType: "json",
      data: {
        url: datas
      },
      success: res => {
        results = res.url.split(",");
        $("#loading").hide();
        if (results === "") {
          $("#nothing").show();
        } else {
          $("#nothing").hide();
          for (let index = 0; index < results.length; index++) {
            const element = results[index];
            $("#result").append(`
                            <div class="col-sm-3 resultCard mb-1">
                                <div class="card text-center">
                                    <video height="500px">
                                        <source src="${element}" type="video/mp4">
                                    </video>
                                    <div class="card-body">
                                        <a href="${element}" class="btn btn-outline-secondary resultBtn" target="_blank">Download</a>
                                    </div>
                                        <div class="form-group">
                                            <input class="form-control form-control-lg" type="text" placeholder="Titulo" id="title-${index}">
                                        </div>
                                        <div class="form-group">
                                            <input class="form-control" type="text" placeholder="Descrição" id="description-${index}">
                                        </div>
                                        <div class="form-group">
                                            <input class="form-control form-control-sm" type="text" placeholder="tags ex.: stories, humor" id="tags-${index}">
                                        </div>
                                        <button class="btn btn-outline-secondary" type="button" id="send-${index}">Enviar</button>
                                </div>
                            </div>
                        `);

            $(`#send-${index}`).on("click", () => {
              sendToAPI(
                element,
                $(`#title-${index}`).val(),
                $(`#description-${index}`).val(),
                $(`#tags-${index}`).val()
              );
              $(`#send-${index}`).attr("disabled", true);
            });
          }
        }
      }
    });
  });

  function sendToAPI(video, title, description, tags) {
    const selectedFile = {
      video: video,
      title: title,
      description: description,
      tags: tags,
      privacyStatus: "public"
    };

    console.log("-------------------", selectedFile);

    socket.emit('start', selectedFile);
  }

  socket.on("done", function(video) {
    console.log("-----------------enviado---------------", video.title);
  });

  $("#clearBtn").on("click", e => {
    $(".resultCard").remove();
    $("#targetUrls").val("");
  });
});

function getCookie(cname) {
  var name = cname + "=";
  var ca = document.cookie.split(";");
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == " ") {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

function setCookie(cname, cvalue, exdays) {
  var d = new Date();
  d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
  var expires = "expires=" + d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}
