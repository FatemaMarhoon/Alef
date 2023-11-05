import Image from 'next/image'
import Dashbard from './dashboard/page'
import Users from './Users/page'
import ChartOne from '@/components/Charts/ChartOne'
export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <>
      <Users></Users>
      </>
    </main>
  )
}
