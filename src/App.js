import React, { useEffect, useState } from "react";
import { Flex, Layout, Menu, Modal } from "antd";
import { GlobalStyle } from "./styles/GlobalStyle";
import { Route, Routes, useNavigate } from "react-router-dom";
import { Content } from "antd/es/layout/layout";
import Login from "./components/login/Login";
import AddEventData from "./components/provider/AddEventData";
import SingUp from "./components/singUp/SingUp";
import Home from "./components/home/Home";
import EventPage from "./components/eventCads/EventPage";
import Bookings from "./components/bookings/Bookings";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch, useSelector } from "react-redux";
import Slider from "./components/sliders/Slider";
import actions from "./action/actions";
import { Inputs } from "./styles/Input";
import _ from "lodash-es";

const { Header, Footer } = Layout;

const { setCurrentUserData, setFilterData } = actions;

const App = () => {
  const [width, setWidth] = useState(window.innerWidth);
  console.log("width: ", width);

  const { currentUserData } = useSelector((s) => s.currentUser);
  console.log("currentUserData: ", currentUserData);

  const navigate = useNavigate();
  useEffect(() => {
    const handleResize = () => {
      setWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const dispatch = useDispatch();

  const [inputValue, setInputValue] = useState("");

  const { eventsData } = useSelector((s) => s.events);

  const filterEventData = eventsData.filter((event) =>
    event.name.toLowerCase().includes(inputValue)
  );

  // const lodashFilteredData = _.filter(eventsData, (event) =>
  //   event.name.toLowerCase().includes(inputValue)
  // );
  // console.log("lodashFilteredData: ", lodashFilteredData);

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
    <>
      <GlobalStyle />
      <Layout>
        {width <= 700 ? (
          <Slider />
        ) : (
          <Header
            style={{
              position: "sticky",
              top: 0,
              zIndex: 999,
            }}
          >
            <Flex justify="space-between">
              <Flex justify="space-between" gap={20}>
                <h1 className="demo-logo" style={{ color: "#fff" }}>
                  logo
                </h1>
                {currentUserData ? (
                  <Inputs>
                    <input
                      type="text"
                      placeholder="search event name"
                      onChange={handleInputChange}
                    />
                  </Inputs>
                ) : (
                  ""
                )}
              </Flex>
              <Menu
                theme="dark"
                mode="horizontal"
                defaultSelectedKeys={["2"]}
                items={[
                  { label: "Home", key: "/home" },
                  { label: "Dashboard", key: "/dashboard" },
                  currentUserData
                    ? { label: "Logout", key: "logout" }
                    : { label: "Login", key: "/" },
                ]}
                onClick={({ key }) => {
                  if (key === "logout" && currentUserData) {
                    showModal();
                  } else {
                    navigate(key);
                  }
                }}
                style={{
                  minWidth: "30%",
                }}
              />
            </Flex>
          </Header>
        )}
        <Content
          style={{
            padding: "0 48px",
          }}
        >
          <DataContent />
        </Content>
        <Footer
          style={{
            textAlign: "center",
          }}
        >
          Ant Design ©{new Date().getFullYear()} Created by Ant UED
        </Footer>
      </Layout>
      <Modal
        title="Basic Modal"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <p>are you sure</p>
      </Modal>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </>
  );
};
export default App;

const DataContent = () => {
  return (
    <>
      <Routes>
        <Route path="/singUp" element={<SingUp />} />
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/addEventData/:eventId" element={<AddEventData />} />
        <Route path="/addEventData" element={<AddEventData />} />
        <Route path="/detail/:productId" element={<EventPage />} />
        <Route path="/about" element={<Slider />} />
        <Route path="/bookings" element={<Bookings />} />
        <Route path="*" element={<div>404 page not found</div>} />
      </Routes>
    </>
  );
};
