import AppLayout from "components/AppLayout"
import Button from "components/Button"
import useUser from "hooks/useUser"
import { useState } from "react"
import { addBandTit } from "firebase/client"

export default function ComposeBandtit() {
  const user = useUser()
  const [message, setMessage] = useState("")

  const handleChange = (evt) => {
    const { value } = evt.target
    setMessage(value)
  }

  const handleSubmit = (evt) => {
    evt.preventDefault()
    // user !== undefined &&
    addBandTit({
      avatar: user.avatar,
      content: message,
      userId: user.uid,
      userName: user.username,
    })
  }

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
            <Button disabled={message.length === 0}>BandTea</Button>
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
