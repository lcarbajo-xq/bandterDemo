import Avatar from "components/Avatar"
import useTImeAgo from "hooks/useTimeAgo"

export default function BandTit({
  id,
  userName,
  img,
  content,
  avatar,
  createdAt,
}) {
  const timeAgo = useTImeAgo(createdAt)

  return (
    <>
      <article key={id}>
        <div>
          <Avatar alt={userName} src={avatar} />
        </div>
        <section>
          <header>
            <strong>{userName}</strong>
            <span> · </span>
            <date>{timeAgo}</date>
          </header>
          <p>{content}</p>
          {img && <img src={img} />}
        </section>
      </article>
      <style jsx>{`
        article {
          border-bottom: 2px solid #eaf7ff;
          display: flex;
          padding: 10px 15px;
        }
        img {
          width: 100%;
          height: auto;
          border-radius: 10px;
          margin-top: 10px;
        }
        div {
          padding-right: 10px;
        }
        p {
          line-height: 1.3125;
          margin: 0;
        }
        span {
          margin: 0 5px;
        }
        date {
          color: #555;
          font-size: 14px;
        }
      `}</style>
    </>
  )
}
