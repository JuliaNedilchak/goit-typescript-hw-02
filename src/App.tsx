import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import Loader from "../src/components/Loader/Loader";
import ImageGallery from "./components/ImageGallery/ImageGallery";
import SearchBar from "./components/SearchBar/SearchBar";
import ErrorMessage from "./components/ErrorMessage/ErrorMessage";
import { photoRequestSearch } from "../src/api";
import LoadMoreBtn from "./components/LoadMoreBtn/LoadMoreBtn";
import { Toaster } from "react-hot-toast";
import ReactModal from "react-modal";

export interface Photo {
  id: string;
  description: string;
  alt_description: string;
  urls: {
    raw: string;
    full: string;
    regular: string;
    small: string;
    thumb: string;
  };
}
const customStyles: ReactModal.Styles = {
  content: {
    position: "absolute",
    top: "40px",
    left: "40px",
    right: "40px",
    bottom: "40px",
    border: "1px solid #ccc",
    background: "#fff",
    overflow: "auto",
    WebkitOverflowScrolling: "touch",
    borderRadius: "4px",
    outline: "none",
    padding: "20px",
  },
};
ReactModal.setAppElement("#root");

const App: React.FC = () => {
  const [photos, setPhotos] = useState<Photo[] | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const [query, setQuery] = useState<string>("");
  const [page, setPage] = useState<number>(1);
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);

  console.log(query);
  const openModal = (photo: Photo) => {
    setSelectedPhoto(photo);
    setModalIsOpen(true);
  };
  const closeModal = () => {
    setModalIsOpen(false);
  };
  //useEffect(() => {
  //async function fetchPhoto() {
  // try {
  // setIsLoading(true);
  //const data = await photoRequest();

  //setPhotos(data);
  //} catch (error) {
  //setIsError(true);
  //} finally {
  //setIsLoading(false);
  //}
  //}
  //fetchPhoto();
  //}, []);

  useEffect(() => {
    if (query.length === 0) return;
    async function fetchPhotoSearch() {
      try {
        setIsLoading(true);
        const data = await photoRequestSearch(query, page);
        if (page === 1) {
          setPhotos(data);
        } else {
          setPhotos((prevPhotos) =>
            prevPhotos ? [...prevPhotos, ...data] : data
          );
        }
      } catch (error) {
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    }
    fetchPhotoSearch();
  }, [query, page]);

  const onloadMore = () => {
    setPage((prevPage) => {
      return prevPage + 1;
    });
  };
  const onSearchQuery = (photoSearch: string) => {
    setQuery(photoSearch);
    setPage(1);
  };

  return (
    <>
      <Toaster
        position="top-center"
        reverseOrder={false}
        gutter={8}
        containerClassName=""
        containerStyle={{}}
        toastOptions={{
          // Define default options
          className: "",
          duration: 5000,
          style: {
            background: "#363636",
            color: "#fff",
          },
        }}
      />
      <SearchBar onSearchQuery={onSearchQuery} />
      {isLoading && <Loader />}
      {isError && <ErrorMessage />}
      <div>
        <h1>Images for you</h1>
        {photos && <ImageGallery photos={photos} openModal={openModal} />}
        {photos && <LoadMoreBtn onloadMore={onloadMore} />}
        <ReactModal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          style={customStyles}
        >
          {selectedPhoto && (
            <img
              src={selectedPhoto.urls.regular}
              alt={selectedPhoto.alt_description}
            />
          )}
        </ReactModal>
      </div>
    </>
  );
};

export default App;
