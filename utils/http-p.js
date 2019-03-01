// import config from '../config.js';
// import storageUtils from '../utils/storage.js'
// class HTTP {
//   request(url, header, data={}, method='GET') {
//     wx.request({
//       url: config.api_base_url + url,
//       data: data,
//       header: header,
//       method: method,
//       success: (res) => {
//         if (res.data.result === "SUCCESS") {
//           resovle(res.data)
//         }
//         else {
//           wx.showToast({
//             title: res.data.retMsg,
//             icon: 'none',
//             duration: 3000
//           })
//         }
//       },
//       fail: (err) => {
//         wx.showToast({
//           title: "抱歉，出现了一个错误，请稍后再试!",
//           icon: 'none',
//           duration: 3000
//         })
//       }
//     })
//   }
// }
// export default HTTP;