import { Button } from "@/components/ui/button";
import CustomInput from "@/modules/shared/CustomInput/CustomInput";
import { privateUserAxiosInstance } from "@/services/Axiosinstance";
import { AUTH_URLS } from "@/services/Urls";
import {
  Confirm_Password_Validation,
  Password_Validation,
} from "@/services/Validation";
import { AxiosError } from "axios";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { FaCheckCircle } from "react-icons/fa";
import { IoKeyOutline } from "react-icons/io5";
import { toast } from "react-toastify";

interface ChangePasswordData {
  password: string;
  password_new: string;
  confirmPassword: string;
}

const ChangePassword = () => {
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const toggleOldPass = () => setShowOldPassword(!showOldPassword);
  const toggleNewPass = () => setShowNewPassword(!showNewPassword);
  const toggleconfirmPass = () => setShowConfirmPassword(!showConfirmPassword);

  const {
    register,
    handleSubmit,
    watch,
    trigger,
    formState: { errors, isSubmitting },
  } = useForm<ChangePasswordData>();

  
const password_new=watch("password_new");
const confirmPassword=watch("confirmPassword");
  useEffect(()=>{
   if(confirmPassword){
     trigger("confirmPassword")
   }
 },[password_new,confirmPassword,trigger])
  const onSubmit = async (data: ChangePasswordData) => {
    console.log("data", data);
    const { confirmPassword, ...payload } = data;

    try {
      const response = await privateUserAxiosInstance.post(
        AUTH_URLS.changePassword,
        payload
      );
      toast.success(response.data.message || "Record updated successfully!");
    } catch (error) {
      if (error instanceof AxiosError) {
        console.log(error);
        toast.error(error.response?.data.message || "Something Went Wrong");
      }
    }
  };
  return (
    <div>
      <form  onSubmit={handleSubmit(onSubmit)}>
        <CustomInput
          register={register}
          rules={Password_Validation}
          name="password"
          placeholder="Type Your Password"
          label="Old Password"
          InputIcon={<IoKeyOutline className="text-xl" />}
          type={showOldPassword ? "text" : "password"}
          error={
            typeof errors?.password?.message === "string"
              ? errors.password.message
              : undefined
          }
          togglePass={toggleOldPass}
          password={showOldPassword}
        />
        <CustomInput
          register={register}
          rules={Password_Validation}
          name="password_new"
          placeholder="Type Your Password"
          label="new Password"
          InputIcon={<IoKeyOutline className="text-xl" />}
          type={showNewPassword ? "text" : "password"}
          error={
            typeof errors?.password_new?.message === "string"
              ? errors.password_new.message
              : undefined
          }
          togglePass={toggleNewPass}
          password={showNewPassword}
        />
        <CustomInput
          register={register}
          rules={Confirm_Password_Validation(watch("password_new"))}
          name="confirmPassword"
          placeholder="Re-enter Your Password"
          label="confirm Password"
          InputIcon={<IoKeyOutline className="text-xl" />}
          type={showConfirmPassword ? "text" : "password"}
          error={
            typeof errors?.confirmPassword?.message === "string"
              ? errors.confirmPassword.message
              : undefined
          }
          togglePass={toggleconfirmPass}
          password={showConfirmPassword}
        />
        <Button size="default" variant="default" className="gap-3">
          {isSubmitting ? "Loading" : "Change"}
          <FaCheckCircle className="text-4xl" />
        </Button>
      </form >
    </div>
  );
};

export default ChangePassword;
