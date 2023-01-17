import React, { useEffect, useState } from "react";
import "../styles/DefaultLayoutStyles.css";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  HomeOutlined,
  CopyOutlined,
  UserOutlined,
  UnorderedListOutlined,
  LogoutOutlined,
  ShoppingCartOutlined,
} from "@ant-design/icons";
import { Layout, Menu, theme } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Spinner from "./Spinner";

const { Header, Sider, Content } = Layout;

const DefaultLayout = ({ children }) => {
  const navigate = useNavigate();
  const { cartItems, loading } = useSelector((state) => state.pos);
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  useEffect(() => {
    localStorage.setItem("cartItem", JSON.stringify(cartItems));
  }, [cartItems]);
  return (
    <Layout>
      {loading && <Spinner />}
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="logo">
          <h1
            style={{ textAlign: "center", fontWeight: "bold", color: "white" }}
          >
            POS
          </h1>
        </div>

        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={window.location.pathname}
        >
          <Menu.Item key="/" icon={<HomeOutlined />}>
            <Link to="/">Home</Link>
          </Menu.Item>
          <Menu.Item key="/bill" icon={<CopyOutlined />}>
            <Link to="/bill">Bills</Link>
          </Menu.Item>
          <Menu.Item key="/list" icon={<UnorderedListOutlined />}>
            <Link to="/list">Items</Link>
          </Menu.Item>
          <Menu.Item key="/customers" icon={<UserOutlined />}>
            <Link to="/customers">Cutomers</Link>
          </Menu.Item>
          <Menu.Item
            key="/logout"
            icon={<LogoutOutlined />}
            onClick={() => {
              localStorage.removeItem("auth");
              navigate("/login");
            }}
          >
            Logout
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout className="site-layout">
        <Header style={{ padding: 0, background: colorBgContainer }}>
          {React.createElement(
            collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
            {
              className: "trigger",
              onClick: () => setCollapsed(!collapsed),
            }
          )}
          <div className="cart-item" onClick={() => navigate("/cart")}>
            <p>
              {cartItems.length}
              <ShoppingCartOutlined />
            </p>
          </div>
        </Header>
        <Content
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
          }}
        >
          {children}
        </Content>
      </Layout>
    </Layout>
  );
};

export default DefaultLayout;
