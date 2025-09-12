import Image from "next/image";
import Link from "next/link";
import { Crown, Gem } from "lucide-react";

type Tier = "Golden" | "Platinum" | "Diamond";

// Mock renters with tiers
const renters = [
  {
    id: 1,
    name: "Sarah Chen",
    avatar: "/professional-woman-smiling-portrait.png",
    location: "New York, NY",
    items: [
      { name: "Chanel Bag", price: "₹45", image: "/luxury-quilted-handbag.png" },
      { name: "Gucci Dress", price: "₹35", image: "/elegant-dress.png" },
      { name: "Louboutin Heels", price: "₹25", image: "/placeholder.svg" },
    ],
    rating: 4.9,
    reviews: 127,
    tier: "Diamond" as Tier,
  },
  {
    id: 2,
    name: "Emma Rodriguez",
    avatar: "/placeholder.svg",
    location: "Los Angeles, CA",
    items: [
      { name: "Hermès Scarf", price: "₹15/day", image: "/elegant-dress.png" },
      { name: "Prada Sunglasses", price: "₹20/day", image: "/placeholder.svg" },
      { name: "Tiffany Necklace", price: "₹30/day", image: "/placeholder.svg" },
    ],
    rating: 4.8,
    reviews: 89,
    tier: "Platinum" as Tier,
  },
  {
    id: 3,
    name: "Jessica Park",
    avatar: "/placeholder.svg",
    location: "Chicago, IL",
    items: [
      {
        name: "Valentino Coat",
        price: "₹55/day",
        image: "/fashion-accessories-jewelry-shoes-lifestyle.png",
      },
      { name: "Cartier Watch", price: "₹40/day", image: "/placeholder.svg" },
      { name: "YSL Clutch", price: "₹28/day", image: "/placeholder.svg" },
    ],
    rating: 5.0,
    reviews: 156,
    tier: "Golden" as Tier,
  },
];

const TIER_STYLES: Record<Tier, { label: string; gradient: string; color: string; icon: React.ReactElement }> = {
    Golden: {
    label: "Golden Lender",
    gradient: "from-yellow-300 to-yellow-500",
    color: "text-yellow-800",
    icon: <Crown className="w-3 h-3 text-yellow-800" />,
  },
  Platinum: {
    label: "Platinum Lender",
    gradient: "from-gray-200 to-gray-400",
    color: "text-gray-700",
    icon: <Crown className="w-3 h-3 text-gray-600" />,
  },
  Diamond: {
    label: "Diamond Lender",
    gradient: "from-sky-200 to-sky-400",
    color: "text-sky-700",
    icon: <Gem className="w-3 h-3 text-sky-600" />,
  },
};

export function IndividualRenters() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Lend from Individual's Closet
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Discover amazing items from our community of trusted fashion enthusiasts
          </p>
        </div>

        {/* Renters Grid */}
        <div className="grid lg:grid-cols-3 gap-8">
          {renters.map((renter) => {
            const tierStyle = TIER_STYLES[renter.tier];
            return (
              <div
                key={renter.id}
                className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow p-6 flex flex-col items-center relative"
              >
                {/* Badge */}
                <div
                  className={`absolute top-4 right-4 px-2 py-1 text-xs font-semibold rounded-full flex items-center gap-1 bg-gradient-to-r ${tierStyle.gradient} ${tierStyle.color} shadow`}
                >
                  {tierStyle.icon}
                  {tierStyle.label}
                </div>

                <Image
                  src={renter.items[0]?.image || "/placeholder.svg"}
                  alt={renter.items[0]?.name || "Featured item"}
                  className="w-full h-72 object-cover rounded-lg mb-4"
                  width={384}
                  height={384}
                />

                <p className="text-gray-700 font-bold py-3">By: {renter.name}</p>

                {/* View Profile Button */}
                <Link href="/lendersProfile">
                  <button className="mt-auto w-full py-2 px-4 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 text-sm font-medium transition">
                    View Profile
                  </button>
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
