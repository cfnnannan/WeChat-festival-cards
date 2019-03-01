import storageUtils from '../../utils/storage.js'
import WinRecordListModel from '../../models/win-record-list.js'
import LoginModel from '../../models/login.js'
let userLoginModel = new LoginModel()
let winRecordListModel = new WinRecordListModel()
Page({
  data: {
    winRecordList: [],
    showModal: false,
    itemIndex: "",
    recordId: "",
    showUseRule: []
  },
  onShow: function () {
    this.getWinReocrdList();
  },
  getWinReocrdList(){
    winRecordListModel.getWinReocrdList(storageUtils.getStorage('token_str'), (res) => {
      let result = res.retData;
      this.setData({
        winRecordList: result.winRecordList
      })
    })
  },
  confirmUseRecord(e) {
    this.setData({
      itemIndex: e.target.dataset.index,
      recordId: e.target.dataset.id,
      showModal: true
    })
  },
  useWinRecord() {
    winRecordListModel.useWinRecord(this.data.recordId, storageUtils.getStorage('token_str'), (res) => {
      let list = this.data.winRecordList;
      list[this.data.itemIndex].status = "2";
      this.setData({
        winRecordList: list,
        showModal: false
      })
    })
  },
  cancelModel() {
    this.setData({
      showModal: false
    })
  },
  handelUseRule(e) {
    let list = this.data.showUseRule
    let index = e.target.dataset.index
    list[index] = !list[index]
    this.setData({
      showUseRule: list,
    })
  }
})