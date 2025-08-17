import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { Contact } from "@/types/dashboard";

const ContactsList: React.FC<{
  title: string;
  contacts: Contact[];
}> = ({ title, contacts }) => (
  <Card className="rounded-xl border bg-card text-card-foreground">
    <CardHeader className="pb-3">
      <CardTitle className="text-sm font-medium">{title}</CardTitle>
    </CardHeader>
    <CardContent className="space-y-2">
      {contacts.map((contact) => (
        <div
          key={contact.id}
          className="flex items-center justify-between py-1"
        >
          <div className="flex items-center gap-3">
            <div className="h-6 w-6 rounded-full bg-gray-100 flex items-center justify-center text-xs">
              <img src={contact.avatar} alt="" className="rounded-full"/>
            </div>
            <span className="text-sm text-gray-700">{contact.name}</span>
          </div>
          <span className="text-sm font-medium text-gray-900">
            {contact.visits}
          </span>
        </div>
      ))}
    </CardContent>
  </Card>
);

export default ContactsList;
