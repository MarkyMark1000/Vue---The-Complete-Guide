function getRandomValue(min, max){
    return min + Math.floor(Math.random()*(max-min));
};

const app = Vue.createApp({
    data() {
        return {
            playerHealth: 100,
            monsterHealth: 100,
            currentRound: 0,
        };
    },
    computed: {
        monsterBarStyles() {
            return {
                'width': this.monsterHealth + '%'
            };
        },
        playerBarStyles() {
            return {
                'width': this.playerHealth + '%'
            };
        },
        mayUseSpecialAttack() {
            return this.currentRound % 3 != 0;
        }
    },
    methods: {
        attackMonster() {
            // record number of attacks
            this.currentRound++;
            // random number between 5 and 12
            const attackValue = getRandomValue(5, 12);
            this.monsterHealth -= attackValue;
            // NEW - can call other methods from this one.
            this.attackPlayer();
        },
        attackPlayer() {
            // random number between 8 and 15
            const attackValue = getRandomValue(8, 15);
            this.playerHealth -= attackValue;
        },
        specialAttachMonster(){
            // record number of attacks
            this.currentRound++;
            // random number between 10 and 25
            const attackValue = getRandomValue(10, 25);
            this.monsterHealth -= attackValue;
            this.attackPlayer();
        },
        healPlayer() {
            this.currentRound++;
            const healValue = getRandomValue(5, 20);
            this.playerHealth = Math.min(this.playerHealth+healValue, 100);
            this.attackPlayer();
        }
    }
});

app.mount('#game');