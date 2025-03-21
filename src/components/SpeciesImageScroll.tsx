import { GatsbyImage, IGatsbyImageData } from 'gatsby-plugin-image';
import * as React from 'react';

type SpeciesImageScrollProps = {
  commonName?: string;
  scientificName?: string;
  photos: IGatsbyImageData[];
};

export default function SpeciesImageScroll({
  commonName,
  scientificName,
  photos,
}: SpeciesImageScrollProps): JSX.Element {
  const scrollRef = React.useRef<HTMLDivElement>(null);

  const numPhotos = photos.length;

  const getSlideshowScroll = (): number => {
    const increment = scrollRef.current?.clientWidth || 0;
    const totalSpace = scrollRef.current?.scrollWidth || 0;
    const currentPosition = scrollRef.current?.scrollLeft || 0;
    const nextPostion = increment + currentPosition;
    return nextPostion >= totalSpace ? 0 : nextPostion;
  };

  return (
    <div className="u-full-width relative">
      <div className="horizontalScroll u-full-width" ref={scrollRef}>
        {photos?.map((item, i) => {
          if (!item) return null;
          return (
            <GatsbyImage
              className="horizontalScrollItem"
              key={i}
              image={item}
              alt={`${commonName} (${scientificName})`}
            />
          );
        })}
      </div>
      {numPhotos > 3 && (
        <button
          className="button-more-images"
          onClick={() => {
            scrollRef.current?.scrollTo({
              left: getSlideshowScroll(),
              behavior: 'smooth',
            });
          }}
        >
          +{numPhotos} more photos &gt;
        </button>
      )}
    </div>
  );
}
