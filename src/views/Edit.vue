<script>
import baseApi from '../baseApi';
export default {
    data() {
        return {
            name: '',
            price: 0,
            stock: 0,
            description: ''
        };
    },
    async created() {
        const id = this.$route.params.id;
        const token = localStorage.getItem('token');
        try {
            const res = await baseApi.get('data/product/edit/' + id, {
                headers: {
                    Authorization: 'Bearer ' + token,
                }
            });
            this.name = res.data.data.name;
            this.price = res.data.data.price;
            this.stock = res.data.data.stock;
            this.description = res.data.data.description;
        } catch (err) {
            console.log(err);
        }
    },
    methods: {
        async productSave() {
            const id = this.$route.params.id;
            const token = localStorage.getItem('token');
            try {
                const res = await baseApi.post('data/product/edit/' + id, {
                    name: this.name,
                    price: this.price,
                    stock: this.stock,
                    description: this.description
                }, {
                    headers: {
                        Authorization: 'Bearer ' + token,
                    }
                });
                alert(res.data.message);
                this.$router.push('/produk');
            } catch (err) {
                console.log(err);
            }
        },
        async logout() {
            const token = localStorage.getItem('token');
            try {
                const res = await baseApi.get('session/logout', {
                    headers: {
                        Authorization: 'Bearer ' + token,
                    }
                });
                this.$router.push('/login');
            } catch (err) {
                console.log(err);
            }
        }
    }
}
</script>

<template>
    <div class="container-scroller">
      <!-- partial:/partials/_navbar.html -->
      <nav class="navbar default-layout-navbar col-lg-12 col-12 p-0 fixed-top d-flex flex-row">
        <div class="text-center navbar-brand-wrapper d-flex align-items-center justify-content-center">
          <a class="navbar-brand brand-logo" href="#">Dashboard Admin</a>
          <a class="navbar-brand brand-logo-mini" href="#">Dashboard Admin</a>
        </div>
        <div class="navbar-menu-wrapper d-flex align-items-stretch">
          <button class="navbar-toggler navbar-toggler align-self-center" type="button" data-toggle="minimize">
            <span class="mdi mdi-menu"></span>
          </button>
          
          <ul class="navbar-nav navbar-nav-right">
            
            
            
            
            <li class="nav-item nav-logout d-none d-lg-block">
              <a @click="logout" class="nav-link" href="#">
                <i class="mdi mdi-power"></i>
              </a>
            </li>
           
          </ul>
          <button class="navbar-toggler navbar-toggler-right d-lg-none align-self-center" type="button" data-toggle="offcanvas">
            <span class="mdi mdi-menu"></span>
          </button>
        </div>
      </nav>
      <!-- partial -->
      <div class="container-fluid page-body-wrapper">
        <!-- partial:/partials/_sidebar.html -->
        <nav class="sidebar sidebar-offcanvas" id="sidebar">
          <ul class="nav">
         <br> 
            <li class="nav-item sidebar-actions">
              <span class="nav-link">
                <div class="border-bottom">
                </div>
                <div class="mt-4">
                  <div class="border-bottom">
                    <p class="text-secondary">Menu</p>
                  </div>
                  <ul class="gradient-bullet-list mt-4">
                   <a href="/produk" style="text-decoration: none; color: black;"> <li>Product</li></a>
                   <a href="/transaksi" style="text-decoration: none; color: black;"> <li>Transaksi</li></a>
                  </ul>
                </div>
              </span>
            </li>
          </ul>
        </nav>
        <!-- partial -->
        <div class="main-panel">
          <div class="content-wrapper">
           
            <div class="row">             
                <div class="col-12 grid-margin stretch-card">
                    <div class="card">
                      <div class="card-body">
                        <h4 class="card-title">Edit Product</h4>
                        
                        <form class="forms-sample">
                          <div class="form-group">
                            <label for="exampleInputName1">Name Product</label>
                            <input v-model="name" type="text" class="form-control" id="exampleInputName1" placeholder="Name">
                          </div>
                          <div class="form-group">
                            <label for="price">Price</label>
                            <input v-model="price" type="text" class="form-control" id="price" placeholder="Price">
                          </div>
                          <div class="form-group">
                            <label for="stock">Stock Product</label>
                            <input v-model="stock" type="text" class="form-control" id="stock" placeholder="Stock">
                          </div>
                         
                          
                         
                          <div class="form-group">
                            <label for="Deskripsi">Deskripsi</label>
                            <textarea v-model="description" class="form-control" id="Deskripsi" rows="4"></textarea>
                          </div>
                          <button @click="productSave" type="button" class="btn btn-gradient-primary me-2">Edit</button>
                          
                        </form>
                      </div>
                    </div>
                  </div>
            </div>
          <!-- content-wrapper ends -->
          <!-- partial:/partials/_footer.html -->
          <footer class="footer">
            <div class="container-fluid d-flex justify-content-between">
              
            </div>
          </footer>
          <!-- partial -->
        </div>
        <!-- main-panel ends -->
      </div>
      <!-- page-body-wrapper ends -->
    </div>
    </div>
</template>