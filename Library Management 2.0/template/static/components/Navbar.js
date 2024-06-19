export default{
    template: `<nav class="navbar navbar-expand-lg bg-body-tertiary">
    <div class="container-fluid">
      <a class="navbar-brand" href="#">Library Management</a>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav">
          
          <li class="nav-item" v-if='is_login'>
          
          
                        <button class="btn btn-secondary" @click='logout' >Logout</button>
                    </li>
        </ul>
      </div>
    </div>
  </nav>`,
  data(){
      return{
          role: localStorage.getItem('role'),
      }
  },
  computed:{
      is_login(){
        if (this.$store.state.logged_user.username){
          return true
        }
        else{
          return false
        }
      },
  },
  methods:{
    logout(){
      this.$store.dispatch('logout')
      this.$router.push({ path: '/login' })
  }
  }
}