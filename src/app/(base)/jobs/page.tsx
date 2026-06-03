"use client";

import ServiceList from "./common/service-list";
import TabsButton from "./common/tabs-button";

export default function Jobs() {
  return (
    <div className="space-y-3">
      <TabsButton />
      <ServiceList />
    </div>
  );
}
