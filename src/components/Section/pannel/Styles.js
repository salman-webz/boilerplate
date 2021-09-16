    const Styles = () => (
    <style global jsx>
      {`
        
        .no-result{
            width: 100%;
            background: none !important;
            border: none !important;
            text-align: center;
        }
        .form-field.active::placeholder {
            color: #F7691F;
        }
        .panel-block .panel-wrapper .panel-header{
          padding: 16px 28px 16px 32px;
        }
        .pannal-heading {
          display: flex;
        }
        .pannal-heading span {
            padding-top: 7px;
            padding-right: 10px;
        }
        .disabled-field {
          background: #F9F9F9 !important;
          cursor: no-drop !important;
        }
        
        .disabled-field.tag-disable {
          background:#ffffff !important;
          border-color:#ffffff !important;
          padding:0 !important
        }
        .tags-list ul li {
          padding: 3px 8px;
        }
      `}
    </style>
  );
  
  export default Styles;