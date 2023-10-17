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
                    
                    <h4 class="card-title">Product Table</h4><br>
                    <a href="/tambah" class="btn btn-success mb-2">Tambah Data Product</a>
                    <table id="myTable" class="table table-bordered">
                      <thead>
                        <tr>
                          <th> # </th>
                          <th> Name </th>
                          <th> Price </th>
                          <th> Stock </th>
                          <th> Description </th>
                          <th> Aksi </th>
                        </tr>
                      </thead>
                      <!-- <tbody>
                        
                        <tr>
                          <td> 7 </td>
                          <td> Henry Tom </td>
                          <td>
                            10000
                          </td>
                          <td> 10 </td>
                          <td> June 16, 2015 </td>
                          <td> 
                            <a href="/product/edit/{id}"><button class="btn btn-warning mx-1">Edit</button></a>
                            <a href="/product/hapus/{id}"> <button class="btn btn-danger mx-1">Hapus</button></a>

                          </td>
                        </tr>
                      </tbody> -->
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

<script>
import baseApi from '../baseApi';
export default {
    async created() {
        const token = localStorage.getItem('token');
        try {
            const res = await baseApi.get('data/product', {
                headers: {
                    Authorization: 'Bearer ' + token,
                }
            });
            $('#myTable').DataTable({
                data: res.data.data,
                columns: [
                    { data: null, render: (data, type, row, meta) => meta.row + 1 },
                    { data: 'name' },
                    { data: 'price' },
                    { data: 'stock' },
                    { data: 'description' },
                    { data: null, render: (data, type, row, meta) => `<a href="/${data.id}"><button class="btn btn-warning mx-1">Edit</button></a><button data-id="${data.id}" class="action-delete btn btn-danger mx-1">Hapus</button>` }
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
        async productDelete({id = 0} = {}) {
            const token = localStorage.getItem('token');
            try {
                const res = await baseApi.get('data/product/delete/' + id, {
                    headers: {
                        Authorization: 'Bearer ' + token,
                    }
                });
                alert(res.data.message);
                window.location.reload();
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
    },
    mounted() {
        $(document).on('click', '.action-delete', (e) => {
            const id = $(e.currentTarget).attr('data-id');
            this.productDelete({id});
        });
    },
}
</script>