// Composants du fichier exo7-components.html

const MyVueApp = Vue.createApp ({

    data() {
        return {
            vueStatus: "Ok"
        }
    }
})




MyVueApp.component('mylist', {
    props: ['finished', 'priorite'],

    template:`
		<p v-bind:style=" finished === 'false' ? 'text-decoration:line-through' : '' "> 
		- <slot></slot> 
		<span style="color:gray"> | priorité : {{ priorite }} </span>
		<br> </p>
	`
});


MyVueApp.component('taskProduct', {
    template : `
		<li style="color:green; list-style-type:square;"> <slot></slot> </li>
	`
});

MyVueApp.component('task-list', {
    template:`
		<div>
			<ul>
				<taskProduct v-for="product in products">
				    {{ product.nom }} -- {{ product.prix }}  €
				</taskProduct>
			</ul>	
		</div>
	`,

    data() {
        return {
            products : [
                {
                    "id": 1,
                    "nom": "Boîtier de pédalier TANGE",
                    "photo": "https://tools.sopress.net/iut/panier/images/tange-bottom-bracket-68-103.jpg",
                    "description": "Super léger, le top du boîtier",
                    "prix": 45.56
                },
                {
                    "id": 2,
                    "nom": "Pédalier SHIMANO",
                    "photo": "https://tools.sopress.net/iut/panier/images/shimanopedalierxtfcm785noir.jpg",
                    "description": "46 dents",
                    "prix": 75.45
                },
                {
                    "id": 3,
                    "nom": "Tige de selle BLB TRACK",
                    "photo": "https://tools.sopress.net/iut/panier/images/tige-de-selle-blb-track-os.jpg",
                    "description": "avec intégration de LED lumineuses",
                    "prix": 110.99
                }

            ],
        }
    }

});

MyVueApp.mount('#container');