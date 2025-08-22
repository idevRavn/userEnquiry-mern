import "./App.css";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { useEffect, useState } from "react";
import { Button, Label, TextInput, Textarea } from "flowbite-react";
import UserList from "./components/userList";
const API_URL = import.meta.env.VITE_API_URL;

function App() {
  const [userDataList, setUserDataList] = useState([]);
  const [formData, setFormData] = useState({
    _id: "",
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  let userListEnquiry = () => {
    axios
      .get(`${API_URL}/api/web/user/userList`)
      .then((res) => {
        return res.data;
      })
      .then((dataList) => {
        setUserDataList(dataList.list);
      });
  };

  let saveEnquiry = (e) => {
    e.preventDefault();
    if (formData._id) {
      axios
        .put(`${API_URL}/api/web/user/updateUser/${formData._id}`, formData)
        .then(() => {
          toast.success("User Updated Successfully.");
          setFormData({
            name: "",
            email: "",
            phone: "",
            message: "",
            _id: "",
          });
          userListEnquiry();
        });
    } else {
      axios.post(`${API_URL}/api/web/user/insertUser`, formData).then(() => {
        toast.success("User Added Successfully.");
        setFormData({
          name: "",
          email: "",
          phone: "",
          message: "",
          _id: "",
        });
        userListEnquiry();
      });
    }
  };

  let handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  console.log(formData);

  useEffect(() => {
    userListEnquiry();
  }, []);

  return (
    <>
      <ToastContainer theme="dark" />
      <div className="min-h-screen w-full bg-gray-100 dark:bg-gray-950 p-6">
        <h1 className="text-[24px] md:text-[38px] text-center font-bold mb-6 dark:text-white">
          User Database
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-[30%_auto] gap-8">
          <div className="bg-gray-200 dark:bg-gray-900 p-6 rounded-lg w-full max-w-md mx-auto">
            <h2 className="text-[18px] sm:text-[24px] text-start font-bold dark:text-white">
              User Form
            </h2>
            <form
              className="flex max-w-md flex-col gap-4"
              onSubmit={saveEnquiry}
            >
              <div className="py-2">
                <div className="mb-2 block text-left">
                  <Label htmlFor="name" className="text-[14px] sm:text-[16px]">
                    Name
                  </Label>
                </div>
                <TextInput
                  id="name"
                  name="name"
                  onChange={handleChange}
                  value={formData.name}
                  type="text"
                  placeholder="Sanu"
                  required
                />
              </div>
              <div className="py-2">
                <div className="mb-2 block text-left">
                  <Label htmlFor="email" className="text-[14px] sm:text-[16px]">
                    Email
                  </Label>
                </div>
                <TextInput
                  id="email"
                  name="email"
                  onChange={handleChange}
                  value={formData.email}
                  type="email"
                  placeholder="user@name.com"
                  required
                />
              </div>
              <div className="py-2">
                <div className="mb-2 block text-left">
                  <Label htmlFor="phone" className="text-[14px] sm:text-[16px]">
                    Phone Number
                  </Label>
                </div>
                <TextInput
                  id="phone"
                  name="phone"
                  onChange={handleChange}
                  value={formData.phone}
                  type="text"
                  placeholder="777"
                  required
                />
              </div>
              <div className="py-2">
                <div className="mb-2 block text-left">
                  <Label
                    htmlFor="message"
                    className="text-[14px] sm:text-[16px]"
                  >
                    Message
                  </Label>
                </div>
                <Textarea
                  id="message"
                  name="message"
                  onChange={handleChange}
                  value={formData.message}
                  type="text"
                  placeholder="Message..."
                  required
                  rows={2}
                />
              </div>
              <div className="py-2">
                <Button type="submit">
                  {formData._id ? "Update" : "Save"}
                </Button>
              </div>
            </form>
          </div>
          <UserList
            data={userDataList}
            userListEnquiry={userListEnquiry}
            setFormData={setFormData}
          />
        </div>
      </div>
    </>
  );
}

export default App;
