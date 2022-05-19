import { isUndefined } from "utils/typeguard";

const wrap = <T>(task: Promise<Response>): Promise<T> => {
  return new Promise((resolve, reject) => {
    task
      .then((response) => {
        if (response.ok) {
          response
            .json()
            .then((json) => {
              // jsonが取得できた場合だけresolve
              resolve(json);
            })
            .catch((error) => {
              reject(error);
            });
        } else {
          reject(response);
        }
      })
      .catch((error) => {
        console.log("api error :", error);
        reject(error);
      });
  });
};

const wrapperFetch = <T = unknown>(
  input: RequestInfo,
  init?: RequestInit
): Promise<T> => {
  return wrap<T>(fetch(input, init));
};

export function get<T = unknown>(url: string): Promise<T> {
  const init: RequestInit = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    cache: "no-store",
  };
  return wrapperFetch(url, init);
}

export function post<T = unknown>(url: string, params: unknown): Promise<T> {
  if (typeof params !== "object") {
    throw new Error("post param error");
  }
  const init: RequestInit = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(params),
  };
  return wrapperFetch(url, init);
}

export function del<T = unknown>(url: string, params?: unknown): Promise<T> {
  if (!isUndefined(params) && typeof params !== "object") {
    throw new Error("del param error");
  }
  const init: RequestInit = {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: isUndefined(params) ? undefined : JSON.stringify(params),
  };
  return wrapperFetch(url, init);
}
