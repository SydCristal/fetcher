import logo from './logo.svg'
import './App.css'
import { useState } from 'react'

function App() {
  const [token, setToken] = useState(localStorage.getItem('auth-token') || '')
  const [text, setText] = useState('')
  const dispatchPost = () => {
    const t = JSON.parse(token)
    const params = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        'Authorization': `Bearer ${t.access_token}`
      }
    }

    const url = 'https://mcat-dev.yc.mvideo.ru/product-service/api/products?page=0&size=50&sort=mainCatalogGroupName,ASC&sort=brandName,ASC'

    fetch(url, params)
						.then(response => response.json())
						.then(data => console.log(data))
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
