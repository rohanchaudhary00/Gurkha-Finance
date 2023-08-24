export const state = () => ({
  login:false
})

export const mutations = {
    setLogin(state,payload){
        state.login=payload
    } 

}