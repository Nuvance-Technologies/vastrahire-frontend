import { AnnouncementBar } from "../../components/Announcement-bar"
import { Header } from "../../components/Header"
import { ProductDetail } from "../../components/product-detail"

// Mock product data - in real app this would come from database
const products = {
  "1": {
    id: 1,
    name: "Elegant Evening Gown",
    brand: "Versace",
    price: "$45",
    originalPrice: "$2,500",
    rating: 4.8,
    reviews: 124,
    images: [
      "/elegant-black-gown.png",
      "/placeholder.svg?height=600&width=400",
      "/placeholder.svg?height=600&width=400",
      "/placeholder.svg?height=600&width=400",
    ],
    description:
      "A stunning black evening gown perfect for formal events, galas, and special occasions. This elegant piece features a sophisticated silhouette that flatters every figure.",
    details: {
      material: "100% Silk with Satin finish",
      embroidery: "Hand-beaded crystal detailing along the neckline and waist",
      care: "Dry clean only",
      origin: "Made in Italy",
      season: "All seasons",
      occasion: "Formal events, galas, black-tie occasions",
    },
    sizes: ["XS", "S", "M", "L", "XL"],
    sizeChart: {
      XS: { bust: '32"', waist: '24"', hips: '34"' },
      S: { bust: '34"', waist: '26"', hips: '36"' },
      M: { bust: '36"', waist: '28"', hips: '38"' },
      L: { bust: '38"', waist: '30"', hips: '40"' },
      XL: { bust: '40"', waist: '32"', hips: '42"' },
    },
    availability: "Available",
    category: "women",
  },
  "2": {
    id: 2,
    name: "Designer Cocktail Dress",
    brand: "Gucci",
    price: "$35/day",
    originalPrice: "$1,800",
    rating: 4.9,
    reviews: 89,
    images: [
      "/designer-cocktail-dress-red.png",
      "/placeholder.svg?height=600&width=400",
      "/placeholder.svg?height=600&width=400",
    ],
    description:
      "A vibrant red cocktail dress that makes a statement at any party or social gathering. Features modern cut and luxurious fabric.",
    details: {
      material: "Premium Crepe with stretch",
      embroidery: "Subtle gold thread accents",
      care: "Dry clean recommended",
      origin: "Made in Italy",
      season: "Spring/Summer",
      occasion: "Cocktail parties, dinner dates, social events",
    },
    sizes: ["XS", "S", "M", "L"],
    sizeChart: {
      XS: { bust: '32"', waist: '24"', hips: '34"' },
      S: { bust: '34"', waist: '26"', hips: '36"' },
      M: { bust: '36"', waist: '28"', hips: '38"' },
      L: { bust: '38"', waist: '30"', hips: '40"' },
    },
    availability: "Available",
    category: "women",
  },
}

export default function ProductPage({ params }: { params: { id: string } }) {
  const product = products[params.id as keyof typeof products]

  if (!product) {
    return (
      <div className="min-h-screen bg-background">
        <AnnouncementBar />
        <Header />
        <div className="max-w-7xl mx-auto px-4 py-16 text-center">
          <h1 className="text-2xl font-bold text-foreground mb-4">Product Not Found</h1>
          <p className="text-muted-foreground">The product you're looking for doesn't exist.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <AnnouncementBar />
      <Header />
      <ProductDetail product={product} />
    </div>
  )
}
