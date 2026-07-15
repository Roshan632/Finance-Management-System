import {FaWallet,FaArrowUp,FaArrowDown} from "react-icons/fa";
import Loader from "../common/Loader";
import ErrorState from "../common/ErrorState";
import KPICard from "./KPICard";
import { useGetDashboardQuery } from "../../api/dashboardApi";

const KPIGrid = () => {

const {data,isLoading,error}=useGetDashboardQuery();

if(isLoading){

return(

<div className="grid grid-cols-3 gap-6">

<Loader/>
<Loader/>
<Loader/>

</div>

)

}

if(error){

return <ErrorState/>

}

const dashboard=data[0];

const cards=[

{
title:"Today's Income",
value:dashboard.todayIncome,
color:"text-green-600",
icon:<FaArrowUp className="text-green-600"/>
},

{
title:"Today's Expense",
value:dashboard.todayExpense,
color:"text-red-500",
icon:<FaArrowDown className="text-red-500"/>
},

{
title:"Today's Profit",
value:dashboard.todayProfit,
color:"text-blue-600",
icon:<FaWallet className="text-blue-600"/>
},

{
title:"Week Income",
value:dashboard.weekIncome,
color:"text-green-600",
icon:<FaArrowUp className="text-green-600"/>
},

{
title:"Week Expense",
value:dashboard.weekExpense,
color:"text-red-500",
icon:<FaArrowDown className="text-red-500"/>
},

{
title:"Week Profit",
value:dashboard.weekProfit,
color:"text-blue-600",
icon:<FaWallet className="text-blue-600"/>
},

{
title:"Month Income",
value:dashboard.monthIncome,
color:"text-green-600",
icon:<FaArrowUp className="text-green-600"/>
},

{
title:"Month Expense",
value:dashboard.monthExpense,
color:"text-red-500",
icon:<FaArrowDown className="text-red-500"/>
},

{
title:"Month Profit",
value:dashboard.monthProfit,
color:"text-blue-600",
icon:<FaWallet className="text-blue-600"/>
},

{
title:"Year Income",
value:dashboard.yearIncome,
color:"text-green-600",
icon:<FaArrowUp className="text-green-600"/>
},

{
title:"Year Expense",
value:dashboard.yearExpense,
color:"text-red-500",
icon:<FaArrowDown className="text-red-500"/>
},

{
title:"Year Profit",
value:dashboard.yearProfit,
color:"text-blue-600",
icon:<FaWallet className="text-blue-600"/>
}

]

return(

<div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">

{

cards.map((card,index)=>(

<KPICard key={index}
{...card}
/>

))

}

</div>

)

}

export default KPIGrid;