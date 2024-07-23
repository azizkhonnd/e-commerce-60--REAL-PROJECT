/* eslint-disable no-unused-vars */
import { useState } from 'react';
import { Button, Checkbox, Form, Input, Typography, Divider, message } from 'antd';
import { Link, useNavigate } from 'react-router-dom';

import { GoogleLogin } from '@react-oauth/google';
import TelegramLoginButton from 'telegram-login-button';

import axios from "../../../api";
import { useDispatch, useSelector } from 'react-redux';

const { Title, Text } = Typography;

const Register = () => {
  const { loading } = useSelector(state => state);
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const onFinish = async (values) => {
    try {
      dispatch({ type: "LOADING" });
      const { data } = await axios.post('/auth', values);
      dispatch({ type: "LOGIN", token: data.payload.token, user: data.payload.user });
      message.success(data.message || 'Registration successful!');
    } catch (error) {
      dispatch({ type: "ERROR" });
      message.error(error.response?.data?.message || 'Registration failed. Please try again.');
    }
    form.resetFields();
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <Form
      layout='vertical'
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
      <Title className='text-center'>Register</Title>
      <Form.Item
        style={{ marginBottom: "0px" }}
        label="Firstname"
        name="first_name"
        rules={[
          {
            required: true,
            message: 'Please input your firstname!',
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        style={{ marginBottom: "0px" }}
        label="Username"
        name="username"
        rules={[
          {
            required: true,
            message: 'Please input your username!',
          }
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        style={{ marginBottom: "0px" }}
        label="Password"
        name="password"
        rules={[
          {
            required: true,
            message: 'Please input your password!',
          }
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
        className='w-full'
        wrapperCol={{
          span: 24,
        }}
      >
        <Button disabled={loading} className='w-full' type="primary" htmlType="submit">
          Register
        </Button>
      </Form.Item>
      <Divider className='text-center text-gray-500 mb-[20px]'>Or</Divider>
      <div className='flex justify-center flex-col'>
        <GoogleLogin
          disabled={loading}
          onSuccess={async (credentialResponse) => {
            const decode = credentialResponse.credential.split(".")[1];
            const userData = JSON.parse(atob(decode));

            const user = {
              username: userData.email,
              password: userData.sub,
              first_name: userData.name
            }
            const response = await axios.post('/auth', user);
            message.success(response.data.message || 'Google registration successful!');
              navigate("/dashboard")
          }}
          onError={() => {
            console.log('Login Failed');
            message.error('Google registration failed. Please try again.');
          }}
          useOneTap
          text="Register with Google"
          size="medium"
          theme="filled_blue"
          className='w-full'
          width={300}
        />
        <TelegramLoginButton
          disabled={loading}
          onSuccess={async (credentialResponse) => {
            const decode = credentialResponse.credential.split(".")[1];
            const userData = JSON.parse(atob(decode));

            const user = {
              username: userData.username,
              password: userData.id,
              first_name: userData.first_name
            }
            const response = await axios.post('/auth', user);
            message.success(response.data.message || 'Telegram registration successful!');
            navigate("/dashboard")
          }}
          botName={import.meta.env.VITE_TELEGRAM_BOT_USERNAME}
          dataOnauth={user => console.log(user)}
          size="large"
          theme="filled_blue"
          className='w-full mt-[20px] ml-[60px]'
          width={350}
        />
      </div>
      <Text className='mt-[20px] block text-center'> Already have an account? <Link to="/auth">Login</Link> </Text>
    </Form>
  )
}

export default Register;
