import { useEffect, useState } from "react";
import { ChatMessage, CustomizationOptions } from "../lib/types";

const ChatPreview = ({options}:{options:CustomizationOptions}) => {
    const [messages, setMessages] = useState<ChatMessage[]>([
        {
          isBot: false,
          text: "Hello jinn",
        },
        {
          isBot: true,
          text: "Hi! Harsh , How can I help you today?",
        },
      ]);

      const handleMessage = (msg: string) => {
        if (msg.trim() === "") return;
    
        const newMessages = [
          ...messages,
          { isBot: false, text: msg },
          { isBot: true, text: "I'm sorry, I couldn't reply now." },
        ];
    
        setMessages(newMessages);
        localStorage.setItem("messages", JSON.stringify(newMessages));
        setInput(""); 
      };  
    
      const [input, setInput] = useState('')


      useEffect(()=>{
        const savedMessages = localStorage.getItem("messages");
        if (savedMessages) {
          try {
            const parsedMessages = JSON.parse(savedMessages);
            if (Array.isArray(parsedMessages)) {
              setMessages(parsedMessages);
            } else {
              console.error("Invalid messages format in localStorage. Resetting to default.");
              localStorage.removeItem("messages"); 
            }
          } catch (error) {
            console.error("Error parsing messages from localStorage:", error);
          }
        }
      },[])
  return (
    <div 
          className="bg-white rounded-lg shadow overflow-hidden lg:w-[30%] w-auto mx-auto md:mx-0"
          style={{
            borderColor: options.borderColor,
            borderWidth: '1px',
            borderStyle: 'solid',
            borderRadius: options.borderRadius,
            fontFamily: options.fontFamily
          }}
        >
          {/* Chat Header */}
          <div
            className="px-4 py-2 flex justify-between items-center"
            style={{ backgroundColor: options.headerBgColor }}
          >
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-white rounded-full p-0">
                <img src="/chat-bot.png" alt="chat-bot" className='w-full h-full bg-transparent ' />
              </div>
             <div className='flex flex-col justify-center'>
              <p className={`text-sm font-semibold text-white`}>Jinn Live</p>
              <span className='text-xs text-gray-400'>Demo Bot</span>
             </div>
            </div>
            <button className="text-white !bg-transparent !outline-none !border-none text-2xl font-bold">&times;</button>
          </div>

          {/* Chat Messages */}
          <div className="h-[400px] overflow-y-auto p-4 space-y-4">
            {Array.isArray(messages) && messages?.map((message, index) => (
              <div
                key={index}
                className={`flex ${message.isBot ? 'justify-start' : 'justify-end'}`}
              >
                <div className='max-w-[80%] flex items-start gap-2'>
                 {message.isBot && <div className="w-8 h-8 bg-white rounded-full p-0 flex-shrink-0">
                    <img src="/chat-bot.png" alt="chat-bot" className='w-full h-full bg-transparent ' />
                  </div>}
                  <div
                  className={`px-4 py-2 !rounded-xl ${message.isBot ? "!rounded-tl-none" : "!rounded-br-none"}`} 
                  style={{
                    backgroundColor: message.isBot ? options.botBubbleColor : options.userBubbleColor,
                    color: message.isBot ? options.botTextColor : options.userTextColor,
                    borderRadius: options.borderRadius
                  }}
                  >
                   {message.text}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Chat Input */}
          <div className="p-4 border-t shadow-md" style={{ borderColor: options.borderColor }}>
            <div className="flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type a message..."
                className="flex-1 p-2 !border-none !outline-none text-black font-medium bg-white rounded"
                style={{ borderColor: options.borderColor, borderRadius: options.borderRadius }}
              />
              <button
                className="px-4 py-2 text-gray-500 !border-none !outline-none font-bold text-2xl rounded bg-white"
                onClick={()=>handleMessage(input)}
              >
                {options.buttonIcon}
              </button>
            </div>
          </div>
        </div>
  )
}

export default ChatPreview
