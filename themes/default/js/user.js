/**
 * @todo preventDefault() not working in IE 6 and 7
 * @todo Close link should be reusable 
 */
var closeLink = '<li><a href="#">X</a></li>';

$("document").ready(function() {
  $("#gLoginLink").click(function(event){
    event.preventDefault();
    var url = $("#gLoginLink a").attr("href");
    $.get(url, function(data) {
	  $('#gLoginLink').hide();
	  $("#gLoginMenu").append(closeLink);
	  $("#gLoginMenu li:last").addClass("gClose").show();	  
	  $("#gLoginMenu .gClose a").click(function(){
	    $("#gLoginForm").remove();
	    $("#gLoginMenu .gClose").remove();
	    $("#gLoginLink").show();
	    $("input#gUsername").val("");
	    $("input#gPassword").val("");  
	  });
      $("#gLoginFormContainer").html(data);
      ajaxify_login_form();
    });
  });
});

function ajaxify_login_form() {
  $("form#gLoginForm").ajaxForm({
    target: "#gLoginFormContainer",
    success: function(responseText, statusText) {
      if (!responseText) {
        window.location.reload();
      } else {
        ajaxify_login_form();
      }
    },
  });
}
