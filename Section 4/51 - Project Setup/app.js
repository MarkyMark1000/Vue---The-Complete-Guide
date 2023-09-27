function getRandomValue(min, max){
    return min + Math.floor(Math.random()*(max-min));
};

const app = Vue.createApp({
    data() {
        return {
            playerHealth: 100,
            monsterHealth: 100,
            currentRound: 0,
            winner: null,
            logMessages: []
        };
    },
    computed: {
        monsterBarStyles() {
            if (this.monsterHealth<0)
            {
                return {'width': '0%'};
            }
            return {
                'width': this.monsterHealth + '%'
            };
        },
        playerBarStyles() {
            if (this.playerHealth<0)
            {
                return {'width': '0%'};
            }
            return {
                'width': this.playerHealth + '%'
            };
        },
        mayUseSpecialAttack() {
            return this.currentRound % 3 != 0;
        }
    },
    watch: {
        playerHealth(value){
            if(value <= 0 && this.monsterHealth<=0)
            {
                //draw
                this.winner = 'draw';
            }
            else if(value <= 0)
            {
                //player lost
                this.winner = 'monster';
            }
        },
        monsterHealth(value){
            if(value <= 0 && this.playerHealth<=0)
            {
                //draw
                this.winner = 'draw';
            }
            else if(value <= 0)
            {
                //monster lost
                this.winner = 'player';
            }
        }
    },
    methods: {
        startGame() {
            this.playerHealth = 100;
            this.monsterHealth = 100;
            this.currentRound = 0;
            this.winner = null;
            this.logMessages = [];
        },
        attackMonster() {
            // record number of attacks
            this.currentRound++;
            // random number between 5 and 12
            const attackValue = getRandomValue(5, 12);
            this.monsterHealth -= attackValue;
            this.addLogMessage('player', 'attack', attackValue);
            // NEW - can call other methods from this one.
            this.attackPlayer();
        },
        attackPlayer() {
            // random number between 8 and 15
            const attackValue = getRandomValue(8, 15);
            this.playerHealth -= attackValue;
            this.addLogMessage('monster', 'attack', attackValue);
        },
        specialAttachMonster(){
            // record number of attacks
            this.currentRound++;
            // random number between 10 and 25
            const attackValue = getRandomValue(10, 25);
            this.monsterHealth -= attackValue;
            this.addLogMessage('player', 'special-attack', attackValue);
            this.attackPlayer();
        },
        healPlayer() {
            this.currentRound++;
            const healValue = getRandomValue(5, 20);
            this.playerHealth = Math.min(this.playerHealth+healValue, 100);
            this.addLogMessage('player', 'heal', healValue);
            this.attackPlayer();
        },
        surrender() {
            this.winner = 'monster';
        },
        addLogMessage(who, what, value) {
            this.logMessages.unshift({
                actionBy: who,
                actionType: what,
                actionValue: value
            });
        }
    }
});

app.mount('#game');