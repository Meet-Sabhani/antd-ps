import { Button, Flex, Menu } from "antd";
import { Header } from "antd/es/layout/layout";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Slider from "../sliders/Slider";
import actions from "../../action/actions";

const { setCurrentUserData } = actions;

const Navbar = () => {
  const [width, setWidth] = useState(window.innerWidth);
  console.log("width: ", width);

  const { currentUserData } = useSelector((s) => s.currentUser);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    const handleResize = () => {
      setWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleLogout = () => {
    const confirmed = window.confirm("Are you sure you want to logout?");
    if (confirmed) {
      navigate("/");
      dispatch(setCurrentUserData(""));
    }
  };

  return (
    <>
      {width <= 700 ? (
        <Slider />
      ) : (
        <Header>
          <Flex justify="space-between" align="center">
            <h1 style={{ color: "#fff" }}>
              <Link to={"/home"}>Venus</Link>
            </h1>

            <Menu
              theme="dark"
              mode="horizontal"
              defaultSelectedKeys={["/home"]}
              selectedKeys={[window.location.pathname]}
              onClick={({ key }) => {
                navigate(key);
              }}
            >
              <Menu.Item key="/home">Home</Menu.Item>
              <Menu.Item key="/singUp">SignUp</Menu.Item>
              <Menu.Item key="/">logout</Menu.Item>
              <Menu.Item key="/">logout</Menu.Item>
            </Menu>
            <Flex align="center" gap={6}>
              <h3 style={{ color: "#fff" }}>
                Hello, {currentUserData?.username || "user"}
              </h3>
              {currentUserData ? (
                <Button type="primary" onClick={handleLogout}>
                  Logout
                </Button>
              ) : (
                <Button type="primary">
                  <Link to={"/"}> Login</Link>
                </Button>
              )}
            </Flex>
          </Flex>
        </Header>
      )}
    </>
  );
};

export default Navbar;
