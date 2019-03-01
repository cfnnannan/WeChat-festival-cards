Component({
  properties: {
    winList: {
      type: Array,
      observer(newVal, oldVal) {
        this.setData({
          list: newVal
        })
      }
    }
  },
  data: {
    list: []
  },
  methods: {

  }
})
