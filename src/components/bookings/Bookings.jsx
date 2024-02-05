import { Col, Flex, Row } from "antd";
import React from "react";
import { useSelector } from "react-redux";
import useCheckLogin from "../../utils/CheckLogin";
import Container from "../../styles/Container";
import Heading from "../../styles/Heading";
import BookingCard from "../../styles/BookingCard";

const Bookings = () => {
  useCheckLogin();

  const { bookingData } = useSelector((s) => s.booking);
  console.log("bookingData: ", bookingData);

  const { currentUserData } = useSelector((s) => s.currentUser);
  console.log("currentUserData: ", currentUserData);

  const filterData =
    currentUserData.userType === "Provider"
      ? bookingData.filter(
          (bookings) => bookings.eventInfo.providerId === currentUserData.id
        )
      : bookingData.filter(
          (bookings) => bookings.user.id === currentUserData.id
        );

  console.log("filterData: ", filterData);

  return (
    <Flex>
      <Container>
        <Heading>Bookings</Heading>
        {currentUserData.userType === "Provider" ? (
          <Row gutter={[16, 16]} style={{ marginRight: 0 }}>
            {filterData.map((event, i) => {
              return (
                <Col key={i} span={8}>
                  <BookingCard>
                    <h4> Name : {event.eventInfo.name}</h4>
                    <img src={event.eventInfo.image} width={"100%"} alt="" />
                    <h3>slots</h3>
                    <Flex wrap="wrap" gap={6}>
                      {event.slots.map((s) => {
                        return <div className="selected-slot">{s}</div>;
                      })}
                    </Flex>
                    <h3>user Name : {event.user.username}</h3>
                    <h3>user email : {event.user.email}</h3>
                  </BookingCard>
                </Col>
              );
            })}
          </Row>
        ) : (
          <Row gutter={[16, 16]} style={{ marginRight: 0 }}>
            {filterData.map((event, i) => {
              return (
                <Col key={i} span={8}>
                  <BookingCard>
                    <h4> Name : {event.eventInfo.name}</h4>
                    <img src={event.eventInfo.image} alt="" />
                    <h3>slots</h3>
                    <Flex wrap="wrap" gap={6}>
                      {event.slots.map((s) => {
                        return <div className="selected-slot">{s}</div>;
                      })}
                    </Flex>
                  </BookingCard>
                </Col>
              );
            })}
          </Row>
        )}
      </Container>
    </Flex>
  );
};

export default Bookings;
