import HTTP from '../utils/http.js';
class DetailsModel extends HTTP {
  getDetails(hospitalName, activityName, tokenStr, resCallback) {
    this.request({
      method: 'POST',
      url: '/hospitalActivity/info',
      data: {
        hospitalName: hospitalName,
        activityName: activityName
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
export default DetailsModel;