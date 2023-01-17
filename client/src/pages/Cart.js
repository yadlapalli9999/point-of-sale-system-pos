import DefaultLayout from "../components/DefaultLayout";
import {
  DeleteOutlined,
  PlusCircleOutlined,
  MinusCircleOutlined,
} from "@ant-design/icons";
import { Button, Modal, Table, Form, Input, Select, message } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { DELETE_CART_ITEM, UPDATE_CART_ITEM } from "../redux/pos/pos.action";
import { useEffect, useState } from "react";
import Axios from "axios";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const [subTotal, setSubTotal] = useState(0);
  const [billPopup, setBillPopup] = useState(false);
  const { cartItems } = useSelector((state) => state.pos);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleIncrementCart = (record) => {
    dispatch({
      type: UPDATE_CART_ITEM,
      payload: { ...record, quantity: record.quantity + 1 },
    });
  };
  const handleDecrementCart = (record) => {
    if (record.quantity !== 1) {
      dispatch({
        type: UPDATE_CART_ITEM,
        payload: { ...record, quantity: record.quantity - 1 },
      });
    }
  };
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Image",
      dataIndex: "image",
      render: (image, record) => (
        <img src={image} height="60" width="60" alt={record.name} />
      ),
      key: "image",
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
      render: (id, record) => (
        <div>
          <PlusCircleOutlined
            className="mx-3"
            style={{ cursor: "pointer" }}
            onClick={() => handleIncrementCart(record)}
          />
          <b>{record.quantity}</b>
          <MinusCircleOutlined
            className="mx-3"
            style={{ cursor: "pointer" }}
            onClick={() => handleDecrementCart(record)}
          />
        </div>
      ),
      key: "quantity",
    },
    {
      title: "Action",
      dataIndex: "_id",
      render: (id, record) => (
        <DeleteOutlined
          style={{ cursor: "pointer" }}
          onClick={() => dispatch({ type: DELETE_CART_ITEM, payload: record })}
        />
      ),
    },
  ];
  useEffect(() => {
    let temp = 0;
    cartItems.forEach((item) => (temp = temp + item.price * item.quantity));
    setSubTotal(temp);
  }, [cartItems]);
  const handleSubmit = async (value) => {
    try {
      const newObject = {
        ...value,
        subTotal,
        cartItems,
        tax: Number(((subTotal / 100) * 10).toFixed(2)),
        totalAmount: Number(
          Number(subTotal) + Number(((subTotal / 100) * 10).toFixed(2))
        ),
        userId: JSON.parse(localStorage.getItem("auth"))._id,
      };
      console.log(newObject);
      Axios.post("http://localhost:8080/api/bills/add-bill", newObject);
      message.success("bill Created Successfully");
      navigate("/bill");
    } catch (error) {
      message.error("Something went wrong");
      console.log(error);
    }
  };
  return (
    <>
      <DefaultLayout>
        <Table columns={columns} dataSource={cartItems} />
        <div className="d-flex flex-column align-items-end">
          <hr />
          <h3>
            SUB TOTAL : $ <b>{subTotal}</b> /-{" "}
          </h3>
          <Button type="primary" onClick={() => setBillPopup(true)}>
            Create Invoice
          </Button>
        </div>
        <Modal
          title="Create Invoice"
          visible={billPopup}
          onCancel={() => setBillPopup(false)}
          footer={false}
        >
          <Form layout="vertical" onFinish={handleSubmit}>
            <Form.Item name="customerName" label="Customer Name">
              <Input />
            </Form.Item>
            <Form.Item name="customerContact" label="Contact Number">
              <Input />
            </Form.Item>

            <Form.Item name="paymentMode" label="Payment Mode">
              <Select>
                <Select.Option value="cash">Cash</Select.Option>
                <Select.Option value="card">Card</Select.Option>
              </Select>
            </Form.Item>
            <div className="bill-it">
              <h5>
                Sub Total : <b>{subTotal}</b>
              </h5>
              <h4>
                Tax : <b>{((subTotal / 100) * 10).toFixed(2)}</b>
              </h4>
              <h3>
                Grand Total :{" "}
                <b>
                  {Number(subTotal) +
                    Number(((subTotal / 100) * 10).toFixed(2))}
                </b>
              </h3>
            </div>
            <div className="d-flex justify-content-end">
              <Button type="primary" htmlType="submit">
                Generate Bill
              </Button>
            </div>
          </Form>
        </Modal>
      </DefaultLayout>
    </>
  );
};

export default Cart;
