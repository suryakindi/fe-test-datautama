<script>
import baseApi from '../baseApi';
export default {
    data() {
        return {};
    },
    methods: {
        async register() {
            try {
                const res = await baseApi.post('auth/register', {
                    name: this.name,
                    email: this.email,
                    password: this.password
                });
                alert(res.data.message);
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
        <div class="row mb-3">
            <div class="col">
                <span class="h3">Register</span>
            </div>
        </div>
        <div class="row">
            <div class="col">
                <div class="mb-3">
                    <div class="form-floating mb-3">
                        <input v-model="name" type="text" class="form-control" id="floatingName">
                        <label for="floatingName">Name</label>
                    </div>
                    <div class="form-floating mb-3">
                        <input v-model="email" type="email" class="form-control" id="floatingEmail">
                        <label for="floatingEmail">Email address</label>
                    </div>
                    <div class="form-floating mb-3">
                        <input v-model="password" type="password" class="form-control" id="floatingPassword">
                        <label for="floatingPassword">Password</label>
                    </div>
                </div>
                <button type="button" class="btn btn-primary" id="register" @click="register">Register</button>
            </div>
        </div>
    </div>
</template>