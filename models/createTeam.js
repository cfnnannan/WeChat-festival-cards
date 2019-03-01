import HTTP from '../utils/http.js';
class CreateTeamModel extends HTTP {
  createTeam(avatarUrl, nickName, activityId, tokenStr, resCallback) {
    this.request({
      method: 'POST',
      url: '/activityParticipation/create',
      data: {
        avatarUrl: avatarUrl,
        nickname: nickName,
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
export default CreateTeamModel;