import HTTP from '../utils/http.js';
import storageUtils from '../utils/storage.js'
class LoginModel extends HTTP {
  getLogin(resCallback) {
    wx.login({
      success: (result)=> {
        if (result.code) {
          this.request({
            method: 'POST',
            url: '/login/wxgrantLogin',
            data: {
              code: result.code
            },
            success: (res) => {
              resCallback(res)
            }
          })
        } else {
          wx.showToast({
            title: '获取用户信息失败',
            icon: 'none',
            duration: 2000
          })
        }
      }
    })
  }
}
export default LoginModel;