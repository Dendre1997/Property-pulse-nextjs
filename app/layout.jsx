import '@/assets/styles/globals.css'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import AuthProvider from '@/components/AuthProvider'
import { ToastContainer, toastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import '@/assets/styles/globals.css'

export const metadata = {
    title: 'Property Polse',
    keywords: 'rental, property, real estate',
    description: 'Find perfect rental propperty'
}

const MainLayout = ({ children }) => {
    return (
        <AuthProvider>
        <html>
            <body>
                <Navbar/>
                <main>
                    {children}
                </main>
                    <Footer />
                    <ToastContainer/>
            </body>
            </html>
            </AuthProvider>
    );
};
export default MainLayout;
