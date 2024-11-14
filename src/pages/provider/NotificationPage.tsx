import Navbar from "../../components/provider/Navbar";
import Notification from "../../components/provider/Notification";



const NotificationPage = () => {
  return (
    <div>
        <Navbar />
        <div className="mt-10">
            <Notification />
        </div>
    </div>
  )
}

export default NotificationPage