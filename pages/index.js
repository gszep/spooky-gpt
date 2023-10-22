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
      prompt: 'Once upon a time',
    }),
  }
  ).then((r) => r.json())
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
    </main>
  )
}

export default Home
