import Card from "../common/Card";

const CurrencySettings = () => {
  return (
    <Card>
      <h2 className="font-bold mb-4">
        Currency
      </h2>

      <select className="border rounded-lg p-3 w-full">
        <option>NPR</option>
        <option>USD</option>
        <option>INR</option>
      </select>
    </Card>
  );
};

export default CurrencySettings;