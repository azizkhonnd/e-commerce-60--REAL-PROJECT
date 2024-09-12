/* eslint-disable react/prop-types */
import { BiCartAlt } from "react-icons/bi";
import { AiOutlineUser } from "react-icons/ai";
import { Link } from 'react-router-dom';
import { Badge } from 'antd';
import SiteLogo from './img/site-logo.svg';
import './Nav.css';

const Navbar = ({ cartItems = [] }) => {
    return (
        <div className='nav__container bg-orange-400'>
            <div className='container py-5'>
                <div className="flex justify-between items-center ">
                    <div className="flex">
                        <div className="site__logo flex items-center gap-[40px]">
                            <div>
                                <Link to='/'>
                                    <img src={SiteLogo} alt="Site Logo" width={100} height={50} />
                                </Link>
                            </div>
                            <div className="flex gap-4 items-center ">
                                <Link className="nav__link text-white" to='/'>Home</Link>
                                <Link className="nav__link text-white" to='/about'>About</Link>
                                <Link className="nav__link text-white" to='/contact'>Contact</Link>
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
