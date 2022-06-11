import React, { useState } from "react";
import Navbar from "../../Components/Navbar/Navbar";
import AppSideBar from "../../Components/AppSideBar/AppSidebar";
import AppAdminTable from "../../Components/AppAdminTable/AppAdminTable";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { Dropdown } from "primereact/dropdown";
import { useForm } from "react-hook-form";

function Admin() {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedDomain, setSelectedDomain] = useState("");

  const domain = [
    { name: "Mentor", value: "mentor" },
    { name: "Student", value: "student" },
  ];

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
    setModalOpen(false);
  };
  console.log(watch("role"));

  return (
    <div>
      <AppSideBar>
        <Navbar />
        <div className="w-11/12 mx-auto mt-14">
          <div className="flex justify-end">
            <Button
              onClick={() => setModalOpen(true)}
              style={{ height: "45px" }}
              label="Create User"
              icon="pi pi-plus"
              className="p-button"
            />
          </div>
          <Dialog
            header="Create User"
            visible={modalOpen}
            style={{ width: "30vw" }}
            onHide={() => setModalOpen(false)}
          >
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="mb-1 sm:mb-2">
                <label htmlFor="username1" className="block">
                  Username
                </label>
                <InputText
                  // id="username1"
                  {...register("username", {
                    required: "Username is required",
                  })}
                  aria-describedby="username1-help"
                  className="block w-full "
                />
                <p style={{ fontSize: "15px" }} className="mt-1 text-red-400">
                  {errors.username?.message}
                </p>
              </div>
              <div className="mb-1 sm:mb-2">
                <label htmlFor="username1" className="block">
                  Email
                </label>
                <InputText
                  // id="username1"
                  {...register("email", {
                    required: "Email is required",
                  })}
                  aria-describedby="username1-help"
                  className="block w-full "
                />
              </div>
              <p style={{ fontSize: "15px" }} className="mt-1 text-red-400">
                {errors.email?.message}
              </p>
              <div className="mb-1 sm:mb-2">
                <label className="block">Password</label>
                <InputText
                  type="password"
                  {...register("password", {
                    required: "Password is required",
                  })}
                  className="w-full"
                />
                <p style={{ fontSize: "15px" }} className="mt-1 text-red-400">
                  {errors.password?.message}
                </p>
              </div>
              <div className="mb-1 sm:mb-3">
                <label htmlFor="username1" className="block">
                  Role
                </label>
                <Dropdown
                  value={watch("role")}
                  optionValue="value"
                  className="w-full"
                  options={domain}
                  onChange={(e) => {
                    setSelectedDomain(e.target.value);
                    console.log(e.target.value);
                  }}
                  {...register("role", {
                    required: "Role is required",
                  })}
                  optionLabel="name"
                  placeholder="Select a role"
                />
                <p style={{ fontSize: "15px" }} className="mt-1 text-red-400">
                  {errors.role?.message}
                </p>
              </div>
              <div>
                <Button
                  style={{ height: "45px" }}
                  label="Create User"
                  // icon="pi pi-plus"
                  className="p-button w-full"
                />
              </div>
            </form>
          </Dialog>
          <AppAdminTable />
        </div>
      </AppSideBar>
    </div>
  );
}

export default Admin;
