import { Formik, Form, Field } from "formik";
import toast from "react-hot-toast";

const FORM_INITIAL_VALUES = {
  photoSearch: "",
};

const SearchBar = ({ onSearchQuery }) => {
  const submitForm = (values) => {
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
