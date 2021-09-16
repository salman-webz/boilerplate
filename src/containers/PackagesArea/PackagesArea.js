import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import _ from "lodash";
import {onViewSelect,onPackageDetail,getPackages,addTags,deleteTag,getZoomImg} from "../../store/actions/packages";
import { openDrawer, closeAllDrawer } from "../../store/actions/drawer";
import { setCurrentPage, limitPerPage } from "../../store/actions/pagination";
import PackagesHeader from "../../components/Packages/PackagesHeader/PackagesHeader";
import PackagesList from "../../components/Packages/PackagesList/PackagesList";
import Loader from "../../components/UI/Loader/Loader";
import Drawer from "../../components/UI/Drawer/Drawer";
import PackageViewDetail from "../../components/Packages/PackageViewDetail/PackageViewDetail";
import Pagination from "../../components/UI/Pagination/Pagination";
import config from "../../config/";
import PackageTagAction from "../../components/Packages/PackageViewDetail/PackageViewTagAction/PackageViewTagAction";
import PackageViewTagsList from "../../components/Packages/PackageViewDetail/PackageViewTagsList/PackageViewTagsList";
import { validateTag } from "../../utils/utility";
import {toggleExportDropdown,exportData,updatePackages,onPackageSelection,toggleExportAll} from "../../store/actions";
import { Link } from "react-router-dom";
import Modal from '../../components/UI/Modal/Modal';

