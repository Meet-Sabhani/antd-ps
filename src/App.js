import { Layout, Modal } from "antd";
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
import Slider from "./components/sliders/Slider";
import actions from "./action/actions";
import _ from "lodash-es";
import Navbar from "./components/navbar/Navbar";
import { useState } from "react";
import { useDispatch } from "react-redux";

const { Footer } = Layout;

const { setCurrentUserData } = actions;

const App = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

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
      <Navbar />
      <GlobalStyle />
      <Layout>
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
