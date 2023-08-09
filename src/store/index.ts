import { defineStore } from 'pinia'
export const piniaTest = defineStore('piniaTest', {
  state: () => {
    return {
      name:''
    }
  },
  // 也可以定义为
  // state: () => ({ count: 0 })
  actions: {
    changeName(data: any) {
      this.name = data
    }
  }
})
