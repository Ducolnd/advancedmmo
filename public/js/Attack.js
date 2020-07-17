$(document).ready(function() {
    $("#attack_op").click(function () {
        $.post("/actions/attack/deal/", function (data) {
            if (data === "lose") {
                window.location.replace("/game/lose")
            } else if (data === "win"){
                window.location.replace("/game/win")
            }
            else {
                $("#health").text("health = " + data.health)
                $("#stamina").text("stamina = " + data.stamina)
                $("#ophealth").text("health = " + data.ophealth)
                $("#opstamina").text("stamina = " + data.opstamina)
            }

        })
    })
    $("#heal").click(function () {
        $.post("/actions/money", function (data) {
            $("#coin-amount").html(data.coins)
        })
    })
})