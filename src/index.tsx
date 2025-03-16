import { createRoot } from 'react-dom/client'
import  TreeTable  from "./App"

const container = document.getElementById('root')!
const root = createRoot(container)

root.render(<TreeTable />)
