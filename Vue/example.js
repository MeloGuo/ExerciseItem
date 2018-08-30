Vue.component('button-counter', {
  data: function () {
    return {
      count: 0
    }
  },
  template: '<button v-on:click="count++">{{ count }}</button>'
})

const vm = new Vue({
  el: '#computed',
  data: {
    message: 'current message',
    items: [
      { message: 'Foo' },
      { message: 'Bar' }
    ]
  },
  computed: {
    reversedMessage: function () {
      return this.message.split('').reverse().join('')
    }
  }
})