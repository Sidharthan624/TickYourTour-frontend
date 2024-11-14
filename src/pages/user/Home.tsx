import Navbar from "../../components/common/Navbar"
import Carousel from "../../components/user/Carousel"
import Choose from "../../components/user/Choose"
import Trending from "../../components/user/Trending"
import Footer from "../../components/common/Footer"

const Home = () => {
  return (
    <main className="mt-8">
     <Navbar />
     <Carousel />
     <div className="my-4">
      <Choose />
     </div>
     <div className="my-8">
      <Trending />
     </div>
     <Footer />
    </main>
  )
}

export default Home