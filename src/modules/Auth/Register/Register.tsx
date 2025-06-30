import type { IRegister } from '@/Interfaces/AuthInterface'
import CustomInput from '@/modules/shared/CustomInput/CustomInput'
import { publicUserAxiosInstance } from '@/services/Axiosinstance'
import { AUTH_URLS } from '@/services/Urls'
import { Email_Validation, LAST_NAME_VALIDATION, Password_Validation, USER_NAME_VALIDATION } from '@/services/Validation'
import { AxiosError } from 'axios'
import  { useState } from 'react'
import { useForm } from 'react-hook-form'
import { IoMail } from 'react-icons/io5'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { RiFileUserLine } from "react-icons/ri";
import { FaKey } from "react-icons/fa";
import { FaCheckCircle } from "react-icons/fa";
import { Button } from "@/components/ui/button";




export default function Register() {
  
  const navigate=useNavigate()
  const[password,setPassword]=useState(false)
  const togglePass=()=>{
    setPassword(!password)
  }

  const {handleSubmit,formState:{errors,isSubmitting},register}=useForm<IRegister>()
  const onSubmit = async (data:IRegister) =>{
    console.log(data)
    try {
      const response=await publicUserAxiosInstance.post(AUTH_URLS.register,data)
      console.log(response);
      
      toast.success(response?.data?.message)
      navigate('/login')
    } catch (error) {
      console.log(error)
      if (error instanceof AxiosError){
        console.log(error)
        toast.error(error.response?.data.message||'Something Went Wrong')
    }
  }
}
  return (
    <>
    <form onSubmit={handleSubmit(onSubmit)} className="mt-6">
      <div className='flex flex-col md:flex-row gap-x-4'>
      <CustomInput 
      register={register}
       rules={USER_NAME_VALIDATION}
        name="first_name"
         placeholder="Type Your first name" 
         label="Your first name"
         InputIcon={<RiFileUserLine className="text-xl" />}
         type="string"
         error={errors?.first_name?.message}
         />
      <CustomInput 
      register={register}
       rules={LAST_NAME_VALIDATION}
        name="last_name"
         placeholder="Type Your last name" 
         label="Your last name"
         InputIcon={<RiFileUserLine className="text-xl" />}
         type="string"
         error={errors?.last_name?.message}
         />
       </div>

      <CustomInput 
      register={register}
       rules={Email_Validation}
        name="email"
         placeholder="Type Your Email" 
         label="Your email address"
         InputIcon={<IoMail className="text-xl" />}
         type="email"
         error={errors?.email?.message}
         />

<div className="relative my-3 text-white">
          <label htmlFor="role" className=" pl-2 text-white">
            Your role
          </label>
          <div className="relative">
            <select
              id="role"
              {...register("role", { required: "Role is required" })}
              className="py-2 pl-12 bg-inherit border-[3px] rounded-[10px] w-full outline-none appearance-none">
              <option hidden>Choose your role</option>
              <option
                value="Instructor"
                className="bg-gray-200 text-gray-800 hover:bg-green-300 ">
                Instructor
              </option>
              <option
                value="Student"
                className="bg-gray-200 text-gray-800 hover:bg-green-300">
                Student
              </option>
            </select>
            <IoMail className="absolute top-1/2 transform -translate-y-1/2 left-4 text-white text-2xl" />
          </div>
        </div> 
         
      <CustomInput 
      register={register}
       rules={Password_Validation}
        name="password"
         placeholder="Type Your Password" 
         label="Password"
         InputIcon={<FaKey  className="text-xl" />}
         type="password"
         error={errors?.password?.message}
         togglePass={togglePass}
   password={password}
         />
          <div className="bottom flex justify-between items-center">
    <Button  type="submit" className="bg-white text-black hover:bg-white">{isSubmitting?<>
      <div className="w-4 h-4 border-4 border-black border-t-transparent rounded-full animate-spin "></div>
      <span>Loading</span>
    </>
:<><FaCheckCircle/> Sign Up </>}</Button>
      
    
    </div>
    </form>
      
    </>
  )
}
