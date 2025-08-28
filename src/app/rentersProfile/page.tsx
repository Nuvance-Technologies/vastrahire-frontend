import { RenterProfile } from "../components/Renters-profile";


const renters = [
    {
        id: 1,
        name: "Sarah Chen",
        avatar: "/professional-woman-smiling-portrait.png",
        location: "New York, NY",
        items: [
            { name: "Chanel Bag", price: "$45/day", image: "/luxury-quilted-handbag.png" },
            { name: "Gucci Dress", price: "$35/day", image: "/elegant-dress.png" },
            { name: "Louboutin Heels", price: "$25/day", image: "/placeholder.svg" },
        ],
        rating: 4.9,
        reviews: 127,
    },
    {
        id: 2,
        name: "Emma Rodriguez",
        avatar: "/placeholder.svg",
        location: "Los Angeles, CA",
        items: [
            { name: "Hermès Scarf", price: "$15/day", image: "/elegant-dress.png" },
            { name: "Prada Sunglasses", price: "$20/day", image: "/placeholder.svg" },
            { name: "Tiffany Necklace", price: "$30/day", image: "/placeholder.svg" },
        ],
        rating: 4.8,
        reviews: 89,
    },
    {
        id: 3,
        name: "Jessica Park",
        avatar: "/placeholder.svg",
        location: "Chicago, IL",
        items: [
            { name: "Valentino Coat", price: "$55/day", image: "/fashion-accessories-jewelry-shoes-lifestyle.png" },
            { name: "Cartier Watch", price: "$40/day", image: "/placeholder.svg" },
            { name: "YSL Clutch", price: "$28/day", image: "/placeholder.svg" },
        ],
        rating: 5.0,
        reviews: 156,
    },
];

export default function rentersProfile() {
    return (

        <RenterProfile renter={renters[0]} />
    )
}