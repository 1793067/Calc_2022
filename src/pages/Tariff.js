import SearchString from "../components/SearchString";
import Contents from "../components/Contents";
import initial_data from "../initial_data/initial_data2024";
import { useEffect, useState } from "react";
import PDFComponent from "../components/PDFRender";

const Tariff = () => {
  const [content, setContent] = useState(initial_data);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const handleChange = (event) => setSearchTerm(event.target.value);

  useEffect(() => {
    const results = content.filter((tariff) => {
      const regex = new RegExp(`.*${searchTerm.split(" ").join(".*")}.*`, "gi");
      return regex.test(tariff.name.toLowerCase());
    });
    setSearchResults(results);
  }, [searchTerm]);

  return (
    <div className="d-flex">
      <div className="mt-3 pt-5" style={{ borderTop: "dotted .5px" }}>
        <SearchString value={searchTerm} onChange={handleChange} />

        <div className="m-3" style={{ width: "50vw" }}>
          <Contents tableContent={searchResults} />
        </div>
      </div>
      <div>
        <PDFComponent />
      </div>
    </div>
  );
};

export default Tariff;
