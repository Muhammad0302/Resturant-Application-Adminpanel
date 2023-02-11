import axiosInstance from "../../axiosInstance/AxiosInstance";

export const DeleteReservation=(id)=>{
    return new Promise((resolve,reject)=>{
    axiosInstance.delete(`admin/reservation/${id}`).then((res)=>{
resolve(res)
    }).catch((err)=>{
        reject(err)
    })
    })
}