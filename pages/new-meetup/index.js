import { useRouter } from 'next/router'
import { Fragment } from 'react'
import NewMeetupForm from '../../components/meetups/NewMeetupForm'
import Head from 'next/head'

const NewMeetupPage = () => {
  const router = useRouter()
  const addMeetupHandler = async meetupData => {
    try {
      const response = await fetch('/api/new-meetup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(meetupData)
      })
      const data = await response.json()
      console.log(data)
      router.replace('/')
    } catch (error) {
      console.error(error.message)
    }
  }

  return (
    <Fragment>
      <Head>
        <title>Add a new Meetup</title>
        <meta
          name='description'
          content='Add your own meetups, create amazing networking opportunities!'
        />
      </Head>
      <NewMeetupForm onAddMeetup={addMeetupHandler} />
    </Fragment>
  )
}

export default NewMeetupPage
