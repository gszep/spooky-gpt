import { useCallback, useEffect, useState } from 'react'
import Button from '../components/Button'
import ClickCount from '../components/ClickCount'
import styles from '../styles/home.module.css'

function prompt() {
  return fetch('/prompt', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      prompt: 'Once upon a time',
    }),
  }).then((r) => r.json())
}

function Home() {
  const [count, setCount] = useState(0)
  const increment = useCallback(() => {
    setCount((v) => v + 1)
  }, [setCount])

  useEffect(() => {
    const r = setInterval(() => {
      increment()
    }, 1000)

    return () => {
      clearInterval(r)
    }
  }, [increment])

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
