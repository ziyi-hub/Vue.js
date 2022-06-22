// Composant du fichier composants-vue-gerer-listes.html
// Gère l'affichage de listes


const  myVueApp = Vue.createApp({

    data(){
        return{
            vueStatus : "ok",
            soundLevel : 0,
            newUserMood: ""
        }
    }
    ,
    methods : {
        /**
         * Coup le son
         * @constant : soundLevel
         */
        muteVol(){
            this.soundLevel = 0;
        },

        volfond(){
            this.soundLevel = 3;
        },

        /**
         * Coup le son
         * @constant : newUserMood (String)
         * @constant : soundmodule = reference donnée à l'instance du component dans la partie HTML
         */
        setmood(){
            this.newUserMood = this.$refs.soundmodule.userMood;
        }


    },

    computed : {

    }
})

//ATTENTION: les noms des composants doivent etre ecrits en miniscule uniquement,
// seul lle tirerest possible.
myVueApp.component('soundicon', {
    props : ['level'],
    template : `
        <div style="background-color:#EEE; padding:20px; margin:10px;">
            <h5>Catte partie partie sur fond gris est gérée par le composaant soundicon</h5>
            <p style="font-size:5em; ">
                {{ soundEmojis[level] }}
            </p>
            <button v-on:click="$emit('volcoupe')">Mute</button>&nbsp;
            <button v-on:click="$emit('volfond')">Volume à fond</button><br>
            
            <label>Votre humeur : </label>
            <input type="text" v-model="userMood" />
            <button v-on:click="$emit('newmood')">Ok</button>
        </div>
    
    `,

    data(){
        return{
            soundEmojis: ['🔇', '🔈', '🔉', '🔊'],
            userMood : ""
        }
    }

})


myVueApp.mount("#container")