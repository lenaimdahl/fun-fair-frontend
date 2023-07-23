import { useContext } from "react";
import { GlobalContext } from "../context/global.context";
import { APIContext } from "../context/api.context";

function DeleteMeetings({ id }) {
  const { backendAPIInstance } = useContext(APIContext);
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
    <div>
      <button className="button-delete" onClick={handleDeleteMeeting}>
        ✖️
      </button>
    </div>
  );
}

export default DeleteMeetings;
