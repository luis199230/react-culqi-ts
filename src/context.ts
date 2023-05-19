import { createContext } from 'react'
import { CulqiContextType } from './typedefs'

const CulqiContext = createContext<CulqiContextType>({
  openCulqi: () => {},
  setAmount: (amount) => {},
  amount: 0,
  token: null,
  error: null
})

export const { Consumer: Culqi } = CulqiContext
export default CulqiContext
