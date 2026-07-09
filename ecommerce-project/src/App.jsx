import { Routes, Route } from 'react-router'
import { HomePage } from './pages/HomePage'

function App() {
  return (
    <Routes>
      <Route index element={<HomePage />} />
      <Route path='test' element={<p>Test aja ini mah</p>} />
    </Routes>
  )
}

export default App
