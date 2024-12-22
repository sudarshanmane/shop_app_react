import React, { useEffect, useState } from "react";
import { Form, Input, Button, message } from "antd";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { postData } from "../Fetch/Axios";
import URLS from "../Fetch/urls";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  
  const handleSubmit = async (values) => {
    setLoading(true);

    const response = await postData(values, URLS.login);

    if (response && response.status === "success") {
      localStorage.setItem("pass", true);
      navigate("/sell-products");
    }
  };
  useEffect(() => {
    const pass = localStorage.getItem("pass");

    if (pass) {
      navigate("/sell-products");
    }
  }, []);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div style={{ maxWidth: 400, width: "100%", padding: "20px" }}>
        <h2 style={{ textAlign: "center", marginBottom: "20px" }}>Login</h2>
        <Form
          name="login"
          onFinish={handleSubmit}
          initialValues={{ remember: true }}
          layout="vertical"
        >
          <Form.Item
            name="username"
            label="username"
            rules={[{ required: true, message: "Please enter username!" }]}
          >
            <Input
              prefix={<UserOutlined />}
              placeholder="Enter your username"
            />
          </Form.Item>

          <Form.Item
            name="password"
            label="Password"
            rules={[{ required: true, message: "Please enter your password!" }]}
          >
            <Input.Password
              prefix={<LockOutlined />}
              placeholder="Enter your password"
            />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" block loading={loading}>
              Login
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default Login;
