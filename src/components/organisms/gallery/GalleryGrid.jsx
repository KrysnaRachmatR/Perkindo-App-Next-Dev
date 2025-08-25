import GalleryCard from "./GalleryCard";

export default function GalleryGrid({ media, openModal }) {
  return (
    <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-6 space-y-6">
      {media.map((item, index) => (
        <GalleryCard key={item.id} item={item} index={index} onClick={openModal} />
      ))}
    </div>
  );
}
