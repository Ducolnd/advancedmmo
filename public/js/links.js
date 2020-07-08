$(document).ready(function() {
    $("#walk-button").click(function() {
        $.post("actions/walk", function() {
            alert("working")
        })
    })
});