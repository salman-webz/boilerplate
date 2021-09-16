import React, { useState } from "react";
import { Redirect, withRouter } from "react-router-dom";
import { Field, reduxForm } from "redux-form";
import { useSelector, useDispatch } from "react-redux";
import { login } from "../../store/actions/";
import { UserTypeList} from "../../constants/common";
import InputField from "../../components/UI/InputField/InputField";
import Button from "../../components/UI/Button/Button";
import Loader from "../../components/UI/Loader/Loader";
import Toaster from "../../components/UI/Toaster/Toaster";
import Styles from './Styles';
import { ReactComponent as DropArrow } from "../../assets/images/svg/drop-arrow.svg";
import DropDown from "../../components/UI/Dropdown/Dropdown";

const renderInput = ({ input, Icon, label, meta, type, defaultClasses }) => {
    const className = `${defaultClasses} ${meta.touched && meta.error ? "error" : ""}`;
    return (
        <>
            <InputField {...input} type={type} Icon={Icon} autoComplete="off" className={className} placeholder={label}  />
            {renderError(meta)}
        </>
    );
};


const renderError = ({ error, touched }) => {
    if (touched && error) {
        return <span className="errorMsg color-red fs-11">{error}</span>;
    }
};

const validate = (formValues) => {
    const errors = {};
    if (!formValues.username) {
        errors.username = "Email Address required";
    }

    if (!formValues.password) {
        errors.password = "You must enter password";
    }
    return errors;
};

const onSubmit = (formValues, dispatch) => {
    const { username, password } = formValues;
    dispatch(login(username, password));
};

const AuthForm = (props) => {
    const auth = useSelector((state) => state.auth);
    const toaster = useSelector((state) => state.toaster);
    const dispatch = useDispatch();
    const [shouldUserTypeOpen, setShouldUserTypeOpen] = useState(false);
    const [userType, setUserType] = useState("Select User Type");
    const isAuthenticated = auth.token !== null;
    const signupHandler = () => {
        setIsSignup(!isSignup)
    }
    const userChangeHandler = (userText) => {
        setShouldUserTypeOpen(!shouldUserTypeOpen);
        setUserType(userText);
    }
    const [isSignup, setIsSignup] = useState(false);
    return isAuthenticated ? (
        <Redirect to="/" />
    ) : (
        <form
            className="flex loginFormCont align-left"
            onSubmit={props.handleSubmit((formValues) => {
                onSubmit(formValues, dispatch);
            })}
        >
            <div className="col-1 bg-white pt-20 pl-30 pr-35">
                <div>
                    <div className="text-center">
                        {/* <Logo className="logo-banner"/> */}
                        <img src="https://muhammadsalman.me/projects/x-images/logo.png" alt="" className="login-image" />
                    </div>
                </div>
            </div>
            <div className="half col-2 pt-35  relative">
                <Loader isLoading={auth.loading} />
                <Toaster data={toaster} />
                <div className="col-2 pl-50 pr-30 flex flex-col">
                    <h3 className="mb-15 mt-0 fs-36 uppercase">{!isSignup ? "Welcome!" : "Create Your Account!"}</h3>
                    {!isSignup ?
                        <>
                            <div className="error lh-17">
                                {auth.error ? <small className="danger fs-11 fw-500">{auth.error}</small> : '' }
                            </div>
                            <div className="field-block flex flex-col mb-15 mt-3">
                                <label htmlFor="username" className="form-label mb-5 fs-14 fw-500">
                                    Email Address
                                </label>
                                <Field
                                    type="text"
                                    name="username"
                                    component={renderInput}
                                    label="Type your Email Address"
                                    defaultClasses="form-field active"
                                />
                        </div>

                            <div className="field-block flex flex-col mb-25">
                            <label htmlFor="password" className="form-label mb-5 fs-14 fw-500">
                                Password
                            </label>
                            <Field
                                type="password"
                                name="password"
                                component={renderInput}
                                label="Type your Password"
                                defaultClasses="form-field active"
                            />
                        </div>
                        </> : 
                        <>
                             {/* <div className="error lh-17">
                                {auth.error ? <small className="danger fs-11 fw-500">{auth.error}</small> : '' }
                            </div> */}
                            <div className="field-block signup-field flex flex-col mb-15 mt-3">
                                <label htmlFor="username" className="form-label mb-5 fs-14 fw-500">
                                    First Name
                                </label>
                                <Field
                                    type="text"
                                    name="fname"
                                    component={renderInput}
                                    label="First Name"
                                    defaultClasses="form-field active"
                                />
                        </div>

                        <div className="field-block signup-field flex flex-col mb-15 mt-3">
                                <label htmlFor="username" className="form-label mb-5 fs-14 fw-500">
                                    Last Name
                                </label>
                                <Field
                                    type="text"
                                    name="lname"
                                    component={renderInput}
                                    label="Last Name"
                                    defaultClasses="form-field active"
                                />
                        </div>
                        <div className="field-block signup-field flex flex-col mb-15 mt-3">
                                <label htmlFor="username" className="form-label mb-5 fs-14 fw-500">
                                    Email
                                </label>
                                <Field
                                    type="email"
                                    name="email"
                                    component={renderInput}
                                    label="Email"
                                    defaultClasses="form-field active"
                                />
                        </div>
                        {/* <div className="field-block signup-field flex flex-col mb-15 mt-3">
                        <div className="field-block flex flex-col col-50">
                                    <label htmlFor="priority" className="form-label">User Type</label>
                                    <div>
                                        <div className="mt-1 relative user-type">
                                            <button 
                                                type="button" 
                                                className="form-field w-full pointer"
                                                onClick={() => userChangeHandler("Select User Type")}>
                                                    {userType}
                                                    <DropArrow className="select-dropdown" /> 
                                            </button>
                                            {shouldUserTypeOpen &&
                                                <DropDown dropdownList={UserTypeList} changeHandler={(UserTypeItems) => userChangeHandler(UserTypeItems)} />
                                            }
                                        </div>
                                    </div>
                                </div>
                        </div> */}
                        <div className="field-block signup-field flex flex-col mb-15 mt-3">
                                <label htmlFor="username" className="form-label mb-5 fs-14 fw-500">
                                    Enter Password
                                </label>
                                <Field
                                    type="password"
                                    name="epassword"
                                    component={renderInput}
                                    label=" Enter Password"
                                    defaultClasses="form-field active"
                                />
                        </div>
                        <div className="field-block signup-field flex flex-col mb-15 mt-3">
                                <label htmlFor="username" className="form-label mb-5 fs-14 fw-500">
                                    Confirm Password
                                </label>
                                <Field
                                    type="password"
                                    name="cpassword"
                                    component={renderInput}
                                    label=" Confirm Password"
                                    defaultClasses="form-field active"
                                />
                        </div>
                        </>
                    }
                    <div className="mb-30 row auth-footer">
                        <Button type="submit" classes={`primary-button no-margin fw-500 ${props.valid ? "" : "deadLink"}`}>
                            {!isSignup ? "Login" : "Signup"}
                        </Button>
                          <p class="primary-button no-margin fw-500" onClick={signupHandler}>
                            {!isSignup ? "Go to Sign up" : "Go to Login"}
                          </p>
                    </div>
                </div>
            </div>
            <Styles />
        </form>
    );
};

export default withRouter(
    reduxForm({
        form: "authForm",
        validate,
    })(AuthForm)
);
