import { useContext, useEffect, useState } from "react";
import { GlobalContext } from "../context/global.context";

function AddFriend({ fetchFriends }) {
  const { backendAPIInstance } = useContext(GlobalContext);
  const [allUsers, setAllUsers] = useState([]);

  const fetchAllUsers = async () => {
    const { users } = await backendAPIInstance.getNonFriends();
    setAllUsers(users);
  };

  useEffect(() => {
    fetchAllUsers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleAddFriends = async (event) => {
    event.preventDefault();
    const selectEl = event.target[0].options[event.target[0].selectedIndex];
    const userId = selectEl.id;
    try {
      await backendAPIInstance.addFriendToUser(userId);
      await fetchFriends();
      await fetchAllUsers();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <form onSubmit={handleAddFriends} className="add-friend-form">
        <label>add a friend: </label>
        <select id="user" name="user">
          {allUsers.map((user) => (
            <option id={user._id} key={user._id}>
              {user.username}
            </option>
          ))}
        </select>
        <button type="submit">+</button>
      </form>
    </div>
  );
}

export default AddFriend;
