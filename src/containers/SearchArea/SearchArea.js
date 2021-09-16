import React, { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import SectionHeading from "../../components/Section/SectionHeading";
import TagSearch from "../../components/UI/TagSearch/TagSearch";
import SearchField from "../../components/UI/Search/SearchField/SearchField";
import Drawer from '../../components/UI/Drawer/Drawer';
import Toaster from "../../components/UI/Toaster/Toaster";
import RecentSearch from './RecentSearch';

import { ReactComponent as SearchIcon } from "../../assets/svgs/searchIcon.svg";
import { ReactComponent as TagIcon } from "../../assets/svgs/tagIcon.svg";
import { ReactComponent as ClearIcon } from "../../assets/svgs/clearIcon.svg";
import { ReactComponent as UserIcon } from "../../assets/svgs/userIcon.svg";
import { getPackages } from "../../store/actions/packages";
import config from "../../config";
import moment from 'moment';
import {
  setSearchFilters,
  setCurrentPage,
  limitPerPage,
  openDrawer,
  updatePackages,
  onPackageSelection,
  toggleExportAll,
  setPaginationInitialState,
  updateRedirectionArray
} from "../../store/actions";

const {
  server: { RMI }
} = config;


const SearchArea = () => {
  const dpref = useRef();
  const { limit } = useSelector(state => state.pagination);
  const { user_id } = useSelector(state => state.auth.user) || '';
  const tagsFromStore  = useSelector(state => state.filter.tags.malicious) || [];
  const usersFromStore  = useSelector(state => state.filter.tags.users) || [];
  const startDateFromStore  = useSelector(state => state.filter.tags.startDate) || '';
  const endDateFromStore  = useSelector(state => state.filter.tags.endDate) || '';
  const dispatch = useDispatch();
  const { recentSearch } = useSelector(state => state.drawer);

  // TAGS SEARCH RELATED CONFIGURATIONS
  // Might need to read data from store for recent search!
  const [tags, setTags] = useState([]);
  const [users, setUsers] = useState([]);
  const [searchType, setSearchType] = useState("basic");
  const toasterState = useSelector(state => state.toaster);
  const currentUser  = useSelector(state => state.auth.user);

    // recent search
  var localRecentSearchList = localStorage.getItem(user_id) ? JSON.parse(localStorage.getItem(user_id)) : []
  const [recentSearchList, setRecentSearchList] = useState(localRecentSearchList);

  useEffect(() => {

    if(tagsFromStore){
      setTags(tagsFromStore);
    }
    if(usersFromStore){
      setUsers(usersFromStore);
    }
    if (startDateFromStore){
      changeDate(startDateFromStore,endDateFromStore);
    }
    if(currentUser){
      dispatch(getPackages({ page: CURRENT_PAGE, limit }));
    }

    
    return () => {
      dispatch(updatePackages([]));
      dispatch(onPackageSelection([]));
      dispatch(toggleExportAll(false));
      dispatch(updateRedirectionArray({data: [], shouldRedirect: false}));
      //dispatch(setPaginationInitialState());
    };
  }, []);

  const [dateRange, setDateRange] = useState({
    startDate: null,
    endDate: null,
  });

  const { DRAWER: { reacentSearchConfig } } = config.uiSettings;

  const clearAllRecentSearches = () => {
    localRecentSearchList = [];
    setRecentSearchList(localRecentSearchList);
    localStorage.setItem(user_id,localRecentSearchList);
  }

  const recentSearchDrawerConfig = reacentSearchConfig(
    recentSearch,
    clearAllRecentSearches,
    () => dispatch(openDrawer({ key: "recentSearch", value: false }))
  );

  if(!recentSearchList.length)
    recentSearchDrawerConfig.isButtonEnabled = false;
  else
    recentSearchDrawerConfig.isButtonEnabled = true;

  const CUSTOM_TAG = { tag_id: "CUSTOM_TAG", more: true, tag_name: "1 More" };
  const CUSTOM_USER_TAG = {
    user_id: "CUSTOM_TAG",
    more: true,
    username: "1 More"
  };

  const MIN_TAGS_TO_DISPLAY = 2;
  const CURRENT_PAGE = 1;

  // const handleDateCallback = (startDate, endDate, label) => {
  //   setDateRange({ startDate, endDate });
  // };

  const handleApply = (event, picker) => {
    picker.element.val(
      picker.startDate.format('MM/DD/YYYY') +
        ' - ' +
        picker.endDate.format('MM/DD/YYYY')
    );
    setDateRange({ startDate: picker.startDate , endDate: picker.endDate });
  };

  const onTagClear = tag => {
    const updateTags = tags.filter(curTag => curTag.tag_name !== tag.tag_name);
    if (tags.length <= MIN_TAGS_TO_DISPLAY + 2) {
      setTags(updateTags.filter(curTag => curTag.tag_name !== CUSTOM_TAG.tag_name));
    } else{
      setTags(updateTags);
    } 
  };

  const onTagSelect = tag => {
    if (!tags.map(tag => tag.tag_name).includes(tag.tag_name)) {
      if (tags.length === MIN_TAGS_TO_DISPLAY) {
        setTags([tag, ...tags, CUSTOM_TAG]);
      } else{
        setTags([tag, ...tags]);
      } 
      
    }
  };

  const onUserClear = user => {
    const updateUsers = users.filter(
      curUser => curUser.user_id !== user.user_id
    );
    if (users.length <= MIN_TAGS_TO_DISPLAY + 2) {
      setUsers(updateUsers.filter(curUser => curUser.user_id !== CUSTOM_USER_TAG.user_id));
    } else {
      setUsers(updateUsers);
    }
  };

  const onUserSelect = user => {
    if (!users.map(user => user.user_id).includes(user.user_id)) {
      if (users.length === MIN_TAGS_TO_DISPLAY) {
        setUsers([user, ...users, CUSTOM_USER_TAG]);
      } else {
        setUsers([user, ...users]);
      }
    }
  };

  const onSearch = () => {
    //setSelectedPackages([]);
    dispatch(onPackageSelection([]));
    dispatch(toggleExportAll(false));
    dispatch(updateRedirectionArray({data: [], shouldRedirect: false}));
    dispatch(
      setSearchFilters({
        malicious: tags,
        users,
        startDate: dateRange.startDate,
        endDate: dateRange.endDate
      })
    );

    setRecentSearch(tags,users,dateRange.startDate,dateRange.endDate);
    dispatch(setCurrentPage(CURRENT_PAGE));
    dispatch(limitPerPage(limit));
    dispatch(getPackages({ page: CURRENT_PAGE, limit }));
  };

  const setRecentSearch =  (tags,users,start,end) => {
    if (localRecentSearchList.length > 1) {
      localRecentSearchList.pop();
      setRecentSearchList(localRecentSearchList);
    }
    localRecentSearchList.unshift({
      malicious: tags,
      users: users,
      startDate: start,
      endDate: end
    });
    setRecentSearchList(localRecentSearchList);
    localStorage.setItem(user_id, JSON.stringify(localRecentSearchList));
    //setSelectedPackages([]);
    dispatch(onPackageSelection([]));
  }

  const toggleSearch = () => {
    searchType === "basic" ? setSearchType("advance") : setSearchType("basic");
  };

  const changeDate = (start,end) => {
    if(start._d == 'Invalid Date'){
      dpref.current.setStartDate(moment().format('MM/DD/YYYY'));
      dpref.current.setEndDate(moment().format('MM/DD/YYYY'));
      dpref.current.$picker.val('');
    }
    else{
      dpref.current.setStartDate(start.format('MM/DD/YYYY'));
      dpref.current.setEndDate(end.format('MM/DD/YYYY'));
      dpref.current.$picker.val(start.format('MM/DD/YYYY')+' - '+end.format('MM/DD/YYYY'));
    }
   
    setDateRange({
      locale: {
        format: 'MM/DD/YYYY'
      },
      startDate: start._d == 'Invalid Date' ? '' : start,
      endDate: start._d == 'Invalid Date' ? '' : end,
    })

  };

  const renderBasicSearch = (
    <div className="col col1">
      <TagSearch
        apiPath={RMI.TagSearch}
        classes="seachC1"
        onTagSelect={onTagSelect}
        onTagClear={onTagClear}
        tags={tags}
        setTags={setTags}
        minTagDisplay={MIN_TAGS_TO_DISPLAY}
        Icon={TagIcon}
        ClearIcon={ClearIcon}
        label="Search Tags"
        keys={["tag_id", "tag_name"]}
      />
      <TagSearch
        apiPath={RMI.UserSearch}
        classes="seachC2"
        onTagSelect={onUserSelect}
        onTagClear={onUserClear}
        tags={users}
        setTags={setUsers}
        minTagDisplay={MIN_TAGS_TO_DISPLAY}
        Icon={UserIcon}
        ClearIcon={ClearIcon}
        label="Search Users"
        keys={["user_id", "username"]}
      />
    
    </div>
  );

  const renderAdvanceSearch = (
    <div className="col col1 advanceCol deadLink">
      <div className="row seachC mb-10 seachC1">
        <div className="row seachIcoD border-gray5 bg-white">
          <SearchField
            Icon={TagIcon}
            label="Advance Search"
            onTermChange={term => console.log(term)}
            term=""
          />
        </div>
      </div>
    </div>
  );
  
  const removeSearch = (e,i) => {
    e.preventDefault();
    localRecentSearchList.splice(i,1);
    setRecentSearchList(localRecentSearchList);
    localStorage.setItem(user_id,JSON.stringify(localRecentSearchList))
  }

  return (
    <div className="row SearchD1 bg-gray3">
      <Toaster data={toasterState} />
      <SectionHeading
        title={searchType === "basic" ? "Basic Search" : "Advance Search"}
        Icon={SearchIcon}
      />
      <div className="row row2">
        {searchType === "basic" ? renderBasicSearch : renderAdvanceSearch}
        <div className="col col2">
          <a
            onClick={e => {
              e.preventDefault();
              onSearch();
            }}
            href="#/"
            className={`pr btn btn-primary searchBtn fs-16 capitalize align-center j-searchBtn mb-5`}
          >
            Search
          </a>
          <a
            onClick={e => {
              e.preventDefault();
              toggleSearch();
            }}
            href="#/"
            className="pr btn btn-secondary advanceSearchBtn fs-14 capitalize align-center j-advanceSearchBtn deadLink"
          >
            {searchType === "basic" ? "Advance Search" : "Basic Search"}
          </a>
        </div>
      </div>
      <div className="row row3 align-center mt-20">
        <a
          onClick={e => {
            e.preventDefault();
            dispatch(
              openDrawer({ key: recentSearchDrawerConfig.key, value: true })
            );

          }}
          href="/#"
          className="color-black2 fw-500 underline"
        >
          Recent Search
        </a>
      </div>
      <div className="recentSearchPanel">
        <Drawer {...recentSearchDrawerConfig}>
          <RecentSearch
            setTags={setTags}
            setUsers={setUsers}
            setSearchFilters={setSearchFilters}
            limit={limit}
            changeDate={changeDate}
            CURRENT_PAGE={CURRENT_PAGE}
            clearAllRecentSearches={clearAllRecentSearches}
            recentSearchList={recentSearchList}
            removeSearch={removeSearch}
            setRecentSearch={setRecentSearch}
          />
        </Drawer>
      </div>
    </div>
  );
};

export default SearchArea;
