import UserCenterModel from "../../models/user-center.js"
import storageUtils from '../../utils/storage.js'
let userCenterModel = new UserCenterModel()
const app = getApp()
Page({
  data: {
    headimgUrl: "/components/z-image/header.png",
    nickname: "未登录"
  },
  onLoad: function (options) {
    userCenterModel.userCenter(storageUtils.getStorage('token_str'), (res) => {
      if (res.retData) {
        this.setData({
          headimgUrl: res.retData.headimgUrl,
          nickname: res.retData.nickname,
        })
      }
    })
  },
  getUserInfo(e) {
    app.globalData.userInfo = e.detail.userInfo;
    let userInfo = e.detail.userInfo;
    this.setData({
      headimgUrl: userInfo.avatarUrl,
      nickname: userInfo.nickName,
    })
    userCenterModel.getUserUpdate(storageUtils.getStorage('token_str'), this.data.nickname, this.data.headimgUrl)
  }
})