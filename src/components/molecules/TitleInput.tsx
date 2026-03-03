"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type Props = {
  value: string;
  onChange: (value: string) => void;
};

const TitleInput = ({ value, onChange }: Props) => {
  return (
    <div className="grid gap-2">
      <Label htmlFor="title">Title</Label>
      <Input
        id="title"
        placeholder="Enter article title"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required
      />
    </div>
  );
};

export default TitleInput;
