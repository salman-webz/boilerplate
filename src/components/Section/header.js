import React,  {useState, useEffect} from 'react';
import { ReactComponent as Logo } from "../../../src/assets/images/svg/logo.svg";
import { ReactComponent as UserProfile } from "../../assets/images/svg/profile-user.svg";
import { ReactComponent as ArrowDown } from "../../assets/images/svg/drop-arrow.svg";
import { ReactComponent as ChangePasswordIcon } from "../../assets/images/svg/change-password.svg";
import classNames from "classnames";
import { ReactComponent as ProcessManagement } from "../../assets/images/svg/process-management.svg";
import { ReactComponent as UserManagment } from "../../assets/images/svg/user-management.svg";
import { ReactComponent as Logout } from "../../assets/images/svg/logout.svg";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../store/actions";
import Modal from "../../components/UI/Modal/Modal";
import Styles from "./Styles"
import { modal } from "../../store/actions";

const Header = () => {
    const [userDropdown, setUserDropdown] = useState(false);
    // const { abortModal } = useSelector(state => state.modals);

    const dispatch = useDispatch();
    const userDropdownHandler = () => {
        setUserDropdown(!userDropdown);
    };
    const logoutHander = () => {
        // history.push('/welcome');
        dispatch(logout);
    };

    // const primaryButtonClick = () => {
    //     console.log('primaryButtonClick');
    // }

    // const secondaryButtonClick = () => {
    //     dispatch(modal({'abortModal': false}));
    // }

    return(
        <>
          <header className="header">
                <div className="wrapper flex justify-between">
                    <div className="logo-wrapper ">
                    <img src="https://muhammadsalman.me/projects/x-images/logo.png" alt="" className="logo-image" />
                    </div>
                    <div className="header-menu">
                        <ul className="flex">
                            <li className="uppercase  menu-list">
                                <button className="active">Menu Scripts</button>
                            </li>
                            <li className="uppercase  menu-list">
                                <button className="">Journals</button>
                            </li>
                            <li className="uppercase  menu-list">
                                <button>Editorial Board</button>
                            </li>
                            <li className="uppercase  menu-list">
                                <button>Reviewer Board</button>
                            </li>
                            <li className="">
                                <div className="relative inline-block text-left">
                                    <div>
                                        <button onClick={userDropdownHandler} type="button" className="flex drop-icon" id="menu-button" aria-expanded="true" aria-haspopup="true">
                                            <UserProfile />
                                            <ArrowDown className={classNames("user-arrow-down", { active: userDropdown })} />
                                        </button>
                                    </div>
                                    {userDropdown && (
                                        <ul className="absolute dropdown-menu" role="menu" aria-orientation="vertical" aria-labelledby="menu-button" >
                                            <li className="text-gray-700 dropdown-item block px-4 py-2 active" role="menuitem"  id="menu-item-0">
                                                <span className="user-email">jon_doe@somecompany.com</span>
                                                <p className="flex change-password">
                                                    <ChangePasswordIcon />
                                                    <span className="underline">Change Password</span>
                                                </p>
                                            </li>
                                            <li className="text-gray-700 dropdown-item px-4 py-2 flex" role="menuitem"  id="menu-item-1">
                                                <ProcessManagement />
                                                Student Managment
                                            </li>
                                            <li className="text-gray-700 dropdown-item px-4 py-2 flex" role="menuitem"  id="menu-item-1">
                                                <UserManagment />
                                                Faculty Management
                                            </li>
                                            <li className="text-gray-700 dropdown-item px-4 py-2 flex" role="menuitem"  id="menu-item-1" onClick={logoutHander}>
                                                <Logout /> Logout
                                            </li>
                                        </ul>
                                    )}
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </header>   
            <Styles />
            {/* <Modal show={abortModal} title={'abort search'} primaryButtonTitle={'abort'} secondaryButtonTitle={'cancel'} primaryButtonClick={primaryButtonClick} secondaryButtonClick={secondaryButtonClick}>
                <p class="modal-content">Search in progress. Are you sure you want to abort search?</p>
            </Modal> */}
        </>
    )
}

export default Header;