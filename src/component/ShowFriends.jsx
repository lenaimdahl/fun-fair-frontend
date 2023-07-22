import { useEffect, useState } from "react";
import { BackendAPI } from "../api/BackendAPIHandler";

function ShowFriends() {
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
    <div>
      <div className="friends-list-box">
        <h3>Your friends: </h3>

        {friends.map((friend) => {
          return (
            <li id={friend._id} key={friend._id}>
              🥰 {friend.username}
            </li>
          );
        })}
      </div>
    </div>
  );
}

export default ShowFriends;
