import DashboardLayout from "../../components/layout/DashboardLayout";

import ProfileCard from "../../components/settings/ProfileCard";
import CurrencySettings from "../../components/settings/CurrencySettings";
import ThemeSettings from "../../components/settings/ThemeSettings";
import NotificationSettings from "../../components/settings/NotificationSettings";

const SettingsPage = () => {
  return (
    <DashboardLayout>

      <h1 className="text-3xl font-bold mb-8">
        Settings
      </h1>

      <div className="grid lg:grid-cols-2 gap-6">

        <ProfileCard />

        <CurrencySettings />

        <ThemeSettings />

        <NotificationSettings />

      </div>

    </DashboardLayout>
  );
};

export default SettingsPage;