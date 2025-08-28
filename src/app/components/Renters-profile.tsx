import Image from "next/image"

interface Item {
  name: string
  price: string
  image: string
}

interface Renter {
  id: number
  name: string
  avatar: string
  location: string
  items: Item[]
  rating: number
  reviews: number
}

export function RenterProfile({ renter }: { renter: Renter }) {
  return (
    <section className="py-12 min-h-screen bg-gray-50" id="renter-profile"> 
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Profile Header */}
        <div className="flex flex-col md:flex-row items-center md:items-start gap-8 bg-white p-6 rounded-xl shadow-sm">
          <Image
            src={renter.avatar}
            alt={renter.name}
            width={120}
            height={120}
            className="w-28 h-28 rounded-full object-cover border shadow-sm"
          />

          {/* Info */}
          <div className="flex-1">
            <h2 className="text-2xl font-bold text-gray-900">{renter.name}</h2>
            <p className="text-gray-600">{renter.location}</p>

            {/* Rating */}
            <div className="flex items-center gap-2 mt-2">
              <span className="text-yellow-500">⭐ {renter.rating}</span>
              <span className="text-gray-500 text-sm">({renter.reviews} reviews)</span>
            </div>
          </div>
        </div>

        {/* Products Grid */}
        <div className="mt-10">
          <h3 className="text-xl font-semibold text-gray-800 mb-6">
            Items available for rent
          </h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {renter.items.map((item, idx) => (
              <div
                key={idx}
                className="bg-white rounded-lg shadow-sm hover:shadow-md transition p-4 flex flex-col"
              >
                <Image
                  src={item.image}
                  alt={item.name}
                  width={300}
                  height={300}
                  className="w-full h-52 object-cover rounded-lg mb-4"
                />
                <h4 className="text-gray-800 font-medium">{item.name}</h4>
                <p className="text-gray-600">{item.price}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
