const errorCodes = {
  updateOrderFailed: '更新失敗,請稍後再試。',
  signupError: '請重新註冊，帳號已有人使用或密碼太短(需4位數以上)。',
  signInError: '請重新登入，帳號或密碼錯誤。',
};

export default (swal, errorCode) => {
  if (errorCodes[errorCode]) {
    swal({
      icon: 'error',
      title: '失敗',
      text: errorCodes[errorCode],
    });
  } else {
    swal({
      icon: 'error',
      title: '失敗',
      text: 'sorry，目前服務不可用，請稍後再試或聯絡管理員。',
    });
  }
};
