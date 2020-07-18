import React from "react";
import VisibilitySharpIcon from "@material-ui/icons/VisibilitySharp";
import VisibilityOffSharpIcon from "@material-ui/icons/VisibilityOffSharp";
import Aux from "../../hoc/Auxilary/Auxilary";

const showIconComponent = (props) => {
  let showIcon;
  if (!props.showIcon) {
    showIcon = (
      <Aux>
        <span style={{ margin: "0 10px" }}></span>
        <VisibilitySharpIcon
          style={{ verticalAlign: "bottom" }}
          onClick={props.clicked}
        ></VisibilitySharpIcon>
        <span style={{ margin: "0 5px" }}>Show all Country</span>
      </Aux>
    );
  } else {
    showIcon = (
      <Aux>
        <span style={{ margin: "0 10px" }}></span>
        <VisibilityOffSharpIcon
          style={{ verticalAlign: "bottom" }}
          onClick={props.clicked}
        ></VisibilityOffSharpIcon>
        <span style={{ margin: "0 5px" }}>Hide all Country</span>
      </Aux>
    );
  }

  return <Aux>{showIcon}</Aux>;
};

export default showIconComponent;
