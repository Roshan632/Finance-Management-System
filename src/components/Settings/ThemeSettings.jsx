import Card from "../common/Card";

const ThemeSettings = () => {
  const darkMode=()=>{
    document.documentElement.className="dark";
  }
  return (
    <Card>
      <h2 className="font-bold mb-4">
        Theme
      </h2>

      <button onClick={darkMode} className="bg-slate-900 text-white px-4 py-2 rounded">
        Dark Mode (Coming Soon)
      </button>
    </Card>
  );
};

export default ThemeSettings;