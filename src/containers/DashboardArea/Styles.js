const Styles = () => (
    <style global jsx>
      {`
        
        .search-regEX .search-form .search-regEX-input .search-regEX-submit {
          cursor: pointer;
          background: #F7691F;
          color: #fff;
          border: none;
        }
        .rotate{
          animation: rotate 1.5s linear infinite; 
        }
        @keyframes rotate{
          to{ transform: rotate(360deg); }
        }
        .abort-search {
          text-align: center;
          height: 300px;
        }
        .mt-50 {
          margin-top:50px
        }
      `}
    </style>
  );
  
  export default Styles;