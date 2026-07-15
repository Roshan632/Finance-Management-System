import Card from "../common/Card";

const NotificationSettings = () => {
  return (
    <Card>
      <h2 className="font-bold mb-4">
        Notifications
      </h2>

      <label className="flex items-center gap-3">
        <input type="checkbox" defaultChecked />
        Email Notifications
      </label>
    </Card>
  );
};

export default NotificationSettings;