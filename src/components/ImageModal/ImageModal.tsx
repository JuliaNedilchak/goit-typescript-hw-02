import React from "react";
import ReactModal from "react-modal";

interface PhotoModal {
  urls: {
    regular: string;
  };
  alt_description: string;
}
interface ModalProp {
  photo: PhotoModal;
  closeModal: () => void;
  customStyles: ReactModal.Styles;
}

const ImageModal: React.FC<ModalProp> = ({
  photo,
  closeModal,
  customStyles,
}) => {
  return (
    <ReactModal isOpen={true} onRequestClose={closeModal} style={customStyles}>
      <img src={photo.urls.regular} alt={photo.alt_description} />
    </ReactModal>
  );
};

export default ImageModal;
