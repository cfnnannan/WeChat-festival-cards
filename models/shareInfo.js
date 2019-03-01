import HTTP from '../utils/http.js';
class ShareInfoModel extends HTTP {
  shareInfo(participationId, activityId, tokenStr, resCallback) {
    this.request({
      method: 'POST',
      url: '/hospitalActivity/shareInfo',
      data: {
        participationId: participationId,
        activityId: activityId
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
export default ShareInfoModel;