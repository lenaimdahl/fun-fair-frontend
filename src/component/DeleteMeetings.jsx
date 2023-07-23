import { useContext } from "react";
import { GlobalContext } from "../context/global.context";

function DeleteMeetings({ id }) {
  const { backendAPIInstance } = useContext(GlobalContext);
  const { fetchMeetings } = useContext(GlobalContext);

  const handleDeleteMeeting = async () => {
    try {
      await backendAPIInstance.deleteMeeting(id);
      await fetchMeetings();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <button className="button-delete" onClick={handleDeleteMeeting}>
      ✖️
    </button>
  );
}

export default DeleteMeetings;
