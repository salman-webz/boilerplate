const Styles = () => (
    <style global jsx>
      {`
        
        .table-no-data, .table-no-data tbody, .table-no-data tbody tr, .table-no-data tbody tr td {
            border-bottom: none;
            background:none;
            box-shadow: none;
        }
        .table-no-data tbody tr td {
            height: calc(100Vh - 300px);
            vertical-align: middle;
        }
        .table-no-data tr:hover td {
            border: none!important;
        }
        .table-no-data tbody tr td button {
            text-decoration: underline;
            cursor: pointer;
            font-size: 11px;
            color: #333743;
        }
        .table-no-data p {
            font-size: 11px;
            color: #333743;
            text-align: center;
        }
      `}
    </style>
  );
  
  export default Styles;