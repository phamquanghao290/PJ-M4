import React, { useState, useEffect } from 'react'
import { Button } from '@mui/material'
import Modal from 'react-bootstrap/Modal'
import publicAxios from '../config/publicAxios'
export default function Bill() {
  interface Bill {
    userId: number
    nameProduct: string
    address: string
    price: number
    total: number
    image: string
    quantity: number
    status: number
  }

  interface BillDetail {
    orderDetailId: string
    productName: string
    price: number
    total: number
    image: string
    quantity: number
    createdAt: string
  }

  const USDollar = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });
  const userLogin = JSON.parse(localStorage.getItem("userLogin") || "{}");
  const [bill, setBill] = useState<any>([]);
  const [flag, setFlag] = useState(true);
  const [show, setShow] = useState<boolean>(false);
  const [infoDetail, setInfoDetail] = useState<any>([]);
  const handleClose = () => setShow(false);
  const handleGetBill = async () => {
    try {
      const response = await publicAxios.get(`/api/orders/${userLogin.id}`);
      console.log(response.data);
      setBill(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  const handleShow = async (item: any) => {
    console.log(item);
    setShow(true);
    try {
      const response = await publicAxios.get(`/api/orderDetail/${item.orderId}`);
      console.log(response.data);
      setInfoDetail(response.data);
    } catch (error) {
      console.log(error)
    }
  }

  const handleChangeStatus = async (id: number, status: any) => {
    console.log("tôi", id, status);
    if (window.confirm("Bạn có muốn hủy đơn hàng này")) {
      await publicAxios.put(`/api/orders/${id}`, { status: status });
    }
    handleGetBill();
    setFlag(!flag);
  }

  useEffect(() => { handleGetBill() }, [flag])
  return (
    <>
      <div className="text-center mt-16">
        <h3 className="text-3xl font-bold">Đơn hàng của bạn</h3>
        <br />
        <div className="bg-yellow-500 w-24 h-1 m-auto mt-3 rounded-sm"></div>
        <br />
        <table
          cellPadding={10}
          cellSpacing={10}
          className="text-lg mt-2 m-auto max-w-[1300px] border-solid border-2 border-blue-600"
        >
          <thead>
            <tr className="text-lg border-solid border-2 border-blue-600">
              <th className="border-2 border-blue-600">STT</th>
              <th className="border-2 border-blue-600">
                Đơn hàng
              </th>
              <th className="border-2 border-blue-600">
                Địa chỉ nhận hàng
              </th>
              <th className="border-2 border-blue-600">
                Tổng tiền
              </th>
              <th className="border-2 border-blue-600">
                Tình trạng
              </th>
              <th className="border-2 border-blue-600">
                Hành động
              </th>
            </tr>
          </thead>
          <tbody>
            {bill?.map((item: any, index: number) => {
              return (
                <tr key={index} className="text-sm">
                  <td className="border-2 border-blue-600">
                    {index + 1}
                  </td>
                  <td className="border-2 border-blue-600">
                    <Button
                      variant="contained"
                      onClick={() =>
                        handleShow(item)
                      }
                      className="text-blue-600"
                    >
                      Xem Chi Tiết
                    </Button>
                  </td>
                  <td className="border-2 border-blue-600">
                    {item.address}
                  </td>
                  <td className="border-2 border-blue-600">
                    {USDollar.format(item.total)}
                  </td>
                  <td className="border-2 border-blue-600">
                    {item.status_order === "Đang xử lý" ? (
                      <span style={{ color: "green" }}>
                        Đang chờ
                      </span>
                    ) : item.status_order === "Xác nhận" ? (
                      <span style={{ color: "blue" }}>
                        Xác nhận
                      </span>
                    ) : (
                      <span style={{ color: "red" }}>
                        Đã hủy
                      </span>
                    )}
                  </td>
                  <td className="border-2 border-blue-600">
                    {item.status_order === "Đang xử lý" ? (
                      <Button
                        variant="contained"
                        onClick={() =>
                          handleChangeStatus(item.orderId, "Đã hủy")             
                        }
                      >
                        Hủy bỏ
                      </Button>
                    ) : (
                      ""
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Tất cả sản phẩm</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {infoDetail.map((item: BillDetail) => (
              <div className="flex justify-between align-center mt-6 ml-3  max-w-[420px]">
                <div>
                  <p>Tên : {item.productName}</p>
                  <p>Số Lượng : {item.quantity}</p>
                  <p>Giá : {USDollar.format(item.price)}</p>
                  <p>Thời gian mua hàng: {item.createdAt}</p>
                </div>
                <br />
                <p>
                  <img
                    src={item.image}
                    className="w-[100px] h-[150px]"
                  />
                </p>
              </div>
            ))}
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="contained"
              onClick={handleClose}
              className="m-auto"
            >
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
      <br />
      <br />
    </>
  );
}