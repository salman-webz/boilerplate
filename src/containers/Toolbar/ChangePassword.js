import React from "react";
import InputField from "../../components/UI/InputField/InputField";
import { Field, reduxForm } from "redux-form";
import Loader from '../../components/UI/Loader/Loader';

// ICONS
import { ReactComponent as LockIcon } from "../../assets/svgs/lockIcon.svg";


const renderInput = ({ input, Icon, label, meta, type }) => {
    const className = `row ${meta.touched && meta.error ? "error" : ""}`;
    return (
        <>
            <InputField
                {...input}
                type={type}
                Icon={Icon}
                autoComplete="off"
                className={className}
                placeholder={label}
            />
            {renderError(meta)}
        </>
    );
};

const renderError = ({ error, touched }) => {
    if (touched && error) {
        return <span className="errorMsg color-red fs-11">{error}</span>;
    }
};

const validate = formValues => {
    const errors = {};
    if (!formValues.currentPassword) {
        errors.currentPassword = "This field is required!";
    }
    if (!formValues.newPassword) {
        errors.newPassword = "This field is required!";
    }
    if (!formValues.confirmPassword) {
        errors.confirmPassword = "This field is required!";
    }
    if (formValues.confirmPassword !== formValues.newPassword) {
        errors.confirmPassword = "Your password does not match";
    }
    return errors;
};


const ChangePassword = (props) => {
    return (
        <div className="row beforeSuccessDiv">
        <Loader isLoading={props.panelLoading} />
        <form>
            <div className="fieldDiv row mb-20 relative hasIcon">
                <Field
                    Icon={LockIcon}
                    type="password"
                    name="currentPassword"
                    component={renderInput}
                    label="Current Password"
                />
            </div>
            <div className="fieldDiv row mb-20 relative hasIcon">
                <Field
                    Icon={LockIcon}
                    type="password"
                    name="newPassword"
                    component={renderInput}
                    label="New Password"
                />
            </div>
            <div className="fieldDiv row mb-20 relative hasIcon">
                <Field
                    Icon={LockIcon}
                    type="password"
                    name="confirmPassword"
                    component={renderInput}
                    label="Confirm Password"
                />
            </div>
        </form>
    </div>
    );
};

export default reduxForm({
    form: "changePasswordForm",
    validate,
})(ChangePassword)
