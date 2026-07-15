const NoteCardSkeleton = () => {
  return (
    <div className="bg-white rounded-xl shadow border-t-4 border-gray-200 p-5 animate-pulse">

      <div className="flex justify-between">

        <div className="space-y-3">

          <div className="h-5 w-40 bg-gray-200 rounded"></div>

          <div className="h-5 w-20 bg-gray-200 rounded-full"></div>

        </div>

        <div className="h-6 w-6 rounded-full bg-gray-200"></div>

      </div>

      <div className="mt-6 space-y-2">

        <div className="h-3 bg-gray-200 rounded"></div>

        <div className="h-3 bg-gray-200 rounded"></div>

        <div className="h-3 bg-gray-200 rounded w-3/4"></div>

      </div>

      <div className="mt-8 h-3 w-28 bg-gray-200 rounded"></div>

      <div className="flex justify-between mt-6">

        {[1,2,3,4,5].map((item)=>(
          <div
            key={item}
            className="h-5 w-5 rounded bg-gray-200"
          />
        ))}

      </div>

    </div>
  );
};

export default NoteCardSkeleton;