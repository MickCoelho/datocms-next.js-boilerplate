
import { NextPage } from 'next'
import Link from 'next/link'
import Layout from "../components/Layout"


interface Props {
}

const IndexPage: NextPage<Props> = () => {
  return (
    <Layout title="Homepage">
      <h1>👋</h1>
      <p>
        <Link href="/about">
          <a>About</a>
        </Link>
      </p>
    </Layout>
  )
}

export default IndexPage
