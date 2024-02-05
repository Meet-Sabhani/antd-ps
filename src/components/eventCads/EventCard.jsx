import React, { useEffect, useState } from "react";
import {
  Button,
  Card,
  Col,
  Flex,
  Image,
  Row,
  Skeleton,
  Typography,
} from "antd";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import { Link } from "react-router-dom";
import actions from "../../action/actions";
import CardWrap from "../../styles/CardWrap";

const cardStyle = {
  height: "fit-content",
  // height: 280,
  overflow: "hidden",
  zIndex: 1,
};

const imgStyle = {
  width: "100%",
  // height: "100%",
  height: 280,
  objectFit: "cover",
};

const { setDeleteEvent } = actions;

const EventCard = () => {
  const { eventsData } = useSelector((s) => s.events);
  console.log("eventsData: ", eventsData);
  const { currentUserData } = useSelector((s) => s.currentUser);
  const { filterData } = useSelector((s) => s.currentUser);
  console.log("filterData: ", filterData);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (filterData) {
      if (currentUserData.userType === "Provider") {
        const filteredEvents = filterData.filter(
          (event) => event.providerId === currentUserData.id
        );
        setEventDataList(filteredEvents);
      } else {
        setEventDataList(filterData);
      }
    } else {
      if (currentUserData.userType === "Provider") {
        const filteredEvents = eventsData.filter(
          (event) => event.providerId === currentUserData.id
        );
        setEventDataList(filteredEvents);
      } else {
        setEventDataList(eventsData);
      }
    }
  }, [eventsData, currentUserData, filterData]);

  const [eventDataList, setEventDataList] = useState([]);

  const dispatch = useDispatch();

  const handleDelete = (eventId) => {
    dispatch(setDeleteEvent(eventId));
  };

  return (
    <Row gutter={[16, 16]} style={{ padding: "2% 4%", marginRight: "unset" }}>
      {loading ? (
        <div className="loader-overlay">
          <Skeleton />
        </div>
      ) : (
        eventDataList.map((e) => (
          <Col xs={24} sm={24} md={12} lg={12} key={e.id}>
            <Card
              hoverable
              style={cardStyle}
              bodyStyle={{
                padding: 0,
              }}
            >
              <Row>
                <Col
                  xs={24}
                  sm={24}
                  md={12}
                  lg={12}
                  style={{ display: "flex", height: "100%" }}
                >
                  <Image
                    alt="avatar"
                    fallback="https://t3.ftcdn.net/jpg/03/45/05/92/360_F_345059232_CPieT8RIWOUk4JqBkkWkIETYAkmz2b75.jpg"
                    src={e.image}
                    style={imgStyle}
                  />
                </Col>
                <Col xs={24} sm={24} md={12} lg={12}>
                  <CardWrap>
                    <Flex
                      vertical
                      align="center"
                      justify="center"
                      style={{
                        padding: "3% 0",
                      }}
                    >
                      <Typography.Title level={3}>{e.name}</Typography.Title>
                      <p>{e.description}</p>
                      <h3>duration: {e.duration}</h3>
                      <h4>{moment(e.date).format("L")}</h4>
                      <h4>
                        {moment(e.timeRange[0]).format("LTS")} -{" "}
                        {moment(e.timeRange[1]).format("LTS")}
                      </h4>
                      <h2>price:{e.price}</h2>

                      {currentUserData.userType === "Provider" ? (
                        <Flex gap={6} wrap="wrap" justify="center">
                          <Button type="primary">
                            <Link to={`/addEventData/${e.id}`}> Edit </Link>
                          </Button>
                          <Button
                            type="primary"
                            onClick={() => handleDelete(e.id)}
                          >
                            Delate
                          </Button>
                          <Button type="primary">
                            <Link
                              type="primary"
                              style={{ color: "#fff" }}
                              to={`/detail/${e.id}`}
                            >
                              Detail
                            </Link>
                          </Button>
                        </Flex>
                      ) : (
                        <Button type="primary">
                          <Link
                            style={{ color: "#fff" }}
                            to={`/detail/${e.id}`}
                          >
                            buy
                          </Link>
                        </Button>
                      )}
                    </Flex>
                  </CardWrap>
                </Col>
              </Row>
            </Card>
          </Col>
        ))
      )}
    </Row>
  );
};

export default EventCard;
