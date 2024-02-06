import React, { useState } from "react";
import { Flex, Layout, Menu, Modal } from "antd";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import actions from "../../action/actions";
import { Inputs } from "../../styles/Input";
import _ from "lodash-es";

const { Sider } = Layout;

const { setCurrentUserData, setFilterData } = actions;

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

  const [inputValue, setInputValue] = useState("");

  const { eventsData } = useSelector((s) => s.events);

  const filterEventData = eventsData.filter((event) =>
    event.name.toLowerCase().includes(inputValue)
  );

  const lodashFilteredData = _.filter(eventsData, (event) =>
    event.name.toLowerCase().includes(inputValue)
  );
  console.log("lodashFilteredData: ", lodashFilteredData);

  console.log("filterEventData: ", filterEventData);
  dispatch(setFilterData(filterEventData));
  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    navigate("/");
    dispatch(setCurrentUserData(""));
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <Layout>
      <Flex
        justify="space-between"
        gap={20}
        style={{ padding: "2% 8%", backgroundColor: "#000", width: "100%" }}
      >
        <h1 style={{ color: "#fff" }}>logo</h1>
        <Inputs>
          <input
            type="text"
            placeholder="search event name"
            onChange={handleInputChange}
          />
        </Inputs>
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
        <Menu
          theme="dark"
          defaultSelectedKeys={["2"]}
          items={[
            { label: "Home", key: "/home" },
            { label: "Dashboard", key: "/dashboard" },
            currentUserData
              ? { label: "Logout", key: "logout" }
              : { label: "Login", key: "/" },
          ]}
          onClick={({ key }) => {
            if (key === "logout") {
              showModal();
            } else {
              navigate(key);
            }
          }}
          style={{
            padding: "10px",
          }}
        />
      </Sider>

      <Modal
        title="Basic Modal"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <p>are you sure</p>
      </Modal>
    </Layout>
  );
};
export default Slider;
