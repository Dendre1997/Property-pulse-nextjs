import '@/assets/styles/globals.css'

export const metadata = {
    title: 'Property Polse',
    keywords: 'rental, property, real estate',
    description: 'Find perfect rental propperty'
}

const MainLayout = ({ children }) => {
    return (
        <html>
            <body>
                <main>
                    {children}
                </main>
            </body>
        </html>
    );
};
export default MainLayout;
