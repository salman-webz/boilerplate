import React, {useState} from "react";
import { ReactComponent as DotsIcon } from "../../../src/assets/images/svg/dotsIcon.svg";
import { ReactComponent as RegEXLoader } from "../../../src/assets/images/svg/regEXLoader.svg";
import { ReactComponent as Edit } from "../../../src/assets/images/svg/edit.svg";
import { ReactComponent as Delete } from "../../../src/assets/images/svg/delete.svg";
import DropDown from "../../components/UI/Dropdown/Dropdown";
import { modal } from "../../store/actions";
import { useDispatch } from "react-redux";
import Pannel from "../../components/Section/pannel/";

const TableRows = ({data }) => {

    const [openDropDown, setOpenDropDown] = useState(false);
    const [shouldPannelOpened, setShouldPannelOpened] = useState(false);

    const [regexData, setRegexData] = useState([]);
    const [currentSelectedItem, setCurrentSelectedItem] = useState('');
    const dispatch = useDispatch();

    const handleClick = (id) => {
        if(id === currentSelectedItem){
            setOpenDropDown(!openDropDown);
        }
        else{
            setCurrentSelectedItem(id);
            setOpenDropDown(true);
        }
    }
    const detailRegEXHandler = (item) => {
        setShouldPannelOpened(true);
        setRegexData(item)
    } 
    const closeRegEXHandler = () => {
        setShouldPannelOpened(!shouldPannelOpened);
    } 
    const editRegEX = () => {
        console.log(data.filter(item => item.id === currentSelectedItem));
    }

    const deleteRegEX = () => {
        console.log(data.filter(item => item.id === currentSelectedItem));
        dispatch(modal({'deleteModal': true}));
    }

    const categoryChangeHandler = (item) => {
        item.path === 'Edit' ? editRegEX() : deleteRegEX();
        setOpenDropDown(false);
    }

    const abortSearch = () => {
        dispatch(modal({'abortModal': true}));
    }

    const RenderNoData = () => {
        return (
            <tr>
                <td className="table-no-data abort-search" colSpan="10">
                <em className="svg-ico svg-v-align4 pl-20 align-center pr-20 pointer"><RegEXLoader className="rotate" /></em>
                    <p className="pt-15">
                        <button className="no-data-button" onClick={abortSearch}>Abort Search</button>
                    </p>
                </td>
                <td className="table-no-data hidden" colSpan="10">
                    <p className="pt-15 no-data-text">
                        No Match Found. 
                         <button className="no-data-button pl-5">Clear Search</button>
                    </p>
                </td>
            </tr>
        );
    };

    return (
        data.length ? data.map((item, i) => {
            return (
                <>
                <tr className="color-dark" key={i}>
                    <td onClick={() => detailRegEXHandler(item)}><span className="single-line">{item.sr}</span></td>
                    <td  onClick={() => detailRegEXHandler(item)}><span className="single-line">{item.artical}</span></td>
                    {/* <td  onClick={() => detailRegEXHandler(item)}>
                        {item.tags.map((tag,j) => {
                            return (
                                <span className="tag" key={j}>{tag}</span>        
                            )
                        })}
                    </td> */}
                    <td  onClick={() => detailRegEXHandler(item)}><span className="multiline">{item.generalInformation}</span></td>
                    <td  onClick={() => detailRegEXHandler(item)}><span className="multiline">{item.additionalInformation}</span></td>
                    <td  onClick={() => detailRegEXHandler(item)}><span className="multiline">{item.reviewPreferance}</span></td>
                    <td  onClick={() => detailRegEXHandler(item)}><span className="multiline">{item.comments}</span></td>
                    <td className="relative">
                        <em className="svg-ico svg-v-align4 pl-20 pr-20 pointer" onClick={() => handleClick(item.id)}><DotsIcon/></em>
                        {openDropDown && currentSelectedItem === item.id &&
                            <DropDown 
                                classList="absolute dropdown-menu regEX-edit"
                                dropdownList= {[
                                    {
                                    icon: <Edit className="mr-17" />,
                                    path: "Edit"
                                    },
                                    {
                                    icon: <Delete className="mr-17" />,
                                    path: "Delete"
                                    },
                                ]}
                                changeHandler={(categoryListItem) => categoryChangeHandler(categoryListItem)} 
                            />
                        }
                    </td>
                </tr>
                {shouldPannelOpened && <Pannel regexData={regexData} closeRegEXHandler={closeRegEXHandler} regEXType="detail" />}
               
                </>
            )
    }) : <RenderNoData/>
    );
};

export default TableRows;
