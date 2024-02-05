import React from "react";
import { Flex, Layout, Menu } from "antd";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import actions from "../../action/actions";
const { Sider } = Layout;

const { setCurrentUserData } = actions;

const Slider = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { currentUserData } = useSelector((s) => s.currentUser);
  console.log("currentUserData: ", currentUserData);
  const handleLogout = () => {
    const confirmed = window.confirm("Are you sure you want to logout?");

    if (confirmed) {
      navigate("/");
      dispatch(setCurrentUserData(""));
    }
  };
  return (
    <Layout>
      <Flex
        justify="flex-end"
        align="center"
        style={{
          width: "100%",
          backgroundColor: "#001529",
          color: "#fff",
          padding: "3% 8%",
        }}
      >
        <h1>logo</h1>
      </Flex>
      <Sider
        style={{
          position: "absolute",
          zIndex: 2,
        }}
        breakpoint="lg"
        collapsedWidth="0"
        onBreakpoint={(broken) => {
          console.log(broken);
        }}
        onCollapse={(collapsed, type) => {
          console.log(collapsed, type);
        }}
      >
        <div className="demo-logo-vertical" />
        {/* <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={["home"]}
          items={[
            { label: "home", key: "/home" },
            { label: "Logout", key: "/" },
            { label: "SingUp", key: "/singUp" },
            { label: "Dashboard", key: "/dashboard" },
          ]}
          onClick={({ key }) => {
            navigate(key);
          }}
        /> */}
        <Menu
          theme="dark"
          defaultSelectedKeys={["2"]}
          items={[
            { label: "Home", key: "/home" },
            { label: "Dashboard", key: "/dashboard" },
            currentUserData
              ? { label: "Logout", key: "/", onClick: handleLogout }
              : { label: "Login", key: "/" },
          ]}
          onClick={({ key }) => {
            navigate(key);
          }}
          style={{
            // minWidth: "30%",
            padding: "10px",
          }}
        />
      </Sider>
    </Layout>
  );
};
export default Slider;
