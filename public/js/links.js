$(document).ready(function() {
    $("#walk-button").click(function() {
        $.post("actions/walk", function() {
            console.log("Button click")
        })
    })
    $("#addbutton").click(function() {
        $.post("/actions/money", function(data) {
            $("#coin-amount").html(data.coins)
        })
    })
});