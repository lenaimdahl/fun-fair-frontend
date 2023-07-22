import { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/auth.context";
import AddEvent from "../component/AddEvent";
import Calendar from "../component/Calendar";
import MoodSelection from "../component/MoodSelection";
import NewEvent from "../component/NewEvent";
import AddFriend from "../component/AddFriend";
import ShowFriends from "../component/ShowFriends";
import Points from "../component/Points";
import { BackendAPI } from "../api/BackendAPIHandler";

function Profile() {
  const { user } = useContext(AuthContext);
  const [friends, setFriends] = useState([]);

  const backendAPIInstance = new BackendAPI();

  const fetchFriends = async () => {
    const { friends } = await backendAPIInstance.getFriends();
    setFriends(friends);
  };

  useEffect(() => {
    fetchFriends();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="profile-page">
      <div className="welcome-box">
        <h2>Welcome {user && user.username}</h2>
      </div>
      <div className="calendar-flex">
        <div className="left-side">
          <Points />
          <Calendar />
        </div>
        <div className="right-side-menu">
          <MoodSelection />
          <div className="combo-pannel">
            <AddEvent />
            <NewEvent />
          </div>
          <div className="combo-pannel">
            <h2>Friend Zone</h2>
            <div className="friend-zone-box">
              <AddFriend friends={friends} fetchFriends={fetchFriends} />
              <ShowFriends friends={friends} />
            </div>
          </div>
          <div className="centered">
            <Link to={"/day-view"}>
              <button className="button">Add a text for today</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
