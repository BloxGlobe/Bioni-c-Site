import { Routes, Route } from 'react-router-dom'
import Landing from './components/landing/landing'
import Dashboard from './components/dashboard/dashboard'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/dashboard" element={<Dashboard />} />
    </Routes>
  )
}

export default App
