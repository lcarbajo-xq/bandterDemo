import AppLayout from "components/AppLayout"
import Button from "components/Button"
import useUser from "hooks/useUser"
import { useEffect, useState } from "react"
import { addBandTit, uploadImage } from "firebase/client"
import { useRouter } from "next/router"
import Head from "next/head"
import Avatar from "components/Avatar"

const COMPOSE_STATES = {
  USER_NOT_KNOWN: 0,
  LOADING: 1,
  SUCESS: 2,
  ERROR: -1,
}

const DRAG_IMAGE_STATES = {
  ERRIR: -1,
  NONE: 0,
  DRAG_OVER: 1,
  UPLOADNG: 2,
  COMPLETE: 3,
}

export default function ComposeBandtit() {
  const user = useUser()
  const [status, setStatus] = useState(COMPOSE_STATES.USER_NOT_KNOWN)
  const [message, setMessage] = useState("")

  const [drag, setDrag] = useState(DRAG_IMAGE_STATES.NONE)
  const [task, setTask] = useState(null)
  const [imgURL, setImgURL] = useState(null)

  const router = useRouter()

  useEffect(() => {
    if (task) {
      const onProgress = () => {}
      const onError = () => {}
      const onComplete = () => {
        console.log("COMPLETE")
        task.snapshot.ref.getDownloadURL().then(setImgURL)
      }
      task.on("state_changed", onProgress, onError, onComplete)
    }
  }, [task])

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
      img: imgURL,
      userId: user.uid,
      userName: user.username,
    })
      .then(() => router.push("/home"))
      .catch((err) => {
        console.log(err)
        setStatus(COMPOSE_STATES.ERROR)
      })
  }

  const handleDragEnter = (e) => {
    e.preventDefault()
    setDrag(DRAG_IMAGE_STATES.DRAG_OVER)
  }

  const handleDragLeave = (e) => {
    e.preventDefault()
    setDrag(DRAG_IMAGE_STATES.NONE)
  }

  const handleDrag = (e) => {
    e.preventDefault()
    const file = e.dataTransfer.files[0]
    setDrag(DRAG_IMAGE_STATES.NONE)

    const task = uploadImage(file)
    setTask(task)
  }

  const isButtonDIsabled = !message.length || status === COMPOSE_STATES.LOADING

  return (
    <>
      <AppLayout>
        <Head>
          <title>Crear un BadTit / BandTer </title>
        </Head>
        <section className="form-container">
          <section className="avatar-container">
            <Avatar src={user && user.avatar} />
          </section>
          <form onSubmit={handleSubmit}>
            <textarea
              value={message}
              onDragEnter={handleDragEnter}
              onDragLeave={handleDragLeave}
              onDrop={handleDrag}
              onChange={handleChange}
              placeholder="¿Qué está pasando?"
            ></textarea>
            {imgURL && (
              <section className="remove-img">
                <button
                  onClick={() => {
                    setImgURL(null)
                  }}
                >
                  X
                </button>
                <img src={imgURL} />
              </section>
            )}
            <div>
              <Button disabled={isButtonDIsabled}>BandTea</Button>
            </div>
          </form>
        </section>
      </AppLayout>
      <style jsx>{`
        div {
          padding: 15px;
        }
        button {
          border: 0;
          color: #fff;
          border-radius: 999px;
          position: absolute;
          width: 32px;
          height: 32px;
          right: 15px;
          top: 15px;
          background: rgba(0, 0, 0, 0.3);
        }
        form {
          padding: 10px;
          width: 100%;
        }
        img {
          border-radius: 10px;
          height: auto;
          width: 100%;
        }
        .avatar-container {
          margin-top: 20px;
          margin-left: 10px;
        }
        .form-container {
          align-items: flex-start;
          display: flex;
        }
        .remove-img {
          position: relative;
        }
        textarea {
          width: 100%;
          padding: 15px;
          font-size: 21px;
          min-height: 200px;
          border: ${drag === DRAG_IMAGE_STATES.DRAG_OVER
            ? "3px dashed #09f"
            : "3px solid transparent"};
          border-radius: 10px;
          resize: none;
        }
      `}</style>
    </>
  )
}
