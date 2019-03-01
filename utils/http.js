import config from '../config.js';
import storageUtils from '../utils/storage.js'
class HTTP {
  request(params) {
    wx.request({
      url: config.api_base_url + params.url,
      data: params.data,
      header: params.header,
      method: params.method,
      success: (res)=> {
        if (res.data.result==="SUCCESS") {
          params.success && params.success(res.data)
        }
        else {
          wx.showToast({
            title: res.data.retMsg,
            icon: 'none',
            duration: 3000
          })
        }
      },
      fail: (err)=> {
        wx.showToast({
          title: "抱歉，出现了一个错误，请稍后再试!",
          icon: 'none',
          duration: 3000
        })
      }
    })
  }
}
export default HTTP;