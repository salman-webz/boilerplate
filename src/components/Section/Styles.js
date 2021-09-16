const Styles = () => (
  <style global jsx>
    {`
      .logo-image {
        width: 62px;
      position: absolute;
      z-index: 999;
      }
      .text-center {
        text-align:center
      }
      .header .header-menu .menu-list button {
        width:unset !important;
        font-weight:400
      }
      .header .header-menu .menu-list button.active, .header .header-menu .menu-list button:hover {
        font-weight:400
      }
    `}
  </style>
);

export default Styles;
