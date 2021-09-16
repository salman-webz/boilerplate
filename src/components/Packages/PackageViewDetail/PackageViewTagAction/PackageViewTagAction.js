import React, { useEffect } from "react";
import { ReactComponent as TagIcon } from "../../../../assets/svgs/tagIcon.svg";
import { ReactComponent as PlusTagIcon } from "../../../../assets/svgs/plusTagIcon.svg";
import EditTag from "./EditTag/EditTag";
import SearchField from "../../../UI/Search/SearchField/SearchField";
import AddAction from "../../../UI/AddAction/AddAction";

const PackageTagAction = ({
  selectedPkg,
  showEditTag,
  onAddActionTagHandler,
  onEditActionTagHandler = () => {},
  onCancelActionTagHandler = () => {},
  tempTagsError,
  currentTag,
  setCurrentTag,
}) => {
  // const [tag, setAddTag] = useState('');
  useEffect(() => { //setAddTag('')
}, []);
  return (
    <>
      {showEditTag ? (
        <EditTag
          pkg={selectedPkg}
          onEditActionTagHandler={onEditActionTagHandler}
          onCancelActionTagHandler={onCancelActionTagHandler}
        />
      ) : null}
      {!showEditTag || selectedPkg.editMode ? (
        <div className="row mt-8 mb-8 theeCOlSearch">
          <div className="col col1 strech">
            <div className="row seachC seachC1 mb-10">
              <div className={`row seachIcoD border-gray5 bg-white ${tempTagsError.show ? 'border-red' : ''}`}>
                <SearchField
                  label="Add Tag"
                  onTermChange={e => setCurrentTag(e.target.value)}
                  term={currentTag}
                  Icon={TagIcon}
                />
              </div>
            </div>
          </div>
          <AddAction
            label="Add Tag"
            value={currentTag}
            Icon={PlusTagIcon}
            clickHandler={_ => onAddActionTagHandler(currentTag)}
          />
          {tempTagsError.show ? <span className="row align-right color-red fs-11">{tempTagsError.msg}</span> : null}
        </div>
      ) : null}
    </>
  );
};

export default PackageTagAction;
