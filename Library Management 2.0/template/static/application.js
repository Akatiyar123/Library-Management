import router from './router.js'
import Navbar from './components/Navbar.js'
import store from './store.js'

router.beforeEach((to, from, next) => {
    if (to.name !== 'Login' && to.name !== 'Signup' && to.name !== 'Home' && !localStorage.getItem('auth-token')?true:false)
        next({ name: 'Login' })
    else next()
})

new Vue({
    el: '#app',
    template: `<div>
    <Navbar />
    <div v-if="showMessage" class="alert alert-success alert-dismissible fade show m-3" role="alert">
            {{ flashMessage }}
            <button type="button" class="close" data-dismiss="alert" aria-label="Close" @click="closeMessage">
            <span aria-hidden="true">&times;</span>
            </button>
            </div>
    <router-view />
    </div>`,
    router,
    store,
    components: {
        Navbar,
    },
    computed: {
        showMessage() {
          return this.$store.state.showMessage;
        },
        flashMessage() {
          return this.$store.state.message;
        },
    },

    mounted(){
        this.$store.dispatch('get_logged_user')
    },

    methods:{
        closeMessage(){
            this.$store.commit('set_message_visibility', false)
        }
    }
})