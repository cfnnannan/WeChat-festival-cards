import storageUtils from '../../utils/storage.js'
import LoginModel from '../../models/login.js'
import DetailsModel from '../../models/details.js'
import CreateTeamModel from '../../models/createTeam.js'
import ShareDetailsModel from '../../models/shareDetails.js'
import FormIdModel from '../../models/formId.js'
let userLoginModel = new LoginModel()
let getDetailsModel = new DetailsModel()
let createTeamModel = new CreateTeamModel()
let shareDetailsModel = new ShareDetailsModel()
let formIdModel = new FormIdModel()
const app = getApp()
Page({
  data: {
    avatarUrl:"",
    rewardInfo: "",
    bannerUrl: "",
    activityId: "",
    hospitalName: "",
    participationId: -1,
    assistanceAvatarList: [],
    listSize: "",
    hasUserInfo: false,
    fromOther: 'other',
    winList: [],
    headImgList: [],
    fuZhuNickName: "",
    shareUrl: "",
    showTip: "",
    topTitle: "",
    bomTitle: "",
    failImg: "/image/fail@win.png",
    successImg: "/image/happy@win.png"
  },
  onLoad: function (options) {
    // options.activityId = `cyBsAYAOqR8cPwoPCyjc1geyUnV/suHBNIgSE0euJkU=`
    if (options != undefined ) {
      this.setData({
        shareActivityId: decodeURIComponent(options.activityId)
      })
    }
    this._getToken()
  },

  _getToken() {
    let token = storageUtils.getStorage('token_str')
    if (token == 'token_str' || token == undefined) {
      userLoginModel.getLogin((res) => {
        storageUtils.setStorage('token_str', res.retData.tokenstr, 21 * 3600);
        this._getDetails()
      });
    } else {
      this._getDetails()
    }
  },

  _getDetails() {
    shareDetailsModel.shareDetails(this.data.shareActivityId, storageUtils.getStorage('token_str'), (res) => {
      let result = res.retData;
      let openTime = result.openTime
          openTime = openTime.substring(0, openTime.length - 3)
      let listSize;
      if (result.activityParticipationUserList != undefined && result.activityParticipationUserList.length != 0) {
        listSize = result.activityParticipationUserList.length
      } else {
        listSize = 0;
      }
      this.setData({
        rewardInfo: result.activityAward,
        ruleInfo: result.activityRule,
        ruleTime: openTime,
        hospitalName: result.hospitalName,
        bannerUrl: result.bannerUrl,
        activityId: result.activityId,
        participationId: result.participationId,
        avatarUrl: result.masterHeadimg,
        assistanceAvatarList: result.activityParticipationUserList,
        popStatus: result.popStatus,
        winList: result.winList,
        listSize: listSize,
        isEnd: result.isEnd,
        winName: result.winName,
        headImgList: result.headImgList,
        fuZhuNickName: result.masterNickname,
        shareUrl: result.shareUrl
      })
      this._judgeData(result, listSize)
    })
  },
  _judgeData(res, listLenght) {
    if (res.participationId == -1) {
      this.setData({
        showTip: "/image/home@tip.png"
      })
    } else if (res.isEnd > 0 && listLenght < 3) {
      this.setData({
        topTitle: `您未集满祝福`,
        bomTitle: `很遗憾，未能参与此次抽奖`,
        showTip: "/image/win@tip.png"
      })
    } else if (res.isEnd > 0 && listLenght == 3) {
      if (res.winName == undefined) {
        this.setData({
          topTitle: `好遗憾~`,
          bomTitle: `距离大奖只差一点点`,
          showTip: "/image/win@tip.png"
        })
      } else {
        this.setData({
          topTitle: `恭喜您在本次抽奖活动中~`,
          bomTitle: `获得一张${res.winName}`
        })
      }
    } else {
      if (listLenght < 3) {
        this.setData({
          topTitle: `恭喜您，成为${res.hospitalName}特邀福主`,
          bomTitle: `集齐三位好友祝福可中大奖`
        })
      } else {
        this.setData({
          topTitle: `集福完成`,
          bomTitle: `您已获得抽奖资格，可中大奖!`
        })
      }
    }
  },

  shareFull() {
    wx.showToast({
      title: '您已集满祝福，请留意医院公众号开奖通知',
      icon: 'none',
      duration: 5000
    })
  },

  getUserInfo: function (e) {
    app.globalData.userInfo = e.detail.userInfo;
    let userInfo = e.detail.userInfo;
    createTeamModel.createTeam(userInfo.avatarUrl, userInfo.nickName, this.data.activityId, storageUtils.getStorage('token_str'), (res) => {
      this.setData({
        avatarUrl: userInfo.avatarUrl,
        nickName: userInfo.nickName,
        participationId: res.retData
      })
      let result = {
        winName: this.data.winName,
        hospitalName: this.data.hospitalName,
        isEnd: this.data.isEnd,
        participationId: this.data.participationId
      };
      this._judgeData(result, 0)
    })
  },
  formSubmit: function (e) {
    formIdModel.postFormId(e.detail.formId, storageUtils.getStorage('token_str'))
  },
  onShareAppMessage: function () {
    return {
      title: this.data.fuZhuNickName + '中大奖就靠你了!',
      path: `/pages/share/share?participationId=${encodeURIComponent(this.data.participationId)}&activityId=${encodeURIComponent(this.data.activityId)}`,
      imageUrl: this.data.shareUrl
    }
  },

})
