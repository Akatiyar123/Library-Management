const home = Vue.component('home' , {

template:
`


<div> 

<h1> Welcome to Library Manangement </h1>
<h3>  Please Login or Signup<h3>



<button @click="login" type="button" class="btn btn-info">Login</button>
<button @click="signup" type="button" class="btn btn-info">SignUp</button>



</div>




`,
methods:{


    login() {
        // Implement view book functionality
        this.$router.push({ path: `/login` })
      },

      signup() {
        // Implement view book functionality
        this.$router.push({ path: `/signup` })
      }


}










})
export default home;