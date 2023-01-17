import DefaultLayout from "../components/DefaultLayout";
import Axios from "axios";
import { HIDE_LOADING, SHOW_LOADING } from "../redux/pos/pos.action";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { EyeOutlined } from "@ant-design/icons";
import { Table, Modal } from "antd";

const BillPage = () => {
  const [billsData, setBillsData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedBill, setSelectedBill] = useState(null);
  const dispatch = useDispatch();
  useEffect(() => {
    getAllBills();
  }, []);
  const getAllBills = async () => {
    try {
      dispatch({ type: SHOW_LOADING });
      const { data } = await Axios.get(
        "http://localhost:8080/api/bills/get-bill"
      );
      setBillsData(data);
      console.log(data);
      dispatch({ type: HIDE_LOADING });
    } catch (error) {
      dispatch({ type: HIDE_LOADING });
      console.log(error);
    }
  };
  const columns = [
    {
      title: "ID",
      dataIndex: "_id",
      key: "_id",
    },
    {
      title: "Customer Name",
      dataIndex: "customerName",
      key: "customerName",
    },
    {
      title: "Contact No",
      dataIndex: "customerContact",
      key: "customerContact",
    },
    {
      title: "Sub Total",
      dataIndex: "subTotal",
      key: "subTotal",
    },
    {
      title: "Tax",
      dataIndex: "tax",
      key: "tax",
    },
    {
      title: "Total Amount",
      dataIndex: "totalAmount",
      key: "totalAmount",
    },

    {
      title: "Action",
      dataIndex: "_id",
      render: (id, record) => (
        <div>
          <EyeOutlined
            style={{ cursor: "pointer" }}
            onClick={() => {
              setSelectedBill(record);
              setIsModalOpen(true);
            }}
          />
        </div>
      ),
    },
  ];

  return (
    <>
      <DefaultLayout>
        <div className="d-flex justify-content-between">
          <h1>Invoice List</h1>
        </div>
        <Table columns={columns} dataSource={billsData} />
        {isModalOpen && (
          <Modal
            title="Invoice Details"
            visible={isModalOpen}
            onCancel={() => {
              setIsModalOpen(false);
              setSelectedBill(null);
            }}
            footer={false}
          >
            <div id="invoice-POS">
              <center id="top">
                <div className="logo"></div>
                <div className="info">
                  <h2>Pandu Info</h2>
                  <p>Contact: 12345 | Hyderabad</p>
                </div>
              </center>
              <div id="mid">
                <div className="mt-2">
                  <p>
                    Customer Name : <b>{selectedBill.customerName}</b>
                    <br />
                    Customer Contact : <b>{selectedBill.customerContact}</b>
                    <br />
                    Date : <b>{selectedBill.date}</b>
                  </p>
                  <hr style={{ margin: "5px" }} />
                </div>
              </div>
              <div id="bot">
                <div id="table">
                  <table>
                    <tbody>
                      <tr className="tabletitle">
                        <td className="item">
                          <h2>Item</h2>
                        </td>
                        <td className="Hours">
                          <h2>Qty</h2>
                        </td>
                        <td className="Rate">
                          <h2>Price</h2>
                        </td>
                        <td className="Rate">
                          <h2>Total</h2>
                        </td>
                      </tr>
                      {selectedBill.cartItems.map((item) => (
                        <>
                          <tr className="service">
                            <td className="tableitem">
                              <p className="itemtext">{item.name}</p>
                            </td>
                            <td className="tableitem">
                              <p className="itemtext">{item.quantity}</p>
                            </td>
                            <td className="tableitem">
                              <p className="itemtext">{item.price}</p>
                            </td>
                            <td className="tableitem">
                              <p className="itemtext">{item.totalAmount}</p>
                            </td>
                          </tr>
                        </>
                      ))}
                      <tr className="tabletitle">
                        <td />
                        <td />
                        <td className="Rate">
                          <h2>Tax</h2>
                        </td>
                        <td className="payment">
                          <h2> ${selectedBill.tax}</h2>
                        </td>
                      </tr>
                      <tr className="tabletitle">
                        <td />
                        <td />
                        <td className="Rate">
                          <h2>Grand Total</h2>
                        </td>
                        <td className="payment">
                          <h2> ${selectedBill.totalAmount}</h2>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </Modal>
        )}
      </DefaultLayout>
    </>
  );
};

export default BillPage;
