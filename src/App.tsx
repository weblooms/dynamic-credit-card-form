import { useEffect, useState } from "react";
import FormStructure from "./components/FormStructure";
const App = () => {
  const [schema, setSchema] = useState<any | null>(null);
  const fetchSchema = async () => {
    const data = await fetch(
      "https://gist.githubusercontent.com/parthgharpure10/a150d06ce590d360d6e3182fc14aaf12/raw/dynamic_form.json"
    );
    const result = await data.json();
    setSchema(result);
  };
  useEffect(() => {
    fetchSchema();
  }, []);
  if (!schema) return <div>Error while Loading....</div>;

  return (
    <div>
      <FormStructure schema={schema} />
    </div>
  );
};

export default App;
