import { CustomizationOptions } from "../lib/types"

type Props = {
    setOptions:any,
    options:CustomizationOptions
}

const CustomiZationPanel = ({setOptions , options}:Props) => {

    const updateOption = (key: keyof CustomizationOptions, value: string) => {
        setOptions((prev: any) => {
          const newOptions = { ...prev, [key]: value }
          localStorage.setItem('chatCustomizationOptions', JSON.stringify(newOptions))
          return newOptions
        })
      }
    
      const handleColorChange = (key: keyof CustomizationOptions, value: string) => {
        updateOption(key, value)
      }

  return (
    <div className="bg-gray-400/50 p-4 rounded-lg shadow w-full lg:w-1/2 xl:w-2/5">
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
        <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
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
        <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
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
  )
}

export default CustomiZationPanel
