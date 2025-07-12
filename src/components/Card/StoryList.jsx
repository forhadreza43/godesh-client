import ImageGallery from "../ImageGallery";

const StoryList = ({ story }) => {
  const images = story?.images || [];

  return (
    <div className="space-y-3 rounded border border-green-200 p-4">
      <ImageGallery images={images} />

      {/* <div className="h-20 w-full overflow-hidden rounded bg-gray-100">
        {images.length === 1 ? (
          <img
            src={images[0]}
            alt="story"
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="flex h-full gap-1">
            {images.map((image, i) => (
              <img
                key={i}
                src={image}
                alt={`story-${i}`}
                className="h-full w-full rounded object-cover"
                style={{ flex: `1 1 0` }}
              />
            ))}
          </div>
        )}
      </div> */}

      <h3 className="font-semibold">{story?.title}</h3>
      <p className="text-sm text-gray-700">{story?.content}</p>
    </div>
  );
};

export default StoryList;
