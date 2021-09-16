import React, { useState, useEffect, useRef } from "react";
import useSearch from "../../../hooks/useSearch";
import { usePrevious } from "../../../hooks/usePrevious";
import Loader from "../Loader/Loader";
import SearchField from "./SearchField/SearchField";

const Search = ({ apiPath, Icon, onItemSelect, label, classes, keys, value, setValue }) => {
  const [defaultTerm, defaultSetTerm] = useState("");
  const term = value || defaultTerm;
  const setTerm = setValue || defaultSetTerm;
  const [open, setOpen] = useState(false);
  const [showLoader, setShowLoader] = useState(true);
  const [results, setResults] = useSearch(term, apiPath, setShowLoader);
  const ref = useRef();
  const prevTerm = usePrevious(term);
 

  useEffect(() => {
    if (term === prevTerm) setShowLoader(false);
    setResults(term);
  }, [term, setResults]);

  useEffect(() => {
    const clickHandler = e => {
      if (ref && ref.current && ref.current.contains(e.target)) {
        return;
      } else setOpen(false);
    };

    document.body.addEventListener("click", clickHandler);

    return () => {
      document.body.removeEventListener("click", clickHandler);
    };
  }, [setOpen]);

  const renderedResults = () => {
    return results.map(item => (
      <li
        onClick={_ => {
          setOpen(false);
          setTerm("");
          onItemSelect(item);
        }}
        key={item[keys[0]]}
      >
        {item[keys[1]]}
      </li>
    ));
  };

  const onTermChange = e => {
      if(/^[a-zA-Z0-9._-\s]+$/g.test(e.target.value)){
        setTerm(e.target.value);
        //setShowLoader(true);
        if (e.target.value) setOpen(true);
        else setOpen(false); 
      }
      if(!e.target.value){
        setTerm('');
        //setShowLoader(false);
        setOpen(false); 
      }
      if(label === 'Search Tags' || label === 'Enter Tag Name'){
        setTerm(e.target.value);
        //setShowLoader(true);
        if (e.target.value) setOpen(true);
        else setOpen(false); 
      }
      
  };

  return (
    <div className={`row seachC mb-10 ${classes}`} ref={ref}>
      <div className="row seachIcoD border-gray5 bg-white">
        <SearchField Icon={Icon} onTermChange={onTermChange} term={term} label={label}/>
        <div className="searchDD" style={{ display: open ? "block" : "none" }}>
          <Loader isLoading={showLoader} />

          {!renderedResults().length && !showLoader ? (
            <div className="absolute-center fs-12 color-gray">
              No data Found
            </div>
          ) : (
            ""
          )}
          <ul className="row">{renderedResults()}</ul>
        </div>
      </div>
    </div>
  );
};

export default Search;
