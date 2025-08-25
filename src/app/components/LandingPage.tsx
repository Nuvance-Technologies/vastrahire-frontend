import { AnnouncementBar } from "./Announcement-bar"
import { Header } from "./Header"
import { HeroCarousel } from "./Hero-corousel"
import { HowItWorks } from "./How-it-works"
import { BecomeLender } from "./Become-lender"
import { ShopsGrid } from "./Shops-grid"
import { IndividualRenters } from "./Individual-renters"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <AnnouncementBar />
      <Header />
      <main>
        <HeroCarousel />
        <HowItWorks />
        <BecomeLender />
        <ShopsGrid />
        <IndividualRenters />
      </main>
    </div>
  )
}
