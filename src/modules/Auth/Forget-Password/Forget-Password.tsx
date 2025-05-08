import { Button } from '@/components/ui/button'
import type { IForgetPassword } from '@/Interfaces/ResetPassword'
import CustomInput from '@/modules/shared/CustomInput/CustomInput'
import { publicUserAxiosInstance } from '@/services/Axiosinstance'
import { AUTH_URLS } from '@/services/Urls'
import { Email_Validation } from '@/services/Validation'
import { AxiosError } from 'axios'
import { useForm } from 'react-hook-form'
import { FaCheckCircle } from 'react-icons/fa'
import { IoMail } from 'react-icons/io5'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

export default function ForgetPassword() {
  const navigate=useNavigate()


  const {handleSubmit,formState:{errors,isSubmitting},register} = useForm<IForgetPassword>()
  const onSubmit = async (values:IForgetPassword) =>{
    console.log(values)
    try {
      const {data} = await publicUserAxiosInstance.post(AUTH_URLS.forgetPassword,values)
      toast.success(data?.message)
      navigate('/reset-password')
    } catch (error) {
      console.log(error)
      if (error instanceof AxiosError){
        console.log(error)
        toast.error(error.response?.data.message||'Something Went Wrong')
    }
  }
}
  return (
      <form onSubmit={handleSubmit(onSubmit)} className="mt-6" >
        <div className="h-screen flex flex-col justify-start">
          {/* email */}
          <CustomInput 
            register={register}
            rules={Email_Validation}
            name="email"
            placeholder="Type Your Email" 
            label="Email address"
            InputIcon={<IoMail className="text-xl" />}
            type="email"
            error={errors?.email?.message}
            />


            <div className="bottom flex justify-between items-center">
              <Button className="bg-white text-black hover:bg-white">
                {isSubmitting ?
                  <>
                    <div className="w-4 h-4 border-4 border-black border-t-transparent rounded-full animate-spin"></div>
                    <span>Loading...</span>
                  </>
                  :
                  "Send Email"
                } <FaCheckCircle/>
              </Button>
              
              <p className="text-white">Login? <Link to={'/login'} className="text-[#F8B55F] underline">click here</Link></p> 

            </div>

        </div>    
      </form>

  )

}
