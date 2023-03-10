import { FC } from "react";

interface SearchFormProps {
  searchTerm: string;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const SearchForm: FC<SearchFormProps> = ({
  searchTerm,
  handleSubmit,
  handleChange,
}) => {
  return (
    <form
      className="flex flex-col md:flex-row gap-2 my-4 lg:mt-10 justify-center items-center"
      onSubmit={handleSubmit}
    >
      <label className="text-white font-bold" htmlFor="search-input">
        Search movies:
      </label>
      <input
        type="text"
        id="search-input"
        className="border border-black rounded-md p-2"
        value={searchTerm}
        onChange={handleChange}
        required
      />
      <button
        type="submit"
        className="border border-black rounded-md bg-black text-white px-4 py-2 font-bold"
      >
        Search
      </button>
    </form>
  );
};

export default SearchForm;
