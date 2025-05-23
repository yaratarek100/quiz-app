
import { useForm } from "react-hook-form"
import { toast } from "react-toastify";
import { IoMail } from "react-icons/io5";
import { FaKey } from "react-icons/fa";
import type { ILogin_Login } from "@/Interfaces/AuthInterface";
import { FaCheckCircle } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { AxiosError } from "axios";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { publicUserAxiosInstance } from "@/services/Axiosinstance";
import { AUTH_URLS } from "@/services/Urls";
import CustomInput from "@/modules/shared/CustomInput/CustomInput";
import { Button } from "@/components/ui/button";
import { fillLoginData } from "@/Redux/AuthSlice";
import { Email_Validation, Password_Validation } from "@/services/Validation";
 


export default function Login() {
  const navigate=useNavigate()
  const dispatch=useDispatch()
  const[password,setPassword]=useState(false)
  const togglePass=()=>{
    setPassword(!password)
  }

  const {handleSubmit,formState:{errors,isSubmitting},register}=useForm<ILogin_Login>()
  const onSubmit = async (values:ILogin_Login) =>{
    console.log(values)
    try {
      const {data}=await publicUserAxiosInstance.post(AUTH_URLS.login,values)
      toast.success(data?.message)
      localStorage.setItem('token',data?.data?.accessToken)
      dispatch(fillLoginData(data?.data?.profile))
      localStorage.setItem("user", JSON.stringify(data?.data?.profile));
      navigate('/dashboard')
    } catch (error) {
      console.log(error)
      if (error instanceof AxiosError){
        console.log(error)
        toast.error(error.response?.data.message||'Something Went Wrong')
    }
  }
}
  return <form onSubmit={handleSubmit(onSubmit)} className="mt-6" >
    {/* email */}
<CustomInput 
register={register}
 rules={Email_Validation}
  name="email"
   placeholder="Type Your Email" 
   label="Registered email address"
   InputIcon={<IoMail className="text-xl" />}
   type="email"
   error={errors?.email?.message}
   />
{/* password */}
<CustomInput 
register={register}
 rules={Password_Validation}
 type="password"
  name="password"
   placeholder="Type Your Email" 
   label="Password"
   InputIcon={<FaKey className="text-xl"/> }
   error={errors?.password?.message}
   togglePass={togglePass}
   password={password}
   />
    <div className="bottom flex justify-between items-center">
    <Button className="bg-white text-black hover:bg-white">{isSubmitting?<>
      <div className="w-4 h-4 border-4 border-black border-t-transparent rounded-full animate-spin "></div>
      <span>Loading...</span>
    </>
:"Sign In"} <FaCheckCircle/></Button>
      
      <p className="text-white">Forgot password? <Link to={'/forget-password'} className="text-[#F8B55F] underline">click here</Link></p> 

    </div>
  </form>


}
