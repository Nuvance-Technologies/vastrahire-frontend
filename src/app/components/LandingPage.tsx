"use client";

import { AnnouncementBar } from "./Announcement-bar";
import { Header } from "./Header";
import { HeroCarousel } from "./Hero-corousel";
import { HowItWorks } from "./How-it-works";
import { BecomeLender } from "./Become-lender";
import { ShopsGrid } from "./Shops-grid";
import MovingAnnouncement from "./Moving-announcement";
import NewArrivals from "./New-arrival";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <AnnouncementBar />
      <Header />
      <MovingAnnouncement />
      <main>
        <HeroCarousel />
        <HowItWorks />
        <NewArrivals />
        <BecomeLender />
        <ShopsGrid />
      </main>
    </div>
  );
}
