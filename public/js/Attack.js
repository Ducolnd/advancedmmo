$(document).ready(function() {
    $("#attack_op").click(function () {
        $.post("/actions/attack/deal/", function (data) {
            $("#health").text(data.health)
            $("#stamina").text(data.stamina)
            $("#ophealth").text(data.ophealth)
            $("#opstamina").text(data.opstamina)

        })
    })
    $("#heal").click(function () {
        $.post("/actions/money", function (data) {
            $("#coin-amount").html(data.coins)
        })
    })
})