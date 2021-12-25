//   /api/new-meetup

// POST /api/new-meetup






import { MongoClient } from 'mongodb'

const handler = async (req, res) => {
  let data
  if (req.method === 'POST') {
    data = req.body

    // const { title, image, address, description } = data
  }
  try {
    const client = await MongoClient.connect(process.env.MONGO_URI)
    const db = client.db()

    const meetupsCollection = db.collection('meetups')

    const result = await meetupsCollection.insertOne(data)
    console.log(result)

    client.close()

    res.status(201).json({ message: 'Meetup inserted!' })
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: error.message })
  }
}

export default handler
