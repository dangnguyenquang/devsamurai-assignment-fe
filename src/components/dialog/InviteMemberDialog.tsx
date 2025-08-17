import React, { useState } from "react";
import { X } from "lucide-react";
import { z } from "zod";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@radix-ui/react-dialog";
import { DialogFooter, DialogHeader } from "../ui/dialog";
import { Label } from "recharts";
import { Input } from "../ui/input";
import { Select, SelectContent, SelectItem } from "../ui/select";
import FormInput from "../forms/FormInput";

interface InviteMemberDialogProps {
  children: React.ReactNode;
}

const inviteMemberSchema = z.object({
  email: z
    .string()
    .min(1, "Email is required")
    .email("Please enter a valid email address"),
  role: z
    .enum(["Member", "Admin", "Viewer"])
    .refine((val) => val !== undefined, {
      message: "Please select a role",
    }),
});

type InviteMemberFormData = z.infer<typeof inviteMemberSchema>;

export default function InviteMemberDialog({
  children,
}: InviteMemberDialogProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState<InviteMemberFormData>({
    email: "",
    role: "Member",
  });
  const [errors, setErrors] = useState<
    Partial<Record<keyof InviteMemberFormData, string>>
  >({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    try {
      inviteMemberSchema.parse(formData);

      setErrors({});

      console.log("Sending invitation:", formData);
      alert(`Invitation sent to ${formData.email} as ${formData.role}`);

      setFormData({ email: "", role: "Member" });
      setIsOpen(false);
    } catch (error) {
      if (error instanceof z.ZodError) {
        const newErrors: Partial<Record<keyof InviteMemberFormData, string>> =
          {};
        error.issues.forEach((err) => {
          if (err.path[0]) {
            newErrors[err.path[0] as keyof InviteMemberFormData] = err.message;
          }
        });
        setErrors(newErrors);
      }
    }
  };

  const handleCancel = () => {
    setFormData({ email: "", role: "Member" });
    setErrors({});
    setIsOpen(false);
  };

  return (
    <div className="p-8">
      <div onClick={() => setIsOpen(true)} className="cursor-pointer">
        {children}
      </div>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent>
          <DialogHeader>
            <div className="flex items-center justify-between">
              <div>
                <DialogTitle>Invite member</DialogTitle>
                <DialogDescription>
                  Enter the email address and role of the person you want to
                  invite.
                </DialogDescription>
              </div>
              <Button
                variant="ghost"
                onClick={() => setIsOpen(false)}
                className="p-2"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </DialogHeader>

          <div className="px-6 py-4 space-y-4">
            <FormInput id="email" label="Email" error={errors.email} />

            <div>
              <Label>Role</Label>
              <Select
                value={formData.role}
                onValueChange={(value) =>
                  setFormData((prev) => ({ ...prev, role: value as any }))
                }
              >
                <SelectContent>
                    <SelectItem
                      value="Member"
                      onSelect={(value) => {
                        setFormData((prev) => ({ ...prev, role: value as any }));
                        // Close dropdown (in a real implementation, this would be handled by the Select component)
                      }}
                    >
                      Member
                    </SelectItem>
                    <SelectItem
                      value="Admin"
                      onSelect={(value) => {
                        setFormData((prev) => ({ ...prev, role: value as any }));
                      }}
                    >
                      Admin
                    </SelectItem>
                    <SelectItem
                      value="Viewer"
                      onSelect={(value) => {
                        setFormData((prev) => ({ ...prev, role: value as any }));
                      }}
                    >
                      Viewer
                    </SelectItem>
                </SelectContent>
              </Select>
              {errors.role && (
                <p className="text-red-500 text-sm mt-1">{errors.role}</p>
              )}
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={handleCancel}>
              Cancel
            </Button>
            <Button type="submit" onClick={handleSubmit}>
              Send invitation
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
