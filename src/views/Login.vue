<script>
import baseApi from '../baseApi';
export default {
    data() {
        return {
            email: '',
            password: ''
        };
    },
    methods: {
        async login() {
            try {
                const res = await baseApi.post('auth/login', {
                    email: this.email,
                    password: this.password
                });
                localStorage.setItem('token', res.data.token);
				this.$router.push('/login');
            } catch (err) {
                console.log(err);
            }
        }
    }
}
</script>

<template>
    <div class="container">
        <section class="ftco-section">
		<div class="container">
			<div class="row justify-content-center">
				<div class="col-md-6 text-center mb-5">
					<!-- <h2 class="heading-section">Login #01</h2> -->
				</div>
			</div>
			<div class="row justify-content-center">
				<div class="col-md-7 col-lg-5">
					<div class="login-wrap p-4 p-md-5">
		      	<div class="icon d-flex align-items-center justify-content-center">
		      		<span class="fa fa-user-o"></span>
		      	</div>
		      	<h3 class="text-center mb-4">Login</h3>
						<form action="#" class="login-form">
		      		<div class="form-group">
		      			<input v-model="email" type="text" class="form-control rounded-left" placeholder="Email" required>
		      		</div>
	            <div class="form-group d-flex">
	              <input v-model="password" type="password" class="form-control rounded-left" placeholder="Password" required>
	            </div>
	            <div class="form-group">
	            	<button @click="login" type="button" class="form-control btn btn-primary rounded submit px-3">Login</button>
	            </div>
	            <div class="form-group d-md-flex">
	            	<div class="w-50"></div>
								<div class="w-50 text-md-right">
									<a href="/register">Register</a>
								</div>
	            </div>
	          </form>
	        </div>
				</div>
			</div>
		</div>
	</section>
    </div>
</template>

