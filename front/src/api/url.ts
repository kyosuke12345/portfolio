const API_BASE_URL = `${location.protocol}//${location.host}/api/v1`;

const URL = {
  POST_LOGIN: () => API_BASE_URL + `/authentication/login`,
  POST_LOGOUT: () => API_BASE_URL + `/authentication/logout`,
  GET_USER_LIST: (page: number, per: number) =>
    API_BASE_URL + `/user/list/${page}/${per}`,
  GET_USER_DETAIL: () => API_BASE_URL + `/user/detail`,
  POST_USER_ADD_HOBBIES: () => API_BASE_URL + `/user/add-hobbies`,
  POST_USER_REMOVE_HOBBIES: () => API_BASE_URL + `/user/remove-hobbies`,
  GET_CRYPTOCURRENCY_MASTER_LIST: () =>
    API_BASE_URL + "/cryptocurrency-master/list/1/20",
  POST_CRYPTOCURRENCY_MASTER_CREATE: () =>
    API_BASE_URL + "/cryptocurrency-master",
  POST_CRYPTOCURRENCY_MASTER_UPDATE: (id: number) =>
    API_BASE_URL + `/cryptocurrency-master/${id}`,
  DELETE_CRYPTOCURRENCY_MASTER_DEL: (id: number) =>
    API_BASE_URL + `/cryptocurrency-master/${id}`,
};

export default URL;
