const server = {
  init: function() {
    const server = this;
    this.RMI = new Proxy(server.RMI, {
      get: function(obj, prop) {
        return server._buildPath(obj[prop]);
      }
    });
    return server;
  },

  RMI: {
    // RMI
    Login: "login",
    addPanel: "addPanel",
    TagSearch: "tagSearch",
    UserSearch: "userSearch",
    GetImageThumbnail: "imageThumbnail",
    GetImage: "image",
    GetPackages: "searchPackages",
    ImportDocument: "importDocument",
    GetUsers: "getUsers",
    EditUser: "editUser",
    CreateUser: "createUser",
    ExportData: "exportData",
    AddTag: "addTag",
    DeleteTag: "deleteTag",
    DeleteSelectedTag: "deleteSelectedTag",
    ChangePassword: "changePassword",
    ExtractText: "extractText",
    TopTags: "topTags",
    TotalTags: "totalTags",
    TotalPackages: "totalPackages",
    CompareTags: "compareTags",
    ComparisonResult: "comparisonResult"
  },

  endpoints: {
    // RMI Endpoints
    login: { path: "/auth/login" },
    addPanel: { path: "/data_view/addPanel" },
    tagSearch: { path: "/data_view/get_tags" },
    userSearch: { path: "/data_view/get_users" },
    imageThumbnail: { path: "/data_view/get_image_thumbnail" },
    image: { path: "/data_view/get_image" },
    searchPackages: { path: "/search/get_results" },
    importDocument: { path: "/import/import_document" },
    getUsers: { path: "/user_management/get_all_users" },
    editUser: { path: "/user_management/edit_user"},
    exportData: { path: "/export/export_data" },
    createUser: { path: "/user_management/create_user"},
    addTag: { path: "/data_view/add_tag"},
    deleteTag: { path: "/data_view/remove_tag"},
    deleteSelectedTag: { path: "/data_view/remove_selected_tag"},
    changePassword: { path: "/user_management/change_password"},
    forgot: { path: "/forgot_password" },
    reset: { path: "/auth/reset_password" },
    extractText: { path: "/data_view/v1.3/extract/text" },
    topTags: { path: "/v1/dashboard/top/tags" },
    totalTags: { path: "/v1/dashboard/total/tags" },
    totalPackages: { path: "/v1/dashboard/total/pkgs" },
    totalPackages: { path: "/v1/dashboard/total/pkgs" },
    compareTags: { path: "/v1/dashboard/compare/tags" },
    comparisonResult: { path: "/v1/dashboard/comparison/results" }
  },

  _buildUrl(current) {
    return `${process.env.REACT_APP_BASE_URL}${this.endpoints[current].path}`;
  },

  _buildPath(current) {
    return this.endpoints[current].path
  }
};

export default server.init.call(server);
