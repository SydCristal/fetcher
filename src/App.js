import logo from './logo.svg'
import './App.css'
import { useState } from 'react'

function App() {
  const [token, setToken] = useState(localStorage.getItem('auth-token') || '')
  const [text, setText] = useState('')
  const [inputData, setInputData] = useState('') // новое состояние для данных POST

  const dispatchPost = () => {
    const t = JSON.parse(token)
    const params = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        'Authorization': Bearer ${t.access_token}
      },
      body: JSON.stringify({
//        // Здесь вы добавляете данные, которые хотите отправить
//        text: inputData, // Используем введенные данные в inputData
//        additionalField: 'someValue' // Дополнительное поле (при необходимости)
      })
    }

    // Обратите внимание, что метод GET не будет работать с телом запроса,
    // поэтому нужно использовать соответствующий URL
    const url = 'https://mcat-dev.yc.mvideo.ru/product-service/api/products';

    fetch(url, params)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok ' + response.statusText);
        }
        return response.json();
      })
      .then(data => console.log(data))
      .catch(error => console.error('Ошибка при выполнении запроса:', error))
  }

  const setAuthToken = token => {
    localStorage.setItem('auth-token', token)
    setToken(token)
  }

  return (
    <div className="App">
      {token ? (
        <div>
          <button onClick={() => setAuthToken('')}>Clear token</button>
          <textarea
            value={inputData}
            onChange={({ target: { value } }) => setInputData(value)}
            placeholder="Enter data to send..."
          />
          <button onClick={dispatchPost}>Dispatch Post</button>
        </div>
      ) : (
        <div>
          <textarea value={text} onChange={({ target: { value } }) => setText(value)} />
          <button onClick={() => setAuthToken(text)} disabled={!text}>Set token</button>
        </div>
      )}
    </div>
  );
}

export default App;