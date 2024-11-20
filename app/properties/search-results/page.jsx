import Link from "next/link";
import connecteDB from "@/config/database";
import Property from "@/models/Property";
import { converToSerealizableObject } from "@/utils/convertToObject";
import PropertySearchForm from "@/components/PropertySearchForm";
import PropertyCard from "@/components/PropertyCard";
import { FaArrowAltCircleLeft } from "react-icons/fa";

const SearchResultsPage = async ({ searchParams }) => {
    await connecteDB();
    const { location, propertyType } = searchParams;
    const locationPatern = new RegExp(location, 'i');

    let query = {
        $or: [
            {name: locationPatern},
            {description: locationPatern},
            {'location.street': locationPatern},
            {'location.city': locationPatern},
            {'location.state': locationPatern},
            {'location.zipcode': locationPatern},
        ]
    }

    if (propertyType && propertyType !== 'All') {
        const typePatern = new RegExp(propertyType, 'i')
        query.type = typePatern
    }

    const propertiesQueryResults = await Property.find(query).lean();
    const properties = converToSerealizableObject(propertiesQueryResults)

    return ( 
        <>
            <section className="bg-blue-700 py-4">
                <div className="max-w-7xl mx-auto px-4 flex" />
                <flex-col className="item-start sm:px-6 lg:px-8">
                    <PropertySearchForm/>
                </flex-col>
            </section>
            <section className="px-4 py-6">
                <div className="container-xl lg:container m-auto px-4 py-6">
                    <Link href='/properties' className="flex item-center text-blue-500 hover:underline mb-3">
                    <FaArrowAltCircleLeft className="mr-2 mb-1"/>
                    Back To Properties
                    </Link>
                    <h1 className="text-2xl mb-4">Search Results</h1>
                    {properties.length === 0 ? (<p>No search results</p>) : (
                    
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {properties.map((property) => (
                                <PropertyCard key={property._id} property={property} />
                            ))}
                            </div>
                            
                    )}
                </div>
            </section>
        </>
     );
}
 
export default SearchResultsPage;