import React, { useEffect } from "react";
import { Formik, Form, Field , ErrorMessage } from 'formik';
import { useDispatch,useSelector } from "react-redux";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLock } from '@fortawesome/free-solid-svg-icons'
import { clearState, login } from "../../features/blog/userSlice";
import { useToasts } from "react-toast-notifications";
import Load from "../load/Load";
import ErrorMsg from "../utils/errorMsg"
import * as Yup from "yup";
import "./auth.css"


const Login = () => {

  const{isSuccess,isError,errMessage,isLoading,userInfo} = useSelector((state)=>state.user)
  const dispatch = useDispatch();
  const history = useHistory()
  const { addToast:notify } = useToasts()

  const onSubmit = async(values)=>{
    dispatch(login(values))
  }

  useEffect(()=>{
    dispatch(clearState())
  },[dispatch])

  useEffect(()=>{
    if(isSuccess){
      dispatch(clearState())
      notify(`Welcome ${userInfo.username} You Have Successfully Logged In`,
      {appearance: 'success',autoDismiss:"true"})
      history.push("/")
    }
  },[isError,isSuccess,dispatch])

  const schema = () =>{
    const schema = Yup.object().shape({
      username:Yup.string().min(2, 'Too Short!').required("required"),
      password:Yup.string().min(6, 'Too Short!').required("required"),
    })
    return schema
  }

  if(isLoading){
    return <Load />
  }
  return (
    <div className="auth">
        <div className="auth-content">
          <div className="auth-header">
            <span><FontAwesomeIcon icon={faLock} /></span>
            <span>Login</span>
          </div>
          {
            isError&&
            <ErrorMsg msg={errMessage} />
          }
          <Formik 
            initialValues={{
            userName:"",
            password:"",
            }}
            onSubmit={onSubmit}
            validationSchema={schema}
          >
            <Form>
              <div>
                <Field type="text" name="username" placeholder="Username*" />
                <ErrorMessage name="username" component="span" />
              </div>

              <div>
                <Field type="password" name="password" placeholder="Password*" />
                <ErrorMessage name="password" component="span" />
              </div>

              <button type="submit">Login</button>
              <div className="redirect">
                <span>Do you have account?</span>
                <span><Link to="/register">Register</Link></span>
              </div>
            </Form>
          </Formik>
        </div>
    </div>
  );
}

export default Login;
