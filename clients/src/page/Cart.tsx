import React, { useEffect, useState } from "react";
import { Button } from "@mui/material";
import axios from "axios";
import Modal from "react-bootstrap/Modal";
import { Link } from "react-router-dom";
import { success, failed } from "../components/ultil";
import { useNavigate } from "react-router-dom";
import publicAxios from "../config/publicAxios";

interface Address {
  code: number;
  name: string;
}

interface Cart {
  cartId: number;
  nameProduct: string;
  price: number;
  image: string;
  quantity: number;
}

function Cart() {
  const USDollar = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });

  const [inforBill, setInforBill] = useState<any>({
    nameInfor: "",
    phoneInfor: "",
    addressInfor: "",
  });
  const [errorInput, setErrorInput] = React.useState({
    errName: "",
    errPhone: "",
    errAddress: "",
  });

  const userLogin = JSON.parse(localStorage.getItem("userLogin") || "{}");
  const [flag, setFlag] = useState(false);
  const [total, setTotal] = useState<number>(0);
  const [dataCity, setDataCity] = useState([]);
  const [dataDistrict, setDataDistrict] = useState([]);
  const [dataWard, setDataWard] = useState([]);
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [district, setDistrict] = useState("");
  const [ward, setWard] = useState("");
  const [cart, setCart] = useState<any>([]);
  const [phone, setPhone] = useState("");
  const handleGetDataCity = async () => {
    let data = await axios.get(`https://provinces.open-api.vn/api/`);
    setDataCity(data.data);
  };

  const handleCity = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    let idCity = +e.target.value;
    const nameCity: any = dataCity.find((item: Address) => item.code == idCity);
    let data = await axios.get(
      `https://provinces.open-api.vn/api/p/${idCity}?depth=2`
    );
    setCity(nameCity.name);
    setDataDistrict(data.data.districts);
  };
  const handleDistrict = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    let idDistrict = +e.target.value;
    const nameDistrict: any = dataDistrict.find(
      (item: Address) => item.code == idDistrict
    );
    let data = await axios.get(
      `https://provinces.open-api.vn/api/d/${idDistrict}?depth=2`
    );
    setDistrict(nameDistrict.name);
    setDataWard(data.data.wards);
  };

  const handleGetCartByUser = async () => {
    try {
      const res = await publicAxios.get(`/api/cart/${userLogin.id}`)
      console.log(res.data)
      setCart(res.data)
    } catch (err) {
      console.log("day la loi", err)
    }
  }

  useEffect(() => {
    handleGetCartByUser();
  }, [flag])

  useEffect(() => {
    document.title = "Giỏ hàng"
    handleGetDataCity();
  }, []);
  const handleDecrease = async (id: number) => {
    const body = { cartId: id, type: "decrease" };
    console.log(body)
    try {
      await publicAxios.patch(`/api/cart`, body)
      setFlag(!flag)
    } catch (err) {
      console.log(err)
    }
  };

  const handleIncrease = async (id: number) => {
    const body = { cartId: id, type: "increase" };
    console.log(body);
    try {
      await publicAxios.patch(`/api/cart`, body)
      setFlag(!flag)
    } catch (err) {
      console.log(err)
    }
  }

  const handleDelete = async (id: number) => {
    if (window.confirm("Bạn muốn xóa sản phẩm ?")) {
      const res = await publicAxios.delete(`/api/cart/${id}`)
      setFlag(!flag)
      success(res.data.message)
    }
  }

  const handleTotalPrice = () => {
    let totalPrice = cart?.reduce((acc: number, item: Cart) => {
      return acc + item.price * item.quantity;
    }, 0);
    setTotal(totalPrice);
  };

  useEffect(() => {
    handleTotalPrice();
  }, [cart]);

  const [show, setShow] = useState(false)
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const navigate = useNavigate()

  const handleCheckOut = async () => {
    if (cart.length == 0) {
      failed("Không có sản phẩm nào trong giỏ hàng")
      return
    }
    if (!inforBill.nameInfor || !inforBill.phoneInfor) {
      failed("Vui lòng điền đầy đủ thông tin")
      return
    }
    const err = {
      errName: "",
      errPhone: "",
      errAddress: "",
    }

    const regexName = /^.{4,}$/;
    const regexPhone = /^(0|\+84)\d{9,10}$/;
    let check = true

    if (!regexName.test(inforBill.nameInfor)) {
      err.errName = "Tên phải từ 4 kí tự trở lên"
      check = false
    }

    if (!regexPhone.test(inforBill.phoneInfor)) {
      err.errPhone = "Số điện thoại chưa đúng định dạng"
      check = false
    }

    if (!check) {
      setErrorInput(err)
      return
    } else {
      const order = {
        userId: userLogin.id,
        // account: userLogin.userName,
        total,
        address: inforBill.addressInfor + " " + "," + ward + " " + district + " " + city,
        // view: cart,
        phone,
      }
      const response = await publicAxios.post("/api/order", order)
      const orderDetail = {
        orderDetailId: response.data.result,
        cart
      };
      console.log(orderDetail);
      await publicAxios.post("/api/orderDetail", orderDetail)
      await publicAxios.delete(`/api/cart/${userLogin.id}`)
      success(response.data.message)
      handleClose()
      setCart([])
      navigate("/order")
    }
  }

  const handleChangeInfor = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInforBill({ ...inforBill, [e.target.name]: e.target.value })
  }



  return (
    <div>
      <div className="">
        <br /><br />
        <h1 className="text-2xl text-center font-bold">Giỏ hàng của bạn</h1><br />
        <div className="bg-yellow-500 w-24 h-1 m-auto mt-3 rounded-sm" ></div>
        <br />
        <br />
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Vui lòng nhập thông tin </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold " htmlFor="street">Tên người nhận </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-5"
                id="street"
                type="text"
                name="nameInfor"
                value={inforBill.nameInfor}
                placeholder="Tên của bạn hoặc người nhận"
                onChange={handleChangeInfor}
              />
              <p className="text-red-500 text-start mb-2">{errorInput.errName}</p>
              <label className="block text-gray-700 text-sm font-bold " htmlFor="street">Số điện thoại</label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-5"
                id="street"
                type="number"
                placeholder="Số điện thoại"
                name="phoneInfor"
                value={inforBill.phoneInfor}
                onChange={handleChangeInfor}
              />
              <p className="text-red-500 text-start mb-2">{errorInput.errPhone}</p>
              <label className="block text-gray-700 text-sm font-bold " htmlFor="street">Địa chỉ cụ thể</label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="street"
                type="text"
                name="addressInfor"
                value={inforBill.addressInfor}
                placeholder="Số nhà, tên đường"
                onChange={handleChangeInfor}
              />
            </div ><br />
            <div className="flex">
              <div style={{ display: "block" }} >
                <select onChange={handleCity} name="" id="" style={{ display: "block" }}>
                  <option value="">Chọn thành phố</option>
                  {dataCity.map((item: Address, index) => (
                    <option key={index} value={item.code}>
                      {item.name}
                    </option>
                  ))}
                </select><br />
                <select onChange={handleDistrict} name="" id="" style={{ display: "block" }}>
                  <option>Chọn Quận/Huyện</option>
                  {dataDistrict.map((item: Address, index) => (
                    <option key={index} value={item.code}>
                      {item.name}
                    </option>
                  ))}
                </select><br />
                <select onChange={(e) => setWard(e.target.value)} name="" id="" style={{ display: "block" }}>
                  <option value="">Chọn Phường/Xã</option>
                  {dataWard.map((item: Address, index) => (
                    <option key={index} value={item.name}>
                      {item.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="ml-20 text-[18px] font-bold">Tổng tiền : {USDollar.format(total)}</div>
            </div>

          </Modal.Body>
          <Modal.Footer className="flex gap-8">
            <Button variant="contained" onClick={handleClose} >
              Đóng
            </Button>
            <Button variant="contained" onClick={handleCheckOut}>
              Thanh Toán
            </Button>
          </Modal.Footer>
        </Modal>
        <table
          className="m-auto border-2 "
          cellPadding={20}
          cellSpacing={30}
        >
          <thead>
            <tr>
              <th>STT</th>
              <th>Tên sản phẩm</th>
              <th>Ảnh sản phẩm</th>
              <th>Id</th>
              <th>Giá</th>
              <th>Số Lượng</th>
              <th>Thành tiền</th>
              <th>Hành động</th>
            </tr>
          </thead>
          <tbody>
            {cart?.map((item: any, index: number) => (
              <tr key={index} className="">
                <td>{index + 1}</td>
                <td>{item.nameProduct}</td>
                <td className="">
                  <img src={item.image} alt="" className="max-w-[70px] max-h-[140px] m-auto" />
                </td>
                <td>{item.cartId}</td>
                <td>{USDollar.format(item.price)}</td>
                <td className="flex mt-6">
                  <button
                    className="w-8"
                    onClick={() => {
                      handleDecrease(item.cartId);
                    }}
                    disabled={item.quantity === 1}
                  >
                    -
                  </button>
                  {item.quantity}
                  <button
                    className="w-8"
                    onClick={() => {
                      handleIncrease(item.cartId);
                    }}
                  >
                    +
                  </button>
                </td>
                <td>
                  {USDollar.format(
                    item.price * item.quantity
                  )}
                </td>
                <td>
                  <Button variant="contained" onClick={() => handleDelete(item.cartId)}>Xóa</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <br />
        <div className="font-bold ml-[450px] flex" >
          <div className="">Tổng tiền : {USDollar.format(total)}</div>
          <Button variant="contained" className="text-center m-auto" onClick={handleShow}>Thanh toán</Button>
        </div>
      </div><br />
      <div className="ml-[45%]"><Link to='/order' ><Button variant="contained" >Đơn hàng của bạn</Button></Link></div>
      <br /><br />
    </div>
  )
}

export default Cart