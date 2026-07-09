// bisa import file css, ini feature dari vite
//these files below imported by feature of vite, vite let us import any types of file
// ==> import './App.css'
// ==> import userProfile from './assets/user.png'
// ==> import botProfile from './assets/robot.png'
//kalau import javascript atau jsx file,  gaperlu ngasih type file nya, karena vite udah otomatis namain (nambahinnnya) path nya(intinya ga harus nulis .js atau .jsx).
import { useEffect, useState } from 'react'
import './App.css'
import { ChatInput } from './components/ChatInput'
import { ChatMessage } from './components/ChatMessage'
import ChatMessages from './components/ChatMessages'
import { Chatbot } from 'supersimpledev'

function App() {
  const [chatMessages, setChatMessages] = useState(JSON.parse(localStorage.getItem('Messages')) || []);
  const [textBoxPosition, setTextBoxPosition] = useState('bottom');

  useEffect(() => {
    Chatbot.addResponses({
      'test': 'apa jing',
      'fuck  you nigga': 'ey yo shut your bitch ass up ngga',
      'bapakmu mana': 'ada dibelakang, kenapa rupanya',
      'eit jangan sengak kali kao': 'ga ada lo bang',
      'berapa rupanya?':'SIKIK AAaaAAa'
    })
  }, []);

  useEffect(() => {
    localStorage.setItem('Messages', JSON.stringify(chatMessages))
  }, [chatMessages]);


  function moveTop() {
    setTextBoxPosition('top')
  }
  function moveBottom() {
    setTextBoxPosition('bottom')
  }

  return textBoxPosition === "bottom" ? (
    <div className="app-container">
      {<ChatMessages
        chatMessages={chatMessages}
      />}
      <ChatInput
        chatMessages={chatMessages}
        setChatMessages={setChatMessages}
      />

      <a className="position-switcher" onClick={moveTop} >Move textbox to top</a>
    </div>
  ) : (
    <div className="app-container">
      <ChatInput
        chatMessages={chatMessages}
        setChatMessages={setChatMessages}
      />

      <a className="position-switcher" onClick={moveBottom} >Move textbox to bottom</a>
      <ChatMessages
        chatMessages={chatMessages}
      />
    </div>
  );
};

export default App
