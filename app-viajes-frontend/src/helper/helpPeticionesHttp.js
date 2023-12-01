export const helpPeticionesHttp = () => {
  const customFetch = (endpoint, options) => {
    const defaultHeader = {
      accept: "application/json",
      Authorization: localStorage.getItem("token"),
    };

    const controller = new AbortController();
    options.signal = controller.signal;

    options.method = options.method || "GET";
    options.headers = options.headers ? { ...defaultHeader, ...options.headers } : defaultHeader;

    options.body = JSON.stringify(options.body) || false;
    if (!options.body) delete options.body;

    console.log(options);
    setTimeout(() => controller.abort(), 3000);

    return fetch(endpoint, options)
      .then((res) =>
        res.ok
          ? res.json()
          : Promise.reject({
              err: true,
              status: res.status || "00",
              statusText: res.statusText || "Ocurrió un error",
            })
      )
      .catch((err) => err);
  };

  const customFetch2 = (endpoint, options) => {
    const defaultHeader = {
      accept: "application/json",
      Authorization: localStorage.getItem("token"),
    };

    const controller = new AbortController();
    options.signal = controller.signal;

    options.method = options.method || "GET";
    options.headers = options.headers ? { ...defaultHeader, ...options.headers } : defaultHeader;

    options.body = JSON.stringify(options.body) || false;
    if (!options.body) delete options.body;

    console.log(options);
    setTimeout(() => controller.abort(), 3000);

    return fetch(endpoint, options)
      .then((res) => {
        if (res.ok) {
          // Verificar si la respuesta tiene algún contenido
          const contentType = res.headers.get("content-type");
          if (contentType && contentType.includes("application/json")) {
            return res.json();
          } else {
            return Promise.reject({
              err: true,
              status: res.status || "00",
              statusText: "Respuesta no es JSON",
            });
          }
        } else {
          return Promise.reject({
            err: true,
            status: res.status || "00",
            statusText: res.statusText || "Ocurrió un error",
          });
        }
      })
      .catch((err) => err);
  };

  const get = (url, options = {}) => customFetch(url, options);

  const getResJson = (url, options = {}) => customFetch2(url, options);

  const post = (url, options = {}) => {
    options.method = "POST";
    return customFetch(url, options);
  };

  const put = (url, options = {}) => {
    options.method = "PUT";
    return customFetch(url, options);
  };

  const del = (url, options = {}) => {
    options.method = "DELETE";
    return customFetch(url, options);
  };

  return {
    get,
    post,
    put,
    del,
    getResJson,
  };
};
