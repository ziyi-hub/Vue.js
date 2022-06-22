const MyVueApp = Vue.createApp({

    data(){
        return{
            products : [
                {
                    productName: "Pommes bicolores 1kg",
                    price: 1.56,
                    quantity: 1,
                    soustotal : 0,
                    lien : "https://media.auchan.fr/MEDIASTEP102088922_230x230/B2CD/ 230w"
                },
                {
                    productName: "Poires William bio 1kg",
                    price: 1.45,
                    quantity: 3,
                    soustotal : 0,
                    lien : "https://media.auchan.fr/MEDIASTEP102088926_230x230/B2CD/ 230w"
                },
                {
                    productName: "Kiwi 1 pièce",
                    price: 0.99,
                    quantity: 5,
                    soustotal : 0,
                    lien : "https://media.auchan.fr/MEDIASTEP66817594_230x230/B2CD/ 230w"
                },
                {
                    productName: "Brocoli 500g",
                    price: 1.01,
                    quantity: 5,
                    soustotal : 0,
                    lien : "https://media.auchan.fr/MEDIASTEP146997015_230x230/B2CD/ 230w"
                }
            ],
        }
    },

})


MyVueApp.component('product-list', {
    template:`
		<div>	
            <table class="table table-striped table-white">
                <thead class="bg-primary text-white">
                    <tr class="text-center" style="font-size:1.5em;">
                        <th>ProductName</th>
                        <th>Prix unitaire</th>
                        <th>Quantity</th>
                        <th>Subtotal</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(product, index) in this.$parent.products" class="text-center" style="font-size: 1.5em;">
                        <td class="align-middle">
                        <img v-bind:src="product.lien">
                            <p style="margin: 0;">{{product.productName}}</p>
                        </td>
                        <td class="align-middle">{{product.price}} €</td>
                        <td class="align-middle"><input type="number" min="0" max="50" v-model="product.quantity"></td>
                        <td class="align-middle">{{monetaire(product.soustotal = product.price * product.quantity)}}  €</td>
                        <td class="align-middle">
                            <button type="button" class="btn btn-outline-danger" v-on:click="deleteProduct(index)">
                                <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
                                  <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"></path>
                                  <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"></path>
                                </svg>
                            </button>
                        </td>
                    </tr>
                </tbody>
            </table>
            <table class="table table-striped text-right" style="font-size:2em;">
                <thead>
                    <tr>
                        <th>Total</th>
                    </tr>
                </thead>
                <tbody>
                    <tr><td>{{ monetaire(calculer) }}  €</td></tr>
                </tbody>
            </table>
		</div>
	`,

    methods : {
        /**
         * Suppression product dans reference donnée
         * @param product
         */
        deleteProduct(product){
            this.$parent.products.splice(product, 1)
        },

        /**
         * Convertir format
         * @param money
         * @return {*}
         */
        monetaire(money){
            return accounting.formatMoney(money, " ", 2, " ", ",")
        },

    },

    computed : {
        /**
         * Calcule le sous-total
         * @constant : products = reference donnée du component principal
         * @return {number} = sous-total
         */
        calculer(){
            let total = 0
            this.$parent.products.forEach(val => {
                total += val.soustotal
            })
            return total
        },
    }


});




MyVueApp.mount('#container');