Vue.component('demo-grid', {
  template: '#grid-template',
  props: {
    data: Array,
    columns: Array,
    filterKey: String
  },
  data: function () {
    const sortOrders = {}

    this.columns.forEach(key => {
      sortOrders[key] = 1
    })

    return {
      sortKey: '',
      sortOrders: sortOrders
    }
  },
  filters: {
    capitalize: function (str) {
      return str.charAt(0).toUpperCase() + str.slice(1)
    }
  },
  computed: {
    filteredData: function () {
      const sortKey = this.sortKey
      const filterKey = this.filterKey && this.filterKey.toLowerCase()
      const order = this.sortOrders[sortKey] || 1
      let data = this.data

      data = this.filterData(filterKey, data)
      data = this.sortData(sortKey, data, order)

      return data
    }
  },
  methods: {
    filterData: function (filterKey, data) {
      if (filterKey) {
        return data.filter(row => {
          return Object.keys(row).some(key => {
            return String(row[key]).toLowerCase().indexOf(filterKey) > -1
          })
        })
      }

      return data
    },
    sortData: function (sortKey, data, order) {
      if (sortKey) {
        return data.slice().sort((a, b) => {
          a = a[sortKey]
          b = b[sortKey]

          return (a === b ? 0 : a > b ? 1 : -1) * order
        })
      }

      return data
    },
    sortBy: function (key) {
      this.sortKey = key
      this.sortOrders[key] = this.sortOrders[key] * -1
    }
  }
})

const vm = new Vue({
  el: '#demo',
  data: {
    searchQuery: '',
    gridColumns: ['name', 'power'],
    gridData: [
      { name: 'Chuck Norris', power: Infinity },
      { name: 'Bruce Lee', power: 9000 },
      { name: 'Jackie Chan', power: 7000 },
      { name: 'Jet Li', power: 8000 },
      { name: 'Melo Guo', power: 2333 }
    ]
  }
})
