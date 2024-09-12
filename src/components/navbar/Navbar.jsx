/* eslint-disable react/prop-types */
import { BiCartAlt } from "react-icons/bi";
import { AiOutlineUser } from "react-icons/ai";
import { Link } from 'react-router-dom';
import { Badge } from 'antd';
import SiteLogo from './img/site-logo.svg';
import './Nav.css';

const Navbar = ({ cartItems = [] }) => {
    return (
        <div className='nav__container bg-orange-500'>
            <div className='container py-3'>
                <div className="flex justify-between items-center ">
                    <div className="flex">
                        <div className="site__logo flex items-center gap-[40px]">
                            <div className="flex items-center gap-5">
                                <Link to='/'>
                                    <img src={SiteLogo} alt="Site Logo" width={50} height={50} />
                                </Link>
                                <div>
                                    <Link to='/'>
                                        <h2 className="text-white text-2xl">Orange Shop</h2>
                                    </Link>
                                </div>
                            </div>

                        </div>
                    </div>
                    <div className="flex items-center gap-4">
                        <Link to='/cart'>
                            <Badge count={cartItems.length} showZero>
                                <BiCartAlt size={30} color="white" />
                            </Badge>
                        </Link>
                        <Link to='/auth/login'>
                            <AiOutlineUser size={30} color="white" />
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Navbar;
