export const updateFileInfo = (name, file) => {
    return (
        {
            type: 'UPDATE_FILEINFO',
            payload: {
                name,
                file
            }
        }
    );
}

export const updateProcess = (percentage, status) => {
    
    return (
        {
            type: 'UPDATE_PROCESS',
            payload: {
                percentage,
                status
            }
        }
    );
}

export const toggleError = (val) => {
    return (
        {
            type: 'TOGGLE_ERROR',
            payload: val
        }
    );
}

export const setImportInitialState = () => {
    return (
        {
            type: 'SET_IMPORT_INITIAL_STATE',
        }
    );
}