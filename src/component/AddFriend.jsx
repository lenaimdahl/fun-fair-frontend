import { useEffect, useState } from "react";
import { BackendAPI } from "../api/BackendAPIHandler";

function AddFriend() {
  const [allUser, setAllUser] = useState([]);

  const backendAPIInstance = new BackendAPI();

  const fetchAllUser = async () => {
    const fetchedUser = await backendAPIInstance.getUser();
    const fetchedUserArray = fetchedUser.allUser;
    setAllUser(fetchedUserArray);
  };

  useEffect(() => {
    fetchAllUser();
  }, []);

  const handleAddFriends = async (e) => {
    e.preventDefault();

    const selectEl = e.target[0].options[e.target[0].selectedIndex];
    console.log(allUser);
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
              return (
                <option
                  key={oneUser.value}
                  value={oneUser.value}
                  user={oneUser.username}
                >
                  {oneUser.User}
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
