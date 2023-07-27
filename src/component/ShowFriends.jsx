import { GlobalContext } from "../context/global.context";
import { useContext } from "react";

function ShowFriends({ friends, fetchFriends }) {
  const { backendAPIInstance } = useContext(GlobalContext);

  const handleDeleteFriend = async (friendId) => {
    try {
      await backendAPIInstance.deleteFriend(friendId);
      await fetchFriends();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="friends-list-box">
      <h3>Your friends: </h3>
      {friends.map((friend) => {
        return (
          <li id={friend._id} key={friend._id}>
            🥰 {friend.username}
            <button
              className="button-delete-friend"
              onClick={() => handleDeleteFriend(friend._id)}
            >
              ✖️
            </button>
          </li>
        );
      })}
    </div>
  );
}

export default ShowFriends;
