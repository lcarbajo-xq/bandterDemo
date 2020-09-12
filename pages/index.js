import Head from 'next/head'

import AppLayout from '../components/AppLayout'
import BUtton from '../components/BUtton'
import GitHubLogo from '../components/Icons/GitHub'

import { colors } from '../styles/theme'

import { loginWithGithub, onAuthStateChanged } from '../firebase/client'
import { useEffect, useState } from 'react'

export default function Home() {

  const [ user, setUser ] = useState( null )

  useEffect( () => {
    onAuthStateChanged( setUser )

  })

  const handleClick = () => {
    loginWithGithub()
      .then( user => {
         const { avatar, username, url } = user
         setUSer ( user )
      })
      .catch( err => console.log( err ) )

  }

  return (
      <>
        <Head>
          <title>Bandter - Garage Band Expiernce</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <AppLayout>
          <section>
            <img src='/logo.png'/>
            <h1>BandTer</h1>
            <h2>Garage Band Experiences 🎧</h2>
            <div>
              {
                  user === null  &&
                     <BUtton onClick={ handleClick }>
                        <GitHubLogo fill='#fff' width={ 24 } height={ 24 }/>
                        Log In with GItHub
                      </BUtton>
              }
              {
                user && user.avatar &&
                  <div>
                          <img src={ user.avatar } />
                          <strong>{ user.username }</strong>
                  </div>
              }
            </div>
          </section>
        </AppLayout>

        <style jsx>{`
          img {
            width: 120px
          }
          div {
            margin-top: 16px;
          }
          section {
            display: grid;
            height: 100%;
            place-content:center;
            place-items: center;
          }
          h1 {
            color: ${ colors.primary };
            font-weight: 800;
            margin-bottom: 16px;
          }
          h2 {
            font-size: 16px;
            color: ${ colors.secondary };
            margin: 0
          }
        
        `}</style>
      </>
  )
}
