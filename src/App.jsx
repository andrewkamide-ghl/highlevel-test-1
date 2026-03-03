import './App.css'
import Header from './components/Header'
import Sidebar from './components/Sidebar'
import MainContent from './components/MainContent'

function App() {
  return (
    <div className="app-wrapper">
      <Header />
      <div className="content-layout">
        <Sidebar />
        <MainContent />
      </div>
    </div>
  )
}

export default App
