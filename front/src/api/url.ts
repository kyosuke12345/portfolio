const API_BASE_URL = `${location.protocol}//${location.host}/api/v1`;

const URL = {
  POST_LOGIN: () => API_BASE_URL + `/authentication/login`,
  GET_USER_LIST: (page: number, per: number) =>
    API_BASE_URL + `/user/list/${page}/${per}`,
  GET_USER_DETAIL: () => API_BASE_URL + `/user/detail`,
  POST_USER_ADD_HOBBIES: () => API_BASE_URL + `/user/add-hobbies`,
  POST_USER_REMOVE_HOBBIES: () => API_BASE_URL + `/user/remove-hobbies`,
};

export default URL;
