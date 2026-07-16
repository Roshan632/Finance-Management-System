import { useGetReminderQuery } from "../../api/reminderApi";
import { FaPaperclip } from "react-icons/fa";

const ReminderDetails = ({ reminderId }) => {

  const { data, isLoading } =
    useGetReminderQuery(reminderId);

 if (isLoading) {
  return (
    <div className="space-y-3 animate-pulse">
      <div className="h-7 bg-gray-200 rounded w-1/3"></div>
      <div className="h-4 bg-gray-200 rounded w-2/3"></div>

      <div className="grid md:grid-cols-2 gap-4">
        {Array.from({ length: 6 }).map((_, index) => (
          <div
            key={index}
            className="h-20 rounded-lg bg-gray-200"
          />
        ))}
      </div>
    </div>
  );
}

  if (!data) {
    return <p>Reminder not found.</p>;
  }

  return (

    <div className="space-y-5">

      <div>

        <h2 className="text-2xl font-bold">
          {data.title}
        </h2>

        <p className="text-gray-500 mt-2">
          {data.description}
        </p>

      </div>

      <div className="grid md:grid-cols-2 gap-4">

        <Info
          label="Reminder Date"
          value={data.reminder_date}
        />

        <Info
          label="Reminder Time"
          value={data.reminder_time}
        />

        <div className="border rounded-lg p-3">
  <p className="text-xs text-gray-500">
    Priority
  </p>

  <span
    className={`inline-block mt-2 px-3 py-1 rounded-full text-xs font-semibold
    ${
      data.priority === "HIGH"
        ? "bg-red-100 text-red-700"
        : data.priority === "MEDIUM"
        ? "bg-yellow-100 text-yellow-700"
        : "bg-green-100 text-green-700"
    }`}
  >
    {data.priority}
  </span>
</div>

        <div className="border rounded-lg p-3">
  <p className="text-xs text-gray-500">
    Status
  </p>

  <span
    className={`inline-block mt-2 px-3 py-1 rounded-full text-xs font-semibold
    ${
      data.status === "COMPLETED"
        ? "bg-green-100 text-green-700"
        : "bg-orange-100 text-orange-700"
    }`}
  >
    {data.status}
  </span>
</div>

        <Info
          label="Repeat"
          value={data.repeat}
        />

        <Info
          label="Created"
          value={
            data.created_at? new Date(
            data.created_at
          ).toLocaleString(): "-"}
        />
         <Info
          label="Updated"
          value={
            data.updated_at? new Date(
            data.updated_at
          ).toLocaleString(): "-"}
        />

      </div>

      <div>

        <h3 className="font-semibold mb-3">
          Attachments
        </h3>

        {data.attachments?.length ? (

          data.attachments.map((file) => (

            <div
              key={file.id}
              className="border rounded-lg p-3 mb-2"
            >

              <div className="flex items-center gap-3">

    <FaPaperclip className="text-blue-600"/>

    <div>

        <p className="font-medium">
            {file.fileName}
        </p>

        <p className="text-xs text-gray-500">
            {(file.fileSize/1024).toFixed(2)} KB
        </p>

    </div>

</div>

            </div>

          ))

        ) : (

          <p className="text-gray-500">
            No attachments
          </p>

        )}

      </div>

    </div>

  );

};

const Info = ({ label, value }) => (
  <div className="border rounded-lg p-3">
    <p className="text-xs text-gray-500">
      {label}
    </p>

    <p className="font-semibold mt-1">
      {value}
    </p>
  </div>
);

export default ReminderDetails;