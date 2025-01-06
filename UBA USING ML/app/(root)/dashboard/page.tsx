import { ChartUi } from "@/app/_components/ChartUi"
import DashboardCards from "@/app/_components/DashboardCard"
import { TableAttack } from "@/app/_components/TableAttacks";
import { TableUi } from "@/app/_components/TableUi"
import { getActivity, getAttackOverview, getAttacks } from "@/app/_lib/userService"
import { Activity } from "@prisma/client";

  
  async function page() {
    const data: Activity[] = (await getActivity()) || [];
    const attack=await getAttacks();
    const Summary=await getAttackOverview(attack)
    console.log(attack)
    return (
      <div>
        <DashboardCards attack={Summary}/>
        <ChartUi activities={data||[]}/>
        <TableAttack data={attack}/>
      </div>
    );
  }
  
  export default page;
