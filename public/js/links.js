$(document).ready(function() {
    $("#walk-button").click(function() {
        $.post("actions/walk", function() {
            console.log("Button click")
        })
    })
    $("#addbutton").click(function() {
        $.post("/actions/money", function(data) {
            if (data["wait"] > 0 ) {
                $("h1").hide();
            }
        })
    })
});