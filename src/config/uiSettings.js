const settings = {
  DRAWER: {
    // KEY should be matched with drawerReducer
   
    addEditRegex: function (isOpen, yesCallback, closeCallaback) {
      return {
        key: "addEditRegex",
        open: isOpen,
        headerTitle: "Add Edit Regex",
        showFooter: true,
        yesHandler: {
          handler: function () {
            yesCallback();
          },
          label: "Compare"
        },
        closeHandler: {
          handler: function () {
            closeCallaback();
          },
          label: "No",
          showInFooter: false
        },
      };
    }
  },

  TAGS: {}
};

export default settings;
