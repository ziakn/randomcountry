import Link from 'next/link';

export const metadata = {
  title: 'Most Beautiful Countries in Europe | Random Country Generator',
  description: 'Discover Europe\'s most stunning destinations, from Norway\'s fjords to Greece\'s islands.',
};

export default function BlogPost() {
  return (
    <main className="max-w-4xl mx-auto px-4 py-12">
      <nav className="mb-8">
        <Link href="/blog" className="text-blue-600 hover:text-blue-800">
          ← Back to Blog
        </Link>
      </nav>

      <article>
        <header className="mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Most Beautiful Countries in Europe</h1>
          <time className="text-gray-500">January 15, 2024</time>
        </header>

        <div className="prose lg:prose-lg max-w-none">
          <p>
            Europe is home to some of the world's most breathtaking landscapes and captivating cultures. 
            From the dramatic fjords of Norway to the sun-soaked islands of Greece, each country offers 
            its own unique beauty.
          </p>

          <h2>Top 10 Most Beautiful European Countries</h2>
          
          <ol>
            <li><strong>Norway</strong> - Land of stunning fjords and northern lights</li>
            <li><strong>Switzerland</strong> - Picturesque alpine villages and lakes</li>
            <li><strong>Italy</strong> - Renaissance art, rolling hills, and Mediterranean coastlines</li>
            <li><strong>Greece</strong> - Ancient ruins and azure Aegean islands</li>
            <li><strong>France</strong> - From lavender fields to the French Riviera</li>
            <li><strong>Iceland</strong> - Otherworldly landscapes and geothermal wonders</li>
            <li><strong>Austria</strong> - Baroque architecture and Alpine scenery</li>
            <li><strong>Spain</strong> - Diverse landscapes from beaches to mountains</li>
            <li><strong>Croatia</strong> - Adriatic coastline and historic cities</li>
            <li><strong>Portugal</strong> - Atlantic coastline and charming towns</li>
          </ol>

          <p>
            Each of these countries offers unique experiences that showcase Europe's incredible 
            diversity of landscapes, cultures, and histories. Whether you're drawn to dramatic 
            mountain vistas, pristine beaches, or historic cities, Europe has something for every 
            kind of traveler.
          </p>
        </div>
      </article>
    </main>
  );
}