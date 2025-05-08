export const Password_Validation={
    required:'Password is Required',
    pattern:{
      value:/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{6,}$/,
     message:"The password must include at least one lowercase letter, one uppercase letter, one digit, one special character, and be at least 6 characters long."
   }
  }
  
   
  export const Email_Validation={
    required:'Email is Required',
    pattern:{
      value:/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      message:'Please Enter a valid Email'
     }
   }

export const USER_NAME_VALIDATION={
  required:"First Name is Required",
  pattern: {
    value: /^[A-Za-z0-9]+$/ ,
    message:"Please Enter valid Name"
  }}
export const LAST_NAME_VALIDATION={
  required:"Last Name is Required",
  pattern: {
    value: /^[A-Za-z0-9]+$/ ,
    message:"Please Enter valid Name"
  }}

  
// })
// export const COUNTRY_VALIDATION=(t: Function)=>({
// required:t("Validation.country-message"),
// pattern: {
//   value: /^[A-Za-z\s]+$/,
//   message:("Validation.country-required"),
// },
// })

// export const PHONE_VALIDATION=(t: Function)=>({
// required:t("Validation.Phone-required"),
// pattern: {
//   value: /^\(?([0-9]{4})\)?[-.\s]?([0-9]{3})[-.\s]?([0-9]{4})$/,
//   message: t("Validation.Phone-message"), },
// })
// export const EMAIL_VALIDATION=(t: Function)=>({
//   required:t("Validation.Email-required"),
//   pattern: {
//     value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/,
//     message:t("Validation.Email-message"),
//   },
// })

// export const PASSWORD_VALIDATION=(t: Function)=>({
//   required: t("Validation.Password-required"),
//   pattern: {
//     value: /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!&$%&?@"]).{6,}$/,
//     message:t("Validation.Password-message"),
//   },
// })
// export const CONFIRMPASSWORD_VALIDATION=(t: Function)=>({
//   required:  t("Validation.confirmPassword-required"),
//   pattern: {
//     value: /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!&$%&? "]).{6,}$/,
//     // message: "confirmPassword must match Password ",
//     message: t("Validation.confirmPassword-message"),

//   },
// })
// export const EmailValidation_Forget=(t: Function)=>({
//   required: t("Validation.Email-required"),
//   pattern:{
//     value:/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
//     message: t("Validation.valid-email")
//    }
//  })
// export const SeedValidation_Reset=(t: Function)=>({
//   required: t("Validation.OTP-required"),
//   minLength:{
//       value:4,
//       message: t("Validation.OTP-message")
//      }
// })
// export const PasswordValidation_Reset=(t: Function)=>({
//   required:t("Validation.Password-required"),
//   validate: {
//     hasLowerCase: (value: string) =>
//       /[a-z]/.test(value) || t("Validation.Password-hasLowerCase"),
//     hasUpperCase: (value: string) =>
//       /[A-Z]/.test(value) || t("Validation.Password-hasUpperCase"),
//     hasNumber: (value: string) =>
//       /\d/.test(value) || t("Validation.Password-hasNumber"),
//     hasSpecialChar: (value: string) =>
//       /[\W_]/.test(value) || t("Validation.Password-hasSpecialChar"),
//     minLength: (value: string) =>
//       value.length >= 6 ||t("Validation.Password-minLength"),
//   }
// })

// export const PasswordComfirmValidation_Reset=(t: Function)=>({
//     required:t("Validation.confirmPassword-required")
//    })

// // rooms validation
// export const RoomNumber_Validation = (t: Function) => ({
//   required: t("room.RoomNumberRequired"),
//   min: {
//     value: 1,
//     message: t("room.RoomNumberMin"),
//   },
//   max: {
//     value: 9999,
//     message: t("room.RoomNumberMax"),
//   },
// });

// export const RoomPrice_Validation = (t: Function) => ({
//   required: t("room.PriceRequired"),
//   min: {
//     value: 500,
//     message: t("room.PriceMin"),
//   },
// });

// export const Capacity_Validation = (t: Function) => ({
//   required: t("room.CapacityRequired"),
//   min: {
//     value: 1,
//     message: t("room.CapacityMin"),
//   },
//   max: {
//     value: 10,
//     message: t("room.CapacityMax"),
//   },
// });

// export const Discount_Validation = (t: Function) => ({
//   required: t("room.DiscountRequired"),
//   min: {
//     value: 0,
//     message: t("room.DiscountMin"),
//   },
//   max: {
//     value: 100,
//     message: t("room.DiscountMax"),
//   },
// });

// export const Facilities_Validation = (t: Function) => ({
//   required: t("room.FacilitiesRequired"),
// }); 

// export const Room_Rewiew_Validation = (t: Function) => ({
//   required: t("room.RoomReviewRequired"),
// }); 
// export const Room_Rate_Validation = (t: Function) => ({
//   required: t("room.RoomRateRequired"),
// }); 
// export const Room_Comment_Validation = (t: Function) => ({
//   required: t("room.RoomCommentRequired"),
// }); 