import BandTit from "components/Bandtit"
import { firestore } from "firebase/admin"

export default function BandTitPage(props) {
  console.log(props)
  return (
    <>
      <BandTit {...props} />
      <style jsx>{``}</style>
    </>
  )
}

export async function getStaticPaths() {
  return {
    paths: [{ params: { id: "kGEzZuMOxX97yYY8CSVo" } }],
    fallback: true,
  }
}

export async function getStaticProps(context) {
  const { params } = context
  const { id } = params

  return firestore
    .collection("bandtits")
    .doc(id)
    .get()
    .then((doc) => {
      const data = doc.data()
      const id = doc.id
      const { createdAt } = data

      const props = {
        ...data,
        id,
        createdAt: +createdAt.toDate(),
      }
      return { props }
    })
    .catch(() => {
      return { props: {} }
    })
}

// BandTitPage.getInitialProps = (context) => {

// }
