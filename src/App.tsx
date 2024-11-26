import { useState, useEffect } from 'react'
import {  CustomizationOptions } from './lib/types';
import CustomiZationPanel from './components/CustomiZationPanel';
import ChatPreview from './components/ChatPreview';



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



  useEffect(() => {
    const savedOptions = localStorage.getItem('chatCustomizationOptions')
    if (savedOptions) {
      setOptions(JSON.parse(savedOptions))
    }
  }, [])



 

  return (
    <div className="min-h-screen w-screen bg-[#3296D7] py-4 px-4 sm:px-8">
      <div className="flex flex-col-reverse lg:flex-row justify-between items-start gap-8 w-full h-full">
        {/* Customization Panel */}
        <CustomiZationPanel setOptions={setOptions} options={options}/>

        {/* Chat Preview */}
        <ChatPreview options={options}/>
      </div>
    </div>
  )
}

