var game = {
    gold: 0,
    clickValue: 1,
    totalClicks: 0,
    totalGold: 0,

    click: function(amount){
        this.gold += amount;
        this.totalClicks++
        this.totalGold++
        display.updateScore()
        display.updateStats()
    },

    getScorePerSecond: function(){
        var scorePerSecond = 0
        for (i=0; i<upgrade.name.length; i++){
            scorePerSecond += upgrade.income[i] * upgrade.amount[i]
        }
        return scorePerSecond
    }

}

var upgrade = {
    name: [
        "Clicker",
        "Shovel",
        "Mining Cart",
        "Mountain",
        "Bank",
        "Safe"
    ],

    cost: [
        30,
        150,
        750,
        1500,
        4000,
        10000
    ],

    amount: [
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
        11
    ],

    purchase: function(index){
        if (game.gold >= this.cost[index]){
            game.gold -= this.cost[index]
            this.amount[index]++
            this.cost[index] = Math.ceil(this.cost[index] * 1.20)
            display.updateScore()
            display.updateUpgrade()
        }
    }

}

var perk = {
    cost: [
        1000,
        5000
    ],

    output: [
        2,
        2
    ],

    index: [
        0,
        0
    ],

    need: [
        10,
        100
    ],

    purchased: [
        false,
        false
    ],

    purchase: function(index){
        if (game.gold >= this.cost[index]){
            game.gold -= this.cost[index];
            upgrade.income[this.index[index]] = upgrade.income[this.index[index]] * 2;
            this.purchased[index] = true;
            display.updatePerk()
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
                if (upgrade.amount[perk.index[0]] >= 100){
                    document.getElementById("perk2").innerHTML = `<img src="cursor.webp" title="Silver Clicker: Clickers will upgrade income to 2 Cost:5000" onclick="perk.purchase(1)">`
                }
            }
        }
        else{
            document.getElementById("perk2").innerHTML = ""
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