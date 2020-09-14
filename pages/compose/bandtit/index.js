import AppLayout from "components/AppLayout"
import Button from "components/Button"
import useUser from "hooks/useUser"
import { useState } from "react"
import { addBandTit } from "firebase/client"
import { useRouter } from "next/router"

const COMPOSE_STATES = {
  USER_NOT_KNOWN: 0,
  LOADING: 1,
  SUCESS: 2,
  ERROR: -1,
}

export default function ComposeBandtit() {
  const user = useUser()
  const [status, setStatus] = useState(COMPOSE_STATES.USER_NOT_KNOWN)
  const [message, setMessage] = useState("")
  const router = useRouter()

  const handleChange = (evt) => {
    const { value } = evt.target
    setMessage(value)
  }

  const handleSubmit = (evt) => {
    evt.preventDefault()
    setStatus(COMPOSE_STATES.LOADING)
    addBandTit({
      avatar: user.avatar,
      content: message,
      userId: user.uid,
      userName: user.username,
    })
      .then(() => router.push("/home"))
      .catch((err) => {
        console.log(err)
        setStatus(COMPOSE_STATES.ERROR)
      })
  }

  const isButtonDIsabled = !message.length || status === COMPOSE_STATES.LOADING

  return (
    <>
      <AppLayout>
        <form onSubmit={handleSubmit}>
          <textarea
            value={message}
            onChange={handleChange}
            placeholder="¿Qué está pasando?"
          ></textarea>
          <div>
            <Button disabled={isButtonDIsabled}>BandTea</Button>
          </div>
        </form>
      </AppLayout>
      <style jsx>{`
        div {
          padding: 15px;
        }
        textarea {
          width: 100%;
          padding: 15px;
          font-size: 21px;
          min-height: 200px;
          border: 0;
          resize: none;
        }
      `}</style>
    </>
  )
}
