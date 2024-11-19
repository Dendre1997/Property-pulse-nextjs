// import Link from 'next/link'
import Hero from '../components/Hero'
import InfoBoxes from '../components/InfoBoxes'
import HomeProperties from '../components/HomeProperties'
import connecteDB from '@/config/database'

const HomaPage = () => {
    return ( 
        <>
            <Hero/>
            <InfoBoxes />
            <HomeProperties/>
            
        </>
     );
}
 
export default HomaPage;