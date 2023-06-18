import React, { useState, useEffect } from 'react'
import { userService } from '../services/user.service'
import { LoginSocialFacebook } from 'reactjs-social-login'
import { FacebookLoginButton } from 'react-social-login-buttons'
import { useGoogleLogin } from '@react-oauth/google'
import emailjs from 'emailjs-com'
import {
  eventBus,
  showErrorMsg,
  showSuccessMsg,
} from '../services/event-bus.service'
import axios from 'axios'
const Signup = (props) => {
  const [user, setUser] = useState([])
  const [fullname, setFullname] = useState('')
  const [email, setEmail] = useState('')
  const doSignup = (event) => {
    event.preventDefault()
    userService.signup(fullname)
    props.history.push('/weather')
    let synth = window.speechSynthesis
    let utterThis = new SpeechSynthesisUtterance(
      `Hello ${fullname} welcomt to weather  application`
    )
    synth.speak(utterThis)
    if (email) {
      emailjs
        .send(
          process.env.REACT_APP_SERVICE_ID,
          process.env.REACT_APP_TEMPLATE_ID,
          {
            user_name: fullname,
            user_email: email,
          },
          process.env.REACT_APP_USER_ID
        )
        .then((response) => {
          showSuccessMsg('Email successfully sent! Check your email')
        })
        .catch((error) => {
          showErrorMsg('Email failed sent!', error)
        })
    } else {
      console.error('Error: email is empty or undefined')
    }
  }

  const handleEmailChange = (event) => {
    setEmail(event.target.value)
  }

  const handleResolve = (res) => {
    userService.signup(res.data.first_name)
    console.log('res.data', res.data)
  }

  const handleReject = (error) => {
    console.log('error', error)
  }

  const handleFullnameChange = (event) => {
    setFullname(event.target.value)
  }

  const login = useGoogleLogin({
    onSuccess: (codeResponse) => setUser(codeResponse),
    onError: (error) => console.log('Login Failed:', error),
  })
  useEffect(() => {
    if (user) {
      axios
        .get(
          `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user.access_token}`,
          {
            headers: {
              Authorization: `Bearer ${user.access_token}`,
              Accept: 'application/json',
            },
          }
        )
        .then((res) => {
          userService.signup(res.data.given_name)
          props.history.push('/weather')
          let synth = window.speechSynthesis
          let utterThis = new SpeechSynthesisUtterance(
            `Hello ${res.data.given_name} welcomt to weather  application`
          )
          synth.speak(utterThis)
          console.log('res.data', res.data)
        })
        .catch((err) => console.log(err))
    }
  }, [user])

  return (
    <div className="signup-container">
      <section className="signup-modal">
        <form className="signup-form" onSubmit={doSignup}>
          <h2>Signup</h2>
          <input
            type="text"
            value={fullname}
            placeholder="Your fullname"
            onChange={handleFullnameChange}
          />
          <input
            type="email"
            value={email}
            placeholder="Your email"
            onChange={handleEmailChange}
          />
          <button type="submit">Signup</button>
        </form>
        <div className="divider">
          <div className="line"></div>
          <span>OR</span>
          <div className="line"></div>
        </div>
        <LoginSocialFacebook
          appId={process.env.REACT_APP_FACEBOOK_APP_ID}
          onResolve={handleResolve}
          onReject={handleReject}
        >
          <FacebookLoginButton className="facebook-button"></FacebookLoginButton>
        </LoginSocialFacebook>
        <div className="divider">
          <div className="line"></div>
          <span>OR</span>
          <div className="line"></div>
        </div>
        <div onClick={() => login()} className="google-btn">
          <div className="google-icon-wrapper">
            <img
              className="google-icon"
              src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"
            />
          </div>
          <p className="btn-text">Log in with google</p>
        </div>
      </section>
    </div>
  )
}

export default Signup
