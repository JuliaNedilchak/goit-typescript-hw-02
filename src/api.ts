import axios from "axios";

interface Photo {
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

interface FetchResults {
  results: Photo[];
  total: number;
  total_pages: number;
}

export const photoRequestSearch = async (
  query: string,
  page: number
): Promise<Photo[]> => {
  const { data } = await axios.get<FetchResults>(
    `https://api.unsplash.com/search/photos?query=${query}&page=${page}&per_page=12&client_id=rtxS2o_3Pq5jhEZNKWgvQxcGcFMaWJGb1oZei-ws2CE`
  );
  return data.results;
};
