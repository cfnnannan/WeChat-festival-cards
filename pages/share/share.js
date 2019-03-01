import storageUtils from '../../utils/storage.js'
import ShareInfoModel from '../../models/shareInfo.js'
import AssistanceModel from '../../models/assistance.js'
import LoginModel from '../../models/login.js'
import FormIdModel from '../../models/formId.js'
let formIdModel = new FormIdModel()
let userLoginModel = new LoginModel()
let shareInfoModel = new ShareInfoModel()
let assistanceModel = new AssistanceModel()
const app = getApp()
Page({
  data: {
    participationId: "",
    activityId: "",
    hospitalName: "",
    activityName: "",
    rewardInfo: "",
    ruleInfo: "",
    ruleTime: "",
    bannerUrl: "",
    avatarUrl: "",
    listSize: "",
    assistanceAvatarList: [],
    activityParticipationUserList: "",
    fromOther: 'other',
    showModal: false,
    masterNickname: "",
    headImgList: [],
    fromShare: "/components/z-image/share-icon.png",
    avatorOne: "",
    avatorTwo: "",
    avatorThree: "",
    showAssistanceAvatarOne: false,
    showAssistanceAvatarTwo: false,
    showAssistanceAvatarThree: false
  },
  onLoad: function (options) {
    // options.participationId = encodeURIComponent("U+Ks2iepYAp5iqpOOvQhVVJUi/Mk7eS1XtS2LsrVSLc=")
    // options.activityId = encodeURIComponent("cyBsAYAOqR8cPwoPCyjc1geyUnV/suHBNIgSE0euJkU=")
    /**获取福主带的参数 */
    if (options != undefined ) {
      this.setData({
        participationId: decodeURIComponent(options.participationId),
        activityId: decodeURIComponent(options.activityId),
      })
    }

    /**获取token */
    let token = storageUtils.getStorage('token_str')
    if (token == 'token_str' || token == undefined) {
      userLoginModel.getLogin((res) => {
        storageUtils.setStorage('token_str', res.retData.tokenstr, 21 * 3600);
        this.getShareInfo()
      });
    } else {
      this.getShareInfo()
    }
  },
  _handleList(list) {
    if (list.length == 0) {
      return;
    }
    if (list.length == 1) {
      this.setData({
        avatorOne: list[0].userHeadimg,
        showAssistanceAvatarOne: true
      })
    } else if (list.length == 2) {
      this.setData({
        avatorOne: list[0].userHeadimg,
        avatorTwo: list[1].userHeadimg,
        showAssistanceAvatarOne: true,
        showAssistanceAvatarTwo: true
      })
    } else {
      this.setData({
        avatorOne: list[0].userHeadimg,
        avatorTwo: list[1].userHeadimg,
        avatorThree: list[2].userHeadimg,
        showAssistanceAvatarOne: true,
        showAssistanceAvatarTwo: true,
        showAssistanceAvatarThree: true,
      })
    }
  },
  /**获取微信用户头像昵称 */
  getAssistanceUser: function (event) {
    this.getUserInfo(event)
    assistanceModel.getAssistance(this.data.participationId, this.data.assistanceAvatar, this.data.nickName, storageUtils.getStorage('token_str'), (res) =>{
      let list = this.data.assistanceAvatarList;
      list[list.length] = { userHeadimg: this.data.assistanceAvatar }
      this.setData({
        assistanceAvatarList: list
      })
      this._handleList(list)
    })
    this.showModel()
  },
  getFuzhuUser: function (event) {
    this.getUserInfo(event)
    wx.navigateTo({
      url: `/pages/details/details?activityId=${encodeURIComponent(this.data.activityId)}`,
    })
  },
  getShareInfo() {
    shareInfoModel.shareInfo(this.data.participationId, this.data.activityId, storageUtils.getStorage('token_str'), (res) => {
      let result = res.retData
      let openTime = result.openTime
      openTime = openTime.substring(0, openTime.length - 3)
      this.setData({
        hospitalName: result.hospitalName,
        activityName: result.activityName,
        rewardInfo: result.activityAward,
        ruleInfo: result.activityRule,
        ruleTime: openTime,
        bannerUrl: result.bannerUrl,
        activityId: result.activityId,
        participationId: result.participationId,
        avatarUrl: result.masterHeadimg,
        activityParticipationUserList: result.activityParticipationUserList,
        masterNickname: result.masterNickname,
        headImgList: result.headImgList
      })
      let activityParticipationUserList = this.data.activityParticipationUserList
      this._handleList(activityParticipationUserList)
      this.setData({
        assistanceAvatarList: activityParticipationUserList,
        listSize: activityParticipationUserList.length
      })
    })
  },
  getUserInfo(e) {
    app.globalData.userInfo = e.detail.userInfo;
    let userInfo = e.detail.userInfo;
    this.setData({
      assistanceAvatar: userInfo.avatarUrl,
      nickName: userInfo.nickName
    })
  },
  showModel: function () {
    this.setData({
      showModal: true
    })
  },
  cancelModel() {
    this.setData({
      showModal: false
    })
  },
  formSubmit: function (e) {
    formIdModel.postFormId(e.detail.formId, storageUtils.getStorage('token_str'))
  }
})