var game = {
    gold: 0,
    clickValue: 1,
    totalClicks: 0,
    totalGold: 0,
    scorePerSecond: 0,

    click: function(amount){
        this.gold += amount;
        this.totalClicks++
        this.totalGold += amount
        display.updateScore()
        display.updateStats()
    },

    getScorePerSecond: function(){
        this.scorePerSecond = 0
        for (i=0; i<upgrade.name.length; i++){
            this.scorePerSecond += upgrade.income[i] * upgrade.amount[i]
        }
        return this.scorePerSecond
    }

}

var upgrade = {
    name: [
        "Clicker",
        "Shovel",
        "Mining Cart",
        "Mountain",
        "Bank",
        "Safe",
        "Gold Coin",
        "Rocket"
    ],

    cost: [
        30,
        150,
        750,
        1500,
        4000,
        10000,
        15000,
        20000
    ],

    amount: [
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0
    ],


    income: [
        1,
        3,
        5,
        7,
        9,
        11,
        15,
        20
    ],

    purchase: function(index){
        if (game.gold >= this.cost[index]){
            game.gold -= this.cost[index]
            this.amount[index]++
            this.cost[index] = Math.ceil(this.cost[index] * 1.15)
            display.updateScore()
            display.updateUpgrade()
        }
    }

}

var perk = {
    cost: [
        1000,
        5000,
        500,
        1000,
        1500,
        2000,
        300,
        500,
        700,
        900
    ],

    output: [
        2,
        2,
        2,
        5,
        5,
        2,
        2,
        2,
        2,
        2
    ],

    index: [
        0,
        0,
        "none",
        "none",
        "none",
        "none",
        1,
        2,
        3,
        4
    ],

    need: [
        10,
        100,
        350,
        500,
        1000,
        1500,
        10,
        10,
        10,
        10
    ],

    purchased: [
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false
    ],

    purchase: function(index){
        if (game.gold >= this.cost[index]){
            game.gold -= this.cost[index];
            if (this.index[index] == "none"){
                game.clickValue += this.output[index]
                this.purchased[index] = true;
            }
            else {
                upgrade.income[this.index[index]] = upgrade.income[this.index[index]] * 2;
                this.purchased[index] = true;
                display.updatePerk()
            }
        }
    }

}

