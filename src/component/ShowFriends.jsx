function ShowFriends({ friends }) {
  return (
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
  );
}

export default ShowFriends;
