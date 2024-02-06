import { Flex, Layout, Tooltip } from "antd";
import { GlobalStyle } from "./styles/GlobalStyle";
import { Route, Routes } from "react-router-dom";
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
import Navbar from "./components/navbar/Navbar";
import {
  FacebookOutlined,
  InstagramOutlined,
  LinkedinOutlined,
  TwitterOutlined,
} from "@ant-design/icons";

const { Footer } = Layout;

const App = () => {
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
        </Content>
        <Footer theme="dark">
          <Flex justify="space-around" wrap="wrap" align="center">
            <h1>vennus</h1>
            <Flex gap={8} wrap="wrap">
              <Tooltip title="Linkedin">
                <a
                  href="https://www.linkedin.com/in/meet-sabhani-548829196/"
                  target="_blank"
                >
                  <LinkedinOutlined
                    style={{ fontSize: "25px", color: "#000" }}
                  />
                </a>
              </Tooltip>
              <Tooltip title="facebook">
                <a href="https://ant.design/components/icon" target="_blank">
                  <FacebookOutlined
                    style={{ fontSize: "25px", color: "#000" }}
                  />
                </a>
              </Tooltip>
              <Tooltip title="Twitter">
                <a href="https://twitter.com/sabhani_meet" target="_blank">
                  <TwitterOutlined
                    style={{ fontSize: "25px", color: "#000" }}
                  />
                </a>
              </Tooltip>
              <Tooltip title="Instagram">
                <a
                  href="https://www.instagram.com/meet_sabhani_18/"
                  target="_blank"
                >
                  <InstagramOutlined
                    style={{ fontSize: "25px", color: "#000" }}
                  />
                </a>
              </Tooltip>
            </Flex>
          </Flex>
          <Flex justify="center">
            Booking System &copy;{new Date().getFullYear()} Created by Meet
            Sabhani
          </Flex>
        </Footer>
      </Layout>

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
