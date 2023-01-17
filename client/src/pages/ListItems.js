import DefaultLayout from "../components/DefaultLayout";
import { Button, Card, Form, Input, message, Modal, Select, Table } from "antd";
import { useDispatch } from "react-redux";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";

import { HIDE_LOADING, SHOW_LOADING } from "../redux/pos/pos.action";
import { useEffect, useState } from "react";
import Axios from "axios";

const { Meta } = Card;
const ListItems = () => {
  const [itemsData, setItemsData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editItem, setEditItem] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    getAllitems();
  }, []);
  const getAllitems = async () => {
    try {
      dispatch({ type: SHOW_LOADING });
      const { data } = await Axios.get(
        "http://localhost:8080/api/items/get-item"
      );
      setItemsData(data);
      dispatch({ type: HIDE_LOADING });
      console.log(data);
    } catch (error) {
      console.log(error);
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
      title: "Action",
      dataIndex: "_id",
      render: (id, record) => (
        <div>
          <EditOutlined
            style={{ cursor: "pointer" }}
            onClick={() => {
              setEditItem(record);
              setIsModalOpen(true);
            }}
          />
          <DeleteOutlined
            style={{ cursor: "pointer" }}
            onClick={() => handleDeleteItem(record)}
          />
        </div>
      ),
    },
  ];
  //form submit
  const handleSubmit = async (value) => {
    if (editItem === null) {
      try {
        dispatch({ type: SHOW_LOADING });
        await Axios.post("http://localhost:8080/api/items/add-item", value);
        message.success("Item Added Successfully");
        getAllitems();
        setIsModalOpen(false);
        dispatch({ type: HIDE_LOADING });
      } catch (error) {
        dispatch({ type: HIDE_LOADING });
        console.log(error);
        message.error("Something went wrong");
      }
    } else {
      try {
        dispatch({ type: SHOW_LOADING });
        await Axios.put("http://localhost:8080/api/items/edit-item", {
          ...value,
          itemId: editItem._id,
        });
        message.success("Item edited Successfully");
        getAllitems();
        setIsModalOpen(false);
        dispatch({ type: HIDE_LOADING });
      } catch (error) {
        dispatch({ type: HIDE_LOADING });
        console.log(error);
        message.error("Something went wrong");
      }
    }
  };
  const handleDeleteItem = async (record) => {
    try {
      dispatch({ type: SHOW_LOADING });
      await Axios.post("http://localhost:8080/api/items/delete-item", {
        itemId: record._id,
      });
      message.success("Item deleted Successfully");
      getAllitems();
      dispatch({ type: HIDE_LOADING });
    } catch (error) {
      dispatch({ type: HIDE_LOADING });

      console.log(error);
      message.error("Something went wrong");
    }
  };
  return (
    <DefaultLayout>
      <div className="d-flex justify-content-between">
        <h1>List Items</h1>
        <Button type="primary" onClick={() => setIsModalOpen(true)}>
          Add Item
        </Button>
      </div>
      <Table columns={columns} dataSource={itemsData} />
      {isModalOpen && (
        <Modal
          title={`${editItem !== null ? "Edit Item" : "Add New Item"}`}
          visible={isModalOpen}
          onCancel={() => {
            setIsModalOpen(false);
            setEditItem(null);
          }}
          footer={false}
        >
          <Form
            layout="vertical"
            initialValues={editItem}
            onFinish={handleSubmit}
          >
            <Form.Item name="name" label="Name">
              <Input />
            </Form.Item>
            <Form.Item name="price" label="Price">
              <Input />
            </Form.Item>
            <Form.Item name="image" label="Image Url">
              <Input />
            </Form.Item>
            <Form.Item name="category" label="category">
              <Select>
                <Select.Option value="drinks">Drinks</Select.Option>
                <Select.Option value="rice">Rice</Select.Option>
                <Select.Option value="noodles">Noodles</Select.Option>
              </Select>
            </Form.Item>

            <div className="d-flex justify-content-end">
              <Button type="primary" htmlType="submit">
                Save
              </Button>
            </div>
          </Form>
        </Modal>
      )}
    </DefaultLayout>
  );
};
export default ListItems;
