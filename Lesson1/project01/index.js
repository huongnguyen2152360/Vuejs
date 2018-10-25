new Vue({
  el: "#app",
  data: {
    playerHealth: 100,
    monsterHealth: 100,
    gameIsRunning: false,
    turns: []
  },
  methods: {
    startnewgame: function() {
      this.gameIsRunning = true;
      this.playerHealth = 100;
      this.monsterHealth = 100;
      this.turns = [];
    },
    attack: function() {
      // Check options
      if (this.checkPlayerOptions()) {
        return;
      }
      // Monster
      damage = this.inputDamage(10, 2);
      this.monsterHealth -= damage;
      this.turns.unshift({
        isPlayer: true, // Player turn
        textLog: "Player hits monters for " + damage
      });

      // Player
      // damage = this.inputDamage(15, 5)
      // this.playerHealth -= damage;
      // this.turns.unshift({
      //   isPlayer: false, // Player turn
      //   textLog: 'Monster hits player for ' + damage
      // })
      this.monsterAttack();
    },
    specialAttack: function() {
      // Check options
      if (this.checkPlayerOptions()) {
        return;
      }
      // Monster bị trừ máu bao nhiêu
      damage = this.inputDamage(15, 5);
      this.monsterHealth -= damage;
      this.turns.unshift({
        isPlayer: true, // Player turn
        textLog: "Player special-attacks monters for " + damage
      });

      // Player
      this.monsterAttack();
    },
    heal: function() {
      // Player
      if (this.playerHealth > 70) {
        return false;
      } else if (this.playerHealth <= 60) {
        healed = 10;
        this.playerHealth += healed;
        this.turns.unshift({
          isPlayer: true, // Player turn
          textLog: "Player heals for " + healed
        });
      } else {
        this.playerHealth = 70;
      }
      this.monsterAttack();
    },
    giveup: function() {
      this.turns.unshift({
        isPlayer: true, // Player turn
        textLog: "Player gave up :("
      });
      if (confirm("You lost! Try again?")) {
        this.startnewgame();
        this.turns = [];
      } else {
        this.gameIsRunning = false;
      }
    },
    monsterAttack: function() {
      damage = this.inputDamage(12, 3);
      this.playerHealth -= damage;
      this.turns.unshift({
        isPlayer: false, // Monster turn
        textLog: "Monster hits player for " + damage
      });
      this.checkPlayerOptions();
    },
    inputDamage: function(maxDamage, minDamage) {
      return Math.max(Math.floor(Math.random() * maxDamage) + 1, minDamage);
    },
    checkPlayerOptions: function() {
      if (this.monsterHealth <= 0) {
        if (confirm("You won! Play again?")) {
          this.startnewgame();
        } else {
          this.gameIsRunning = false;
        }
        return true;
      } else if (this.playerHealth <= 0) {
        if (confirm("You lost! Try again?")) {
          this.startnewgame();
        } else {
          this.gameIsRunning = false;
        }
        return true;
      }
      return;
    }
  }
});
