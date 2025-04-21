import * as React from 'react';

import Favicon from '../img/favicon.svg';

import { type PrintableSpecies } from '../utils/species.util';

interface PrintableSpeciesListProps {
  species: PrintableSpecies[];
  onReady?: () => void;
}

export default function PrintableSpeciesList({
  species,
  onReady,
}: PrintableSpeciesListProps): JSX.Element {

  React.useEffect(() => {
    if (species && species.length > 0) {
      onReady?.();
    }
  }, [species, onReady]);

  return (
    <div id="printable">
      <div className="printable_titlepage">
        <h1 className="printable_name">Mushrooms of Nebraska</h1>

        <img src={Favicon} className="printable_logo" />
        
        <p className="bold-text">Important: This guide is for informational use only. Do not use this guide as a singular source to determine edibility. Eat wild mushrooms at your own risk. We accept no responsibility for illness, injury, or other consequences resulting from mushroom consumption. Please do not use this PDF as a sole source for identification.</p>
        
        <p>This PDF is a snapshot of NebraskaMushrooms.org generated {new Date().toLocaleString()}</p>
      </div>
      {species.map((species) => {
        const [firstImage, secondImage, thirdImage] = species.photos ?? [];
        const imageWidths = ['31%', '31%', '31%'];
        if (!secondImage) {
          imageWidths[0] = '50%';
        } else if (!thirdImage) {
          const total = firstImage.width + secondImage.width;
          imageWidths[0] = `${(firstImage.width / total) * 100 - 1}%`;
          imageWidths[1] = `${(secondImage.width / total) * 100 - 1}%`;
        } else if (firstImage) {
          const total = firstImage.width + secondImage.width + thirdImage.width;
          imageWidths[0] = `${(firstImage.width / total) * 100 - 1}%`;
          imageWidths[1] = `${(secondImage.width / total) * 100 - 1}%`;
          imageWidths[2] = `${(thirdImage.width / total) * 100 - 1}%`;
        }

        return (
          <div key={species.id} className="printable_species">
            <div className="printable_group">
              <div className="printable_images">
                {firstImage && (
                  <div style={{ width: imageWidths[0], height: 400 }}>
                    <img
                      className="printable_image"
                      src={firstImage.data}
                      alt={species.name || species.scientificName || ''}
                    />
                  </div>
                )}
                {secondImage && (
                  <div style={{ width: imageWidths[1], height: 400 }}>
                    <img
                      className="printable_image"
                      src={secondImage.data}
                      alt={species.name || species.scientificName || ''}
                    />
                  </div>
                )}
                {thirdImage && (
                  <div style={{ width: imageWidths[2], height: 400 }}>
                    <img
                      className="printable_image"
                      src={thirdImage.data}
                      alt={species.name || species.scientificName || ''}
                    />
                  </div>
                )}
              </div>
              <div className="printable_content">
                <h3 className="printable_name">
                  {species.name || species.scientificName}
                </h3>
                {!!species.name && (
                  <p className="printable_scientificName">
                    {species.scientificName}
                  </p>
                )}
                <div dangerouslySetInnerHTML={{ __html: species.bodyHtml }} />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
