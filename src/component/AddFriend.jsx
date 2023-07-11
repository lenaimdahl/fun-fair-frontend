import { useEffect, useState } from "react";
import { BackendAPI } from "../api/BackendAPIHandler";

function AddFriend() {
  const [allUser, setAllUser] = useState([]);

  const backendAPIInstance = new BackendAPI();

  const fetchAllUser = async () => {
    const { allUser } = await backendAPIInstance.getUser();
    setAllUser(allUser);
  };

  useEffect(() => {
    fetchAllUser();
  }, []);

  const handleAddFriends = async (e) => {
    e.preventDefault();

    const selectEl = e.target[0].options[e.target[0].selectedIndex];
    try {
      let userToAdd = {
        user: selectEl.getAttribute("user"),
      };
      await backendAPIInstance.addFriendToUser(userToAdd);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <div>
        <h2>Add a friend</h2>
        <form onSubmit={handleAddFriends} className="add-event-today-form">
          <label>User: </label>
          <select id="user" name="user">
            {allUser.map((oneUser) => {
              return <option key={oneUser._id}>{oneUser.username}</option>;
            })}
          </select>
          <button type="submit">+</button>
        </form>
      </div>
    </div>
  );
}

export default AddFriend;
