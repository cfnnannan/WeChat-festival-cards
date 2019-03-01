import HTTP from '../utils/http.js';
class FormIdModel extends HTTP {
  postFormId(formId, tokenStr) {
    this.request({
      method: 'POST',
      url: '/user/formId',
      data: {
        formId: formId
      },
      header: {
        "Content-Type": "application/json",
        "Authorization": tokenStr,
      },
      success: (res) => {
      }
    })
  }
}
export default FormIdModel;