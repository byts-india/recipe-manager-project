import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'
import AppRoutes from './routes/AppRoutes'
import { Provider } from 'react-redux'
import store from './store/store'


function App() {
  const [count, setCount] = useState(0)

  return (
    <Provider store={store}>
      <AppRoutes/>
    </Provider>
  )
}

export default App
