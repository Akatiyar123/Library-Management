import router from "../router.js"
const Login = Vue.component('login', {
    template:
        `
    <div class="container-fluid mt-5">
        <div class="row justify-content-center">
            <div class="col-4 justify-content-center shadow-lg rounded">
                <h3 class='text-center display-6 m-4'>Login</h3>
                <div class='row justify-content-center'>
                <form method="POST" class='col-9'>
                    
                    <div class="form-group">
                        <label for="email" class="form-label">Email Id: </label>
                        <input type="text" v-model="email" class="form-control" id="email" >
                    </div>
                    <div class="form-group">
                        <label for="password" class='form-label'>Password: </label>
                        <input type="password" v-model="password" id="password"  class='form-control'>
                    </div>
                    <div class="row justify-content-center me-5 ms-5 mt-3">
                        <button type="button" class="button btn btn-primary m-2" @click='login' >Login</button>
                    </div>
                    <div class="row justify-content-center">
                        <p class='text-center m-2'>OR</p>
                    </div>
                    <div class="row justify-content-center me-5 ms-5 mb-3">
                        <button type="button" class="button btn btn-secondary m-2" @click='signup' >SignUp</button>                        
                    </div>
                </form>
                </div>
            </div>
        </div>
    </div>
    `,
    data: function(){
        return {
            email:null,
            password:null
        }
    },
    methods:{
        signup: function(){
            this.$router.push({ path: '/signup' })
        },

        login: async function(){
            let login_success = false
            if (this.isValidEmail && this.isValidPassword){
                let user = {
                    email:this.email,
                    password:this.password
                }
                login_success = await this.$store.dispatch('login', user)
                console.log(login_success)

            }
            else{
                this.$store.dispatch('flash_message', 'Invalid Credentials')
            }
            if (login_success) {
                if (this.$store.state.logged_user.roles[0] === 'admin'){
                    this.$router.push({ path: '/admin' })
                }
                else if (this.$store.state.logged_user.roles[0] === 'user'){
                    this.$router.push({ path: '/user' })
                }
               
            }
        }
    },
    computed:{
        isValidEmail(){
            if (!this.email || !(this.email.includes('@'))){
                return false
            }
            return true;
        },

        isValidPassword(){
            if (!this.password ){
                return false
            }
            return true;
        },
    }
})
export default Login;