const store = new Vuex.Store({
    state:{
        logged_user :{
            username: '', 
            roles: [],
        },
        showMessage: false,
        message: '',
    },

    mutations:{
        set_logged_user(state, user){
            state.logged_user = user
        },

        logout(state){
            state.logged_user = {
                username: '',
                roles: [],
            }
        },
        set_message(state, message){
            state.message = message
        },
        set_message_visibility(state, visibility){
            state.showMessage = visibility
        }
    },

    actions:{

        flash_message({commit}, message){
            commit('set_message', message)
            commit('set_message_visibility', true)

            setTimeout(()=>{
                commit('set_message_visibility', false)
            }, 5000)
        },
        
        get_logged_user({ commit }){
            localStorage.getItem('logged_user')?commit('set_logged_user', JSON.parse(localStorage.getItem('logged_user'))):''
        },

        async login({ commit, dispatch }, user){
            try{
                const res = await fetch('http://127.0.0.1:5000/api/login',{
                    method:'POST',
                    headers:{
                        'Content-Type':'application/json',
                        'Access-Control-Allow-Origin': '*'
                    },
                    body:JSON.stringify(user)
                })
                if (!res.ok) {
                    const error_data = await res.json()
                    dispatch('flash_message', error_data.message)
                    return false
                }
                else{
                    const data = await res.json()
                    let user_credentials = {
                        username:"",
                        roles:[]
                    }
                    localStorage.setItem('auth-token', data.user.token)
                    user_credentials.username = data.user.username
                    user_credentials.roles = data.user.roles
                    commit('set_logged_user', user_credentials)
                    localStorage.setItem('logged_user', JSON.stringify(user_credentials))
                    dispatch('flash_message', data.message)
                    return true
                }

            }catch(error){
                console.log(error)
                return false
            }
        },

        async logout({ commit, dispatch }){
            try{
                const response = await fetch('http://127.0.0.1:5000/api/logout',{
                    method:'POST',
                    headers:{
                        'Content-Type':'application/json',
                        'Access-Control-Allow-Origin': '*',
                        'Authentication-Token': localStorage.getItem('auth-token')
                    },
                })
                if (!response.ok) {
                    const error_data = await res.json()
                    dispatch('flash_message', error_data.message)
                }
                else{
                    const data = await response.json()
                    localStorage.removeItem('auth-token')
                    localStorage.removeItem('logged_user')
                    commit('logout')
                    dispatch('flash_message', data.message)
                }

            }catch(error){
                console.log(error)
            }
        },
        
    }
})

export default store