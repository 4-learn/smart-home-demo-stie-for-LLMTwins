import React, { useState } from 'react';
import axios from 'axios';
import './App.css';
import { ClipLoader } from 'react-spinners'; 

function App() {
  const [textInput, setTextInput] = useState('');
  const [apiKeyInput, setApiKeyInput] = useState('');
  const [aiMessage, setAiMessage] = useState('這是一間位於國立師範大學 PecuLab 內的智慧住宅，居住著男主人、女主人、小女兒檸檸與他們的寵物貓咪。這個房子的家電設備是由大語言模型（Large Language Model, LLM）和數位孿生（Digital Twin）技術所打造。我是虛擬管家阿福，您可以隨時與我聊聊，或透過上方的選單進行提問。LLM 的特色在於您可以用自然、口語化的方式發出命令，無需複雜的指令。我會根據您的需求為您提供最舒適的居家環境，讓您的生活更加便捷和智能。');
  const [loading, setLoading] = useState(false); 
  const [selectedDropdownValue, setSelectedDropdownValue] = useState('0'); 
  const [imageSrc, setImageSrc] = useState('/media/images/family/resize/family.png'); 

  const basePath = "/media/images";
  const list_scenario_pics = [
    `${basePath}/family/resize/family.png`,
    `${basePath}/living-room/resize/6.png`,
    `${basePath}/living-room/resize/5.png`,
    `${basePath}/living-room/resize/4.png`,
    `${basePath}/living-room/resize/6.png`,
    `${basePath}/living-room/resize/8.png`,
    `${basePath}/living-room/resize/4.png`,
    `${basePath}/living-room/resize/4.png`,
    `${basePath}/living-room/resize/8.png`
  ];

  const handleSubmit = () => {
    console.log(`API 金鑰: ${apiKeyInput}\n我想對管家阿福說: ${textInput}`);
    setLoading(true);

    const options = {
      method: 'POST',
      url: 'https://beta-llmtwins.4impact.cc/prompt',
      headers: {
        'Content-Type': 'application/json'
      },
      data: {
        role: "Alfred",
        type: "RAG",
        tools: [
          {
            tool: "agent",
            load_tools: "custom"
          }
        ],
        message: `${textInput}`
      }
    };

    axios.request(options).then((response) => {
      console.log(response);
      setAiMessage(response.data.message);
      setLoading(false); // 停止加載
      if (selectedDropdownValue !== '0') {
        setImageSrc(list_scenario_pics[selectedDropdownValue]); // 根據選擇的值更新圖片
      }
    }).catch((error) => {
      console.error('There was an error making the request:', error);
      setLoading(false); // 停止加載
    });
  };

  const handleDropdownChange = (e) => {
    const selectedText = e.target.options[e.target.selectedIndex].text;
    setTextInput(selectedText); // 更新 textInput 的值
    setSelectedDropdownValue(e.target.value); // 更新選擇的 dropdown 值
  };

  return (
    <div className="App">
      <div className="container">
        <div className="left">
          <img src={imageSrc} alt="Sample" />
          <div className="input-container">
            <input
              type="text"
              placeholder="我想對管家阿福說 ..."
              className="textInput"
              value={textInput}
              onChange={(e) => setTextInput(e.target.value)}
            />
            <button className="submitButton" onClick={handleSubmit}>
              提交
            </button>
          </div>
        </div>
        <div className="right">
          <div className="input-container">
            <input
              type="password"
              placeholder="API 金鑰"
              className="apiKeyInput"
              value={apiKeyInput}
              onChange={(e) => setApiKeyInput(e.target.value)}
            />
          </div>
          <div className="input-container">
            <select className="dropdown" onChange={handleDropdownChange}>
              <option value="0">您也可以選擇一些情境來修改 ...</option>
              <option value="1">我要和夫人去參加學校活動，幫我照顧檸檸和貓咪。</option>
              <option value="2">檸檸要去上學了，幫我確定她是否已經離開。</option>
              <option value="3">我要和夫人在二樓臥室休息，幫我管理一樓的狀態。</option>
              <option value="4">晚餐時間到了，幫我準備廚房的環境。</option>
              <option value="5">今天很熱，幫我調整家裡的溫度。</option>
              <option value="6">我要和檸檸一起看電影，幫我設置客廳的環境。</option>
              <option value="7">我要去樓上書房工作，幫我管理一樓的狀態。</option>
              <option value="8">我們全家要出門，幫我確保家裡的安全。</option>
            </select>
          </div>
          <div className="image-columns">
            <div className="column">
              <img src="/media/images/alfred/alfred.png" alt="Alfred Left" />
            </div>
            <div className="column">
              <img src="/media/images/alfred/line.png" alt="LINE QR-Code" />
            </div>
          </div>
          <div className="full-width-image">
            <img src="/media/images/alfred/line_msg.jpg" alt="Message" />
          </div>
          <div className="aiMessage">
            {loading ? <ClipLoader /> : aiMessage} {/* 顯示加載動畫或消息 */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;