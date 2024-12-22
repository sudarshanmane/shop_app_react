import { message } from "antd";
import axios from "axios";
import URLS from "./urls";

const loginFetch = async (data, setCanProceed) => {
  const url = URLS.base_url + URLS.login;

  const res = await axios
    .post(url, data)
    .then((response) => {
      response = response.data;

      if (response.status === "success" && response.token) {
        localStorage.setItem("sessionToken", response.token);

        localStorage.setItem("sessionData", JSON.stringify(response.doc));
        localStorage.setItem(
          "permissions",
          JSON.stringify(response.permissions)
        );

        setCanProceed(true);
        return response.doc;
      } else {
        message.error(response.message);
        return "error";
      }
    })
    .catch((error) => {
      if (error.response.data.status === "fail") {
        message.error(error.response.data.message);
      } else {
        message.error("Something went wrong!");
      }

      return "error";
    });

  return res;
};

const postFaceDetection = async (vals, uri, token, mxkey) => {
  const url = uri;

  const headers = {
    "Content-Type": "application/json",
  };

  if (token) {
    headers.token = token;
    headers["Content-Type"] = "multipart/form-data";
  }
  if (mxkey) {
    headers.Subscriptionkey = mxkey;
  } else {
    headers.Authorization =
      "Bearer " + localStorage.getItem("sessionToken") || "";
  }

  try {
    // No need to set Content-Type header when using vals
    const response = await axios
      .post(url, vals, { headers })
      .then((res) => {
        return res.data;
      })
      .catch((error) => {
        // message.info("Something went wrong!");
        return null;
      });

    return response;
  } catch (error) {
    console.error("Something went wrong! Error:", error);
  }
};

const postFaceDetectionMatch = async (data) => {
  const url = URLS.face_base_url;

  const headers = {
    "Content-Type": "multipart/form-data",
  };

  const response = await axios
    .post(url, data, { headers })
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      return null;
    });

  return response;
};

const postData = async (data, urlLast = "", isMessage = true, extHeaders) => {
  const url = URLS.base_url + urlLast;
  console.log(url);
  const response = await axios
    .post(url, data)
    .then((res) => {
      res = res.data;
      if (res.status === "success") {
        isMessage && message.success(res.message);
        return res;
      } else if (res.message === "Image uploaded successfully") {
        return res;
      } else {
        isMessage && message.info(res.message);
      }
    })
    .catch((error) => {
      if (error?.response?.data?.status === "fail") {
        message.error(error?.response?.data?.message);
      } else {
        message.error("Something went wrong!");
      }
      return null;
    });
  return response;
};

const putData = async (data, urlLast) => {
  const url = URLS.base_url + urlLast;

  const headers = {
    Authorization: "Bearer " + localStorage.getItem("sessionToken") || "",
  };

  if (!Object.keys(data)?.length) {
    headers["Content-Type"] = "multipart/form-data";
  }

  const response = await axios
    .put(url, data, { headers })
    .then((res) => {
      res = res.data;

      if (res.status === "success") {
        message.success(res.message);
        return res;
      } else {
        message.info(res.message);
      }

      return res;
    })
    .catch((error) => {
      if (error.response.data.status === "fail") {
        message.error(error.response.data.message);
      } else {
        message.error("Something went wrong!");
      }
      return null;
    });

  return response;
};

const patchData = async (data, urlLast) => {
  const url = URLS.base_url + urlLast;

  const headers = {
    Authorization: "Bearer " + localStorage.getItem("sessionToken") || "",
  };

  if (!Object.keys(data)?.length) {
    headers["Content-Type"] = "multipart/form-data";
  }

  const response = await axios
    .patch(url, data, { headers })
    .then((res) => {
      res = res.data;

      if (res.status === "success") {
        message.success(res.message);
        return res;
      } else {
        message.info(res.message);
      }

      return res;
    })
    .catch((error) => {
      if (error.response.data.status === "fail") {
        message.error(error.response.data.message);
      } else {
        message.error("Something went wrong!");
      }
      return null;
    });
  return response;
};

const getData = async (urlLast) => {
  const url = URLS.base_url + urlLast;

  const headers = {
    "Content-Type": "multipart/form-data",
    Authorization: "Bearer " + localStorage.getItem("sessionToken") || "",
  };

  const res = await axios
    .get(url, { headers })
    .then((response) => {
      response = response.data;

      if (response.status === "success") {
        return response;
      } else {
        message.error(response.message);
      }

      return null;
    })
    .catch((error) => {
      if (error.response.data.status === "fail") {
        message.error(error.response.data.message);
      } else {
        message.error("Something went wrong!");
      }
      return null;
    });

  return res;
};

export {
  loginFetch,
  postData,
  getData,
  postFaceDetection,
  postFaceDetectionMatch,
  putData,
  patchData,
};
