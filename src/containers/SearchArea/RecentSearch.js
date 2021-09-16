import React from "react";
import moment from "moment";
import { useDispatch } from "react-redux";
import { getPackages } from "../../store/actions/packages";
import { openDrawer, onPackageSelection, toggleExportAll, updateRedirectionArray } from "../../store/actions";

const RecentSearch = ({
    setTags,
    setUsers,
    setSearchFilters, 
    limit,
    CURRENT_PAGE,
    recentSearchList,
    changeDate,
    setRecentSearch,
    removeSearch}) => {

    const dispatch = useDispatch();

    const applySearch = (e,index) => {

        const malicious = recentSearchList[index].malicious;
        const users = recentSearchList[index].users;
        const startDate = recentSearchList[index].startDate ? moment(recentSearchList[index].startDate) : '';
        const endDate = recentSearchList[index].endDate ? moment(recentSearchList[index].endDate) : '';

        e.preventDefault();
        setTags(recentSearchList[index].malicious);
        setUsers(recentSearchList[index].users);
        dispatch(
            setSearchFilters({
            malicious,
            users,
            startDate,
            endDate
            })
        );
        dispatch(updateRedirectionArray({data: [], shouldRedirect: false}));
        changeDate(moment(recentSearchList[index].startDate),moment(recentSearchList[index].endDate));
        setRecentSearch(malicious,users,startDate,endDate);
        dispatch(getPackages({ page: CURRENT_PAGE, limit }));
        dispatch(openDrawer({ key: "recentSearch", value: false }))
        dispatch(onPackageSelection([]));
        dispatch(toggleExportAll(false));
    }

    return (
        <>
            <div className="row beforeSuccessDiv">
                {recentSearchList.length ? recentSearchList.map((item, i) => {
                    return (
                        <div key={i} className="row bg-gray3 padding-15 radui mb-15">
                            <div className="row panelDateD mb-10">
                                {item.startDate ? <p className="pr">{moment(item.startDate).format("MM/DD/YYYY")} - {moment(item.endDate).format("MM/DD/YYYY")}</p> : ''}
                            </div>
                            {item.malicious.length ?
                                <div className="row mb-20">
                                    <p className="full mb-10 fw-500 fs-16">Tags</p>
                                    <div className="row tagCont">
                                        {item.malicious.map((name, i) => {
                                            return (
                                                name.tag_id !== "CUSTOM_TAG" ? <span key={i} className="pr-10"><em>{name.tag_name}</em></span> : ''
                                            )
                                        })}
                                    </div>
                                </div> : null}
                            {item.users.length ?
                                <div className="row mb-20">
                                    <p className="full mb-10 fw-500 fs-16">Users</p>
                                    <div className="row tagCont">
                                        {item.users.map((user, i) => {
                                            return (
                                                user.user_id !== 'CUSTOM_TAG' ? <span key={i} className="pr-10"><em>{user.username}</em></span> : ''
                                            )
                                        })}
                                    </div>
                                </div> : null}
                            <div className="row panelActionD mb-10">
                                <a href="#/" className="pr ml-5 color-blue3" onClick={(e) => removeSearch(e, i)}>
                                    Clear
                                </a>
                                <i className="pr ml-5 color-blue3">|</i>
                                <a href="#/" onClick={(e) => applySearch(e, i)} className="pr ml-5 color-blue3">
                                    Search Again
                                </a>
                            </div>
                        </div>
                    );
                }) : <div className="color-black3">You have no recent search history.</div>}
            </div>
        </>
    );
};

export default RecentSearch;
