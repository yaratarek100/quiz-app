export const Password_Validation = {
  required: "Password is Required",
  pattern: {
    value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{6,}$/,
    message:
      "The password must include at least one lowercase letter, one uppercase letter, one digit, one special character, and be at least 6 characters long.",
  },
};

export const Email_Validation = {
  required: "Email is Required",
  pattern: {
    value:
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    message: "Please Enter a valid Email",
  },
};

//change Password
export const Confirm_Password_Validation = (password: string) => ({
  required: "Confirmation password is required",
  validate: (value: string) => value === password || "Passwords do not match",
});
