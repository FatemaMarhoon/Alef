import Image from 'next/image'
import Dashbard from './dashboard/page'
import Users from './users/page'
import ChartOne from '@/components/Charts/ChartOne'
import Login from './login/page'

 function Home() {

  return (
    <>
    <main>
    <Dashbard></Dashbard>
    </main>
    </>
  )
}

export default Home;