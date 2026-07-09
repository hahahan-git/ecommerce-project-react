import userProfile from '../assets/profile-1.jpg'
import botProfile from '../assets/robot.png'
import './ChatMessage.css'
import dayjs from 'dayjs'

export function ChatMessage({ message, sender }) {
  const time = dayjs().valueOf();
  const timeFormat = dayjs(time).format('h:mma');
  return (
    <div
      className={sender === "bot" ? "bot-message" : "user-message"}>
      {sender === "bot" && (
        <img src={botProfile} className="chat-messages-profile" />
      )}
      <div className="text-message">
        <div>{message}</div>
        <div className='time'>{timeFormat}</div>
      </div>
      {sender === "user" && (
        <img src={userProfile} className="chat-messages-profile" />
      )}
    </div>

  )
};