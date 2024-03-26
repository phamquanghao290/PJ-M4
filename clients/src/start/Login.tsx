import React from 'react'
import { Link } from 'react-router-dom'
import publicAxios from '../config/privateAxios'
import Button from '@mui/material/Button'
import './register.scss'
import { failed, success } from '../components/ultil'

type Props = {
  email: string
  password: string
}
const Login = () => {
  const [user, setUser] = React.useState<Props>({
    email: "",
    password: ""
  })

  const handleGetValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUser({ ...user, [e.target.name]: e.target.value })
  }

  const handleLogin = async () => {
    try {
      const response = await publicAxios.post("/api/login", user)
      if (!user.email || !user.password) {
        failed("Vui lòng nhập đầy đủ thông tin")
        return
      }
      if (response.data.user.email === "admin@gmail.com") {
        success("Xin chào Admin nè")
        setTimeout(() => {
          window.location.href = "/admin"
        }, 1500)
        return
      }
      if (response.data.user.status === 1) {
        failed(response.data.message)
        return
      }
      localStorage.setItem("token", response.data.token)
      localStorage.setItem("userLogin", JSON.stringify(response.data.user))
      success(response.data.message)
      setTimeout(() => {
        window.location.href = "/"
      }, 1500)
    } catch (error: any) {
      failed("Tài khoản hoặc mật khẩu không đúng")
    }
  }

  return (
    <div className="flex items-center justify-evenly bg-blue-100 h-[100vh]">
      <div>
        <h1 className="text-6xl font-bold">Sign Up to</h1>
        <br />
        <br />
        <h2 className="text-4xl font-semibold">
          Future Book is simply
        </h2>
        <br />
        <br />
        <h3 className="text-1xl font-semibold">
          If you already have an account
          <br />
          <br />
          You can{" "}
          <Link
            to="/register"
            className=" text-blue-600 font-semibold"
          >
            Sign up here!
          </Link>
        </h3>
        <br />
        <h3 className="text-1xl font-semibold">
          or return to the{" "}
          <Link to="/" className="text-blue-600 font-semibold">
            Home
          </Link>{" "}
          page
        </h3>
      </div>
      <div className="my-20">
        <h1 className="text-5xl text-center text-blue-600 font-semibold ">
          Login
        </h1>
        <br />
        <br />
        <div className="flex flex-col border-black items-center ">
          <input
            className="border border-indigo-600 w-96 h-16 rounded-md pl-7"
            type="text"
            placeholder="Email"
            name="email"
            value={user.email}
            onChange={handleGetValue}
          />
          <br />
          <br />
          <input
            className="border border-indigo-600 w-96 h-16 rounded-md pl-7"
            type="password"
            placeholder="Mật Khẩu"
            name="password"
            value={user.password}
            onChange={handleGetValue}
          />
          <br />
          <br />
          <Button
            variant="contained"
            className="w-96 h-16"
            onClick={handleLogin}
          >
            Login
          </Button>
        </div>
      </div>
    </div>
  )
}

export default Login