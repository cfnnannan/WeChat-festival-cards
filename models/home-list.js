import HTTP from '../utils/http.js';
class HomeListModel extends HTTP {
  homeList(status, tokenStr, resCallback) {
    this.request({
      method: 'POST',
      url: "/hospitalActivity/list",
      data: {
        status: status
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
export default HomeListModel;