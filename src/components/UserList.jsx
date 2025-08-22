import axios from "axios";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeadCell,
  TableRow,
} from "flowbite-react";
import { toast } from "react-toastify";
const API_URL = import.meta.env.VITE_API_URL;

let UserList = ({ data, userListEnquiry, setFormData }) => {
  let delRow = (delid) => {
    axios.delete(`${API_URL}/api/web/user/deleteUser/${delid}`).then(() => {
      toast.success("Deleted User Successfully.");
      userListEnquiry();
    });
  };

  let editRow = (editid, name, email, phone, message) => {
    setFormData({
      _id: editid,
      name,
      email,
      phone,
      message,
    });
  };

  return (
    <div className="bg-gray-200 dark:bg-gray-900 p-6 rounded-lg">
      <h2 className="text-[18px] sm:text-[24px] text-start font-bold dark:text-white mb-6">
        User List
      </h2>
      <div className="overflow-x-auto max-h-[480px] overflow-y-auto hide-scrollbar rounded-lg">
        <Table>
          <TableHead>
            <TableRow>
              <TableHeadCell>S.No.</TableHeadCell>
              <TableHeadCell>Name</TableHeadCell>
              <TableHeadCell>Email</TableHeadCell>
              <TableHeadCell>Phone</TableHeadCell>
              <TableHeadCell>Message</TableHeadCell>
              <TableHeadCell>Edit</TableHeadCell>
              <TableHeadCell>Delete</TableHeadCell>
            </TableRow>
          </TableHead>
          <TableBody className="divide-y">
            {data.length >= 1 ? (
              data.map((item, index) => {
                console.log(item);
                return (
                  <TableRow
                    key={index}
                    className="bg-white dark:border-gray-700 dark:bg-gray-800"
                  >
                    <TableCell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                      {index + 1}
                    </TableCell>
                    <TableCell>{item.name}</TableCell>
                    <TableCell>{item.email}</TableCell>
                    <TableCell>{item.phone}</TableCell>
                    <TableCell>{item.message}</TableCell>
                    <TableCell>
                      <a
                        href="#"
                        onClick={() =>
                          editRow(
                            item._id,
                            item.name,
                            item.email,
                            item.phone,
                            item.message
                          )
                        }
                        className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                      >
                        Edit
                      </a>
                    </TableCell>
                    <TableCell>
                      <a
                        href="#"
                        onClick={() => delRow(item._id)}
                        className="font-medium text-red-600 hover:underline dark:text-red-500"
                      >
                        Delete
                      </a>
                    </TableCell>
                  </TableRow>
                );
              })
            ) : (
              <TableRow className="bg-white dark:border-gray-700 dark:bg-gray-800">
                <TableCell
                  colSpan={7}
                  className="whitespace-nowrap font-medium text-gray-900 dark:text-white text-center"
                >
                  No Data Found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default UserList;
