import * as React from "react";
import { Card, CardContent } from "@/components/ui/card";

// import LocationsSearch from "./location";
import { Button } from "@/components/ui/button";

interface LocationCardProps {
  children?: any;
}

export function LocationCard({ children }: LocationCardProps) {
  return (
    <Card className="mx-auto py-6  w-full h-full max-w-[400px] rounded-2xl">
      <CardContent>
        <form>
          <div className="grid w-full items-center gap-4">{children}</div>
          <div className="justify-between">
            <Button variant="outline">Cancel</Button>
            <Button variant="outline">Apply</Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
