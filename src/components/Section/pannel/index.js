import React,  { useState } from 'react';
import { ReactComponent as CrossIcon } from "../../../../src/assets/images/svg/cross.svg";
import { ReactComponent as DropArrow } from "../../../../src/assets/images/svg/drop-arrow.svg"
import classNames from "classnames";
import { useSelector, useDispatch } from "react-redux";
import { PriorityList , StatusList, CategoryList, tagList } from "../../../constants/common";
import DropDown from "../../UI/Dropdown/Dropdown";
import Styles from './Styles';
import { withRouter } from "react-router-dom";
import { Field, reduxForm } from "redux-form";
import { addPanel } from "../../../store/actions";
import Button from "../../../components/UI/Button/Button";
import InputField from "../../../components/UI/InputField/InputField";

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
const renderInput = ({ input, Icon, label, meta, type, defaultClasses, readOnly }) => {
    const className = `${defaultClasses} ${meta.touched && meta.error ? "error" : ""}`;
    return (
        <>
            <InputField {...input} type={type} Icon={Icon} autoComplete="off" className={className} placeholder={label} readOnly={readOnly}  />
            {renderError(meta)}
        </>
    );
};
const renderError = ({ error, touched }) => {
    if (touched && error) {
        return <span className="errorMsg color-red fs-11">{error}</span>;
    }
};

