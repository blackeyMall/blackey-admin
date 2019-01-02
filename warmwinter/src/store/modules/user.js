export default {
  namespaced: true,
  state: {
    id: 0,
    name: '',
    roleType: ''
  },
  mutations: {
    updateId (state, id) {
      state.id = id
    },
    updateName (state, name) {
      state.name = name
    },
    updateRoleType (state, roleType) {
      state.roleType = roleType
    }
  }
}
