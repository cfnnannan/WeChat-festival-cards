import HTTP from '../utils/http.js';
class ShareDetailsModel extends HTTP {
  shareDetails(activityId, tokenStr, resCallback) {
    this.request({
      method: 'POST',
      url: "/hospitalActivity/get",
      data: {
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
export default ShareDetailsModel;