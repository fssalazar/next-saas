import { Header } from '@/components/header'

export default async function Home() {
  return (
    <div className="py-4">
      <Header />
      <main className="mx-auto w-full max-w-[1200px]">
        <p className="text-muted text-sm">Select or create an organization</p>
      </main>
    </div>
  )
}
