import { useEffect } from "react";

import { Form, Input, Button } from "antd";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { HIDE_LOADING, SHOW_LOADING } from "../redux/pos/pos.action";
import { message } from "antd";
import Axios from "axios";

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (value) => {
    try {
      dispatch({ type: SHOW_LOADING });
      await Axios.post("http://localhost:8080/api/users/register", value);
      message.success("Register Successfully");
      navigate("/login");
    } catch (error) {
      dispatch({ type: HIDE_LOADING });
      console.log(error);
      message.error("Something went wrong");
    }
  };
  useEffect(() => {
    if (localStorage.getItem("auth")) {
      localStorage.getItem("auth");
      navigate("/");
    }
  }, [navigate]);

  return (
    <>
      <div className="register">
        <div className="register-form">
          <h1>POS APP</h1>
          <h4>Register Page</h4>
          <Form layout="vertical" onFinish={handleSubmit}>
            <Form.Item name="name" label="Name">
              <Input />
            </Form.Item>
            <Form.Item name="userId" label="User Id">
              <Input />
            </Form.Item>
            <Form.Item name="password" label="Password">
              <Input type="password" />
            </Form.Item>

            <div className="d-flex justify-content-between">
              <p>
                Already Regsiter. Please <Link to="/login">login here!</Link>
              </p>
              <Button type="primary" htmlType="submit">
                Register
              </Button>
            </div>
          </Form>
        </div>
      </div>
    </>
  );
};
export default Register;
