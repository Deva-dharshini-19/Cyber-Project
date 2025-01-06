import { TableUi } from "@/app/_components/TableUi";
import { getActivity } from "@/app/_lib/userService";
import { Activity } from "@prisma/client";

async function page() {
  const data: Activity[] = (await getActivity()) || [];
  return (
    <div>
      <TableUi data={data} />
    </div>
  );
}

export default page;
