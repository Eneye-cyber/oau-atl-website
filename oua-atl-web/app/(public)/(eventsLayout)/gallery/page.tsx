import Image from 'next/image'
import Link from 'next/link'
const page = () => {
  const photos = [
    { imageUrl: '/img/1.jpg', name: 'Sunset Bliss', date: '2024-11-01' },
    { imageUrl: '/img/2.jpg', name: 'Mountain Escape', date: '2024-11-02' },
    { imageUrl: '/img/3.jpg', name: 'City Lights', date: '2024-11-03' },
    { imageUrl: '/img/4.jpg', name: 'Ocean Breeze', date: '2024-11-04' },
    { imageUrl: '/img/scholarship1.jpg', name: 'Forest Walk', date: '2024-11-05' },
    { imageUrl: '/img/scholarship1.jpg', name: 'Forest Walk', date: '2024-11-05' },
  ];

  return <PhotoGallery photos={photos} />;
}
interface Photo {
  imageUrl: string;
  name: string;
  date: string;
}
// components/PhotoGallery.jsx

function PhotoGallery({ photos }: {photos: Photo[]}) {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4 text-gray-800">Photo Gallery</h1>
      <div className="grid grid-cols-10 sm:grid-cols-10 gap-4">
        {photos.map((photo, index) => {
          // Calculate the column span based on the repeating pattern
          const colSpan = (() => {
            const pattern = [4, 6, 6, 4, 10]; // Col span for 1, 2, 3, 4, 5
            return pattern[index % pattern.length];
          })();

          return (
            <Link
              key={index}
              href={`/gallery/${photo.name.toLowerCase().split(' ').join('-')}`}
              className={`relative col-span-10 sm:col-span-${colSpan} overflow-hidden rounded-lg group hover:underline shadow-sm`}
            >
              <div className="relative w-full h-64">
                <Image
                  src={photo.imageUrl}
                  alt={photo.name}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                  priority={index < 3} // Prioritize the first 3 images
                />
              </div>
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                <h2 className="text-white font-semibold text-lg">{photo.name}</h2>
                <p className="text-gray-300 text-sm">{photo.date}</p>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

export default page