import Image from "next/image"

const renterSteps = [
  {
    id: 1,
    title: "Browse & Select",
    desc: "Pick your perfect style from our collection of designer outfits and accessories.",
    img: "/images/how-it-works/renter-browse.png",
  },
  {
    id: 2,
    title: "Book Your Outfit",
    desc: "Book your look for 3, 5, or 7 days. It will be altered and dry-cleaned before delivery.",
    img: "/images/how-it-works/renter-book.png",
  },
  {
    id: 3,
    title: "Flaunt It",
    desc: "Wear your outfit and enjoy the compliments at your occasion.",
    img: "/images/how-it-works/renter-flaunt.png",
  },
  {
    id: 4,
    title: "Return It",
    desc: "Pack the outfit and we'll pick it up after your event or on the chosen date.",
    img: "/images/how-it-works/renter-return.png",
  },
]

const lenderSteps = [
  {
    id: 1,
    title: "List Your Item",
    desc: "Upload photos and details of the items you want to rent out.",
    img: "/images/how-it-works/lender-list.png",
  },
  {
    id: 2,
    title: "Approve Bookings",
    desc: "Review and approve requests from renters quickly and easily.",
    img: "/images/how-it-works/lender-approve.png",
  },
  {
    id: 3,
    title: "Send Your Item",
    desc: "We handle pickup and delivery so your item reaches the renter safely.",
    img: "/images/how-it-works/lender-send.png",
  },
  {
    id: 4,
    title: "Earn Money",
    desc: "Get paid securely when your item is rented out.",
    img: "/images/how-it-works/lender-earn.png",
  },
]

function StepFlow({ steps }: { steps: typeof renterSteps }) {
  return (
    <div className="relative">
      <div className="absolute top-20 left-0 right-0 h-0.5 bg-gray-300 hidden md:block"></div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative">
        {steps.map((step) => (
          <div key={step.id} className="flex flex-col items-center text-center relative">
            <Image
              src={step.img || "/placeholder.svg"}
              alt={step.title}
              width={80}
              height={80}
              className="mb-4 rounded-lg"
            />

            <h4 className="font-semibold text-gray-900 mb-2">{step.title}</h4>
            <p className="text-gray-600 text-sm">{step.desc}</p>

            <div className="relative top-5 bg-[#3b000c] text-white font-bold w-8 h-8 rounded-full flex items-center justify-center">
              {step.id}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export function HowItWorks() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">How It Works</h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Join our community of fashion lovers. Rent what you need, lend what you don't.
          </p>
        </div>

        <div className="mb-16">
          <h3 className="text-2xl font-semibold text-gray-900 mb-8 text-center">For Renters</h3>
          <StepFlow steps={renterSteps} />
        </div>

        <div>
          <h3 className="text-2xl font-semibold text-gray-900 mb-8 text-center">For Lenders</h3>
          <StepFlow steps={lenderSteps} />
        </div>
      </div>
    </section>
  )
}
