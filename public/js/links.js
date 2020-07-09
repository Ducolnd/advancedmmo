$(document).ready(function() {
    $("#walk-button").click(function() {
        $.post("actions/walk", function() {
            console.log("Button click")
        })
    })
});