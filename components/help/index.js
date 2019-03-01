import storageUtils from '../../utils/storage.js'
import FormIdModel from '../../models/formId.js'
let formIdModel = new FormIdModel()
Component({
  properties: {
    avatarUrl: {
      type: String
    },
    assistanceAvatarList: {
      type: Array,
      observer(newVal, oldVal) {
        if(newVal.length == 0){
          return;
        }
        if(newVal.length == 1) {
          this.setData({
            avatorOne: newVal[0].userHeadimg,
            showAssistanceAvatarOne: true
          })
        } else if (newVal.length == 2){
          this.setData({
            avatorOne: newVal[0].userHeadimg,
            avatorTwo: newVal[1].userHeadimg,
            showAssistanceAvatarOne: true,
            showAssistanceAvatarTwo: true
          })
        } else {
          this.setData({
            avatorOne: newVal[0].userHeadimg,
            avatorTwo: newVal[1].userHeadimg,
            avatorThree: newVal[2].userHeadimg,
            showAssistanceAvatarOne: true,
            showAssistanceAvatarTwo: true,
            showAssistanceAvatarThree: true,
          })
        }
      }
    },
    showAssistanceAvatar: {
      type: Boolean
    },
    participationId: {
      type: String
    },
    activityId: {
      type: String
    }
  },
  data: {
    showNoAvator: "/components/z-image/avatar-pic.png",
    avatorOne: "",
    avatorTwo: "",
    avatorThree: "",
    showAssistanceAvatarOne: false,
    showAssistanceAvatarTwo: false,
    showAssistanceAvatarThree: false
  },
  methods: {
    formSubmit: function (e) {
      formIdModel.postFormId(e.detail.formId, storageUtils.getStorage('token_str'))
    }
  },
  onShareAppMessage: function () {
    return {
      title: '邀请您参与活动为ta抽奖助力',
      path: '/pages/share/share?participationId=' + encodeURIComponent(this.properties.participationId) + '&activityId=' + encodeURIComponent(this.properties.activityId),
      imageUrl: "/image/share.jpg"
    }
  }
})
