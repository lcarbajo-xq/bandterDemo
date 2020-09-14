import AppLayout from "components/AppLayout"
import BandTit from "components/bandtit"
import useUser from "hooks/useUser"
import { useEffect, useState } from "react"

export default function HomePage() {
  const [timeline, setTimeline] = useState([])
  const user = useUser()

  useEffect(() => {
    user &&
      fetch("/api/statuses/home_timeline")
        .then((res) => res.json())
        .then(setTimeline)
  }, [user])

  return (
    <>
      <AppLayout>
        <header>
          <h2>Inicio</h2>
        </header>
        <section>
          {timeline.map((bandtweet) => {
            return (
              <BandTit
                key={bandtweet.id}
                avatar={bandtweet.avatar}
                username={bandtweet.username}
                message={bandtweet.message}
                id={bandtweet.id}
              />
            )
          })}
        </section>
        <nav></nav>
      </AppLayout>
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
          /* section {
          padding: 10px 0;
        } */
        }

        nav {
          background: #fff;
          position: fixed;
          bottom: 0;
          border-top: 1px solid #eee;
          height: 49px;
          width: 100%;
        }
      `}</style>
    </>
  )
}
