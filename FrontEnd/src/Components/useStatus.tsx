import axios from 'axios'
import  { useEffect } from 'react'
import { useState } from 'react'

function useStatus(data:any) {
    const [response,setResponse]=useState()
    const baseURL="www.example.com"

    useEffect(()=>{
        const sample=async ()=>{

            const result= await axios(`${baseURL}/signup`,{data})
            setResponse(result.data)
         }
         sample()

    },[data])

return response
  
}

export default useStatus