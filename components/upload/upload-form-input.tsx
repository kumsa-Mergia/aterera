"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface UpladFormInputProps {
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

export default function UpladFormInput({ onSubmit }: UpladFormInputProps) {
  return (
    <form className="flex flex-col gap-6 " onSubmit={onSubmit}>
      <div className="flex justify-end items-center gap-1 5">
        <Input
          id="file"
          type="file"
          name="file"
          accept="application/pdf"
          required
          className=""
        />
        <Button> upload your PDF</Button>
      </div>
    </form>
  );
}
