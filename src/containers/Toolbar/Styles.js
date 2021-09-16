
const Styles = () => (
    <style global jsx>
      {`
      .header {
          height:50px
      }
       .menu-list button {
            text-transform:uppercase;
            cursor: pointer;
        }  
         .user-arrow-down {
            margin: 7px 0px 0 7px;
        }
        .dropdown-item svg {
            margin-right:17px;
            margin-top: 2px;
        }
        .dropdown-menu li {
            padding: 4px 10px;
            cursor:pointer
        }
        .drop-icon {
            margin-top: 3px;
            cursor: pointer;
        }
        .dropdown-menu {
            top: 27px;
        }
        .user-arrow-down.active g {
            fill:#F7691F
        }
      `}
    </style>
  );
  
  export default Styles;
  