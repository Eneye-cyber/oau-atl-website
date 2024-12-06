import { Button } from '@/components/ui/button';
import { Metadata } from 'next';
import Image from 'next/image';

export const metadata: Metadata = {
  title: 'Atl Interest Groups'
}

export default function page() {
  return (
    <main className="min-h-screen bg-gray-50 flex flex-col items-center justify-center px-4">
      <header className="w-full max-w-4xl mx-auto py-6">
        <h1 className="text-4xl font-bold text-gray-800 text-center">
          Connect with Like-Minded People
        </h1>
        <p className="text-lg text-gray-600 text-center mt-2">
          Discover and join interest groups that match your passions.
        </p>
      </header>

      <section className="w-full max-w-4xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
        {interestGroups.map((group) => (
          <div
            key={group.id}
            className="bg-white shadow-md rounded-lg overflow-hidden"
          >
            <Image
              width={450}
              height={160}
              src={group.image}
              alt={group.name}
              className="w-full h-40 object-cover"
            />
            <div className="p-4">
              <h2 className="text-xl font-semibold text-gray-800">
                {group.name}
              </h2>
              <p className="text-gray-600 mt-1 text-sm">
                {group.description}
              </p>
              <Button className="mt-4 w-full" variant="default">
                Join Group
              </Button>
            </div>
          </div>
        ))}
      </section>

      <footer className="w-full max-w-4xl mx-auto py-6 text-center text-gray-600 text-sm">
        © {new Date().getFullYear()} Interest Groups. All Rights Reserved.
      </footer>
    </main>
  );
}

const interestGroups = [
  {
    id: 1,
    name: 'Photography Enthusiasts',
    description: 'Explore the world through the lens with other photographers.',
    image: '/img/placeholder.svg',
  },
  {
    id: 2,
    name: 'Cooking Lovers',
    description: 'Share recipes and cooking tips with fellow foodies.',
    image: '/img/placeholder.svg',
  },
  {
    id: 3,
    name: 'Tech Innovators',
    description: 'Discuss the latest in tech with industry enthusiasts.',
    image: '/img/placeholder.svg',
  },
];
