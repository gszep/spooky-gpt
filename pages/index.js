import "react"
import Button from '../components/Button'
import styles from '../styles/home.module.css'

function prompt() {
  return fetch('http://localhost:8080/prompt', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      prompt: 'Tell me a spooky story in 200 words or less.',
    }),
  }
  ).then(response => {
    return response.json()

  }).then(data => {
    document.getElementById("story").innerHTML = data.reply
  })
}

function Home() {
  return (
    <main className={styles.main}>
      <h1>The Bewitching Bot</h1>
      <div>
        <Button
          onClick={(e) => {
            prompt()
          }}
        >
          Tell me a spooky story
        </Button>
      </div>
      <hr className={styles.hr} />
      <div id="story">

      </div>
    </main>
  )
}

export default Home
