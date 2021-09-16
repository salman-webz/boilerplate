export const updateSelectedUser = (user) => {
    return (
        {
            type: 'UPDATE_SELECTED_USER',
            payload: {
                user
            }
        }
    );
}