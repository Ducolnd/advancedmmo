$(document).ready(function() {
    $("#attack_op").click(function () {
        $.post("/actions/money", function (data) {
            $("#coin-amount").html(data.coins)
        })
    })
    $("#heal").click(function () {
        $.post("/actions/money", function (data) {
            $("#coin-amount").html(data.coins)
        })
    })
})