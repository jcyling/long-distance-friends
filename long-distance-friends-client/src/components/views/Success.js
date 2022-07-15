import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const Success = () => {
  const useNav = useNavigate();

  useEffect(() => {
    if (state === null) {
      setTimeout(() => {
        useNav("/");
      }, 5000);
    }
  }, []);

  // Get message from data passed into useNavigate
  const { state } = useLocation();
  if (state === null) {
    return (
      <div>
        Hey! I think you&apos;re on the wrong page!
        I&apos;ll bring you back in 2 seconds.
      </div>
    );
  }
  else {
    return (
      <div>
        {Object.keys(state).map(key => {
          if (key == "inviteUrl") {
            return <div key={state[key]}>
              <a href={state[key]}>{state[key]}</a>
            </div>;
          }
          else {
            return <div key={state[key]}>
              {state[key]}
            </div>;
          }
        })}
      </div>
    );
  }
};

export default Success;