import logo from './logo.svg';
import './App.css';

async function App() {

  async function apiGet(url) {
    let response = await fetch(url, {
      method: "GET"
    })
    if (response.ok) {
      return await response.json();
    }
  }

  let response = await apiGet("/api/artists");
  console.log(response);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
