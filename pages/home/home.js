import storageUtils from '../../utils/storage.js'
import HomeListModel from "../../models/home-list.js";
import LoginModel from '../../models/login.js'
let homeListModel = new HomeListModel()
let userLoginModel = new LoginModel()
Page({
  data: {
    homeList: [],
    partIdList: [],
    fromHome: "home"
  },
  onLoad() {
    this._getToken(0)
  },
  onShow : function () {
    this._getToken(1)
  },
  _getToken(num) {
    let token = storageUtils.getStorage('token_str')
    if (token != 'token_str' || token != undefined) {
      userLoginModel.getLogin((res) => {
        storageUtils.setStorage('token_str', res.retData.tokenstr, 21 * 3600);
        if (num==0) {
          this.getHomeList()
        } else {
          this.getParticipationId()
        }
      });
    } else {
      if (num == 1) {
        this.getHomeList()
      } else {
        this.getParticipationId()
      }
    }
  },
  getParticipationId() {
    homeListModel.homeList("1", storageUtils.getStorage('token_str'), (res) => {
      let list = res.retData.hospitalActivityList
      let _list = []
      list.forEach((value)=>{
        let partId = value.participationId;
        _list.push(partId)
      })
      this.setData({
        partIdList: _list
      })
    })
  },
  getHomeList() {
    homeListModel.homeList("1", storageUtils.getStorage('token_str'), (res) => {
      this.setData({
        homeList: res.retData.hospitalActivityList
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