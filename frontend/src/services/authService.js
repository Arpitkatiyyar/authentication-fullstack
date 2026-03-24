import API from "../api/api";

export const registerUser=(data)=>API.post("/auth/register",data);

export const loginUser=async (data)=>{
    const res=await API.post("auth/login",data);

    localStorage.setItem("token",res.data.accessToken);
    return res.data;
};

export const getMe=()=>API.get("auth/get-me")

export const logoutUser=()=>API.post("auth/logout")

export const verifyEmail=(data)=>API.post("auth/verify-email",data)