var dtime = '_deadtime'; 
const storageUtils = {
  /**设置缓存 */
  setStorage(key, value, time) {
    wx.setStorageSync(key, value)
    let seconds = parseInt(time);
    if (seconds > 0) {
      let timestamp = (new Date()).getTime()
      timestamp = timestamp / 1000 + seconds;
      wx.setStorageSync(key + dtime, timestamp + "")
    } else {
      wx.removeStorageSync(key + dtime)
    }
  },

  /**获取缓存 */
  getStorage(key, value) {
    let deadtime = parseInt(wx.getStorageSync(key + dtime))
    if (deadtime) {
      if (parseInt(deadtime) < (new Date()).getTime() / 1000) {
        if (value) { return value; } else { return; }
      }
    }
    let res = wx.getStorageSync(key);
    if (res) {
      return res;
    } else {
      return key;
    }
  },

   /**删除缓存 */
  delStorage(key) {
    wx.removeStorageSync(key);
    wx.removeStorageSync(key + dtime);
  },

  /**清空所有缓存 */
  clearStorage() {
    wx.clearStorageSync();
  }
}
export default storageUtils;