import React, {useState} from "react";
import { useSelector, useDispatch } from "react-redux";
import TableRows from "./TableRows";
import Table from '../../components/UI/Table/Table';
import Styles from "./Styles";
import { ReactComponent as SearchIcon } from "../../assets/images/svg/searchRegEX.svg";
import Pagination from "../../components/UI/Pagination/Pagination";
import { setCurrentPage } from "../../store/actions/pagination";
import Modal from "../../components/UI/Modal/Modal";
import { modal } from "../../store/actions";
import Pannel from "../../components/Section/pannel/";
import { Link } from "react-router-dom";

const DashboardArea = () => {

    const dispatch = useDispatch();
    const { currentPage, limit, limitRanges, pageCount } = useSelector(state => state.pagination);
    const { deleteModal } = useSelector(state => state.modals);
    const [openPaginationSelectBox, setOpenPaginationSelectBox] = useState(false);
    const [shouldPannelOpened, setShouldPannelOpened] = useState(false);
    const [filters, setFilters] = useState([
        {
            'name' : 'All',
            'selected' : true
        },
        {
            'name' : 'Pending',
            'selected' : false
        },
        {
            'name' : 'Approved',
            'selected' : false
        },
        {
            'name' : 'Rejected',
            'selected' : false
        }
        ]);

    const tH = [
            {
                'title' : 'Sr.',
                'width' : '3%'
            },
            {
                'title' : 'Article Type',
                'width' : '17%'
            },
            {
                'title' : 'General Information',
                'width' : '17%'
            },
            {
                'title' : 'Additional Information',
                'width' : '17%'
            },
            {
                'title' : 'Review Preferance',
                'width' : '14%'
            },
            {
                'title' : 'Comments',
                'width' : '20%'
            },
            {
                'title' : 'Manuscript Data',
                'width' : '18%',
                'colSpan' : '2'
            }
    ]

    const data = [
        {
            'sr' : '1',
            'artical' : 'Article Type',
            'generalInformation' : 'Here will be a General information',
            'additionalInformation' : 'Here will be a Additional information',
            'reviewPreferance' : 'Here will be a Review Preferance',
            'comments' : 'Here will be a Comments',
            // 'tags' : ['Social','Website','SocialNetwork','facebook','SocialSites'],
        },
        {
            'sr' : '2',
            'artical' : 'Article Type',
            'generalInformation' : 'Here will be a General information',
            'additionalInformation' : 'Here will be a Additional information',
            'reviewPreferance' : 'Here will be a Review Preferance',
            'comments' : 'Here will be a Comments',
            // 'tags' : ['Social','Website','SocialNetwork','facebook','SocialSites'],
        },
        {
            'sr' : '3',
            'artical' : 'Article Type',
            'generalInformation' : 'Here will be a General information',
            'additionalInformation' : 'Here will be a Additional information',
            'reviewPreferance' : 'Here will be a Review Preferance',
            'comments' : 'Here will be a Comments',
            // 'tags' : ['Social','Website','SocialNetwork','facebook','SocialSites'],
        },
    ]
    
    const closeRegEXHandler = () => {
        setShouldPannelOpened(!shouldPannelOpened);
    } 
    const changeFilter = (filter) => {
        setFilters(
            filters.map(f => f.name === filter ? { ...f, selected : true } : {...f, selected : false})
        );
    }

    // const addNewRegEX = () => {
    //     setShouldPannelOpened(true);
    // }

    // const testRegEX = () => {
    //     console.log('test');
    // }

     // Pagination
    const onPageSelect = page => {
        dispatch(setCurrentPage(page));
    };

    const onPrevPageSelect = () => {
        let page = currentPage - 1;
        page = page < 1 ? 1 : page;
        dispatch(setCurrentPage(page));
    };

    const onNextPageSelect = () => {
        let page = currentPage + 1;
        let pagesCount = Math.ceil(pageCount / limit);
        page = page > pagesCount ? pagesCount : page;
        dispatch(setCurrentPage(page));
    };

    const onFirstPageSelect = () => {
        dispatch(setCurrentPage(1));
    };

    const onLastPageSelect = () => {
        let pagesCount = Math.ceil(pageCount / limit);
        dispatch(setCurrentPage(pagesCount));
    };

    const onLimitSelect = limit => {
       
    };

    const primaryButtonClick = () => {
        console.log('on delete');
    }

    const secondaryButtonClick = () => {
        dispatch(modal({'deleteModal': false}));
    }

    const TableFilters = () => {
        return(
                <div className="feature-table flex justify-between mt-50">
                    <div className="table-filters">
                        {filters.map((filter,i) => {
                            return(
                                <button key={i} className={filter.selected ? 'active' : ''} onClick={() => {changeFilter(filter.name)}}>{filter.name}</button>
                            );
                        })}
                    </div>
                    <div className="regEX-actions">
                        <Link className="primary-button" to="/submit-menu-script">Submit Menuscript</Link>
                        {/* <button className="primary-button no-mr" onClick={() => testRegEX()}>Test regEX</button> */}
                    </div>  
                </div>
        );
    }



    return (
        
        <div className=" mt-50">
             <div className="wrapper">
                <div className="search-regEX w-full">
                    <div className="search-header flex flex-row w-full">
                        <SearchIcon className="svg-ico svg-v-align4 mr-12 search-icon" />
                        <h3 className="search-label">Search Menu Script</h3>
                    </div>
                    <div className="search-form w-full">
                        <div className="search-regEX-input w-full">
                            <form className="m-0">
                                <input className="search-regEX-field p-16" placeholder="Type or paste Menuscript for the Search" type="text" />
                                <input className="search-regEX-submit absolute text-center" type="submit" value="Search" />
                                {/* <button className="search-clear underline absolute hidden">Clear All</button> */}
                            </form>
                        </div>
                    </div>
                </div> 

                <TableFilters/>

                <Table 
                    headConfigs={tH} 
                    data={data}
                    RowsComponent={TableRows}
                />
                
                {data.length > 0 &&
                    <div className="mt-15 flex justify-between align-items-center">
                        <span className="fs-11 pl-10">Record Per Page <span className="primary">10</span></span>
                        <Pagination
                            breakLabel="..."
                            breakMargin={1}
                            windowRange={3}
                            pageSize={limit}
                            limitRanges={limitRanges}
                            isOpenSelectBox={openPaginationSelectBox}
                            currentPage={currentPage}
                            totalCount={pageCount}
                            onPageSelect={onPageSelect}
                            onPrevPageSelect={onPrevPageSelect}
                            onNextPageSelect={onNextPageSelect}
                            onLimitSelect={onLimitSelect}
                            toggleSelectBox={setOpenPaginationSelectBox}
                            onFirstPageSelect={onFirstPageSelect}
                            onLastPageSelect={onLastPageSelect}
                        />
                    </div>}

                    <Modal 
                        show={deleteModal} title={'delete entry'} primaryButtonTitle={'delete'} primaryButtonClick={primaryButtonClick} secondaryButtonTitle={'cancel'} secondaryButtonClick={secondaryButtonClick}>
                        <p class="modal-content">Are you sure you want to delete selected entry from the table?</p>
                    </Modal>

                    {/* <Modal show={deleteModalShow} title={'abort search'} primaryButtonTitle={'abort'} secondaryButtonTitle={'cancel'}>
                        <p class="modal-content">Search in progress. Are you sure you want to abort search?</p>
                    </Modal> */}
            </div>
            {shouldPannelOpened && <Pannel closeRegEXHandler={closeRegEXHandler} regexData={[]} regEXType="add" />}
        <Styles /> 
        </div>
        
    );
};

export default DashboardArea;
