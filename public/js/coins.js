$(document).ready(function() {
    $("#addbutton").click(function () {
        $.post("/actions/money", function (data) {
            $("#coin-amount").html(data.coins)
        })
    })
})