const PackagesArea = () => {
  // States
  const { isSearchClicked } = useSelector(state => state.filter);
  const selectedPackages  = useSelector(state => state.package.selectedPackages);
  const [openPaginationSelectBox, setOpenPaginationSelectBox] = useState(false);
  const [panelLoading, setPanelLoading] = useState(false);
  //const [selectedPackages, setSelectedPackages] = useState([]);
  const user_role = localStorage.user && JSON.parse(localStorage.user) ? JSON.parse(localStorage.user).user_role : ""
  const [exportModalConfig, setExportModalConfig] = useState({});
  const [zoomImg, setZoomImg] = useState({});

  const dispatch = useDispatch();
  const {
    views,
    selectedView,
    loading,
    packages = [],
    selectedPackageDetail,
    isExportAllSelected
  } = useSelector(state => state.package);
  useEffect(() => {
    dispatch(closeAllDrawer());
  }, [dispatch]); 

  const { exportDropdown } = useSelector(state => state.dropdown);
  const setOpen = open => {
    dispatch(toggleExportDropdown(open));
  };

  const [tempTags, setTempTags] = useState([]);
  const [tempTagsError, setTempTagsError] = useState({show: false, msg: ''});
  const [currentTag, setCurrentTag] = useState('');
  const [showPackageDetailDeletePopup, setShowPackageDetailDeletePopup] = useState({});

  const [addTagsTempList, setAddTagsTempList] = useState([]);
  const [addTagsTempTagsError, setAddTagsTempTagsError] = useState({show: false, msg: ''});
  const [currentAddTag, setCurrentAddTag] = useState('');
  const [showAddTagDeletePopup, setShowAddTagDeletePopup] = useState({});

  //const [isExportAllSelected, setIsExportAllSelected] = useState(false);
  
  const { showPackageViewDetail, showAddTag } = useSelector(
    state => state.drawer
  );
  const { currentPage, limit, limitRanges, pageCount } = useSelector(
    state => state.pagination
  );

  const {
    DRAWER: { packageViewDetailConfig, addTagsConfig }
  } = config.uiSettings;

  // Drawer Configurations
  const packageViewDetailDrawerConfig = packageViewDetailConfig(
    showPackageViewDetail,
    () => {},
    () => {
      dispatch(openDrawer({ key: "showPackageViewDetail", value: false })); 
      dispatch(onPackageSelection([]));
      dispatch(updatePackages([...packages.map(p => ({ ...p, selected: false }))]));
      //setIsExportAllSelected(false);
      dispatch(toggleExportAll(false));
    },
  );

  const addTagsDrawerRemoveTagCancelHandler = () => {
    setShowAddTagDeletePopup({});
  };

  const modalYesHandler = () => {
    const payload = {
      pkgs_to_export: []
    };
    dispatch(exportData(payload,exportModalConfig.type,packages));
    setExportModalConfig({});
  }

  const modalNoHandler = () => {
    setExportModalConfig({
      show: false
    })
  }

  const addTagsDrawerRemoveTagDoneHandler = () => {
    const ids = [];
    selectedPackages.map(item => {
      return ids.push(item.pkg_id);
    });
    let tag_name = showAddTagDeletePopup.tag;
    setPanelLoading(true);
    //dispatch(toggleToaster({}))
    dispatch(deleteTag(ids,tag_name, setPanelLoading, setAddTagsTempList, addTagsTempList, showAddTagDeletePopup.tag ));
    //setSelectedPackages([]);
    dispatch(onPackageSelection([]));
    setShowAddTagDeletePopup({});
  };

  const addTagsDrawerConfig = addTagsConfig(
    showAddTag,
    () => {
      dispatch(openDrawer({ key: "showAddTag", value: false }));
      dispatch(onPackageSelection([]));
      dispatch(updatePackages([...packages.map(p => ({ ...p, selected: false }))]));
      //setIsExportAllSelected(false); 
      dispatch(toggleExportAll(false));
    },
    () => {}
  );

  // Toggle single Package
  const onPackageSelect = (packageItem, state) => {
    packageItem.selected = !state;
    dispatch(onPackageSelection([...packages.filter(p => p.selected)]))
    let check = packages.every(v => v.selected === true);
    check === true ? dispatch(toggleExportAll(true)) : dispatch(toggleExportAll(false));
  };

  // Add Tag (single or multiselect packages)
  const onAddTags = () => {
    setAddTagsTempTagsError({}); 
    setCurrentAddTag('');
    setAddTagsTempList([]);
    setShowAddTagDeletePopup({});
    //dispatch(toggleToaster({}));

    let arrayOfArrays = [];
    for (let item of selectedPackages) {
      arrayOfArrays.push(item.tags);
    }
    setAddTagsTempList(_.intersection.apply(_,arrayOfArrays));
    dispatch(openDrawer({ key: addTagsDrawerConfig.key, value: true }));
  };

  // Add Tags in the result area
  const handleAddTagsForMultiplePackages = tag => {
    if (validateTag(tag)){
      if(!addTagsTempList.includes(tag)){
        let payload = {
          pkgs_to_tag: [],
          tags_list: [tag]
        };
    
        // dummy.map(e => ({ pkgId: e, tagList: [] }))
        selectedPackages.map(item => {
          return payload.pkgs_to_tag.push(item.pkg_id);
        });
    
        setPanelLoading(true);
        //dispatch(toggleToaster({}));
        dispatch(addTags(payload, setPanelLoading, setAddTagsTempList, addTagsTempList, tag));
        setAddTagsTempTagsError({});
        setCurrentAddTag('');
        //setSelectedPackages([]); // should be in store
        dispatch(onPackageSelection([]));

      }
      else{
        setAddTagsTempTagsError({show: true, msg: "Tag already added."});
      }
    }
    else{
      setAddTagsTempTagsError({show: true, msg: "Unable to add tag. Please select categorey to add tag."});
    }
  };

  // Package View Detail Methods
  // On view packageViewDetail
  const onViewDetail = pkg => {
    packages.map((val) => val === pkg ? val.selected = true : val.selected = false);
    dispatch(toggleExportAll(false));
    setTempTagsError({});
    setCurrentTag('');
    setShowPackageDetailDeletePopup({});

    pkg.editMode = user_role ? true : false;
    //dispatch(toggleToaster({}));
    setTempTags([...pkg.tags]);
    dispatch(onPackageDetail(pkg));
    dispatch(
      openDrawer({ key: packageViewDetailDrawerConfig.key, value: true })
    );
    //onPackageSelect(pkg, false);
    dispatch(onPackageSelection(pkg));
  };

  // Add Tag inside package view detail
  const packageViewDetailAddTagActionHandler = tag => {
    if (validateTag(tag)) {
      if(!tempTags.includes(tag)){
        setTempTagsError({})
        const payload = {  
              pkgs_to_tag: [selectedPackageDetail.pkg_id],
              tags_list: [tag]
        };
        setPanelLoading(true);
        setCurrentTag('');
        //dispatch(toggleToaster({}));
        dispatch(addTags(payload, setPanelLoading, setTempTags, tempTags, tag));
        //setSelectedPackages([]);
        dispatch(onPackageSelection([]));
      }
      else{
        setTempTagsError({show: true, msg: "Tag already added."});
      }
      
    }
    else{
      setTempTagsError({show: true, msg: "Unable to add tag. Please select categorey to add tag."});
    };
  };

  // Remove the tags insdie package view detail
  const packageViewDetailClearTagActionHandler = tag => {
    setShowPackageDetailDeletePopup({show: true, tag: tag});
  };

  const packageDetailDrawerRemoveTagCancelHandler = () => {
    setShowPackageDetailDeletePopup({});
  };

  const packageDetailDrawerRemoveTagDoneHandler = () => {
    const package_ids = [];
    package_ids.push(selectedPackageDetail.pkg_id);
    const tag_name = showPackageDetailDeletePopup.tag;
    setPanelLoading(true);
    //dispatch(toggleToaster({}))
    dispatch(deleteTag(package_ids,tag_name, setPanelLoading, setTempTags, tempTags, showPackageDetailDeletePopup.tag ));
    //setSelectedPackages([]);
    dispatch(onPackageSelection([]));
    setShowPackageDetailDeletePopup({});
  };

  const addTagsClearTagActionHandler = tag => {
    setShowAddTagDeletePopup({show: true, tag: tag});
  };

  // Export DropDown
  const onExportDropdownSelect = type => {
    let data = [];    
    data = selectedPackages.map(p => p.record_id);
    //console.log(data);
    if(!data.length && !isExportAllSelected){
      setExportModalConfig({
        show: true,
        type: type
      })
    }
    else{
      const payload = {
        pkgs_to_export: data
      };
      dispatch(exportData(payload,type,packages));
    }
  };

  const onExportAllSelect = state => {
    //setIsExportAllSelected(state);
    dispatch(toggleExportAll(state));
    
    let pkgs;
    if (state) {
      pkgs = [...packages.map(p => ({ ...p, selected: true }))];
      dispatch(updatePackages(pkgs));
      //setSelectedPackages(pkgs);
      dispatch(onPackageSelection(pkgs));
    } else {
      pkgs = [...packages.map(p => ({ ...p, selected: false }))];
      dispatch(updatePackages(pkgs));
      //setSelectedPackages([]);
      dispatch(onPackageSelection([]));
    }
   
  };

  // Pagination
  const onPageSelect = page => {
    dispatch(setCurrentPage(page));
    dispatch(getPackages({ page, limit  , isExportAllSelected}));
    //setSelectedPackages([]);
  };

  const onPrevPageSelect = () => {
    let page = currentPage - 1;
    page = page < 1 ? 1 : page;
    dispatch(setCurrentPage(page));
    dispatch(getPackages({ page, limit  , isExportAllSelected}));
    //setSelectedPackages([]);
  };

  const onNextPageSelect = () => {

    let page = currentPage + 1;
    let pagesCount = Math.ceil(pageCount / limit);
    page = page > pagesCount ? pagesCount : page;
    dispatch(setCurrentPage(page));
    dispatch(getPackages({ page, limit , isExportAllSelected}));
    //setSelectedPackages([]);
  };

  const onLimitSelect = limit => {
    setOpenPaginationSelectBox(false);
    dispatch(limitPerPage(limit));
    dispatch(setCurrentPage(1));
    dispatch(getPackages({ page: currentPage, limit , isExportAllSelected}));
    //setSelectedPackages([]);
  };

  const onImgClick = id => {
    setZoomImg({
      src: "",
      loader: true,
      id: id,
      show: true
    })
    dispatch(getZoomImg(id,setZoomImg));
  };

  return (
    <>
      <div className="row padding-15 gridListWrap">
        <Loader isLoading={loading} />
        {packages.length ? (
          <>
            <PackagesHeader
              views={views}
              onViewSelect={v => dispatch(onViewSelect(v.name))}
              selectedView={selectedView}
              showAddTag={selectedPackages.length}
              onAddTags={onAddTags}
              dropdownOptions={exportDropdown}
              toggleDropdown={setOpen}
              onExportDropdownSelect={onExportDropdownSelect}
              onExportAllSelect={onExportAllSelect}
              userRole={user_role}
              isExportAllSelected={isExportAllSelected}
            />
            <PackagesList
              packages={packages}
              selectedView={selectedView}
              onPackageSelect={onPackageSelect}
              onViewDetail={onViewDetail}
              onImgClick={onImgClick}
            />
          </>
        ) : (
          <div
            className={`row padding-15 noPackageDiv ${
              isSearchClicked === false ? "hide" : ""
            }`}
          >
            <p className="pt-50 align-center">
              No Package available for preview. Please{" "}
              <Link to="/import" className="color-black2 underline">
                import
              </Link>{" "}
              packages.
            </p>
          </div>
        )}

        <Drawer {...packageViewDetailDrawerConfig} headerTitle={selectedPackageDetail.rtitle}>
          <Loader isLoading={panelLoading} />
          <PackageViewDetail
            pkg={selectedPackageDetail}
            onAddActionTagHandler={packageViewDetailAddTagActionHandler}
            handlePackageDetailTagClear={packageViewDetailClearTagActionHandler}
            showEditTag={true}
            tempTags={tempTags}
            tempTagsError={tempTagsError}
            editMode={user_role}
            currentTag={currentTag}
            setCurrentTag={setCurrentTag}
            showDeletePopup={showPackageDetailDeletePopup}
            RemoveTagCancelHandler={packageDetailDrawerRemoveTagCancelHandler}
            RemoveTagDoneHandler={packageDetailDrawerRemoveTagDoneHandler}
            onImgClick={onImgClick}
          />
        </Drawer>
        <Drawer {...addTagsDrawerConfig}>
          <Loader isLoading={panelLoading} />
          <PackageTagAction
            showEditTag={false}
            onAddActionTagHandler={handleAddTagsForMultiplePackages}
            tempTagsError={addTagsTempTagsError}
            currentTag={currentAddTag}
            setCurrentTag={setCurrentAddTag}
          />
          <PackageViewTagsList 
            tags={addTagsTempList} 
            editMode={true}
            onTagClear={addTagsClearTagActionHandler}
            showDeletePopup={showAddTagDeletePopup}
            RemoveTagCancelHandler={addTagsDrawerRemoveTagCancelHandler}
            RemoveTagDoneHandler={addTagsDrawerRemoveTagDoneHandler}
          />
        </Drawer>
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
        />
      </div>
      <Modal 
        config={exportModalConfig}
        modalYesHandler={modalYesHandler}
        modalNoHandler={modalNoHandler}
      />
      <div className={`zoomContainer ${zoomImg.show ? 'active' : '' }`} onClick={(e) => setZoomImg({src:'',loader: false,id: '',show: false})}>
        <Loader isLoading={zoomImg.loader} />
        <div>
            <img src={zoomImg.src ? 'data:image/png;base64,'+zoomImg.src : ''} alt="" width="50%" height="50%"/>
        </div>
      </div>
    </>
  );
};

export default PackagesArea;
