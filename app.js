new Vue({
    el: '#app',
    data: {
        playerHealth: 100,
        monsterHealth: 100,
        gameIsRunning: false,
        turns: []
    },
    methods: {
        startNewGame() {
            this.gameIsRunning = true;
            this.playerHealth = 100;
            this.monsterHealth = 100;
            this.turns = []
        },
        attack() {
            //check Option
            if (this.checkPlayerOptions()) {
                return
            }
            // monster
            damage = this.inputDamage(4, 10)
            this.monsterHealth -= damage;
            this.turns.unshift({
                isPlayer: true,
                textLog: 'Player hit monster for ' + damage
            });
            // player
            this.monsterAttacks();
        },
        specialAttack() {
            //check Option
            if (this.checkPlayerOptions()) {
                return
            }
            // monster
            damage = this.inputDamage(10, 20)
            this.monsterHealth -= damage;
            this.turns.unshift({
                isPlayer: true,
                textLog: 'Player hit monster for ' + damage
            });
            // player
            this.monsterAttacks();
        },
        heal() {
            //player
            if (this.playerHealth > 70) {
                return false
            } else if (this.playerHealth <= 60) {
                this.playerHealth += 10;
            } else {
                this.playerHealth = 70;
            }
            this.turns.unshift({
                isPlayer: true,
                textLog: 'Player heal for 10'
            });
            //monster
            this.monsterAttacks()
        },
        giveUp() {
            this.gameIsRunning = false;
            this.turns = [];
            this.playerHealth = 100;
            this.monsterHealth = 100;
            alert('You lost!')
        },
        monsterAttacks() {
            damage = this.inputDamage(5, 12)
            this.playerHealth -= damage;
            this.turns.unshift({
                isPlayer: false,
                textLog: 'Monster hit Player for ' + damage
            });
            this.checkPlayerOptions()
        },
        inputDamage(minDamage, maxDamage) {
            return Math.max(Math.floor(Math.random() * maxDamage) + 1, minDamage);
        },
        checkPlayerOptions() {
            if (this.monsterHealth <= 0) {
                if (confirm('You won! New game ?')) {
                    this.startNewGame()
                } else {
                    this.gameIsRunning = false
                }
                return true;
            } else if (this.playerHealth <= 0) {
                if (confirm('You lost! New game ?')) {
                    this.startNewGame()
                } else {
                    this.gameIsRunning = false
                }
                return true;
            }
            return;
        }
    }
});
