import * as Yup from "yup";

const licenseValidation = Yup.object().shape({
  name: Yup.string().max(50, "Too Long!").required("Required"),
  number: Yup.string().max(50, "Too Long!").required("Required"),
});

const EditProfileScheme = Yup.object().shape({
  location: Yup.string().required("Required"),
  rate: Yup.number().required("Required").min(1),
  jobType: Yup.string(),
});

const passwordOnly = Yup.object().shape({
  password: Yup.string()
    .min(4, "Password Too Short")
    .required("Password Required"),
});

const confirmSchema = Yup.object().shape({
  password: Yup.string().required("Password Required"),
  confirmPassword: Yup.string()
    .required("Confirm Your Password")
    .oneOf([Yup.ref("password"), null], "Passwords must match"),
});

const ChangePasswordSchema = Yup.object().shape({
  current: Yup.string().min(8).required("Password Required"),
  password: Yup.string().min(8).required("Password Required"),
  confirmPassword: Yup.string()
    .min(8)
    .required("Confirm Your Password")
    .oneOf([Yup.ref("password"), null], "Passwords must match"),
});

const emailAndPassword = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email Required"),
  password: Yup.string().min(4, "Password Too Short").required("Required"),
});

const emailOnly = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email Required"),
});

const nameOnly = Yup.object().shape({
  name: Yup.string().required("Name Required"),
});

const CardSchema = Yup.object().shape({
  name: Yup.string().required("Required"),
  cardNo: Yup.string().required("Required"),
  expiry: Yup.string().required("Required"),
  cvc: Yup.string().required("Required"),
});

const FormSchemaOwner = Yup.object().shape({
  password: Yup.string()
    .min(4, "Password Too Short")
    .required("Password Required"),
  confirmPassword: Yup.string()
    .required("Confirm Your Password")
    .oneOf([Yup.ref("password"), null], "Passwords must match"),
  name: Yup.string().required("Name Required"),
  email: Yup.string().email("Invalid email").required("Email Required"),
  phone: Yup.number().required("Phone Number Required"),


});

const FormSchema = Yup.object().shape({
  
  password: Yup.string()
    .min(4, "Password Too Short")
    .required("Password Required"),
  confirmPassword: Yup.string()
    .required("Confirm Your Password")
    .oneOf([Yup.ref("password"), null], "Passwords must match"),
  name: Yup.string().required("Name Required"),
  email: Yup.string().email("Invalid email").required("Email Required"),
  phone: Yup.number().required("Phone Number Required").min(8,"Must be 8 digit"),

});

const PostAJob = Yup.object().shape({
  JobTitle: Yup.string().required("Job title is required"),
  reqEquip: Yup.string().required("Equiment(s) are required"),
  JobDescription: Yup.string().required("Job description is required"),
  Minimum: Yup.number().min(1).required("Minimum is required"),
  Maximum: Yup.number().min(1).required("Maximum is required"),
  // .when(['Minimum','Minimum2'],(Minimum,Minimum1,schema)=>{
  //   return Minimum > 0 && Minimum1 > 0 ? schema.max(Minimum/Minimum1):schema.max(0);
  // }),
  tag: Yup.array().min(1),
  // terms: Yup.bool().required().oneOf([true],"Required")
});

const PostAJobPartTime = Yup.object().shape({
  JobTitle: Yup.string().required("Job title is required"),
  reqEquip: Yup.string().required("Equiment(s) are required"),
  JobDescription: Yup.string().required("Job description is required"),
  Minimum: Yup.number().min(1).required("Minimum is required"),
  Maximum: Yup.number().min(1).required("Maximum is required"),
  tag: Yup.array().min(1),
  NumberOfHours: Yup.number()
    .positive("Working Hours must be greater than 0")
    .max(24, "Working Hours must be less than or equal to 24")
    .required("Working Hours is Required"),
});
const inquireFeedbackValidation = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email Required"),
  reason: Yup.string().required("Support Reason Field is required"),
  description: Yup.string().required("Description is required"),
});

const PostAJobWithComm = Yup.object().shape({
  JobTitle: Yup.string().required("Job title is required"),
  reqEquip: Yup.string().required("Equiment(s) are required"),
  JobDescription: Yup.string().required("Job description is required"),
  Commission: Yup.number().min(1).required("Commission is required"),
  // .when(['Minimum','Minimum2'],(Minimum,Minimum1,schema)=>{
  //   return Minimum > 0 && Minimum1 > 0 ? schema.max(Minimum/Minimum1):schema.max(0);
  // }),
  tag: Yup.array().min(1),
  // terms: Yup.bool().required().oneOf([true],"Required")
});

const PostAJobWithCommPartTime = Yup.object().shape({
  JobTitle: Yup.string().required("Job title is required"),
  reqEquip: Yup.string().required("Equiment(s) are required"),
  JobDescription: Yup.string().required("Job description is required"),
  Commission: Yup.number().min(1).required("Commission is required"),
  tag: Yup.array().min(1),
  NumberOfHours: Yup.number()
    .positive("Working Hours must be greater than 0")
    .max(24, "Working Hours must be less than or equal to 24")
    .required("Working Hours is Required"),
});

export {
  passwordOnly,
  confirmSchema,
  emailOnly,
  licenseValidation,
  nameOnly,
  emailAndPassword,
  ChangePasswordSchema,
  CardSchema,
  FormSchema,
  FormSchemaOwner,
  EditProfileScheme,
  PostAJob,
  PostAJobWithComm,
  inquireFeedbackValidation,
  PostAJobPartTime,
  PostAJobWithCommPartTime,
};
