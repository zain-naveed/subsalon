import CreateSalon from "../Pages/Auth/Owner/createSaloon";
import {
  ChangePassword, CreatePassword, Email, EmailReset,
  ForgetPassword, Profile,
  Settings, SignIn, SignUp, Welcome
} from "../Pages/index";
import Landing from "../Pages/Landing/landing";
import MyJobs from "../Pages/My job/MyJob";
import MyFavourite from "../Pages/myfavourite/index";
import Notification from "../Pages/Notification/Notification";
import OwnerDashboard from "../Shared/Components/Dashboards/OwnerDashboard";
import DashborasdFindJobs from "../Shared/Components/Dashboards/professionalsFindJobs";
import DashborasdFindSalons from "../Shared/Components/Dashboards/ProfessionalsFindSalon";
import { Princing } from "../Shared/index";
// import SalonSettings from "../Pages/Salon_Settings/salonSettings"
import Applicant from "../Pages/Applicants/applicant";
import ProfileSetUp from "../Pages/Auth/SignUp/ProfileSetUp";
import SignUpOwner from "../Pages/Auth/SignUp/SignUpOwner";
import SignUpProvider from "../Pages/Auth/SignUp/signUpProvider";
import Chat from "../Pages/chat";
import Inquiry from "../Pages/inquiry/Inquiry";
import JobDetails from "../Pages/JobDetails/JobDetailMain";
import JobListings from "../Pages/JobListings/JobListings";
import FavsOwner from "../Pages/myfavourite/OwnerFavrout/FavsOwner";
import MyReview from "../Pages/myReview";
import JobList from "../Pages/Post/JobList";
import SalonSettings from "../Pages/Salon_Settings/salonSettings";
import { SaloonDetails } from "../Pages/Saloon_detail/SaloonDetails";
import OwnerFindJob from "../Shared/Components/Dashboards/OwnerFindJobs";
import FindJob from "../Shared/Components/JobSearch/professionalsFindJobs";
import Pricing from "../Shared/Components/Pricing/pricing";
// import Solo from "../Pages/autocomplete/Solo";
import ApplicantsTable from "../Pages/Applicants/ApplicantsTable";
import EmailAuthentication from "../Pages/Auth/SignUp/EmailAuthenticate";
import EmailVerified from "../Pages/Auth/SignUp/EmailVerified";
import FreeSolo from "../Pages/autocomplete/FreeSolo";
import PrivacyPolicy from "../Pages/Privacy&Terms/PrivacyPolicy";
import TermsCondition from "../Pages/Privacy&Terms/TermsCondition";
import CandidateProfile from "../Pages/Profile/CandidateProfile";
import Captcha from "../Pages/recaptcha/Captcha";
import Terms from "../Pages/Terms&Condition/terms";
import OwnerFindJobs from "../Shared/Components/JobSearch/OwnerFindJob";

