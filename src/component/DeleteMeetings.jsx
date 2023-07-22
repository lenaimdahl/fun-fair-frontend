import { BackendAPI } from "../api/BackendAPIHandler";

function DeleteMeetings(props) {
  const backendAPIInstance = new BackendAPI();

  const handleDeleteMeeting = async () => {
    try {
      await backendAPIInstance.deleteMeeting(props.id);
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
