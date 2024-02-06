import React, { useEffect, useRef, useState } from "react";
import { Flex, Layout, Menu, Modal } from "antd";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch, useSelector } from "react-redux";
import Slider from "../sliders/Slider";
import actions from "../../action/actions";
import { Inputs } from "../../styles/Input";

const { Header } = Layout;

const { setFilterData, setCurrentUserData } = actions;

const Navbar = () => {
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

  const { eventsData } = useSelector((s) => s.events);
  const inputRef = useRef();
  console.log("inputRef: ", inputRef.current?.value);
  const filterEventData = eventsData.filter((event) =>
    event.name.toLowerCase().includes(inputRef.current?.value)
  );

  console.log("filterEventData: ", filterEventData);
  dispatch(setFilterData(filterEventData));

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

  const location = useLocation();
  const currentPath = location.pathname;

  return (
    <>
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
            <Flex justify="space-between" gap={20} align="center">
              <Link
                to="/home"
                className="demo-logo"
                style={{ color: "#fff", fontSize: "2rem" }}
              >
                Venuss
              </Link>
              {currentUserData ? (
                <Inputs>
                  <input
                    type="text"
                    placeholder="search event name"
                    ref={inputRef}
                  />
                </Inputs>
              ) : null}
            </Flex>
            <Menu
              theme="dark"
              mode="horizontal"
              defaultSelectedKeys={[currentPath]}
              items={[
                { label: "Home", key: "/home" },
                { label: "Bookings", key: "/bookings" },
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
                minWidth: "30%",
              }}
            />
          </Flex>
          <Modal
            title="Basic Modal"
            open={isModalOpen}
            onOk={handleOk}
            onCancel={handleCancel}
          >
            <p>are you sure</p>
          </Modal>
        </Header>
      )}
    </>
  );
};

export default Navbar;
