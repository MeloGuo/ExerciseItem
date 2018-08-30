const markdown = new Vue({
  el: '#editor',
  data: {
    input: '# hello world'
  },
  methods: {
    update: _.debounce(function (event) {
      this.input = event.target.value
    }, 300)
  },
  computed: {
    compiledHtml: function () {
      return marked(this.input)
    }
  }
})