import React, { useState } from "react";
import { Button, Flex, Layout } from "antd";
import { Link } from "react-router-dom";
import EventCard from "../eventCads/EventCard";
import useCheckLogin from "../../utils/CheckLogin";
import { useSelector } from "react-redux";
import { SortingOption } from "../../styles/SortingOption";

const Home = () => {
  useCheckLogin();
  const { currentUserData } = useSelector((s) => s.currentUser);
  console.log("currentUserData: ", currentUserData);

  const [sortOption, setSortOption] = useState("date");

  return (
    <div style={{ padding: "3% 0" }}>
      <SortingOption>
        <h1>Dubai, United Arab Emirate</h1>
        <p>we Found 324 amazing VENUS</p>
        <select name="sorting" onChange={(e) => setSortOption(e.target.value)}>
          <option value="price">sort by : price</option>
          <option value="duration">sort by : duration</option>
          <option value="date">sort by : date</option>
        </select>
      </SortingOption>
      <Layout>
        <Flex justify="center" gap={6} style={{ padding: "2%" }}>
          {currentUserData.userType === "Provider" ? (
            <>
              <Button type="primary">
                <Link to={"/addEventData"}>Add Event</Link>
              </Button>
              <Button type="primary">
                <Link to={"/bookings"}>view Bookings</Link>
              </Button>{" "}
            </>
          ) : (
            <Button type="primary">
              <Link to={"/bookings"}>Bookings</Link>
            </Button>
          )}
        </Flex>
        <EventCard sortOption={sortOption} />
      </Layout>
    </div>
  );
};

export default Home;
