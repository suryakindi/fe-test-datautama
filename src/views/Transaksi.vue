<script>
import baseApi from '../baseApi';
export default {
    async created() {
        const token = localStorage.getItem('token');
        try {
            const res = await baseApi.get('data/list-transactions', {
                headers: {
                    Authorization: 'Bearer ' + token,
                }
            });
            console.log(res);
            $('#myTable').DataTable({
                data: res.data.data,
                columns: [
                    { data: null, render: (data, type, row, meta) => meta.row + 1 },
                    { data: 'reference_no' },
                    { data: 'price' },
                    { data: 'payment_amount' },
                    { data: 'product_id' },
                ],
                columnDefs: [
                    { targets: 0, width: '30px' }
                ],
            })
        } catch (err) {
            console.log(err);
        }
    },
    methods: {
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
    },
    mounted() {
    },
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
            <div class="page-header">
              <h3 class="page-title"> Data Tables </h3>
              <nav aria-label="breadcrumb">
                
              </nav>
            </div>
            <div class="row">             
              <div class="col-lg-12 grid-margin stretch-card">
                <div class="card">
                  <div class="card-body">
                    
                    <h4 class="card-title">Transaksi Table</h4><br>
                   
                    <table id="myTable" class="table table-bordered">
                      <thead>
                        <tr>
                          <th> # </th>
                          <th> Reference No </th>
                          <th> Price </th>
                          <th> Payment Amount </th>
                          <th> Product ID </th>
                        </tr>
                      </thead>
                    </table>
                  </div>
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
</template>
