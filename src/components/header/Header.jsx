import { Input } from 'antd';

const { Search } = Input;

const Header = () => {
  const onSearch = (value) => {
    console.log(value);
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 20px', background: '#f0f2f5' }}>
      <div>
        <h2>My E-commerce Site</h2>
      </div>
      <div>
        <Search
          placeholder="Search for products"
          onSearch={onSearch}
          style={{ width: 200 }}
        />
      </div>
    </div>
  );
}

export default Header;
