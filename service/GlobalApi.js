import axios from "axios";

const API_KEY = import.meta.env.VITE_STRAPI_KEY;

const axiosClient = axios.create({
  baseURL: "http://localhost:1337/api",
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${API_KEY}`,
  },
});

const CreateNewResume = (data) =>
  axiosClient.post("/ai-resumes", {
    data,
  });

const getUserResume = (userEmail) =>
  axiosClient.get(
    `/ai-resumes?filters[user_email][$eq]=${encodeURIComponent(userEmail)}`
  );

const uploadUserImage = (file) => {
  const formData = new FormData();
  formData.append("files", file);

  return axiosClient.post("/upload", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

const updateResumeDetails = (id, data) => {
  return axiosClient.put("/ai-resumes/" + id, {
    data,
  });
};

export default {
  CreateNewResume,
  getUserResume,
  uploadUserImage,
  updateResumeDetails,
};