var display = {
    updateScore: function(){
        document.getElementById("gold").innerHTML = game.gold;
        document.title = game.gold + " Gold - Gold Clicker"
    },

    updateScorePerSection: function(){
        game.gold += game.getScorePerSecond()
        game.totalGold += game.getScorePerSecond()
    },

    updateStats: function(){
        document.getElementById("click-value").innerHTML = "Click Value: " + game.clickValue
        document.getElementById("click-total").innerHTML = "Total Clicks: " + game.totalClicks
        document.getElementById("gold-per-second").innerHTML = "Gold Per Second: " + game.getScorePerSecond()
        document.getElementById("total-gold").innerHTML = "Total Gold: " + game.totalGold
    },

    updateUpgrade: function(){
        document.getElementById("upgrade-cost0").innerHTML = upgrade.cost[0]
        document.getElementById("upgrade-amount0").innerHTML = upgrade.amount[0]
        document.getElementById("upgrade-cost1").innerHTML = upgrade.cost[1]
        document.getElementById("upgrade-amount1").innerHTML = upgrade.amount[1]
        document.getElementById("upgrade-cost2").innerHTML = upgrade.cost[2]
        document.getElementById("upgrade-amount2").innerHTML = upgrade.amount[2]
        document.getElementById("upgrade-cost3").innerHTML = upgrade.cost[3]
        document.getElementById("upgrade-amount3").innerHTML = upgrade.amount[3]
        document.getElementById("upgrade-cost4").innerHTML = upgrade.cost[4]
        document.getElementById("upgrade-amount4").innerHTML = upgrade.amount[4]
        document.getElementById("upgrade-cost5").innerHTML = upgrade.cost[5]
        document.getElementById("upgrade-amount5").innerHTML = upgrade.amount[5]
        document.getElementById("upgrade-cost6").innerHTML = upgrade.cost[6]
        document.getElementById("upgrade-amount6").innerHTML = upgrade.amount[6]
        document.getElementById("upgrade-cost7").innerHTML = upgrade.cost[7]
        document.getElementById("upgrade-amount7").innerHTML = upgrade.amount[7]
        
    },

    updatePerk: function(){
        if (perk.purchased[0] == false){
            if (game.gold >= perk.cost[0]){
                if (upgrade.amount[perk.index[0]] >= 10){
                    document.getElementById("perk1").innerHTML = `<img src="cursor.webp" title="Stone Clicker: Clickers will upgrade income to 2 Cost:1000" onclick="perk.purchase(0)">`
                }
            }
        }
        else{
            document.getElementById("perk1").innerHTML = ""
        }
        if (perk.purchased[1] == false){
            if (game.gold >= perk.cost[1]){
                if (upgrade.amount[perk.index[1]] >= 100){
                    document.getElementById("perk2").innerHTML = `<img src="cursor.webp" title="Silver Clicker: Clickers will upgrade income to 2 Cost:5000" onclick="perk.purchase(1)">`
                }
            }
        }
        else{
            document.getElementById("perk2").innerHTML = ""
        }
        if (perk.purchased[2] == false){
            if (game.gold >= perk.cost[2]){
                if (game.totalClicks >= perk.need[2]){
                    document.getElementById("perk3").innerHTML = `<img src="clicker.jpg" title="Stone Cursor: Click value +2 cost:500" onclick="perk.purchase(2)">`
                }
            }
        }
        else{
            document.getElementById("perk3").innerHTML = ""
        }
        if (perk.purchased[3] == false){
            if (game.gold >= perk.cost[3]){
                if (game.totalClicks >= perk.need[3]){
                    document.getElementById("perk4").innerHTML = `<img src="clicker.jpg" title="Silver Cursor: Click value +5 cost:1000" onclick="perk.purchase(3)">`
                }
            }
        }
        else{
            document.getElementById("perk4").innerHTML = ""
        }
        if (perk.purchased[4] == false){
            if (game.gold >= perk.cost[4]){
                if (game.totalClicks >= perk.need[4]){
                    document.getElementById("perk5").innerHTML = `<img src="clicker.jpg" title="Gold Cursor: Click value +5 cost:1500" onclick="perk.purchase(4)">`
                }
            }
        }
        else{
            document.getElementById("perk5").innerHTML = ""
        }
        if (perk.purchased[5] == false){
            if (game.gold >= perk.cost[5]){
                if (game.totalClicks >= perk.need[5]){
                    document.getElementById("perk6").innerHTML = `<img src="clicker.jpg" title="Diamond Cursor: Click value +2 cost:2000" onclick="perk.purchase(5)">`
                }
            }
        }
        else{
            document.getElementById("perk6").innerHTML = ""
        }
        if (perk.purchased[6] == false){
            if (game.gold >= perk.cost[6]){
                if (upgrade.amount[perk.index[6]] >= perk.need[6]){
                    document.getElementById("perk7").innerHTML = `<img src="shovel.png" title="Double Shovels: shovel value times 2 cost:300" onclick="perk.purchase(6)">`
                }
            }
        }
        else{
            document.getElementById("perk7").innerHTML = ""
        }
        if (perk.purchased[7] == false){
            if (game.gold >= perk.cost[7]){
                if (upgrade.amount[perk.index[7]] >= perk.need[7]){
                    document.getElementById("perk8").innerHTML = `<img src="mining_cart.jpg" title="Double Carts: Carts value times 2 cost:500" onclick="perk.purchase(7)">`
                }
            }
        }
        else{
            document.getElementById("perk8").innerHTML = ""
        }
        if (perk.purchased[8] == false){
            if (game.gold >= perk.cost[8]){
                if (upgrade.amount[perk.index[8]] >= perk.need[8]){
                    document.getElementById("perk9").innerHTML = `<img src="mountain.jpg" title="Double Mountains: Mountains value times 2 cost:700" onclick="perk.purchase(8)">`
                }
            }
        }
        else{
            document.getElementById("perk9").innerHTML = ""
        }
        if (perk.purchased[9] == false){
            if (game.gold >= perk.cost[9]){
                if (upgrade.amount[perk.index[9]] >= perk.need[9]){
                    document.getElementById("perk9").innerHTML = `<img src="bank.png" title="Double Bank: Bank value times 2 cost:900" onclick="perk.purchase(9)">`
                }
            }
        }
        else{
            document.getElementById("perk9").innerHTML = ""
        }
        

    },

    updateSuper: function() {
        if (super_upgrade.purchased[0] == true){
            document.querySelector(".super-click").style.border = "4px solid green"
        }
        if (super_upgrade.purchased[1] == true){
            document.querySelector(".super-gold").style.border = "4px solid green"
        }
        if (super_upgrade.purchased[2] == true){
            document.querySelector(".super-click1").style.border = "4px solid green"
        }
        if (super_upgrade.purchased[3] == true){
            document.querySelector(".super-gold1").style.border = "4px solid green"
        }
    }
}

