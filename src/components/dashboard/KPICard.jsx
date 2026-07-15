// import CountUp from "react-countup";
// import Card from "../common/Card";

// const KPICard = ({
//   title,
//   value,
//   color,
//   icon,
// }) => {
//   return (
//     <Card className="hover:shadow-lg transition duration-300">

//       <div className="flex justify-between items-center">

//         <div>

//           <p className="text-gray-500 text-sm">
//             {title}
//           </p>

//           <h2 className={`text-3xl font-bold mt-3 ${color}`}>

//             Rs.

//             {value}

//           </h2>

//         </div>

//         <div className="text-4xl">
//           {icon}
//         </div>

//       </div>

//     </Card>
//   );
// };

// export default KPICard;


import Card from "../common/Card";

const KPICard = ({ title, value, color, icon }) => {
  return (
    <Card className="hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-500">{title}</p>

          <h2 className={`mt-3 text-3xl font-bold ${color}`}>
            Rs. {Number(value).toLocaleString()}
          </h2>
        </div>

        <div className="text-4xl">
          {icon}
        </div>
      </div>
    </Card>
  );
};

export default KPICard;