import { Link } from 'react-router';

export function NotFoundPage({ property = false }: { property?: boolean }) {
  return <main className="section py-24">
    <h1 className="text-4xl">{property ? 'Property not found' : 'Page not found'}</h1>
    <p className="my-6">{property ? 'This property link is not in our catalogue.' : 'This page does not exist.'}</p>
    <Link className="button" to="/">Back to home</Link>
  </main>;
}
