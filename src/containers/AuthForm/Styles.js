const Styles = () => (
    <style global jsx>
      {`
        .mainWrapper {
            height: 100vh;
            width: 1136px;
            max-width: 100%;
            margin: auto;
        }
        .mainWrapper > div {
            width:100%
        }
        .form-field {
            padding: 0 8px;
        }
        .logo-banner {
          height: 260px;
          width: 230px;
          margin-top: 25px;
        }
        .mt-0  {
          margin-top:0
        }
        .auth-footer {
          display: flex;
          justify-content: space-between;
        }
        .signup-field .form-field {
          margin-bottom:0 !important; 
        }
        .login-image {
          max-width: 260px;
          width: 80%;
          margin: 0 auto;
          margin-top: calc(50% - 161px);
        }
        
        .login.mainWrapper {
          min-height:100vh;
          height:unset
        }
        .text-center {
          text-align:center
        }
        .user-type ul{
          box-shadow: 0 2px 6px 0 rgb(93 93 93 / 21%);
          border-radius: 4px;
          right: 0;
          font-size: 12px;
          padding: 12px 24px;
          width: 140px;
          font-weight: 200;
          background: #ffffff;
          top: 50px;
          z-index: 99
        }
        .select-dropdown {
          position: absolute;
          right: 8px;
          top: 20px;
          transition: 0.3s all;
      }
      .drop-down li {
        background: #ffffff;
        padding: 4px;
        cursor: pointer;
    }
      `}
    </style>
  );
  
  export default Styles;
  