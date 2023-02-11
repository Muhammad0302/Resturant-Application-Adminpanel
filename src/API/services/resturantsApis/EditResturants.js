import axiosInstance from "../../axiosInstance/AxiosInstance";

export const EditResturants=(data)=>{
console.log("in edit mode")
    return new Promise((resolve,reject)=>{
axiosInstance
 .put("/admin/restaurant",data).then((res)=>{
    resolve(res)
}).catch((err)=>{
reject(err)
})
    })
}