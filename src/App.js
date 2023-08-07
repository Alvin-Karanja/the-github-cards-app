// import logo from './logo.svg';
import React from 'react';
import ReactDOM from 'react-dom';
import './App.css';

class Card extends React.Component {
    render() {
        return (
            <div className="github-profile">
                <img src="https://placehold.it/75" />
                <div className="info">
                    <div className="name">Name here</div>
                    <div className="company">Company here..</div>
                </div>
            </div>
        );
    }
}

class App extends React.Component {
    render() {
        return (
            <div>
                <div className="header">The Github Cards App</div>
                <Card />
            </div>
        );
    }
}

const mountnode = document.getElementById('root');
ReactDOM.render(<App />, mountnode);

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

export default App;