const Panel = (props) => {
    const auth = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    // const {  } = props.regexDate
    const isAuthenticated = auth.token !== null;
    const { regexData, closeRegEXHandler, regEXType } = props;
    const { 
        artical, 
        generalInformation,
        additionalInformation,
        comments,
        reviewPreferance
    } = regexData;
    const [articalType, setArticalType] = useState(artical || "Artical Type");
    const [shouldCategoryOpen, setShouldCategoryOpen] = useState(false);
    const [generalInformationState, setGeneralInformationState] = useState(generalInformation);
    const [commentsState, setCommentsState] = useState(comments);
    const [selectedStatus, setSelectedStatus] = useState(additionalInformation || "Select Status");
    // const [selectedPriority, setSelectedPriority] = useState(priority || "Selected Priority");
    // const [ShouldProrityOpen, setShouldProrityOpen] = useState(false);
    // const [shouldStatusOpen, setShouldStatusOpen] = useState(false);
    // const [commentsCount, setCommentsCount] = useState(0);

    
    // const categoryChangeHandler = (categoryText) => {
    //     setShouldCategoryOpen(!shouldCategoryOpen);
    //     setArticalType(articalType);
    //     setShouldProrityOpen(false);
    //     setShouldStatusOpen(false);
    // }
    // const priorityChangeHandler = (priorityText) => {
    //     setShouldProrityOpen(!ShouldProrityOpen);
    //     setSelectedPriority(priorityText);
    //     setShouldCategoryOpen(false);
    //     setShouldStatusOpen(false);
    // }
    // const statusChangeHandler = (selectedStatus) => {
    //     setShouldStatusOpen(!shouldStatusOpen);
    //     setShouldProrityOpen(false);
    //     setSelectedStatus(selectedStatus);
    //     setShouldCategoryOpen(false);
    // }
   
    // const selectTagHandler = (tag) => {
    //     setTagSelectedList([...tagSelectedList, tag])
    // }
    function regexHeading(regexType) {
        console.log (`ewsca`, regexType);
        if (regexType === "detail") {
            return "RegEX Detail";
        }
        else if (regexType === "edit") {
            return "Edit RegEX";
        }
        else{
            return "Menu Script Detail";
        }

    }
    // const onSubmit = (formValues,selectedCategory, dispatch) => {
    //     const { regexName, comments } = formValues;
    //     dispatch(addPanel(regexName,selectedCategory, comments));
    // };
 
    return(
        <>
         <div className="fixed flex justify-center items-center panel-block" id="pannal-id">
            <div className="absolute bg-black opacity-40 overlay" onClick={closeRegEXHandler} />
            <div className=" bg-white panel-wrapper absolute">
            <form
                onSubmit={props.handleSubmit((formValues) => {
                    // onSubmit(formValues,selectedCategory, dispatch);
                })}
            >
                    <div>
                        <div className="panel-header flex justify-between">
                            <div className="pannal-heading">
                                <span>{regexHeading(props.regexType)} </span>
                                <button className="primary-button">Submit Menu Script</button>
                            </div>
                            <button>
                                <CrossIcon onClick={closeRegEXHandler} className="pointer" />
                            </button>
                        </div>
                        <div className="panel-body">
                            <div className="">
                                <div className="field-block flex flex-col">
                                    <label htmlFor="regex" className="form-label">Artical Type</label>
                                    <div contentEditable={regEXType !== "detail"} className={classNames("form-field regEX", {"disabled-field": regEXType === "detail"})}>{articalType || "Type or paste regEX "} </div>
                                </div>
                                <div className="field-block flex flex-col">
                                    <label htmlFor="regexName" className="form-label">General Information</label>
                                    <Field
                                        type="text"
                                        name="regexName"
                                        component={renderInput}
                                        value={generalInformation}
                                        label={generalInformation}
                                        readOnly
                                        defaultClasses={classNames(`form-field  ${regEXType === "detail" && "disabled-field"} ${!articalType && "active "}`)}
                                    />
                                </div>
                                <div className="field-block flex flex-col">
                                    <label htmlFor="regexName" className="form-label">Additional Information</label>
                                    <Field
                                        type="text"
                                        name="regexName"
                                        component={renderInput}
                                        value={additionalInformation}
                                        label={additionalInformation}
                                        readOnly
                                        defaultClasses={classNames(`form-field  ${regEXType === "detail" && "disabled-field"} ${!articalType && "active "}`)}
                                    />
                                </div>
                                <div className="field-block flex flex-col">
                                    <label htmlFor="regexName" className="form-label">Review Preferences</label>
                                    <Field
                                        type="text"
                                        name="regexName"
                                        component={renderInput}
                                        value={reviewPreferance}
                                        label={reviewPreferance}
                                        readOnly
                                        defaultClasses={classNames(`form-field  ${regEXType === "detail" && "disabled-field"} ${!articalType && "active "}`)}
                                    />
                                </div>
                            </div>
                            <div className="">
                            <div className="field-block flex flex-col">
                                    <label htmlFor="comments" className="form-label">Comments
                                        {/* <span className={classNames(commentsCount < 300 ? "label-primary-caption" : "label-danger-caption")}>
                                            {commentsCount < 300 ? 
                                                "you can add comment upto 300 characters" 
                                                : "Charactor Limit reached" } </span> */}
                                    </label>
                                    <textarea 
                                        className={classNames("form-field mb-0", {"disabled-field": regEXType === "detail"})}
                                        rows="5" 
                                        type="text" 
                                        id="comments" 
                                        maxLength="300" 
                                        name="comments" 
                                        readOnly={regEXType === "detail"}
                                        placeholder={comments}
                                       ></textarea>
                                </div>
                            </div>        
                                {/* <div className="field-block flex flex-col">
                                    <label htmlFor="category" className="form-label">Category</label>
                                    <div>
                                        <div className="mt-1 relative">
                                        <Field
                                            type="hidden"
                                            name="selectedCategory"
                                            component={renderInput}
                                            label=""
                                            defaultClasses="form-field"
                                            readOnly={regEXType === "detail"}
                                        />
                                        <button type="button" 
                                            className={classNames("form-field w-full pointer", {"disabled-field": regEXType === "detail"})}
                                            onClick={() => categoryChangeHandler(selectedCategory || "Selected Category")}>
                                                {selectedCategory}
                                                {regEXType !== "detail"  && <DropArrow className="select-dropdown" /> }
                                        </button>
                                        {shouldCategoryOpen && regEXType !== "detail" &&
                                            <DropDown dropdownList={CategoryList} changeHandler={(categoryListItem) => categoryChangeHandler(categoryListItem)} />
                                        }
                                        </div>
                                    </div>
                                </div> */}
                                {/* <div className="field-block flex flex-col">
                                    <label htmlFor="tags" className="form-label">
                                        Tags
                                        {regEXType !== "detail"  && 
                                            <>
                                                <span className="label-primary-caption">you can add upto 5 predefined tags </span>
                                                <span className="label-danger-caption hidden">Tags Limit reached </span>
                                            </>
                                        }    
                                    </label>
                                    <div 
                                        className={classNames("flex form-field tags-wrapper relative", {"disabled-field tag-disable": regEXType === "detail"})}>
                                        {regEXType !== "detail"  && 
                                            <input className="tags-input" type="text" id="tag" name="tag" placeholder="Add Tags" /> 
                                        }
                                        <div className="tags-list">
                                            <ul className="flex">
                                                {tagSelectedList.map((tag, index) =>
                                                    <li 
                                                        className="capitalize flex align-items-center" 
                                                        key={index}
                                                    >
                                                        <span>{tag}</span>
                                                        {regEXType !== "detail"  && 
                                                            <CrossIcon className="svg-ico svg-v-align4" /> 
                                                        }
                                                    </li>
                                                )}
                                            </ul>
                                            {regEXType !== "detail"  && 
                                                <ul className="absolute z-10 drop-down tags-dropdown select-tags">
                                                    {tagList.length > 0 ? 
                                                        <>
                                                            {tagList.map((tag, index) =>
                                                                <li 
                                                                    className="capitalize flex align-items-center" 
                                                                    key={index}
                                                                    onClick={() => selectTagHandler(tag)}>
                                                                    <span>{tag}</span>
                                                                </li>
                                                            )}
                                                        </> 
                                                        : <li className="no-result text-center"> No Search Found</li>
                                                    }
                                                </ul>
                                            }
                                        </div>
                                    </div>
                                </div> */}
                                {/* <div className="field-block flex flex-col">
                                    <label htmlFor="priority" className="form-label">Priority</label>
                                    <div>
                                        <div className="mt-1 relative">
                                            <button 
                                                type="button" 
                                                className={classNames("form-field w-full pointer", {"disabled-field": regEXType === "detail"})} 
                                                onClick={() => priorityChangeHandler(priorityChangeHandler || "Select Priority")}>
                                                    {selectedPriority}
                                                    {regEXType !== "detail"  && <DropArrow className="select-dropdown" /> }
                                            </button>
                                            {ShouldProrityOpen && regEXType !== "detail" &&
                                                <DropDown dropdownList={PriorityList} changeHandler={(PriorityListItems) => priorityChangeHandler(PriorityListItems)} />
                                            }
                                        </div>
                                    </div>
                                </div> */}
                                {/* <div className="field-block flex flex-col">
                                    <label htmlFor="status" className="form-label">Status</label>
                                        <div className="mt-1 relative">
                                        <button 
                                            type="button" 
                                            className={classNames("form-field w-full pointer", {"disabled-field": regEXType === "detail"})}
                                            onClick={() => statusChangeHandler(selectedStatus || "Set Status")}>
                                                {selectedStatus}
                                                {regEXType !== "detail"  && <DropArrow className="select-dropdown" /> }
                                        </button>
                                        {shouldStatusOpen && regEXType !== "detail" &&
                                            <DropDown dropdownList={StatusList} changeHandler={(StatusListItems) => statusChangeHandler(StatusListItems)} classList="status-dropdown" />
                                        }
                                    </div>
                                </div> */}
                              
                            </div>
                        </div>
                          <div className="panel-footer">
                            <div className="panel-footer-wrapper">
                            <Button type="submit" classes="primary-button">
                                Edit
                            </Button>
                                <button className="secoundry-button" onClick={closeRegEXHandler}>Close</button>
                            </div>
                        </div>
                </form>        
                </div>
                <Styles />
            </div>
        </>
    )
}

// export default Panel;

export default withRouter(
    reduxForm({
        form: "addPanel",
        validate,
    })(Panel)
);