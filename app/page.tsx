import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from './page.module.css'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <main className={styles.main}>
      <div className={styles.nav}>
        <Image
          src='bird.png'
          width='30' height='30'
          alt='bird' />
        <h1> Kichir </h1>
      </div>
    </main>
  )
}
