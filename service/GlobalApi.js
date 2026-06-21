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
  console.log("API DATA:", JSON.stringify(data, null, 2));

  return axiosClient.put(`/ai-resumes/${id}`, data);
};


const updateResumeDetails0 = (id, data) => {
  console.log("API DATA:", JSON.stringify(data, null, 2));

  return axiosClient.put(`/ai-resumes/${id}`, { data });
};
const GetResumeById=(id)=>axiosClient.get('/ai-resumes/'+id+"?populate=*")
export default {
  CreateNewResume,
  getUserResume,
  uploadUserImage,
  updateResumeDetails,
  updateResumeDetails0,
  GetResumeById,
};