import { Header } from "../../components/Header"
import './404Page.css'
export function NotFoundPage({ cart }) {
  return (
    <>
      <Header cart={cart} />
      <div className="notFound-container">
        <div className="not-found">
          404 NOT FOUND
        </div>
        <div>
          uh oh, are you really looking for this page?
        </div>
      </div>
    </>
  )
}