$(document).ready(function () {
  $("#submit-button").click(function () {
    checked = $("input[type=checkbox]:checked").length;

    if (!checked) {
      $("#select-students").html(
        `<strong >Select students</strong>
          <div style = "color:orange;" >* select atleast one student!</div > `
      );
      return false;
    }
  });
});

console.log("create interview loaded");
