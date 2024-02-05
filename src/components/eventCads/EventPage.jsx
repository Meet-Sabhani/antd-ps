import { Button, Card, Col, Flex, Image, Row } from "antd";
import moment from "moment";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import "./EventPage.css";
import { toast } from "react-toastify";
import actions from "../../action/actions";

const cardStyle = {
  height: "fit-content",
  overflow: "hidden",
  zIndex: 1,
};

const imgStyle = {
  width: "100%",
  height: "100%",
  borderRadius: "10px",
  objectFit: "cover",
};

const { setBookingData, setEventsData, setDeleteEvent } = actions;

const EventPage = () => {
  const { productId } = useParams();
  console.log("productId: ", productId);
  const { eventsData } = useSelector((s) => s.events);

  const { currentUserData } = useSelector((s) => s.currentUser);
  console.log("eventsData: ", eventsData);

  const { bookingData } = useSelector((s) => s.booking) || [];
  console.log("bookingData: ", bookingData);

  const matchingEvent = eventsData.find(
    (item) => item.id === parseInt(productId)
  );

  console.log("matchingEvent: ", matchingEvent);

  const dispatch = useDispatch();

  const [selectedSlot, setSelectedSlot] = useState([]);
  console.log("selectedSlot: ", selectedSlot);

  const select_Slot = (e) => {
    setSelectedSlot((prevSelectedSlots) => {
      if (prevSelectedSlots.includes(e)) {
        return prevSelectedSlots.filter((selectedTime) => selectedTime !== e);
      } else {
        return [...prevSelectedSlots, e];
      }
    });
  };

  const buySlot = () => {
    const timeSlotsArray = [...matchingEvent.slots];

    if (selectedSlot.length === 0) {
      toast.error("Please select a slot before clicking Buy");
      return;
    }

    const selectedSlotsInfo = selectedSlot
      .map((slot) => {
        const index = timeSlotsArray.findIndex((t) => t.time === slot);

        if (index !== -1 && !timeSlotsArray[index].booked) {
          timeSlotsArray[index] = { ...timeSlotsArray[index], booked: true };
          return slot;
        } else {
          toast.error("selected slots are already booked");
          return null;
        }
      })
      .filter(Boolean);

    if (selectedSlotsInfo.length > 0) {
      const updatedMatchingEvent = {
        ...matchingEvent,
        slots: timeSlotsArray,
      };

      dispatch(
        setEventsData(
          eventsData.map((event) =>
            event.id === parseInt(productId) ? updatedMatchingEvent : event
          )
        )
      );

      const newBookingObject = {
        user: currentUserData,
        eventInfo: matchingEvent,
        slots: selectedSlotsInfo,
      };

      dispatch(setBookingData([...bookingData, newBookingObject]));

      toast.success("Slots booked successfully");
      setSelectedSlot([]);
    }
  };

  const handleDelete = (eventId) => {
    dispatch(setDeleteEvent(eventId));
  };

  return (
    <Flex justify="center" style={{ padding: "4% 8%" }}>
      <Card
        style={cardStyle}
        hoverable
        bodyStyle={{
          padding: 0,
        }}
      >
        <Row gutter={[6, 6]}>
          <Col xs={24} sm={24} md={24} lg={12} style={{ display: "flex" }}>
            <Image
              alt="avatar"
              fallback="https://t3.ftcdn.net/jpg/03/45/05/92/360_F_345059232_CPieT8RIWOUk4JqBkkWkIETYAkmz2b75.jpg"
              src={matchingEvent.image}
              style={imgStyle}
            />
          </Col>
          <Col xs={24} sm={24} md={24} lg={12}>
            <Flex vertical align="center" justify="center" style={{}}>
              <h1>{matchingEvent.name}</h1>
              <p>{matchingEvent.description}</p>
              <h4>{moment(matchingEvent.date).format("L")}</h4>
              <h4>
                {moment(matchingEvent.timeRange[0]).format("LTS")} -{" "}
                {moment(matchingEvent.timeRange[1]).format("LTS")}
              </h4>
              <h3>duration: {matchingEvent.duration}</h3>
              <Flex wrap="wrap" gap={6} justify="center">
                {matchingEvent.slots.map((e) => {
                  return (
                    <div
                      onClick={() => (e.booked ? "" : select_Slot(e.time))}
                      className={
                        selectedSlot.includes(e.time) || e.booked
                          ? "selected-slot"
                          : "slot"
                      }
                    >
                      {e.time}
                    </div>
                  );
                })}
              </Flex>
              <h2>price:{matchingEvent.price}</h2>

              {currentUserData.userType === "Provider" ? (
                <Flex gap={6}>
                  <Button type="primary">
                    <Link to={`/addEventData/${matchingEvent.id}`}>Edit</Link>
                  </Button>
                  <Button
                    type="primary"
                    onClick={() => handleDelete(matchingEvent.id)}
                  >
                    Delate
                  </Button>
                </Flex>
              ) : (
                <Button type="primary" onClick={buySlot}>
                  buy
                </Button>
              )}
            </Flex>
          </Col>
        </Row>
      </Card>
    </Flex>
  );
};

export default EventPage;
