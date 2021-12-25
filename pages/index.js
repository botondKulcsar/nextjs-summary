

import Head from 'next/head'

import MeetupList from '../components/meetups/MeetupList'

import { MongoClient } from 'mongodb'
import { Fragment } from 'react'

const HomePage = props => {
  return (
    <Fragment>
      <Head>
        <title>Next Meetups</title>
        <meta
          name='description'
          content='Browse a huge list of highly active React and Next.js meetups!'
        />
      </Head>
      <MeetupList meetups={props.meetups} />
    </Fragment>
  )
}

export async function getStaticProps () {
  // code will be executed during the build process
  // fetch data from an API

  const client = await MongoClient.connect(process.env.MONGO_URI)
  const db = client.db()

  const meetupsCollection = db.collection('meetups')

  const meetups = await meetupsCollection.find().toArray()

  client.close()

  return {
    props: {
      meetups: meetups.map(meetup => ({
        id: meetup._id.toString(),
        title: meetup.title,
        image: meetup.image,
        address: meetup.address,
        description: meetup.description
      }))
    },
    revalidate: 10
  }
}

// export async function getServerSideProps(context) {
//     const req = context.req
//     const res = context.res
//     // fetch datat from an API
//     return {
//         props: {
//             meetups: DUMMY_MEETUPS
//         }
//     }
// }

export default HomePage
