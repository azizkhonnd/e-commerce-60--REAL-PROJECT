/* eslint-disable no-unused-vars */
import {
  Button,
  Checkbox,
  Form,
  Input,
  Typography,
  Divider,
  notification,
} from "antd";
import { Link, useNavigate } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";
import TelegramLoginButton from "telegram-login-button";
import axios from "../../../api/index";
import { useDispatch, useSelector } from "react-redux";
import { LOGIN, LOADING, ERROR } from "../../../redux/actions/action-types";

const { Title, Text } = Typography;

const Login = () => {
  const navigate = useNavigate();
  const loading = useSelector((state) => state.loading);
  const dispatch = useDispatch();
  const [form] = Form.useForm();

  const openNotification = (type, message) => {
    notification[type]({
      message,
      placement: "topRight",
    });
  };

  const onFinish = async (values) => {
    try {
      dispatch({ type: LOADING });
      const { data } = await axios.post("/auth/login", values);
      dispatch({
        type: LOGIN,
        token: data.payload.token,
        user: data.payload.user,
      });
      openNotification("success", "Login successful!");
      navigate("/dashboard");
    } catch (error) {
      dispatch({ type: ERROR });
      openNotification("error", "Login failed. Please check your credentials.");
    }
    form.resetFields();
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const handleGoogleLoginSuccess = async (credentialResponse) => {
    const decode = credentialResponse.credential.split(".")[1];
    const userData = JSON.parse(atob(decode));

    const user = {
      username: userData.email,
      password: userData.sub,
      first_name: userData.name,
    };

    try {
      const { data } = await axios.post("/auth/login", user);
      dispatch({
        type: LOGIN,
        token: data.payload.token,
        user: data.payload.user,
      });
      openNotification("success", "Login successful with Google!");
      navigate("/dashboard");
    } catch (error) {
      openNotification("error", "Google login failed.");
    }
  };

  const handleTelegramLoginSuccess = async (userData) => {
    const user = {
      username: "@" + userData.username,
      password: userData.id.toString(),
      first_name: userData.first_name,
    };

    try {
      const { data } = await axios.post("/auth/login", user);
      dispatch({
        type: LOGIN,
        token: data.payload.token,
        user: data.payload.user,
      });
      openNotification("success", "Login successful with Telegram!");
      navigate("/dashboard");
    } catch (error) {
      openNotification("error", "Telegram login failed.");
    }
  };

  return (
    <Form
      layout="vertical"
      name="basic"
      labelCol={{
        span: 8,
      }}
      wrapperCol={{
        span: 24,
      }}
      style={{
        maxWidth: 600,
      }}
      initialValues={{
        remember: true,
      }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <Title className="text-center">Login</Title>
      <Form.Item
        style={{ marginBottom: "0px" }}
        label="Username"
        name="username"
        rules={[
          {
            required: true,
            message: "Please input your username!",
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Password"
        name="password"
        rules={[
          {
            required: true,
            message: "Please input your password!",
          },
        ]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item
        name="remember"
        valuePropName="checked"
        wrapperCol={{
          span: 16,
        }}
      >
        <Checkbox>Remember me</Checkbox>
      </Form.Item>

      <Form.Item
        className="w-full"
        wrapperCol={{
          span: 24,
        }}
      >
        <Button
          disabled={loading}
          className="w-full"
          type="primary"
          htmlType="submit"
        >
          Login
        </Button>
      </Form.Item>
      <Divider className="text-center text-gray-500 mb-[20px]">Or</Divider>
      <div className="flex justify-center flex-col">
        <GoogleLogin
          disabled={loading}
          onSuccess={handleGoogleLoginSuccess}
          onError={() => {
            openNotification("error", "Google login failed.");
          }}
          useOneTap
          text="Login with Google"
          size="large"
          theme="filled_blue"
          className="w-full"
          width={300}
        />
        <TelegramLoginButton
          disabled={loading}
          onSuccess={handleTelegramLoginSuccess}
          botName={import.meta.env.VITE_TELEGRAM_BOT_USERNAME}
          dataOnauth={(user) => console.log(user)}
          size="large"
          theme="filled_blue"
          className="w-full mt-[20px] ml-[20px]"
          width={350}
        />
      </div>
      <Text className="mt-[20px] block text-center">
        {" "}
        Don’t have an account? <Link to="/auth/register">Register </Link>{" "}
      </Text>
    </Form>
  );
};

export default Login;
