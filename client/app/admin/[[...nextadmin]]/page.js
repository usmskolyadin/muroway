import { PageProps } from "@premieroctet/next-admin";
import { getNextAdminProps } from "@premieroctet/next-admin/appRouter";
import { NextAdmin } from "@premieroctet/next-admin/adapters/next";
import { prisma } from "@/prisma";
 
export default async function AdminPage({
  params,
  searchParams,
}) { // or PromisePageProps for Next 15+
  const props = await getNextAdminProps({
    params: params.nextadmin,
    searchParams,
    basePath: "/admin",
    apiBasePath: "/api/admin",
    prisma,
    /*options*/
  });
 
  return (
    <NextAdmin {...props} />
  );
}