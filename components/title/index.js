Component({
  properties: {
    topTitle: {
      type: String

    },
    bomTitle: {
      type: String
    }
  },
  data: {

  },
  methods: {
    routeMine() {
      wx.switchTab({
        url: '/pages/mine/mine'
      })
    },
  }
})
