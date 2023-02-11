import axiosInstance from "../../axiosInstance/AxiosInstance";


export const GenerateCode=()=>{
    return new Promise((resolve,reject)=>{
axiosInstance.get("/reservation/code").then((res)=>{resolve(res)}).catch((err)=>{reject(err)})
    })
}
