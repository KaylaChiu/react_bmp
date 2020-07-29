/* 封装axios */
import axios from 'axios'

export default axios.create({
    transformRequest:[
        (data)=>{
            const arr = [];
            /* data.forEach((item)=>{
                arr.push(`${item}=${data[item]}`);
            }) */
            for(let key in data){
                arr.push(`${key}=${data[key]}`)
            }
            console.log(arr);
            return arr.join("&")
        }
    ]
})
