import { GoogleLogin, CredentialResponse } from "@react-oauth/google";
import { useNavigate  } from "react-router-dom";
import { jwtDecode  } from "jwt-decode";
import { toast  } from "react-toastify";
import { useDispatch  } from "react-redux";
import { gSignUp, login } from "../../api/user";
import { setCredentials } from "../../store/slice/authSlice";

interface googleAuthProps  {
  userLogin: boolean;
  user: boolean;
}

interface decodeJwt {
   name: string;
   email: string;
   password: string;
}

const GoogleSignup = ({ userLogin, user }: googleAuthProps) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const gsignup = async (res: CredentialResponse) => {
    const result: decodeJwt = jwtDecode(res.credential as string)
    const data = {
     name: result.name,
     email: result.email,
     password: 'google@tickyourtour',
     isGoogle: true

    }
    if(user) {
      if(!userLogin) {
        const response = await gSignUp(data.name, data.email, data.password)
        if(!response?.data.data) {
          toast.error("Email already exists.Please Login")
          navigate('/login')
        } else {
          toast.success("Registration success please login")
        }
      } else {
        const res = await login(data.email, data.password) 
        if(!res?.data.success) {
          toast.error("User not found.Please signup")
          navigate('/signup')
        } else {
          toast.success("Login successfull")
          dispatch(setCredentials(res.data.token))
          navigate('/')
        }
      }
    }
  }
  return (
    <>
    <div className="flex justify-center">
      <div style={{width: "350px"}}>
        <GoogleLogin onSuccess={(credentialResponse) => {
          gsignup(credentialResponse)
         
        }} onError={()=>{
          console.log('login failed');
          
        }}/> 

      </div>
    </div>
    </>
  )
}

export default GoogleSignup