var super_upgrade = {
    name: [
        "Super Click",
        "Super Gold",
        "Super Click 1",
        "Super Gold 1"
    ],

    cost: [
        1000000,
        5000000,
        10000000,
        50000000
    ],

    purchased: [
        false,
        false,
        false,
        false
    ],

    purchase: function(index) {
        if (game.gold >= this.cost[index]){
            if (this.purchased[index] == false){
                game.gold -= this.cost[index]
                this.purchased[index] = true
                if (this.name[index] == "Super Click"){
                    game.clickValue += 10000
                }
                if (this.name[index] == "Super Click 1"){
                    game.clickValue += 100000
                }
                display.updateSuper()
            }
        }
    }
}

function saveGame() {
    var gameSave = {
        gold: game.gold,
        clickValue: game.clickValue,
        totalClicks: game.totalClicks,
        totalGold: game.totalGold,
        scorePerSedond: game.scorePerSecond,
        upgradeCost: upgrade.cost,
        upgradeAmount: upgrade.amount,
        upgradeIncome: upgrade.income,
        perkPurchased: perk.purchased,
        superUpgradePurchased: super_upgrade.purchased

    }
    localStorage.setItem("gameSave", JSON.stringify(gameSave))
}

function loadGame() {
    var savedGame = JSON.parse(localStorage.getItem("gameSave"));
    if (localStorage.getItem("gameSave") !== null) {
        if (typeof savedGame.gold !== "undefined") game.gold = savedGame.gold;
        if (typeof savedGame.totalClicks !== "undefined") game.totalClicks = savedGame.totalClicks;
        if (typeof savedGame.clickValue !== "undefined") game.clickValue = savedGame.clickValue;
        if (typeof savedGame.totalGold !== "undefined") game.totalGold = savedGame.totalGold;
        if (typeof savedGame.scorePerSecond !== "undefined") game.scorePerSecond = savedGame.scorePerSecond;
        if (typeof savedGame.upgradeCost !== "undefined"){
            for (i=0; i < savedGame.upgradeCost.length; i++) {
                upgrade.cost[i] = savedGame.upgradeCost[i];
            }
        }
        if (typeof savedGame.upgradeAmount !== "undefined"){
            for (i=0; i < savedGame.upgradeAmount.length; i++) {
                upgrade.amount[i] = savedGame.upgradeAmount[i];
            }
        }
        if (typeof savedGame.upgradeIncome !== "undefined"){
            for (i=0; i < savedGame.upgradeIncome.length; i++) {
                upgrade.income[i] = savedGame.upgradeIncome[i];
            }
        }
        if (typeof savedGame.perkPurchased !== "undefined"){
            for (i=0; i < savedGame.perkPurchased.length; i++) {
                perk.purchased[i] = savedGame.perkPurchased[i];
            }
        }
        if (typeof savedGame.superUpgradePurchased !== "undefined"){
            for (i=0; i < savedGame.superUpgradePurchased.length; i++) {
                super_upgrade.purchased[i] = savedGame.superUpgradePurchased[i];
            }
        }
    }
}

function resetGame(){
    if (confirm("Are you Sure you want to reset you game?")) {
        var gameSave = {};
        localStorage.setItem("gameSave", JSON.stringify(gameSave));
        location.reload();
    }
}

window.onload = function(){
    display.updateScore()
    display.updateStats()
    display.updateUpgrade()
    display.updatePerk()
    display.updateScorePerSection()
    display.updatePerk()
    display.updateSuper()
    loadGame()
    saveGame()
}

setInterval(function(){
    display.updateScore()
    display.updateScorePerSection()
    display.updateStats()
    display.updateUpgrade()
    display.updatePerk()
    display.updateSuper()
}, 1000)

setInterval(function(){
    saveGame()
}, 30000)
