// import Link from 'next/link'
import Hero from '../components/Hero'
import InfoBoxes from '../components/InfoBoxes'
import HomeProperties from '../components/HomeProperties'
import connecteDB from '@/config/database'
import FeaturedProperties from '@/components/FeaturedProperties'

const HomaPage = () => {
    return ( 
        <>
            <Hero/>
            <InfoBoxes />
            <FeaturedProperties/>
            <HomeProperties/>
            
        </>
     );
}
 
export default HomaPage;