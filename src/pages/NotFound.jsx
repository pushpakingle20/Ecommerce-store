import { Link } from 'react-router-dom'
import { Home, ArrowRight } from 'lucide-react'

const NotFound = () => {
  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <div className="text-center">
        <h1 className="text-9xl font-bold text-slate-200">404</h1>
        <h2 className="text-2xl font-bold text-primary mt-[-40px] mb-4">Page Not Found</h2>
        <p className="text-slate-500 mb-8 max-w-md">
          Oops! The page you're looking for doesn't exist. 
          It might have been moved or deleted.
        </p>
        <Link to="/" className="btn-primary inline-flex items-center">
          <Home className="w-5 h-5 mr-2" />
          Back to Home
        </Link>
      </div>
    </div>
  )
}

export default NotFound

