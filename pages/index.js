import Head from "next/head"

import BUtton from "components/BUtton"
import GitHubLogo from "components/Icons/GitHub"

import { colors } from "styles/theme"

import { loginWithGithub } from "firebase/client"
import { useEffect } from "react"
import { useRouter } from "next/router"
import useUser, { USER_STATES } from "hooks/useUser"

export default function Home() {
  const user = useUser()
  const router = useRouter()

  useEffect(() => {
    user && router.replace("/home")
  }, [user])

  const handleClick = () => {
    loginWithGithub().catch((err) => console.log(err))
  }

  return (
    <>
      <Head>
        <title>Bandter - Garage Band Expiernce</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <section>
        <img src="/logo.png" />
        <h1>BandTer</h1>
        <h2>Garage Band Experiences 🎧</h2>
        <div>
          {user === USER_STATES.NOT_LOGGED && (
            <BUtton onClick={handleClick}>
              <GitHubLogo fill="#fff" width={24} height={24} />
              Log In with GItHub
            </BUtton>
          )}
          {user === USER_STATES.NOT_KNOWN && <img src="/spinner.gif" />}
        </div>
      </section>

      <style jsx>{`
        img {
          width: 120px;
        }
        div {
          margin-top: 16px;
        }
        section {
          display: grid;
          height: 100%;
          place-content: center;
          place-items: center;
        }
        h1 {
          color: ${colors.primary};
          font-weight: 800;
          margin-bottom: 16px;
        }
        h2 {
          font-size: 16px;
          color: ${colors.secondary};
          margin: 0;
        }
      `}</style>
    </>
  )
}
