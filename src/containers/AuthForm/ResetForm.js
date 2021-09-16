import React, { useState } from "react";
import { Redirect, withRouter } from "react-router-dom";
import { Field, reduxForm } from "redux-form";
import { useSelector, useDispatch } from "react-redux";
import { Link } from 'react-router-dom';

import InputField from "../../components/UI/InputField/InputField";
import Button from "../../components/UI/Button/Button";
import Loader from "../../components/UI/Loader/Loader";
import Toaster from "../../components/UI/Toaster/Toaster";
import { reset } from "../../store/actions";

// ICONS
import { ReactComponent as LoginBanner } from "../../assets/svgs/loginBannerIcon.svg";
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
  if (!formValues.newPassword) {
    errors.newPassword = "This Field is required";
  }
  if (!formValues.retypePassword) {
    errors.retypePassword = "This Field is required";
  }
  if (formValues.retypePassword !== formValues.newPassword) {
    errors.retypePassword = "Your password does not match";
  }
  return errors;
};

const ResetForm = props => {
  const auth = useSelector(state => state.auth);
  const toaster = useSelector(state => state.toaster);
  const dispatch = useDispatch();
  const isAuthenticated = auth.token !== null;
  const user_id = parseInt(props.history.location.search.substr(8));
  const [isLoading, setIsLoading] = useState(false);
  const [resetSuccess, setResetSuccess] = useState(false);

  const onSubmit = (formValues, dispatch, user_id) => {
    const { newPassword, retypePassword } = formValues;
    dispatch(reset(newPassword, retypePassword, user_id, setIsLoading,setResetSuccess));
  };

  return isAuthenticated ? (
    <Redirect
      to="/"
    />
  ) : (
      <form
        className="loginFormCont align-left row"
        onSubmit={props.handleSubmit(formValues => {
          onSubmit(formValues, dispatch, user_id);
        })}
      >
        <div className="half col-1 bg-blue2 relative">
          <em className="svg-ico absolute-center">

            <LoginBanner />

          </em>
        </div>
        <div className="half col-2 pt-35 pb-30 pl-40 pr-35 relative">
          <Loader isLoading={isLoading} />
          <Toaster data={toaster} />
          <h3 className="row mb-55 fs-22 color-blue">Reset Password</h3>
          {!resetSuccess ?<div className="beforeSuccessDiv row mt-20">

            <div className="fieldDiv row mb-20 relative hasIcon">
              <Field
                Icon={LockIcon}
                type="password"
                name="newPassword"
                component={renderInput}
                label="Type your password"
              />
            </div>
            <div className="fieldDiv row mb-20 relative hasIcon">
              <Field
                Icon={LockIcon}
                type="password"
                name="retypePassword"
                component={renderInput}
                label="Retype your password"
              />
            </div>
            <div className="row align-center">
              <Button
                type="submit"
                classes={`btn btn-primary mw-160 ${props.valid ? "" : "deadLink"}`}
              >
                Submit
          </Button>
            </div>
          </div> :
          <div className="SuccessDiv">
            <span className="row color-gray2 lh-22 mt-35">Your password has been reset successfully! <br />You can now sign-in by clicking this link .</span>
            <div className="row align-center">
              
            </div>
          </div>}
        </div>
      </form>
    );
};

export default withRouter(
  reduxForm({
    form: "resetForm",
    validate
  })(ResetForm)
);
