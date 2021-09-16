import React, { useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import * as actions from "../../store/actions/import";
import Toaster from "../../components/UI/Toaster/Toaster";
import httpService from "../../services/httpService";
import config from "../../config";
import { CancelToken } from "axios";

//ICONS
import { ReactComponent as UploadIcon } from "../../assets/svgs/uploadIcon.svg";
import { ReactComponent as FileIcon } from "../../assets/svgs/fileIcon.svg";
import { ReactComponent as UploadSuccessIcon } from "../../assets/svgs/uploadSuccessIcon.svg";
import { ReactComponent as UploadErrorIcon } from "../../assets/svgs/uploadErrorIcon.svg";

const {
  server: { REGEX }
} = config;


const ImportProcess = () => {

    const dispatch = useDispatch();
    const state = useSelector(state => state.import);
    const toaster = useSelector(state => state.toaster);
    const cancelFileUpload = useRef(null);

    const handleChange = (e) => {
        let val = null;
        let allowedExtensions = /(\.json)$/i;

        resetView();
       
        if (e.target.files.length) {
            val = e.target.files[0].name;
            
            if (!allowedExtensions.exec(e.target.files[0].name)) {
                dispatch(actions.updateFileInfo(val, null));
                dispatch(actions.toggleError(true));
                return false;
            }
            else {
                dispatch(actions.updateFileInfo(val, e.target.files[0]));
            }
        }
    }

    const uploadFile = (e) => {
        e.preventDefault();

        let data = new FormData();
        data.append('file', state.selectedFile);

        console.log(state.selectedFile);

        httpService.post(REGEX.ImportDocument, data, {
            headers: {
                Authorization: "Bearer "+localStorage.token
            },
            onUploadProgress: (progressEvent) => {
                const { loaded, total } = progressEvent;
                let percent = Math.floor((loaded * 100) / total)
                if (percent < 100) {
                    dispatch(actions.updateProcess(percent, 'inprogress'))
                }
            },
            cancelToken: new CancelToken(
                cancel => (cancelFileUpload.current = cancel)
            )
        }).then(response => {
            if (response.status === 200) {
                dispatch(actions.updateProcess(100, 'success'))
                document.getElementById("file-upload").value = "";
            }
        }).catch(error => {
            if(error.response && error.response.status === 401){
                localStorage.setItem("automsg",true);
                window.location.pathname = '/logout';
            }
            else{
                //dispatch(toggleToaster({name: 'error',show: 'true',msg: error.response ? error.response.data.message : error.message}));
            } 
        })
    }

    const handleCancel = (e) => {
        e.preventDefault();
        cancelFileUpload.current("Import cancelled by user");
        dispatch(actions.updateProcess(state.percentage, 'error'));
        document.getElementById("file-upload").value = "";
    }

    const resetView = () => {
        //dispatch(toggleToaster({}));
        dispatch(actions.updateProcess(0, null));
        dispatch(actions.toggleError(false));
        dispatch(actions.updateFileInfo(null, null));
    }

    return (
        <>
            <Toaster data={toaster}/>
            <div className="fieldDiv seven-tenth mb-20 relative hasIcon file">
                <em className="svg-ico">
                    <UploadIcon />
                </em>
                <input type="text" name="" id="" readOnly className={`row fileUploadInput ${state.error ? "error" : ''}`} value={state.selectedFileName || ''} placeholder="Upload .JSON file only" />
                <span className="errorMsg color-red fs-11">This format is not supported please use .JSON file only.</span>
            </div>
            <div className="three-tenth pl-10">
                <div className="pl mr-5 relative oh">
                    <a href="/#" className={`btn-default btn mw-150 align-center fw-500 ${state.status === 'inprogress' ? 'btn-disabled' : ''}`}>Browse</a>
                    <input className={`pl fileUploadBtn ${state.status === 'inprogress' ? 'btn-disabled' : ''}`} onChange={(e) => handleChange(e)} id="file-upload" type="file" title="" accept=".json" />
                </div>
                <div className="pl">
                    <a href="/#" className={`btn-primary btn mw-150 align-center fw-500 ${!state.selectedFile || state.percentage > 0 ? 'btn-disabled' : ''}`} onClick={(e) => uploadFile(e)}>Upload</a>
                </div>
            </div>

            {state.status ?

                <div className={`fileUploadWrapper row align-center ${state.status}`}>
                    <div className="row uploadStatusIcon mb-10">
                        <em className="svg-ico successIco">
                            <UploadSuccessIcon />
                        </em>
                        <em className="svg-ico errorIco">
                            <UploadErrorIcon />
                        </em>
                    </div>
                    <em className="uploadStatus row mb-10">{state.status === 'inprogress' ? 'Uploading File' : (state.status === 'error' ? 'Uploading Failed' : 'Upload Complete')}</em>
                    <div className="progressBar mb-50 relative">
                        <div className="progressBarInner" style={{ width: state.percentage + '%' }}></div>
                        <span className="absolute-center uploadedPercent">{state.percentage}%</span>
                    </div>
                    <em className="fileIco svg-ico row mb-15">
                        <FileIcon />
                    </em>
                    <em className="fileName row mb-20">{state.selectedFileName || ''}</em>
                    <div className="row">
                        
                        {state.status === 'inprogress' ?
                           <a href="#/" className="btn-default btn mr-5 mw-150 align-center fw-500" onClick={e => {handleCancel(e)}}>Cancel</a>
                           :
                            ''
                        }

                    </div>
                </div>

                : ''}
        </>
    );
};

export default ImportProcess;
