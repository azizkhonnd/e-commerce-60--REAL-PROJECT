import { Input } from "antd";

const { Search } = Input;

const Header = () => {
  const onSearch = (value) => {
    console.log(value);
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        padding: "10px 40px",
        background: "#f0f2f5",
        width: "100%",
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
            width: 35,
            height: 35,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            borderRadius: 50,
            marginLeft: 50,
            cursor: "pointer",
          }}
        >
          <img
            src="https://cdn-icons-png.flaticon.com/512/149/149071.png"
            alt=""
          />
        </div>
      </div>
    </div>
  );
};

export default Header;
