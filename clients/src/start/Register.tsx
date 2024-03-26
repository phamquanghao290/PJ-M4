import React from 'react'
import { Link } from 'react-router-dom'
import publicAxios from '../config/privateAxios'
import Button from '@mui/material/Button'
import { success, failed } from '../components/ultil'
import './register.scss'


type Props = {
  userName: string
  email: string
  phone: string 
  password: string
  role: number
  status: number
  confirmPassword?: string
}

interface Error {
  errName: string
  errEmail: string
  errPhone: string
  errPass: string
  errConfirm: string
}

const Register = () => {
  const [newUser, setNewUser] = React.useState<Props>({
    userName: "",
    email: "",
    phone: "",
    password: "",
    role: 0,
    status: 0
  })

  const [errorInput, setErrorInput] = React.useState<Error>({
    errName: "",
    errEmail: "",
    errPhone: "",
    errPass: "",
    errConfirm: ""
  });
  

  const handleRegister = async () => {
    const err = {
      errName: "",
      errEmail: "",
      errPhone: "",
      errPass: "",
      errConfirm: ""
    }
    const regexName = /^.{4,}$/;
    const regexEmail = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    const regexPhone = /^(0|\+84)\d{9,10}$/;
    const regexPass = /^(?=.*[A-Za-z])(?=.*\d).{6,}$/;
    let check = true;

    if (!regexName.test(newUser.userName)) {
      err.errName = "Tên phải có 6 kí tự trở nên";
      check = false;
    }

    if (!regexEmail.test(newUser.email)) {
      err.errEmail = "Email chưa đúng định dạng";
      check = false;
    }

    if (!regexPhone.test(newUser.phone)) {
      err.errPhone = "Số điện thoại chưa đúng định dạng";
      check = false;
    }

    if (!regexPass.test(newUser.password)) {
      err.errPass = "Mật khẩu phải có 6 kí tự trở lên và có cả chữ số";
      check = false;
    }

    if (!(newUser.password == newUser.confirmPassword)) {
      err.errConfirm = "Mật khẩu không khớp";
      check = false;
    }
    if (!check) {
      setErrorInput(err);
      return;
    } else {
      const response = await publicAxios.post("/api/register", newUser);
      console.log("11111", response.data.data);
      success(response.data.message)
      setTimeout(() => {
        window.location.href = "/login"
      }, 1500)
    }
  }

  const handleGetValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewUser({...newUser,[e.target.name]: e.target.value})
  }     


  return (
    <div className="flex items-center justify-evenly h-[100vh] bg-blue-100">
      <div>
        <h1 className="text-6xl font-bold">Sign In to</h1>
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
          <Link to="/login" className=" text-blue-600 font-semibold">
            Sign in here!
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
          Sign Up
        </h1>
        <br />
        <div className="flex flex-col border-black ">
          <input
            className="border border-indigo-600 w-96 h-16 rounded-md pl-7"
            type="text"
            placeholder="Tên Đăng Nhập"
            name="userName"
            value={newUser.userName}
            onChange={handleGetValue}
          />
          <p id="userName-error" className="text-start" style={{ color: "red" }}>
            {errorInput.errName}
          </p>
          <br />
          <input
            className="border border-indigo-600 w-96 h-16 rounded-md pl-7"
            type="number"
            placeholder="Số Điện Thoại"
            name="phone"
            value={newUser.phone}
            onChange={handleGetValue}
          />
          <p id="phone-error" style={{ color: "red" }}>
            {errorInput.errPhone}
          </p>
          <br />
          <input
            className="border border-indigo-600 w-96 h-16 rounded-md pl-7"
            type="text"
            placeholder="Email"
            name="email"
            value={newUser.email}
            onChange={handleGetValue}
            required
          />
          <p id="email-error" style={{ color: "red" }}>
            {errorInput.errEmail}
          </p>
          <br />
          <input
            className="border border-indigo-600 w-96 h-16 rounded-md pl-7"
            type="password"
            placeholder="Mật Khẩu"
            name="password"
            value={newUser.password}
            onChange={handleGetValue}
          />
          <p id="password-error" style={{ color: "red" }}>
            {errorInput.errPass}
          </p>
          <br />
          <input
            className="border border-indigo-600 w-96 h-16 rounded-md pl-7"
            type="password"
            placeholder="Nhập lại mật Khẩu"
            name="confirmPassword"
            value={newUser.confirmPassword}
            onChange={handleGetValue}
          />
          <p id="confirm-password-error" style={{ color: "red" }}>
            {errorInput.errConfirm}
          </p>
          <br />
          <Button
            className="w-96 h-16"
            variant="contained"
            onClick={handleRegister}
          >
            Sign Up
          </Button>
        </div>
      </div>
    </div>
  )
}

export default Register