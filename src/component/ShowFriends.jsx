import { useEffect, useState } from "react";
import { BackendAPI } from "../api/BackendAPIHandler";

function ShowFriends() {
  const [friends, setFriends] = useState([]);

  const backendAPIInstance = new BackendAPI();

  const fetchFriends = async () => {
    const { friends } = await backendAPIInstance.getFriends();
    setFriends(friends);
    console.log(friends);
  };

  useEffect(() => {
    fetchFriends();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleGetFriends = async (event) => {
    event.preventDefault();
    const selectEl = event.target[0].options[event.target[0].selectedIndex];
    const userId = selectEl.id;
    try {
      await backendAPIInstance.getFriends(userId);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <div>
        <form onSubmit={handleGetFriends} className="add-event-today-form">
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
          <button type="submit">+</button>
        </form>
      </div>
    </div>
  );
}

export default ShowFriends;
