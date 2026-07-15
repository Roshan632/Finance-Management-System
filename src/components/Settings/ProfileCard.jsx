import Card from "../common/Card";

const ProfileCard = () => {
  return (
    <Card>
      <h2 className="text-xl font-bold mb-5">
        Profile
      </h2>

      <div className="space-y-4">

        <input
          className="w-full border rounded-lg p-3"
          defaultValue="Roshan Yadav"
        />

        <input
          className="w-full border rounded-lg p-3"
          defaultValue="roshan@gmail.com"
        />

        <button className="bg-green-600 text-white px-5 py-2 rounded-lg">
          Save
        </button>

      </div>
    </Card>
  );
};

export default ProfileCard;