import { useState, useEffect } from 'react'

interface ChatMessage {
  isBot: boolean
  text: string
}

interface CustomizationOptions {
  buttonIcon: string
  borderColor: string
  borderRadius: string
  headerBgColor: string
  botBubbleColor: string
  botTextColor: string
  userBubbleColor: string
  userTextColor: string
  fontFamily: string
}

export default function App() {
  const [options, setOptions] = useState<CustomizationOptions>({
    buttonIcon: '➤',
    borderColor: '#e2e8f0',
    borderRadius: '8px',
    headerBgColor: '#1a1a1a',
    botBubbleColor: '#f0f0f0',
    botTextColor: '#000000',
    userBubbleColor: '#0084ff',
    userTextColor: '#ffffff',
    fontFamily: 'Arial'
  })

  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      isBot: true,
      text: "Hello! I'm a chatbot. How can I help you today?",
    },
    {
      isBot: false,
      text: "Hi! I'd like to learn more about your services.",
    },
    {
      isBot: true,
      text: "I'd be happy to tell you about our services. What specific area are you interested in?",
    },
  ]);


  const [input, setInput] = useState('')

  useEffect(() => {
    const savedOptions = localStorage.getItem('chatCustomizationOptions')
    const savedMessages = localStorage.getItem("messages");
    if (savedOptions) {
      setOptions(JSON.parse(savedOptions))
    }
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
    
  }, [])

  const updateOption = (key: keyof CustomizationOptions, value: string) => {
    setOptions(prev => {
      const newOptions = { ...prev, [key]: value }
      localStorage.setItem('chatCustomizationOptions', JSON.stringify(newOptions))
      return newOptions
    })
  }

  const handleColorChange = (key: keyof CustomizationOptions, value: string) => {
    updateOption(key, value)
  }

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



  return (
    <div className="min-h-screen w-screen bg-[#3296D7] py-4 px-8">
      <div className="flex justify-between items-center md:flex-row flex-col">
        {/* Customization Panel */}
        <div className="bg-gray-400/50 p-4 rounded-lg shadow md:max-h-[80%] w-full md:w-auto">
          <h2 className="text-xl font-bold mb-4">Customize Chat Interface</h2>
          <div className="space-y-4">
            <div>
              <label htmlFor="buttonIcon" className="block text-sm font-medium mb-1">Button Icon</label>
              <div className="flex flex-wrap gap-2">
                {['➤', '▶', '►', '➔', '➜', '⮞', '⇨', '⇾', '→'].map((icon) => (
                  <button
                    key={icon}
                    onClick={() => updateOption('buttonIcon', icon)}
                    className={`w-8 h-8 flex items-center justify-center rounded !border-none p-0 !outline-none  ${
                      options.buttonIcon === icon ? 'bg-[#3296D7] !text-white' : 'bg-white text-black'
                    }`}
                  >
                    {icon}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label htmlFor="borderColor" className="block text-sm font-medium mb-1">Border Color</label>
              <div className="flex items-center space-x-2">
                <input
                  id="borderColor"
                  type="color"
                  value={options.borderColor}
                  onChange={(e) => updateOption('borderColor', e.target.value)}
                  className="w-8 h-8 !border-none !outline-none rou overflow-hidden !p-0 bg-transparent"
                />
                <input
                  type="text"
                  value={options.borderColor}
                  onChange={(e) => handleColorChange('borderColor', e.target.value)}
                  className="flex-1 p-2 border-none outline-none text-black font-semibold bg-white rounded "
                  placeholder="e.g. #ff0000 or red"
                />
              </div>
            </div>
            <div>
              <label htmlFor="borderRadius" className="block text-sm font-medium mb-1">Border Radius</label>
              <div className="flex items-center space-x-2">
                <input
                  id="borderRadius"
                  type="range"
                  min="0"
                  max="20"
                  value={parseInt(options.borderRadius)}
                  onChange={(e) => updateOption('borderRadius', `${e.target.value}px`)}
                  className="w-full"
                />
                <input
                  type="text"
                  value={options.borderRadius}
                  onChange={(e) => updateOption('borderRadius', e.target.value)}
                  className="w-20 p-2 border-none outline-none text-black font-semibold bg-white rounded"
                  placeholder="e.g. 8px"
                />
              </div>
            </div>
            <div>
              <label htmlFor="headerBgColor" className="block text-sm font-medium mb-1">Header Background Color</label>
              <div className="flex items-center space-x-2">
                <input
                  id="headerBgColor"
                  type="color"
                  value={options.headerBgColor}
                  onChange={(e) => updateOption('headerBgColor', e.target.value)}
                  className="w-8 h-8 border rounded"
                />
                <input
                  type="text"
                  value={options.headerBgColor}
                  onChange={(e) => handleColorChange('headerBgColor', e.target.value)}
                  className="flex-1 p-2 border-none outline-none text-black font-semibold bg-white rounded"
                  placeholder="e.g. #1a1a1a or black"
                />
              </div>
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-medium">Bot Colors</label>
              <div className="flex space-x-2">
                <div className="flex-1">
                  <label htmlFor="botBubbleColor" className="block text-xs mb-1">Bubble</label>
                  <div className="flex items-center space-x-2">
                    <input
                      id="botBubbleColor"
                      type="color"
                      value={options.botBubbleColor}
                      onChange={(e) => updateOption('botBubbleColor', e.target.value)}
                      className="w-8 h-8 border rounded"
                    />
                    <input
                      type="text"
                      value={options.botBubbleColor}
                      onChange={(e) => handleColorChange('botBubbleColor', e.target.value)}
                      className="flex-1 p-2 border-none outline-none text-black font-semibold bg-white rounded text-sm"
                      placeholder="#f0f0f0"
                    />
                  </div>
                </div>
                <div className="flex-1">
                  <label htmlFor="botTextColor" className="block text-xs mb-1">Text</label>
                  <div className="flex items-center space-x-2">
                    <input
                      id="botTextColor"
                      type="color"
                      value={options.botTextColor}
                      onChange={(e) => updateOption('botTextColor', e.target.value)}
                      className="w-8 h-8 border rounded"
                    />
                    <input
                      type="text"
                      value={options.botTextColor}
                      onChange={(e) => handleColorChange('botTextColor', e.target.value)}
                      className="flex-1 p-2 border-none outline-none text-black font-semibold bg-white rounded text-sm"
                      placeholder="#000000"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-medium">User Colors</label>
              <div className="flex space-x-2">
                <div className="flex-1">
                  <label htmlFor="userBubbleColor" className="block text-xs mb-1">Bubble</label>
                  <div className="flex items-center space-x-2">
                    <input
                      id="userBubbleColor"
                      type="color"
                      value={options.userBubbleColor}
                      onChange={(e) => updateOption('userBubbleColor', e.target.value)}
                      className="w-8 h-8 border rounded"
                    />
                    <input
                      type="text"
                      value={options.userBubbleColor}
                      onChange={(e) => handleColorChange('userBubbleColor', e.target.value)}
                      className="flex-1 p-2 border-none outline-none text-black font-semibold bg-white rounded text-sm"
                      placeholder="#0084ff"
                    />
                  </div>
                </div>
                <div className="flex-1">
                  <label htmlFor="userTextColor" className="block text-xs mb-1">Text</label>
                  <div className="flex items-center space-x-2">
                    <input
                      id="userTextColor"
                      type="color"
                      value={options.userTextColor}
                      onChange={(e) => updateOption('userTextColor', e.target.value)}
                      className="w-8 h-8 border rounded"
                    />
                    <input
                      type="text"
                      value={options.userTextColor}
                      onChange={(e) => handleColorChange('userTextColor', e.target.value)}
                      className="flex-1 p-2 border-none outline-none text-black font-semibold bg-white rounded text-sm"
                      placeholder="#ffffff"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div>
              <label htmlFor="fontFamily" className="block text-sm font-medium mb-1">Font Family</label>
              <select
                id="fontFamily"
                value={options.fontFamily}
                onChange={(e) => updateOption('fontFamily', e.target.value)}
                className="w-full p-2 border-none outline-none text-black font-semibold bg-white rounded"
              >
                <option value="Arial">Arial</option>
                <option value="Helvetica">Helvetica</option>
                <option value="Times New Roman">Times New Roman</option>
                <option value="Courier New">Courier New</option>
                <option value="Georgia">Georgia</option>
              </select>
            </div>
          </div>
        </div>

        {/* Chat Preview */}
        <div 
          className="bg-white rounded-lg shadow overflow-hidden w-[30%]"
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
            className="px-4 py-0 flex justify-between items-center h-[5%]"
            style={{ backgroundColor: options.headerBgColor }}
          >
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-white rounded-full p-0">
                <img src="/chat-bot.png" alt="chat-bot" className='w-full h-full bg-transparent ' />
              </div>
             <div className='flex flex-col justify-center items-center'>
              <p className={`text-sm font-semibold`}>Jinn Live</p>
              <span className='text-sm text-gray-400'>Demo Bot</span>
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
                  className={`px-4 py-2 rounded-xl ${message.isBot ? "rounded-tl-none":"rounded-br-none"}`} 
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
          <div className="p-4 border-t py-0 shadow-md" style={{ borderColor: options.borderColor }}>
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
      </div>
    </div>
  )
}

