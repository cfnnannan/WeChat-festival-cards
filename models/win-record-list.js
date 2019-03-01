import HTTP from '../utils/http.js';
class WinRecordListModel extends HTTP {
  getWinReocrdList(tokenStr, resCallback) {
    this.request({
      method: 'GET',
      url: '/winRecord/list',
      header: {
        "Content-Type": "application/json",
        "Authorization": tokenStr,
      },
      success: (res) => {
        resCallback(res)
      }
    })
  };
  useWinRecord(recordId, tokenStr, resCallback) {
    this.request({
      method: 'POST',
      url: '/winRecord/use',
      data: {
        recordId: recordId
      },
      header: {
        "Content-Type": "application/json",
        "Authorization": tokenStr,
      },
      success: (res) => {
        resCallback(res)
      }
    })
  }
}
export default WinRecordListModel;