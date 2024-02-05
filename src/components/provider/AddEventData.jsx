import React, { useEffect } from "react";
import {
  Button,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Select,
  TimePicker,
  Flex,
} from "antd";
import actions from "../../action/actions";

import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import moment from "moment";
import { useNavigate, useParams } from "react-router-dom";
import slotsCalculate from "../../utils/slotsCalculate";
import useCheckLogin from "../../utils/CheckLogin";

const formItemLayout = {
  labelCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 6,
    },
  },
  wrapperCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 14,
    },
  },
};

const { setEventsData, setEventIdCounterData } = actions;

const AddEventData = () => {
  useCheckLogin();

  const dispatch = useDispatch();

  const { eventsData } = useSelector((s) => s.events);
  const { currentUserData } = useSelector((s) => s.currentUser);

  const { eventIdCounterData } = useSelector((s) => s.eventIdCounter);
  const navigate = useNavigate();

  const { eventId } = useParams();
  console.log("eventId: ", eventId);

  const matchingEvent = eventsData.find((item) => item.id === +eventId);
  console.log("matchingEvent: ", matchingEvent);

  const [form] = Form.useForm();

  useEffect(() => {
    console.log("useEffect is running");
    if (matchingEvent) {
      console.log("cLLL");
      form.setFieldsValue({
        name: matchingEvent?.name,
        image: matchingEvent?.image,
        price: matchingEvent?.price,
        description: matchingEvent?.description,
        duration: matchingEvent?.duration,
        date: moment(matchingEvent?.date),
        timeRange: [
          moment(matchingEvent?.startTime),
          moment(matchingEvent?.endTime),
        ],
      });
    }
  }, [matchingEvent, form]);

  const onFinish = (value) => {
    dispatch(setEventIdCounterData());

    const formatTime = (time) => moment(time, "h:mm A").format("HH:mm");

    const startTime = formatTime(value.timeRange[0].toDate());
    const endTime = formatTime(value.timeRange[1].toDate());

    const slots = slotsCalculate(startTime, endTime, value.duration);
    const updatedEvent = {
      ...value,
      providerId: currentUserData.id,
      id: eventId ? parseInt(eventId) : eventIdCounterData,
      slots: slots,
    };

    if (eventId) {
      const updatedEventsData = eventsData.map((event) =>
        event.id === parseInt(eventId) ? updatedEvent : event
      );
      dispatch(setEventsData(updatedEventsData));
      toast.success("Event updated successfully");
    } else {
      dispatch(setEventsData([...eventsData, updatedEvent]));
      toast.success("Event added successfully");
    }

    navigate("/home");
  };

  return (
    <>
      <Flex justify="center">
        <Form
          form={form}
          {...formItemLayout}
          variant="filled"
          style={{
            width: 433,
          }}
          onFinish={onFinish}
          initialValues={{ duration: "30" }}
        >
          <Flex justify="center" style={{ padding: "5%" }}>
            <h1>{matchingEvent ? "Edit" : "Add"} Event</h1>
          </Flex>
          <Form.Item
            label="Name of event"
            name="name"
            rules={[
              {
                required: true,
                message: "Please input!",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Image Url"
            name="image"
            rules={[
              {
                required: true,
                message: "Please input!",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Price"
            name="price"
            rules={[
              {
                required: true,
                message: "Please input!",
              },
            ]}
          >
            <InputNumber
              style={{
                width: "100%",
              }}
            />
          </Form.Item>

          <Form.Item
            label="TextArea"
            name="description"
            rules={[
              {
                required: true,
                message: "Please input!",
              },
            ]}
          >
            <Input.TextArea />
          </Form.Item>

          <Form.Item
            label="duration"
            name="duration"
            rules={[
              {
                required: true,
                message: "Please input!",
              },
            ]}
          >
            <Select
              style={{
                width: 120,
              }}
              defaultValue="30"
            >
              <Select.Option value="30">30 minis</Select.Option>
              <Select.Option value="60">1 hour</Select.Option>
              <Select.Option value="90">1.30 hours</Select.Option>
              <Select.Option value="120">2 hours</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item
            label="select Date"
            name="date"
            rules={[
              {
                required: true,
                message: "Please input!",
              },
            ]}
          >
            <DatePicker />
          </Form.Item>

          <Form.Item
            label="Time"
            name="timeRange"
            rules={[
              {
                required: true,
                message: "Please select TimePicker",
              },
            ]}
          >
            <TimePicker.RangePicker />
          </Form.Item>

          <Flex justify="center">
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Flex>
        </Form>
      </Flex>
    </>
  );
};

export default AddEventData;
