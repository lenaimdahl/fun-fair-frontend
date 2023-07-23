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
import { GlobalContext } from "../context/global.context";

function Profile() {
  const { backendAPIInstance } = useContext(GlobalContext);
  const { user } = useContext(AuthContext);

  const [allEvents, setAllEvents] = useState([]);
  const [friends, setFriends] = useState([]);

  const fetchFriends = async () => {
    const { friends } = await backendAPIInstance.getFriends();
    setFriends(friends);
  };

  const fetchAllEvents = async () => {
    const { allEvents } = await backendAPIInstance.getEvents();
    const uniqueEvents = allEvents.reduce((result, event) => {
      if (!result.find((ev) => ev.title === event.title)) {
        result.push(event);
      }
      return result;
    }, []);
    setAllEvents(uniqueEvents);
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
            <AddEvent
              allEvents={allEvents}
              fetchAllEvents={fetchAllEvents}
              friends={friends}
            />
            <NewEvent fetchAllEvents={fetchAllEvents} />
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
