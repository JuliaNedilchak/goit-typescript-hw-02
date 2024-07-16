import { Formik, Form, Field } from "formik";
import React from "react";
import toast from "react-hot-toast";

const FORM_INITIAL_VALUES = {
  photoSearch: "",
};
interface SearchBarProps {
  onSearchQuery: (photoSearch: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearchQuery }) => {
  const submitForm = (values: typeof FORM_INITIAL_VALUES) => {
    if (!values.photoSearch) {
      toast.error("you cant submit an empty blank!");
      return;
    }
    onSearchQuery(values.photoSearch);
  };

  return (
    <header>
      <Formik initialValues={FORM_INITIAL_VALUES} onSubmit={submitForm}>
        <Form>
          <Field
            type="text"
            name="photoSearch"
            autoComplete="off"
            autoFocus
            placeholder="Search.."
          />
          <button type="submit">Search</button>
        </Form>
      </Formik>
    </header>
  );
};

export default SearchBar;
