import Avatar from "components/Avatar"
import useTImeAgo from "hooks/useTimeAgo"
import useDateTimeFormat from "hooks/useDateTimeFormat"
import Link from "next/link"

export default function BandTit({
  id,
  userName,
  img,
  content,
  avatar,
  createdAt,
}) {
  const timeAgo = useTImeAgo(createdAt)
  const createdAtFormated = useDateTimeFormat(createdAt)

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
            <Link href={`/status/[id]`} as={`/status/${id}`}>
              <a>
                <time title={createdAtFormated}>{timeAgo}</time>
              </a>
            </Link>
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
        a {
          text-decoration: none;
        }
        a:hover {
          text-decoration: underline;
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
        time {
          color: #555;
          font-size: 14px;
        }
      `}</style>
    </>
  )
}