const publicRoute = [
  {
    path: "/Terms",
    title: "Sign Up",
    component: Terms,
    isClientHeader: false,
    isOwner: false,
  },
  {
    path: "/signUpOwner",
    title: "Sign Up",
    component: SignUpOwner,
    isClientHeader: false,
    isOwner: false,
  },
  {
    path: "/signUpProvider",
    title: "Signup",
    component: SignUpProvider,
    isClientHeader: false,
    isOwner: false,
  },
  {
    path: "/signup",
    title: "Signup",
    component: SignUp,
    isClientHeader: false,
    isOwner: false,
  },
  {
    path: "/login_",
    title: "Login",
    component: Welcome,
    isClientHeader: false,
    isOwner: false,
  },
  {
    path: "/Login",
    title: "Login",
    component: SignIn,
    isClientHeader: false,
    isOwner: false,
  },
  {
    path: "/change-password/:id",
    title: "Change Password",
    component: ChangePassword,
    isClientHeader: false,
    isOwner: false,
  },
  {
    path: "/email-reset",
    title: "Reset Email",
    component: EmailReset,
    isClientHeader: false,
    isOwner: false,
  },
  {
    path: "/forget-password",
    title: "Fortgot Password",
    component: ForgetPassword,
    isClientHeader: false,
    isOwner: false,
  },
  {
    path: "/create-password",
    title: "Password",
    component: CreatePassword,
    isClientHeader: false,
    isOwner: false,
  },
  {
    path: "/",
    title: "Home",
    component: Landing,
    isClientHeader: false,
    isOwner: false,
  },
  {
    path: "/email-verified",
    title: "Email Verified",
    component: EmailVerified,
    isClientHeader: false,
    isOwner: false,
  },
  {
    path: "/email-authentication",
    title: "Verify Your Email",
    component: EmailAuthentication,
    isClientHeader: false,
    isOwner: false,
  },
  {
    path: "/salonDetail/:id",
    title: "Saloon Detail",
    component: SaloonDetails,
    isClientHeader: false,
    isOwner: false,
  },
  {
    path: "/recaptcha",
    title: "Captcha",
    component: Captcha,
    isClientHeader: false,
    isOwner: false,
  },
  {
    path: "/privacypolicy",
    title: "Privacy Policy",
    component: PrivacyPolicy,
    isClientHeader: false,
    isOwner: false,
  },
  {
    path: "/termsconditions",
    title: "Terms Condition",
    component: TermsCondition,
    isClientHeader: false,
    isOwner: false,
  },
];
const privateRoute = [
  {
    path: "/email-authentication",
    title: "Verify Your Email",
    component: EmailAuthentication,
    isClientHeader: false,
    isOwner: false,
  },
  {
    path: "/email-verified",
    title: "Email Verified",
    component: EmailVerified,
    isClientHeader: false,
    isOwner: false,
  },

  {
    path: "/",
    title: "Home",
    component: Landing,
    isClientHeader: false,
    isOwner: false,
  },
  {
    path: "/profile-setup",
    title: "Profile Set Up",
    component: ProfileSetUp,
    isClientHeader: false,
    isOwner: false,
  },
  {
    path: "/plan",
    title: "Plan",
    component: Pricing,
    isClientHeader: false,
    isOwner: false,
  },
  {
    path: "/email",
    title: "Home",
    component: Email,
    isClientHeader: false,
    isOwner: false,
  },
  {
    path: "/chat",
    title: "Message",
    component: Chat,
    isClientHeader: true,
    isOwner: false,
  },
  {
    path: "/profile-setup",
    title: "Profile Set Up",
    component: ProfileSetUp,
    isClientHeader: false,
    isOwner: false,
  },
  {
    path: "/owner/jobs",
    title: "Jobs",
    component: JobListings,
    isClientHeader: false,
    isOwner: true,
  },
  {
    path: "/myReview",
    title: "My Review",
    component: MyReview,
    isClientHeader: true,
    isOwner: false,
  },
  {
    path: "/profile",
    title: "Profile",
    component: Profile,
    isClientHeader: true,
    isOwner: false,
  },
  {
    path: "/notification",
    title: "Notifications",
    component: Notification,
    isClientHeader: true,
    isOwner: false,
  },
  {
    path: "/setting",
    title: "Setting",
    component: Settings,
    isClientHeader: true,
    isOwner: false,
  },
  {
    path: "/Subscriptions",
    title: "Plan",
    component: Princing,
    isClientHeader: true,
    isOwner: false,
  },
  {
    path: "/findjob",
    title: "Findjob",
    component: FindJob,
    isClientHeader: true,
    isOwner: false,
  },
  {
    path: "/professionals/findjob",
    title: "Professionals",
    component: DashborasdFindJobs,
    isClientHeader: true,
    isOwner: false,
  },
  {
    path: "/professionals/findsalon",
    title: "Jobs",
    component: DashborasdFindSalons,
    isClientHeader: true,
    isOwner: false,
  },

  {
    path: "/my-jobs",
    title: "My Jobs",
    component: MyJobs,
    isClientHeader: true,
    isOwner: false,
  },
  {
    path: "/myfavourite",
    title: "Favourites",
    component: MyFavourite,
    isClientHeader: true,
    isOwner: false,
  },
  {
    path: "/owner/create-setting",
    title: "Saloon Setting",
    component: SalonSettings,
    isClientHeader: false,
    isOwner: true,
  },
  {
    path: "/salonDetail/:id",
    title: "Saloon Detail",
    component: SaloonDetails,
    isClientHeader: true,
    isOwner: false,
  },
  {
    path: "/inquiry",
    title: "Inquiry & Feedback",
    component: Inquiry,
    isClientHeader: true,
    isOwner: false,
  },
  {
    path: "/autocomp",
    title: "autoComplete",
    component: FreeSolo,
    isClientHeader: false,
    isOwner: true,
  },
  {
    path: "/candidate/:id",
    title: "Candidate profile",
    component: CandidateProfile,
    isClientHeader: true,
    isOwner: false,
  },
  {
    path: "/privacypolicy",
    title: "Privacy Policy",
    component: PrivacyPolicy,
    isClientHeader: true,
    isOwner: false,
  },
  {
    path: "/termsconditions",
    title: "Terms Condition",
    component: TermsCondition,
    isClientHeader: true,
    isOwner: false,
  },
];
const ownerRoute = [
  {
    path: "/salonDetail/:id",
    title: "Saloon Detail",
    component: SaloonDetails,
    isClientHeader: false,
    isOwner: true,
  },

  {
    path: "/email-authentication",
    title: "Verify Your Email",
    component: EmailAuthentication,
    isClientHeader: false,
    isOwner: false,
  },
  {
    path: "/email-verified",
    title: "Email Verified",
    component: EmailVerified,
    isClientHeader: false,
    isOwner: false,
  },
  {
    path: "/create-salon",
    title: "Create Saloon",
    component: CreateSalon,
    isClientHeader: false,
    isOwner: false,
  },
  {
    path: "/Subscriptions",
    title: "Subscriptions",
    component: Princing,
    isClientHeader: false,
    isOwner: true,
  },
  {
    path: "/plan",
    title: "Plan",
    component: Pricing,
    isClientHeader: false,
    isOwner: false,
  },
  {
    path: "/owner/create-setting",
    title: "Saloon Setting",
    component: SalonSettings,
    isClientHeader: false,
    isOwner: true,
  },
  {
    path: "/post",
    title: "Post a job",
    component: JobList,
    isClientHeader: false,
    isOwner: true,
  },
  {
    path: "/Listings",
    title: "Job Listings",
    component: JobListings,
    isClientHeader: false,
    isOwner: true,
  },
  {
    path: "/job-details/:id",
    title: "Job Detail",
    component: JobDetails,
    isClientHeader: false,
    isOwner: true,
  },
  {
    path: "/applicant-info/:id",
    title: "Information",
    component: Applicant,
    isClientHeader: false,
    isOwner: true,
  },
  {
    path: "/candidate/:id",
    title: "Candidate profile",
    component: CandidateProfile,
    isClientHeader: false,
    isOwner: true,
  },
  {
    path: "/owner/create-setting",
    title: "Saloon Setting",
    component: SalonSettings,
    isClientHeader: false,
    isOwner: true,
  },
  {
    path: "/create-salon",
    title: "Create Saloon",
    component: CreateSalon,
    isClientHeader: false,
    isOwner: false,
  },
  {
    path: "/owner/dashboard",
    title: "My Jobs",
    component: OwnerDashboard,
    isClientHeader: false,
    isOwner: true,
  },
  {
    path: "/",
    title: "Home",
    component: Landing,
    isClientHeader: false,
    isOwner: false,
  },
  {
    path: "/owner/jobs",
    title: "Jobs",
    component: JobListings,
    isClientHeader: false,
    isOwner: true,
  },
  {
    path: "/profile",
    title: "Profile",
    component: Profile,
    isClientHeader: false,
    isOwner: true,
  },
  {
    path: "/notification",
    title: "Notifications",
    component: Notification,
    isClientHeader: false,
    isOwner: true,
  },
  {
    path: "/setting",
    title: "Setting",
    component: Settings,
    isClientHeader: false,
    isOwner: true,
  },
  {
    path: "/owner/professional",
    title: "professional",
    component: OwnerFindJob,
    isClientHeader: false,
    isOwner: true,
  },
  {
    path: "/professional",
    title: "professional",
    component: OwnerFindJobs,
    isClientHeader: false,
    isOwner: true,
  },

  {
    path: "/chat",
    title: "Message",
    component: Chat,
    isClientHeader: false,
    isOwner: true,
  },
  {
    path: "/salon-settings",
    title: "Settings",
    component: SalonSettings,
    isClientHeader: false,
    isOwner: true,
  },
  {
    path: "/professionalfavourite",
    title: "Favourites",
    component: FavsOwner,
    isClientHeader: false,
    isOwner: true,
  },
  {
    path: "/allApplicants",
    title: "allApplicants",
    component: ApplicantsTable,
    isClientHeader: false,
    isOwner: true,
  },
  {
    path: "/privacypolicy",
    title: "Privacy Policy",
    component: PrivacyPolicy,
    isClientHeader: false,
    isOwner: true,
  },
  {
    path: "/termsconditions",
    title: "Terms Condition",
    component: TermsCondition,
    isClientHeader: false,
    isOwner: true,
  },
  {
    path: "/inquiry",
    title: "Inquiry & Feedback",
    component: Inquiry,
    isClientHeader: false,
    isOwner: true,
  },
];
export { publicRoute, privateRoute, ownerRoute };
