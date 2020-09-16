import { firestore } from "firebase/admin"

export default (req, res) => {
  const { query } = req
  const { id } = query
  firestore
    .collection("bandtits")
    .doc(id)
    .get()
    .then((doc) => {
      const data = doc.data()
      res.json(data)
    })
    .catch((err) => {
      res.status(404).end()
      console.log(err)
    })
}
