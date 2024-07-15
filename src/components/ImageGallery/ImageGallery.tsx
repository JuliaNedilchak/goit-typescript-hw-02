import React from "react";
import css from "./ImageGallery.module.css";
import { Photo } from "../../App";

interface PhotosProps {
  photos: Photo[];
  openModal: (photo: Photo) => void;
}

const ImageGallery: React.FC<PhotosProps> = ({ photos, openModal }) => {
  return (
    <ul className={css.imageSet}>
      {Array.isArray(photos) &&
        photos.map((photo) => {
          return (
            <li key={photo.id}>
              <img
                width={250}
                height={200}
                src={photo.urls.small}
                alt={photo.alt_description}
                onClick={() => {
                  openModal(photo);
                }}
              />
            </li>
          );
        })}
    </ul>
  );
};

export default ImageGallery;
