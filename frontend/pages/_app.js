import '../styles/globals.css'
import { CartProvider } from '../context/CartContext'
import TopNav from '../components/TopNav'
import SiteFooter from '../components/SiteFooter'
import AISearchAssistant from '../components/AISearchAssistant'
import AIChatAssistant from '../components/AIChatAssistant'

function MyApp({ Component, pageProps }) {
  return (
    <CartProvider>
      <TopNav />
      <Component {...pageProps} />
      <SiteFooter />
      <AISearchAssistant />
      <AIChatAssistant />
    </CartProvider>
  )
}

export default MyApp
