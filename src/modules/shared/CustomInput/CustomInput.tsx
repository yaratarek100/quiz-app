import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-label";
import type { ReactNode } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
// import { , Path } from "react-hook-form";
import type { RegisterOptions, FieldValues ,UseFormRegister,Path} from "react-hook-form"; // Type-only imports


type Props<T extends FieldValues> = {
  name:  Path<T>;
  register: UseFormRegister<T>;
  rules?: RegisterOptions<T, Path<T>>;
  InputIcon?:ReactNode,
  label?: string;
  type?:string;
  placeholder?:string,
  password?:boolean,
  togglePass?:()=>void,
  error?:string
};

export default function CustomInput<T extends FieldValues>({
  name,
  register,
  rules,
  InputIcon,
  label,
  type,
  placeholder,
  password,
  togglePass,
  error
}: Props<T>) {
  return <>
  <div className="grid w-full  items-center gap-1.5 mb-6">
      <Label htmlFor="email" className="text-white mb-1 ">{label}    </Label>
      <div className="relative w-full">
  <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white">
{InputIcon}
  </span>
  <Input
    {...register(name,rules)}
    type={password?'text':type}
    placeholder={placeholder}
    className="pl-10 py-5 border-white border-2 text-white focus-visible:border-white focus-visible:outline-none focus-visible:ring-0 focus-visible:shadow-none"
  />
{togglePass!==undefined?   <button type="button"  aria-label={password ? "Hide password" : "Show password"} onClick={togglePass} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white">
  {password?  <FaEye className="text-xl" />:<FaEyeSlash className="text-xl"/>}
    </button>:null}
</div>
  {error&&<p className="text-[#ef4444]">{error}</p>}
    </div>

      </>
}
