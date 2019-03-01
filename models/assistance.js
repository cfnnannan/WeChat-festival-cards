import HTTP from '../utils/http.js';
class AssistanceModel extends HTTP {
  getAssistance(participationId, avatarUrl, nickName, tokenStr, resCallback) {
    this.request({
      method: 'POST',
      url: '/activityParticipation/assistance',
      data: {
        participationId: participationId,
        avatarUrl: avatarUrl,
        nickname: nickName
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
export default AssistanceModel;