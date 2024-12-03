
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import './styles/global.scss'; // Import global styles

import { AuthProvider } from './context/AuthContext.jsx';
createRoot(document.getElementById('root')).render(
 <AuthProvider>
    <App />
    </AuthProvider>
)
