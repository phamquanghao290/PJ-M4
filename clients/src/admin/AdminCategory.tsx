import React, { useEffect, useState } from "react";
import privateAxios from "../config/privateAxios";
import publicAxios from "../config/publicAxios";
import { success } from "../components/ultil";
import { failed } from "../components/ultil";
import { Button } from "@mui/material";
import './Admin.css'

type Props = {}

interface Cate {
  nameCategory: string
  categoryId: string
}

const AdminCategory = (props: Props) => {
  const [newCate, setNewCate] = useState<Cate>({
    nameCategory: "",
    categoryId: ""
  })
  const [categories, setCategories] = useState<any>([])
  const handleGetAllCate = async () => {
    try {
      const response = await publicAxios.get("/api/category")
      console.log(response.data);
      setCategories(response.data)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    handleGetAllCate()
  }, [])

  const handleAdd = async () => {
    const newCategory = {
      nameCategory: newCate
    }
    try {
      const response = await publicAxios.post("/api/category", newCategory.nameCategory)
      console.log(response.data.categories);
      setCategories(response.data.categories)
      success(response.data.message)
      setNewCate({
        nameCategory: "",
        categoryId: ""
      })
    } catch (error: any) {
      failed(error.response.data.message)
    }
  }

  const handleEdit = (item: any) => {
    console.log(item)
    setNewCate(item)
  }

  const handleSave = async () => {
    try {
      const response = await publicAxios.put(`/api/category/${newCate.categoryId}`, newCate)
      console.log(response.data.categories);
      setCategories(response.data.categories)
      success(response.data.message)
      setNewCate({ nameCategory: "", categoryId: "" })
    } catch (error: any) {
      failed(error.response.data.message)
    }
  }

  const handleDelete = async (id: number) => {
    console.log(id)
    try {
      if (window.confirm("Bạn có chắc muốn xóa?")) {
        const response = await publicAxios.delete(`/api/category/${id}`)
        console.log(response.data);
        setCategories(response.data.categories)
        success(response.data.message)
      }
    } catch (error: any) {
      failed(error.response.data.message)
    }
  }
  return (
    <>
      <div className="d-flex flex-column flex-lg-row h-lg-full bg-surface-secondary">
        {/* Main content */}
        <div className="h-screen flex-grow-1 overflow-y-lg-auto">
          {/* Header */}
          <header className="bg-surface-primary border-bottom pt-6">
            <div className="container-fluid">
              <div className="mb-npx">
                <div className="row align-items-center">
                  <div className="col-sm-6 col-12 mb-4 mb-sm-0 flex gap-10">
                    {/* Title */}
                    <h1 className="h2 mb-0 ls-tight">
                      List Category
                    </h1>
                    <input
                      onChange={(e) =>
                        setNewCate({
                          ...newCate,
                          nameCategory:
                            e.target.value,
                        })
                      }
                      value={newCate.nameCategory}
                      name="nameCategory"
                      placeholder="Category name"
                      type="text"
                      className="w-full max-w-[250px] h-[40px] p-[12px] rounded-lg ml-16 border-2 border-blue-600"
                    ></input>
                    <Button
                      variant="contained"
                      onClick={newCate.categoryId ? handleSave : handleAdd}
                    >
                      {newCate.categoryId
                        ? "Lưu"
                        : "Thêm"}
                    </Button>
                  </div>
                  {/* Actions */}
                  <div className="col-sm-6 col-12 text-sm-end"></div>
                </div>
                {/* Nav */}
                <ul className="nav nav-tabs mt-4 overflow-x border-0">
                  <li className="nav-item ">
                    <a href="#" className="nav-link active">
                      Information
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </header>
          {/* Main */}
          <main className="py-6 bg-surface-secondary">
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
              <div className="card shadow border-0 mb-7 text-xl">
                <div className="card-header text-xl">
                  <h5 className="mb-0">List Category</h5>
                </div>
                <div className="table-responsive">
                  <table className="table table-hover table-nowrap font-bold">
                    <thead className="thead-light text-xl">
                      <tr>
                        <th scope="col">Id </th>
                        <th scope="col">
                          Name Category
                        </th>
                        <th scope="col">Acction</th>
                      </tr>
                    </thead>
                    <tbody className="text-xl" style={{ marginLeft: '100px' }}>
                      {categories.map((item: Cate, index: number) => (
                        <tr key={index}>
                          <td scope="col">
                            {item.categoryId}
                          </td>
                          <td scope="col">
                            {item.nameCategory}
                          </td>
                          <td className="flex gap-8 justify-center">
                            <Button
                              variant="contained"
                              onClick={() =>
                                handleEdit(item)
                              }
                            >
                              Sửa
                            </Button>
                            <Button
                              variant="contained"
                              onClick={() =>
                                handleDelete(Number(
                                  item.categoryId
                                )
                                )
                              }
                            >
                              Xóa
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </>
  )
}

export default AdminCategory