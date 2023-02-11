import axiosInstance from "../../axiosInstance/AxiosInstance";


export const EditCity=(data)=>{
console.log("in edit mode")
    return new Promise((resolve,reject)=>{
axiosInstance
 .put("/admin/city",data).then((res)=>{
    resolve(res)
}).catch((err)=>{
reject(err)
})
    })
}