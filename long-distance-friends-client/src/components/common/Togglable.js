import React, { useState, forwardRef, useImperativeHandle } from "react";
import PropTypes from "prop-types";

const Togglable = forwardRef((props, ref) => {
  Togglable.displayName = "Togglable";

  const [visible, setVisible] = useState(false);

  const hideWhenVisible = { display: visible ? "none" : "" };
  const showWhenVisible = { display: visible ? "" : "none" };

  const toggleVisibility = () => {
    setVisible(!visible);
  };

  useImperativeHandle(ref, () => {
    return {
      toggleVisibility
    };
  });

  Togglable.propTypes = {
    buttonLabel: PropTypes.string.isRequired
  };

  return (
    <div>
      <div style={hideWhenVisible}>
        <button className="btn bg-purple-300 hover:bg-purple-400 font-normal" onClick={toggleVisibility}>{props.buttonLabel}</button>
      </div>
      <div style={showWhenVisible}>
        {props.children}
        <button className="z-10 btn bg-white hover:bg-amber-300 font-normal" onClick={toggleVisibility}>Cancel</button>
      </div>
    </div>
  );
});

export default Togglable;