import OnboardingWizard from "../components/onboarding/wizard"

export const metadata = {
  title: "Onboarding • VASTRAHIRE",
}

export default function OnboardingPage() {
  return (
    <main className="min-h-[100dvh] bg-white">
      <OnboardingWizard />
    </main>
  )
}
