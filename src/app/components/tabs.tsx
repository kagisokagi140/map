import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LocationCard } from "./LocationCard";
import { Filters } from "./filters";

type TabProps = {
  mapstyle?: any;
  children?: any;
};

export function Tab({ mapstyle, children }: TabProps) {
  return (
    <Tabs defaultValue="account" className="w-[400px]  ">
      <div className="text-lg py-2 font-medium leading-none tracking-tight">
        Create Search
      </div>
      <TabsList className="grid  w-full grid-cols-2">
        <TabsTrigger value="account" onClick={mapstyle}>
          Traffic
        </TabsTrigger>
        <TabsTrigger value="password" onClick={mapstyle}>
          Semantic
        </TabsTrigger>
      </TabsList>

      <TabsContent value="account">
        <LocationCard>{children}</LocationCard>
      </TabsContent>
      <TabsContent value="password">
        <Filters />
      </TabsContent>
    </Tabs>
  );
}
