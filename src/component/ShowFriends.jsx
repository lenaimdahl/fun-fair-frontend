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
      <div className="">
        <form className="add-event-today-form">
          <label>Your friends: </label>
          <select id="friend" name="friend">
            {friends.map((friend) => {
              return (
                <option id={friend._id} key={friend._id}>
                  {friend.username}
                </option>
              );
            })}
          </select>
        </form>
      </div>
    </div>
  );
}

export default ShowFriends;
