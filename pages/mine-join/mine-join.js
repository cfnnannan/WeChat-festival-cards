import HomeListModel from "../../models/home-list.js";
import storageUtils from '../../utils/storage.js'
let homeListModel = new HomeListModel()
Page({
  data: {
    detailsList: [],
    isEndList: [],
    fromHome: "home"
  },
  onLoad() {
    this.getHomeList()
  },
  onShow: function () {
    this.getIsEndList()
  },
  getIsEndList() {
    homeListModel.homeList("2", storageUtils.getStorage('token_str'), (res) => {
      let list = res.retData.hospitalActivityList
      let _list = []
      list.forEach((value) => {
        let isEnd = value.isEnd;
        _list.push(isEnd)
      })
      this.setData({
        isEndList: _list
      })
    })
  },
  getHomeList() {
    homeListModel.homeList("2", storageUtils.getStorage('token_str'), (res) => {
      this.setData({
        detailsList: res.retData.hospitalActivityList
      })
    })
  },
  getDetailFn(e) {
    let activityId = e.currentTarget.dataset.activityid;
    wx.navigateTo({
      url: `/pages/details/details?activityId=${encodeURIComponent(activityId)}`,
    })
  }
})