import Head from 'next/head'
import Link from 'next/link'

export default function Home() {
  return (
    <div className="container">
      <Head>
        <title>Lottery Game</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="mt-5">
        <h1 className="text-center">Welcome to the Lottery Game</h1>
        <p className="text-center">Please choose your mode:</p>
        <div className="d-flex justify-content-center">
          {/* <Link href="/player">
            <a className="btn btn-primary m-3">Player</a>
          </Link> */}
          <Link href="/player" className="btn btn-primary m-3">
          Player
          </Link>
          <Link href="/operator" className="btn btn-secondary m-3">
            Operator
          </Link>
        </div>
      </main>
    </div>
  )
}
