import { useState, useEffect } from "react";
import { Input, Modal, Upload, Button, notification } from "antd";
import { UploadOutlined } from "@ant-design/icons";

const { Search } = Input;

const Header = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [imageUrl, setImageUrl] = useState("");

  useEffect(() => {
    const savedImageUrl = localStorage.getItem("userImageUrl");
    if (savedImageUrl) {
      setImageUrl(savedImageUrl);
    }
  }, []);

  const onSearch = (value) => {
    console.log(value);
  };

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleChange = (info) => {
    if (info.file.status === "done") {
      const url = URL.createObjectURL(info.file.originFileObj);
      setImageUrl(url);
      localStorage.setItem("userImageUrl", url);
      setIsModalOpen(false);
      notification.success({
        message: "Upload Successful",
        description: "Your photo has been uploaded successfully.",
        placement: "bottomRight", // Set placement for toast notification
      });
    } else if (info.file.status === "error") {
      notification.error({
        message: "Upload Failed",
        description:
          "There was an error uploading your photo. Please try again.",
        placement: "bottomRight", // Set placement for toast notification
      });
    }
  };

  const customRequest = ({ onSuccess }) => {
    setTimeout(() => {
      onSuccess("ok");
    }, 0);
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        padding: "10px 40px",
        background: "#f0f2f5",
        width: "100%",
        position: "relative",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          width: "100%",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Search
            style={{ width: 480, display: "flex", justifyContent: "center" }}
            placeholder="Search..."
            onSearch={onSearch}
          />
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            marginLeft: 50,
            cursor: "pointer",
          }}
          onClick={showModal}
        >
          <img
            src={
              imageUrl ||
              "https://cdn-icons-png.flaticon.com/512/149/149071.png"
            }
            alt="User Avatar"
            className="user__img"
            style={{ width: "35px", height: "35px", borderRadius: "50%" }}
          />
        </div>
      </div>
      <Modal
        title="Upload User Photo"
        visible={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Upload
          accept="image/*"
          showUploadList={false}
          customRequest={customRequest}
          onChange={handleChange}
        >
          <Button icon={<UploadOutlined />}>Click to Upload</Button>
        </Upload>
      </Modal>
    </div>
  );
};

export default Header;
