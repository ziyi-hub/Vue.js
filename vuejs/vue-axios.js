const  myVueApp = Vue.createApp({

    data(){
        return{
            errored : false,
            loading : true,
            info2 : null,
            input : null,
            langs : [
                {
                    name: "en",
                },
                {
                    name: "fr",
                }
            ],
            langselect: null,
        }
    },


    methods : {
        /*monetaire(money){
            return accounting.formatMoney(money, " ", 2, " ", ",")
        },
         */

        setval(){
            this.input = this.$refs.inputmodule.mot;
            this.langselect = this.$refs.inputmodule.selected;
            this.created()
        },



        created(){
            axios.
            get("https://api.dictionaryapi.dev/api/v2/entries/" + this.langselect + "/" + this.input)
                .then(response => {
                    this.info2 = response.data[0].meanings
                })
                .catch(error => {
                    this.errored = true;
                })
                .finally(() => this.loading = false );
        },

    },

    computed : {

    },

})


myVueApp.component('input-mot', {
    props : ['value'],
    template : `
        <div style="background-color:#EEE; padding:20px; margin:10px;">
        <select name="langues" v-model="selected">
            <option v-for="lang in this.$parent.langs">
               {{ lang.name }}
            </option>
        </select>
            <input type="text" v-model="mot" />
            <button v-on:click="$emit('setval')">Ok</button>
        </div>
    `,

    data(){
        return{
            mot : null,
            selected : null,
        }
    }
})



myVueApp.mount("#container")