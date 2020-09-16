import BandTit from "components/bandtit"
import Create from "components/Icons/Create"
import Search from "components/Icons/Search"
import { listenLatestBandtits } from "firebase/client"
import useUser from "hooks/useUser"
import Link from "next/link"
import Home from "components/Icons/Home"
import { useEffect, useState } from "react"
import { colors } from "styles/theme"
import Head from "next/head"

export default function HomePage() {
  const [timeline, setTimeline] = useState([])
  const user = useUser()

  useEffect(() => {
    let unsuscribe
    if (user) {
      unsuscribe = listenLatestBandtits(setTimeline)
    }
    return () => unsuscribe && unsuscribe()
  }, [user])

  return (
    <>
      <Head>
        <title>Inicio / BandTer</title>
      </Head>
      <header>
        <h2>Inicio</h2>
      </header>
      <section>
        {timeline.map(
          ({ id, userName, avatar, content, img, createdAt, userId }) => {
            return (
              <BandTit
                key={id}
                img={img}
                createdAt={createdAt}
                avatar={avatar}
                userName={userName}
                content={content}
                id={id}
                userId={userId}
              />
            )
          }
        )}
      </section>
      <nav>
        <Link href="/home">
          <a>
            <Home width={32} height={32} stroke="#09f" />
          </a>
        </Link>
        <Link href="/search">
          <a>
            <Search width={32} height={32} stroke="#09f" />
          </a>
        </Link>
        <Link href="/compose/bandtit">
          <a>
            <Create width={32} height={32} stroke="#09f" />
          </a>
        </Link>
      </nav>
      <style jsx>{`
        header {
          align-items: center;
          border-bottom: 1px solid #eee;
          background: #ffffffaa;
          backdrop-filter: blur(5px);
          height: 49px;
          display: flex;
          position: sticky;
          top: 0;
          width: 100%;
        }
        h2 {
          font-size: 21px;
          font-weight: 800;
          padding-left: 15px;
        }

         {
        section {
          flex: 1;
        }

        nav {
          background: #fff;
          display: flex;
          position: sticky;
          bottom: 0;
          border-top: 1px solid #eee;
          height: 49px;
          width: 100%;
        }
        nav a {
          align-items: center;
          height: 100%;
          display: flex;
          flex: 1 1 auto;
          justify-content: center
        }
        nav a:hover {
          background: radial-gradient(#0099ff22 15%, transparent 16%);
          background-size: 180px 180px;
          background-position: center;
        }
        nav a:hover > global(svg) {
          stroke: ${colors.primary}
        }
      `}</style>
    </>
  )
}
