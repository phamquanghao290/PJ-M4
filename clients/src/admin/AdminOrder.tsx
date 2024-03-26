import React from 'react'
import { Button } from "@mui/material";
import axios from "axios";
import publicAxios from "../config/publicAxios";
import privateAxios from "../config/privateAxios";
import Modal from "react-bootstrap/Modal";
import './Admin.css'
import { failed, success } from '../components/ultil';

interface Order {
  id: number;
  orderId: number;
  status: string;
  total: number;
  createdAt: string;
}

interface Bill {
  nameProduct: string;
  price: number;
  image: string;
  quantity: number;
}

type Props = {}

const AdminOrder = (props: Props) => {
  const [bill, setBill] = React.useState<any>([]);
  const [errorInput, setErrorInput] = React.useState({
    errName: "",
    errEmail: "",
    errPass: "",
    errConfirm: "",
  });
  const USDollar = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });

  const handleGetBills = async () => {
    const res = await publicAxios.get("/api/order");
    console.log(res.data);
    setBill(res.data);
  };

  const handleChangeStatusBill = async (id: number, status: any) => {
    if (window.confirm("Hành động ngay")) {
      await publicAxios.put(`/api/status/${id}`, { status: status });
    }
    success("Cập nhật trạng thái đơn hàng thành công")
    await handleGetBills();
  };

  React.useEffect(() => {
    handleGetBills();
  }, []);

  const [show, setShow] = React.useState<boolean>(false);
  const [infoDetail, setInforDetail] = React.useState<any>([]);
  console.log(infoDetail);
  const handleClose = () => setShow(false);
  const handleShow = (item: any) => {
    console.log(item);
    setShow(true);
    const response = publicAxios.get(`/api/orderDetail/${item.orderId}`);
    console.log(response);
    setInforDetail(response);
  };
  return (
    <div>
      <div className="d-flex flex-column flex-lg-row h-lg-full bg-surface-secondary">
        <div className="h-screen flex-grow-1 overflow-y-lg-auto">
          {/* Header */}
          <header className="bg-surface-primary border-bottom pt-6">
            <div className="container-fluid">
              <div className="mb-npx">
                <div className="row align-items-center">
                  <div className="col-sm-6 col-12 mb-4 mb-sm-0">
                    {/* Title */}
                    <h1 className="h2 mb-0 ls-tight">
                      History order
                    </h1>
                  </div>
                  {/* Actions */}
                  <div className="col-sm-6 col-12 text-sm-end"></div>
                </div>
                {/* Nav */}
                <ul className="nav nav-tabs mt-4 overflow-x border-0">
                  <li className="nav-item ">
                    <a
                      href="#"
                      className="nav-link active"
                      style={{ color: "red" }}
                      id="choose-infor"
                    // onClick="returnListOrder()"
                    >
                      Information
                    </a>
                  </li>
                  <li className="nav-item ">
                    <a
                      href="#"
                      className="nav-link active"
                      style={{ color: "blue" }}
                      id="chooser"
                    >
                      Detail Order
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </header>
          {/* Main */}
          <main
            className="py-6 bg-surface-secondary"
            id="information"
          >
            <div className="container-fluid">
              {/* Card stats */}
              <div className="row g-6 mb-6">
                <div className="col-xl-3 col-sm-6 col-12">
                  <div className="card shadow border-0">
                    <div className="card-body">
                      <div className="row">
                        <div className="col">
                          <span className="h6 font-semibold text-muted text-sm d-block mb-2">
                            Budget
                          </span>
                          <span className="h3 font-bold mb-0">
                            $750.90
                          </span>
                        </div>
                        <div className="col-auto">
                          <div className="icon icon-shape bg-tertiary text-white text-lg rounded-circle">
                            <i className="bi bi-credit-card" />
                          </div>
                        </div>
                      </div>
                      <div className="mt-2 mb-0 text-sm">
                        <span className="badge badge-pill bg-soft-success text-success me-2">
                          <i className="bi bi-arrow-up me-1" />
                          13%
                        </span>
                        <span className="text-nowrap text-xs text-muted">
                          Since last month
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-xl-3 col-sm-6 col-12">
                  <div className="card shadow border-0">
                    <div className="card-body">
                      <div className="row">
                        <div className="col">
                          <span className="h6 font-semibold text-muted text-sm d-block mb-2">
                            New projects
                          </span>
                          <span className="h3 font-bold mb-0">
                            215
                          </span>
                        </div>
                        <div className="col-auto">
                          <div className="icon icon-shape bg-primary text-white text-lg rounded-circle">
                            <i className="bi bi-people" />
                          </div>
                        </div>
                      </div>
                      <div className="mt-2 mb-0 text-sm">
                        <span className="badge badge-pill bg-soft-success text-success me-2">
                          <i className="bi bi-arrow-up me-1" />
                          30%
                        </span>
                        <span className="text-nowrap text-xs text-muted">
                          Since last month
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-xl-3 col-sm-6 col-12">
                  <div className="card shadow border-0">
                    <div className="card-body">
                      <div className="row">
                        <div className="col">
                          <span className="h6 font-semibold text-muted text-sm d-block mb-2">
                            Total hours
                          </span>
                          <span className="h3 font-bold mb-0">
                            1.400
                          </span>
                        </div>
                        <div className="col-auto">
                          <div className="icon icon-shape bg-info text-white text-lg rounded-circle">
                            <i className="bi bi-clock-history" />
                          </div>
                        </div>
                      </div>
                      <div className="mt-2 mb-0 text-sm">
                        <span className="badge badge-pill bg-soft-danger text-danger me-2">
                          <i className="bi bi-arrow-down me-1" />
                          -5%
                        </span>
                        <span className="text-nowrap text-xs text-muted">
                          Since last month
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-xl-3 col-sm-6 col-12">
                  <div className="card shadow border-0">
                    <div className="card-body">
                      <div className="row">
                        <div className="col">
                          <span className="h6 font-semibold text-muted text-sm d-block mb-2">
                            Work load
                          </span>
                          <span className="h3 font-bold mb-0">
                            95%
                          </span>
                        </div>
                        <div className="col-auto">
                          <div className="icon icon-shape bg-warning text-white text-lg rounded-circle">
                            <i className="bi bi-minecart-loaded" />
                          </div>
                        </div>
                      </div>
                      <div className="mt-2 mb-0 text-sm">
                        <span className="badge badge-pill bg-soft-success text-success me-2">
                          <i className="bi bi-arrow-up me-1" />
                          10%
                        </span>
                        <span className="text-nowrap text-xs text-muted">
                          Since last month
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="card shadow border-0 mb-7">
                <div className="card-header">
                  <h5 className="mb-0">History Order</h5>
                </div>
                <div className="table-responsive">
                  <table className="table table-hover table-nowrap">
                    <thead className="thead-light">
                      <tr>
                        <th scope="col">STT</th>
                        <th scope="col">
                          Id Khách Hàng
                        </th>
                        <th scope="col">Id Order</th>
                        <th scope="col">Price</th>
                        <th scope="col">Status</th>
                        <th scope="col">View</th>
                        <th scope="col">Acction</th>
                      </tr>
                    </thead>
                    <tbody>
                      {bill.map((item: any, index: number) => (
                        <tr key={index}>
                          <th scope="col">
                            {index + 1}
                          </th>
                          <th scope="col">
                            {item.id}
                          </th>
                          <th scope="col">
                            {item.orderId}
                          </th>
                          <th scope="col">
                            {USDollar.format(
                              item.total
                            )}
                          </th>
                          <th scope="col">
                            {item.status_order == "Đang xử lý"
                              ? (
                                <span
                                  style={{
                                    color: "green",
                                  }}
                                >
                                  Đang Chờ
                                </span>
                              ) : item.status_order == "Xác nhận"
                                ? (
                                  <span
                                    style={{
                                      color: "blue",
                                    }}
                                  >
                                    Xác nhận
                                  </span>
                                ) : (
                                  <span
                                    style={{
                                      color: "red",
                                    }}
                                  >
                                    Từ chối
                                  </span>
                                )}
                          </th>
                          <th
                            scope="col"
                            onClick={() => {
                              handleShow(item);
                            }}
                            className="cursor-pointer"
                          >
                            View
                          </th>
                          <th
                            scope="col"
                            className="gap-10"
                          >
                            {item.status_order ==
                              "Đang xử lý" ? (
                              <div className="flex justify-evenly m-auto">
                                <Button
                                  variant="contained"
                                  onClick={() =>
                                    handleChangeStatusBill(
                                      item.orderId,
                                      "Xác nhận"
                                    )
                                  }
                                >
                                  Xác nhận
                                </Button>
                                <Button
                                  variant="contained"
                                  onClick={() =>
                                    handleChangeStatusBill(
                                      item.orderId,
                                      "Đã Hủy"
                                    )
                                  }
                                >
                                  Hủy
                                </Button>
                              </div>
                            ) : (
                              <></>
                            )}
                          </th>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </main>

          <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Sản Phẩm</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              {infoDetail.map((item: any) => (
                <div className="titles_produsctsx">
                  <hr />
                  <p>Tên:{item.nameProduct}</p>
                  <p>
                    Ảnh:
                    <img
                      src={item.image}
                      className="w-[100px] h-[100px]"
                    />
                  </p>
                  <p>Số Lượng:{item.quantity}</p>
                  <p>Giá Sản Phẩm:{USDollar.format(item.price)}</p>
                </div>
              ))}
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Close
              </Button>
            </Modal.Footer>
          </Modal>
          {/* bill */}
          <div
            className="flex-grow-1 overflow-y-lg-auto bill-order"
            id="bill-order"
            style={{ display: "none" }}
          >
            <main
              className="py-6 bg-surface-secondary"
              style={{ paddingTop: "100px !important" }}
            >
              <div className="container-fluid col-8">
                <div className="card shadow border-0 mb-7">
                  <div className="card-header ">
                    <h2 className="mb-0 text-center">
                      HÓA ĐƠN
                    </h2>
                  </div>
                  <div
                    className="table-responsive"
                    id="detail-order"
                  >
                    <div className="information d-flex">
                      <div className="container border-start border-bottom ">
                        <div className="row my-5">
                          <span className="col text-uppercase fw-bolder  title">
                            Tên người mua :
                          </span>
                          <span
                            className="col text-center"
                            id="username"
                          >
                            {" "}
                            hai
                          </span>
                        </div>
                        <div className="row my-5">
                          <span className="col text-uppercase fw-bolder  title">
                            Tổng thành tiền :
                          </span>
                          <span
                            className="col text-end"
                            id="pay"
                          >
                            3000
                          </span>
                        </div>
                        <div className="row my-5">
                          <span className="col text-uppercase fw-bolder  title">
                            Địa chỉ :
                          </span>
                          <span
                            className="col text-end"
                            id="address"
                          >
                            {" "}
                            ha noi
                          </span>
                        </div>
                      </div>
                      <div className="container border-start border-bottom">
                        <div className="row my-5">
                          <span className="col text-uppercase fw-bolder title">
                            Số điện thoại :
                          </span>
                          <span
                            className="col text-center"
                            id="phone-number"
                          >
                            0922222
                          </span>
                        </div>
                        <div className="row my-5">
                          <span className="col text-uppercase fw-bolder title">
                            Ngày đặt hàng :{" "}
                          </span>
                          <span
                            className="col text-center"
                            id="day-order"
                          >
                            0-2222
                          </span>
                        </div>
                        <div className="row my-5">
                          <span className="col text-uppercase fw-bolder title">
                            Ngày giao tới :
                          </span>
                          <span
                            className="col text-center"
                            id="day-receive"
                          >
                            0-2222
                          </span>
                        </div>
                      </div>
                    </div>
                    <h2 className="mb-5 mt-5 text-center">
                      CHI TIẾT ĐƠN HÀNG{" "}
                    </h2>
                    <table className="table table-hover table-nowrap">
                      <thead className="thead-light">
                        <tr>
                          <th>STT</th>
                          <th scope="col">
                            Ảnh sản phẩm
                          </th>
                          <th scope="col">
                            Tên Sản phẩm
                          </th>
                          <th scope="col">
                            Số lượng{" "}
                          </th>
                          <th scope="col">
                            Giá Sản phẩm
                          </th>
                        </tr>
                      </thead>
                      <tbody id="renderProductOrder">
                        {/* <tr>
                                      <td>1</td>
                                      <td>
                                          <img alt="..." src="./img/caycam.jpg" style="height: 100px;">
                                      </td>
                                      <td>
                                          Feb 15, 2021
                                      </td>
                                      <td>
                                          Dribbbl
                                      </td>
                                      <td>
                                          $3.500
                                      </td>
                                  </tr> */}
                      </tbody>
                    </table>
                  </div>
                  <div className="card-header d-flex ">
                    <div
                      className="title-warning"
                      style={{ fontSize: "1.2rem" }}
                    >
                      <span id="title-status">
                        Đơn hàng đã được xác nhận <br />
                        <strong>
                          <u>
                            Khách hàng không thể hủy
                          </u>
                        </strong>
                      </span>
                      <br />
                      <span>
                        Mọi chi tiết về vấn đề vận
                        chuyển <br />
                        <strong>
                          Xin liên hệ đến
                          <u>công ty A</u>
                        </strong>
                        <br />
                        <strong>
                          Số điện thoại :{" "}
                          <u>092223331</u>
                        </strong>
                      </span>
                    </div>
                    <div style={{ marginLeft: 50 }}>
                      <span style={{ marginLeft: 18 }}>
                        Mã đơn hàng:{" "}
                        <strong>
                          <u id="id-order">2222</u>
                        </strong>
                      </span>
                      <div>
                        {/* <img
                                                    src={}
                                                    alt=""
                                                    style={{
                                                        width: 400,
                                                        height: 100,
                                                    }}
                                                /> */}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </main>
          </div>
        </div>
      </div>
    </div>

  )
}

export default AdminOrder