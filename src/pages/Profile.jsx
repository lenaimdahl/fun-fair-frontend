import React, { useContext } from "react";
import { AuthContext } from "../context/auth.context";

import Calendar from "../component/Calendar";

function Profile() {
  const { logOutUser, user } = useContext(AuthContext);

  return (
    <div>
      {user && user.email}
      <div className="calendar-flex">
        <Calendar />
        <div className="right-side-menu">
          <div>
            <h2>Add an activity</h2>
          </div>
        </div>
      </div>

      <button onClick={logOutUser}>Logout</button>
    </div>
  );
}

export default Profile;
