import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Geocode from "./map/geocode";
import { CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList } from "@/components/ui/tabs";
import { TabsContent, TabsTrigger } from "@radix-ui/react-tabs";


type LocationsSearchProps = {
  query: string;
  handleInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  suggestions: any[];
  handleResultSelect: (result: any, polygons: any) => void;
  minSize: number;
  maxSize: number;
  maxWidth: number;
  handleApply: (minValue: number, maxValue: number) => void;

};

export default function LocationsSearch({
  query,
  handleInputChange,
  suggestions,
  handleResultSelect,
  minSize,
  maxSize,
  maxWidth,
  handleApply,
}: LocationsSearchProps): React.JSX.Element {

  const [inputValue, setInputValue] = useState('');

  const handleInputChangeLocal = (event: React.ChangeEvent<HTMLInputElement> )=>{
    setInputValue(event.target.value);
  };
  


  return (
    <div className="grid gap-4">
      <div className="grid gap-2">
        <div className="grid grid-cols-3 items-center gap-4">
        
          
          <div className="uppercase col-span-3 mx-auto items-center justify-center">
            
          </div>
        </div>
        <div className="grid grid-cols-3 items-center gap-4 py-4">
         
          <Input
           type="text"
            value={inputValue}
            onChange={handleInputChangeLocal}
            placeholder="Choose location A"
            className="col-span-3 h-10"
          />
        </div>
        <div className="grid grid-cols-3 items-center gap-4 py-7">
          
          <Input
            type="text"
            value={inputValue}
            onChange={handleInputChangeLocal}
            className="col-span-3 h-10"
            placeholder="Choose Location B"
          />
        </div>
       
        <div>


        </div>
        <CardFooter className="flex my-4 justify-between">
          <Button variant="outline">Cancel</Button>
          <Button variant="outline"  onClick={() => handleApply(minSize, maxSize)}>Apply</Button>

        </CardFooter>
      </div>
    </div>
  );
}
