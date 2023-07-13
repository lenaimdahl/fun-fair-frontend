import { useEffect, useState } from "react";
import { BackendAPI } from "../api/BackendAPIHandler";
import "../css/day-view.css";

function AddFriend() {
  const [allUsers, setAllUsers] = useState([]);

  const backendAPIInstance = new BackendAPI();

  const fetchAllUser = async () => {
    const { users } = await backendAPIInstance.getNonFriends();
    setAllUsers(users);
  };

  useEffect(() => {
    fetchAllUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleAddFriends = async (event) => {
    event.preventDefault();
    const selectEl = event.target[0].options[event.target[0].selectedIndex];
    const userId = selectEl.id;
    try {
      await backendAPIInstance.addFriendToUser(userId);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <div>
        <form onSubmit={handleAddFriends} className="add-event-today-form">
          <label>User: </label>
          <select id="user" name="user">
            {allUsers.map((user) => {
              return (
                <option id={user._id} key={user._id}>
                  {user.username}
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

export default AddFriend;
