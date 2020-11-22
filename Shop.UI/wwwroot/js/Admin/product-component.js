Vue.component('product-manager', {
    template:`<div v-if="!editing">
                <button class="button is-success" @click="newProduct">Add New Produt</button>
                <table class="table">
                    <tr>
                        <th>Id</th>
                        <th>Product</th>
                        <th>Description</th>
                        <th>Value</th>
                        <th>Edit Function</th>
                        <th>Delete Function</th>
                    </tr>
                    <tr v-for="(product, index) in products">
                        <td>{{product.id}}</td>
                        <td>{{product.name}}</td>
                        <td>{{product.description}}</td>
                        <td>{{product.value}}</td>
                        <td><button class="button is-warning" @click="editProduct(product, index)">Edit</button></td>
                        <td><button class="button is-danger" @click="deleteProduct(product.id, index)">Remove</button></td>
                    </tr>
                </table>
            </div>

            <div v-else>
                <div class="field">
                    <label class="label">Product Name</label>
                    <div class="control">
                        <input class="input" v-model="productModel.name" />
                    </div>
                </div>

                <div class="field">
                    <label class="label">Product Description</label>
                    <div class="control">
                        <input class="input" v-model="productModel.description" />
                    </div>
                </div>

                <div class="field">
                    <label class="label">Product Value</label>
                    <div class="control">
                        <input class="input" v-model.number="productModel.value" />
                    </div>
                </div>

                <button class="button is-success" @click="createProduct" v-if="!productModel.id">Create Product</button>

                <button class="button is-warning" @click="updateProduct" v-else>Update Product</button>

                <button class="button" @click="cancel" >Cancel</button>

            </div>`,
    data() {
        return {
            editing: false,
            id: 0,
            loading: false,
            objectIndex: 0,
            productModel: {
                name: "Product Name",
                description: "Product Description",
                value: 1.99
            },
            products: [],

            }

        
    },
    mounted() {
        this.getProducts();
    },
       
    methods: {


        

        deleteProduct(id, index) {
            this.loading = true;
            axios.delete('/Admin/product/' + id)
                .then(response => {
                    console.log(res);
                    this.product.splice(index, 1)
                })

                .catch(err => {
                    console.log(err);

                })
                .then(() => {
                    this.loading = false;
                })
        },

        getProduct(id) {
            this.loading = true;
            axios.get('/Admin/product/' + id)
                .then(response => {
                    this.products = response.data;
                    console.log(this.products);
                })

                .catch(err => {
                    console.log(err);

                })
                .then(() => {
                    this.loading = false;
                })
        },

        getProducts() {
            this.loading = true;
            axios.get('/Admin/products')
                .then(response => {
                    this.products = response.data;
                    console.log(this.products);
                })

                .catch(err => {
                    console.log(err);

                })
                .then(() => {
                    this.loading = false;
                })
        },

        createProduct() {
            this.loading = true;
            axios.post('/Admin/products/', this.productModel)
                .then(res => {
                    console.log(res.data);
                    this.products.push(res.data)
                })
                .catch(err => {
                    console.log(err);

                })
                .then(() => {
                    this.loading = false;
                })
        },

        editProduct(product) {
            this.productModel = {
                id: product.id,
                name: product.name,
                description: product.description,
                value: product.value,
            }
        },

        updateProduct() {
            this.loading = true;
            axios.put('/Admin/productup/', this.productModel)
                .then(res => {
                    console.log(res.data);
                    this.products.splice(this.objectIndex, 1, res.data);
                })
                .catch(err => {
                    console.log(err);

                })
                .then(() => {
                    this.loading = false;
                    this.editing = false;
                });
        }, newProduct() {
            this.editing = true;
            this.productModel.id = 0;
        },
        editProduct(product, index) {
            this.objectIndex = index;
            this.productModel = {
                id: product.id,
                name: product.name,
                description: product.description,
                value: product.value,

            }
            this.editing = true;
        },
        cancel() {
            this.editing = false;
        },

        //deleteProduct
    },

    computed: {

    }
});