import HTTP from '../utils/http.js';
class UserCenterModel extends HTTP {
  userCenter(tokenStr, resCallback) {
    this.request({
      method: 'GET',
      url: "/user/detail",
      header: {
        "Content-Type": "application/json",
        "Authorization": tokenStr,
      },
      success: (res) => {
        resCallback(res)
      }
    })
  }
  getUserUpdate(tokenStr, nickname, avatarUrl) {
    this.request({
      method: 'POST',
      url: "/user/update",
      header: {
        "Content-Type": "application/json",
        "Authorization": tokenStr,
      },
      data: {
        nickname: nickname,
        avatarUrl: avatarUrl
      }
    })

  }
}
export default UserCenterModel;