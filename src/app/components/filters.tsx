import * as React from "react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent, 
  CardFooter,
 
} from "@/components/ui/card";
 import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Ownership } from "./ownership";
import { Switch } from "@/components/ui/switch";

import { cn } from "@/lib/utils";

type CardProps = React.ComponentProps<typeof Card>;

function Constraints({ className, ...props }: CardProps) {
  return (
    <div className={cn("", className)} {...props}>
      <div className=" flex items-center space-x-2 rounded-md   my-4">
        <div className="flex-2 space-y-1">
          <p className="text-sm font-medium leading-none">Driving Suggestions</p>
          <p className="text-sm text-muted-foreground">
          Weather - on your way to Hyde Park you are to 
expect heavy rain and thunderstorms.

You are to expect a car accident on Jan Smuts Avenue
slowing down the flow of traffic.
          </p>
        </div>
 
      </div>

      
    </div>
  );
}

export function Filters() {
  return (
    <Card className="mx-auto py-6 w-full h-full max-w-[400px] rounded-2xl">
      <CardContent>
        <form>
          <div className="grid w-full items-center gap-4">

            <Ownership />
            <Constraints />
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline">Exit</Button>
        <Button variant="outline">Find</Button>
      </CardFooter>
    </Card>
  );
}
