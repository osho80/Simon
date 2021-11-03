import React from "react";
import { connect } from "react-redux";

const Header = (props: { player: string }) => {
  return <h1>{props.player} is playing Simon</h1>;
};

// export default Header;
const mapStateToProps = (state: any) => {
  return {
    player: state.appStore.player,
  };
};

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
