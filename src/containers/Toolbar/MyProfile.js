import React from "react";
import { useSelector } from "react-redux";
import InputField from "../../components/UI/InputField/InputField";

// ICONS
import { ReactComponent as UserIcon } from "../../assets/svgs/userIcon.svg";
import { ReactComponent as EmailIcon } from "../../assets/svgs/emailIcon.svg";
import { ReactComponent as UserStatusIcon } from "../../assets/svgs/userStatusIcon.svg";
import { ReactComponent as UserRoleIcon } from "../../assets/svgs/userRoleIcon.svg";


const MyProfile = () => {
    const Currentuser = useSelector(state => state.auth.user) || '';
    return (
        <>
            <div className="fieldDiv row mb-20 relative hasIcon disabled">
                <InputField
                    type={"text"}
                    Icon={UserIcon}
                    autoComplete="off"
                    className={"row"}
                    placeholder={"Enter your Name"}
                    value={Currentuser.username}
                    readOnly
                />
            </div>
            <div className="fieldDiv row mb-20 relative hasIcon disabled">
                <InputField
                    type={"text"}
                    Icon={EmailIcon}
                    autoComplete="off"
                    className={"row"}
                    placeholder={"Enter your Email"}
                    value={Currentuser.user_email}
                    readOnly
                />
            </div>
            <div className="fieldDiv row mb-20 relative hasIcon half mr-15 disabled">
                <InputField
                    type={"text"}
                    Icon={UserRoleIcon}
                    autoComplete="off"
                    className={"row"}
                    placeholder={"Role"}
                    value={Currentuser.user_role === 1 ? 'Read/Write' : 'Read'}
                    readOnly
                />
            </div>
            <div className="fieldDiv row mb-20 relative hasIcon half disabled">
                <InputField
                    type={"text"}
                    Icon={UserStatusIcon}
                    autoComplete="off"
                    className={"row"}
                    placeholder={"Status"}
                    value={Currentuser.user_status === 1 ? 'Active' : 'Inactive'}
                    readOnly
                />
            </div>
        </>
    );
};

export default MyProfile;
