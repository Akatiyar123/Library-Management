// import Home from './components/Home.js'
import Login from './components/login.js'
import Signup from './components/signup.js'
import Dashboard from './components/user_dash.js'
import BookPage from './components/book_detail.js'
import LibrarianDashboard from './components/lib_dash.js'
import ManageBook from './components/manage_book.js'
import admin from './components/AdminHome.js'
import UserHome from './components/UserHome.js'
import home from './components/home.js'

const routes = [
    {path: '/', component: home, name: 'Home'},
    {path: '/login', component: Login, name: 'Login'},
    {path :'/signup' , component:Signup , name : 'Signup'},
    {path:'/dashboard/:bookId(\\d+)' , component : Dashboard , name : 'Dashboard', props : true},
    {path: '/book_page', component: BookPage , name: 'BookPage'},
    {path:'/lib_dash' , component:LibrarianDashboard , name : 'LibrarianDashboard'},
    {path:'/manage_book' , component : ManageBook , name : 'ManageBook'},
    {path: '/admin' , component:admin , name : 'Admin'},
    {path: '/user' , component: UserHome , name: 'User'},

]

export default new VueRouter({
    routes,
})