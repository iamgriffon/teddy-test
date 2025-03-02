import { createRoot } from 'react-dom/client'
import 'tailwindcss/tailwind.css'
import '@fontsource/inter/400.css'
import '@fontsource/inter/700.css'
import Router from './routes'
const container = document.getElementById('root') as HTMLDivElement
const root = createRoot(container)

root.render(<Router />)
