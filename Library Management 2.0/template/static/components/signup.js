const Signup = Vue.component('signup',{
    template:
        `
        <div class="container-fluid mt-5">
            <div class="row justify-content-center" v-if='!success'>
                <div class="col-6 justify-content-center shadow-lg rounded">
                    <h3 class='text-center display-6 m-4'>Register</h3>
                    <div class='row justify-content-center'>
                    <form method="POST" class='col-11'>
                        
                        <div class="form-group m-1">
                            <label for="username" class="form-label">Username: </label>
                            <span class="text-danger">*</span>
                            <input type="text" v-model="username" class="form-control" id="username" >
                        </div>
                        <div class="form-group m-1">
                            <label for="email" class="form-label">Email Id: </label>
                            <span class="text-danger">*</span>
                            <input type="text" v-model="email" class="form-control" id="email" >
                        </div>
                        <div class="form-group m-1">
                            <div class="row justify-content-center"> 
                                <div class="col-6">
                                    <label for="password" class='form-label'>Password: </label>
                                    <span class="text-danger">*</span>
                                    <input type="password" v-model="password" id="password"  class='form-control'>
                                </div>
                                <div class="col-6">
                                    <label for="re_password" class='form-label'>Confirm Password: </label>
                                    <span class="text-danger">*</span>
                                    <input type="password" v-model="re_password" id="re_password"  class='form-control'>
                                </div>
                            </div>                            
                        </div>
                       
                        <div class="row justify-content-center m-5 ">
                            <button type="button" class="button btn btn-primary m-2" @click='signup' >Sign Up</button>
                        </div>
                    </form>
                    </div>
                </div>
            </div>
            <div class="row justify-content-center" v-if='success'>
                <div class="col-4 justify-content-center shadow-lg rounded">
                    <h3 class='text-center display-6 m-4'>Register</h3>
                    <div class='row justify-content-center'> 
                        <p v-if='success' class="text-center text-success"> Registration Successful</p>
                        <div class="row justify-content-center me-5 ms-5 mb-3">
                            <router-link to='/login' class="button btn btn-secondary m-2" >Login</router-link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        `,
    data: function(){
        return {
            email:null,
            password:null,
            re_password:null,
            username:null,
            selectedRole:null,
            comfirm_password:true,
            success:false,
        }
    },
    methods:{
        passwordCheck: function(){
            if (this.password === this.re_password){
                return true
            } 
            return false
        },

        signup: async function(){
            this.errors = [];
            let confirmPassword = this.passwordCheck()
            if (!this.isValidEmail){
                this.$store.dispatch('flash_message','Invalid Email. Email Should contain "@" symbol')
            }
            if (!this.isValidUsername){
                this.$store.dispatch('flash_message','Invalid Username. Username should be atleast 5 digit long')
            }
            if (!this.isValidPassword){
                this.$store.dispatch('flash_message','Invalid Password. Password should be atleast 8 digit long')
            }
            if(!confirmPassword){
                this.$store.dispatch('flash_message','The password and confirm password fields must match. Please check your entries and try again.')
            }
            // if (!this.selectedRole){
            //     this.$store.dispatch('flash_message','Please select a role')
            // }
            if (this.isValidEmail && this.isValidPassword && this.isValidUsername && confirmPassword){
                try{
                    let response = await fetch("/api/register",{
                        method:'POST',
                        headers:{
                            'Content-Type':'application/json'
                            
                        },
                        body:JSON.stringify({
                            "username":this.username,
                            "email":this.email,
                            "password":this.password,
                            'role':this.selectedRole
                        })
                    })
                    if (!response.ok){
                        let data = await response.json()
                        this.$store.dispatch('flash_message', data.message)
                    }
                    else{
                        let data = await response.json()
                        this.$store.dispatch('flash_message', data.message)
                        this.success = true
                    }

                }catch(e){
                    console.log(e)
                }
            }
        },
    },
    computed:{
        isValidUsername: function(){
            if (!this.username || this.username.length < 5){
                return false
            }
            return true;
        },        
        isValidEmail: function(){
            if (!this.email || !(this.email.includes('@'))){
                return false
            }
            return true;
        },
        isValidPassword: function(){
            if ( !this.password || this.password.length < 8){
                return false
            }
            return true;
        },
    }
})
export default Signup;