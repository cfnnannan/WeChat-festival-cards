// components/part-list/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    headImgList: {
      type: Array,
      observer(newVal, oldVal) {
        this.setData({
          list: newVal
        })
      }
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    list: []
  },
  attached() {

  },

  /**
   * 组件的方法列表
   */
  methods: {

  }
})
