import { AffiliateTabs, AffiliateNotRegistered } from "@/components/dashboard/AffiliateTabs";

export default function DashboardAffiliateSettlementPage() {
  return (
    <div className="flex w-full flex-col">
      <AffiliateTabs />
      <AffiliateNotRegistered />
    </div>
  );
}
