import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Mail, MailOpen, Trash2, RefreshCw, Loader2 } from "lucide-react";
import { format } from "date-fns";

interface ContactMessage {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  is_read: boolean;
  created_at: string;
}

export const MessagesTab = () => {
  const { toast } = useToast();
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedMessage, setSelectedMessage] = useState<ContactMessage | null>(null);

  const fetchMessages = async () => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke("get-contact-messages");
      if (error) throw error;
      setMessages(data.messages || []);
    } catch (error: any) {
      console.error("Error fetching messages:", error);
      toast({
        title: "Error",
        description: "Failed to load messages",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  const handleToggleRead = async (msg: ContactMessage) => {
    try {
      const { error } = await supabase.functions.invoke("get-contact-messages", {
        method: "PATCH",
        body: { is_read: !msg.is_read },
      });
      // Note: supabase.functions.invoke doesn't support query params directly, 
      // so we need to use a different approach
      const response = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/get-contact-messages?id=${msg.id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            "apikey": import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY,
          },
          body: JSON.stringify({ is_read: !msg.is_read }),
        }
      );
      
      if (!response.ok) throw new Error("Failed to update");
      
      setMessages(prev => 
        prev.map(m => m.id === msg.id ? { ...m, is_read: !m.is_read } : m)
      );
    } catch (error) {
      console.error("Error toggling read status:", error);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this message?")) return;
    
    try {
      const response = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/get-contact-messages?id=${id}`,
        {
          method: "DELETE",
          headers: {
            "apikey": import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY,
          },
        }
      );
      
      if (!response.ok) throw new Error("Failed to delete");
      
      setMessages(prev => prev.filter(m => m.id !== id));
      if (selectedMessage?.id === id) setSelectedMessage(null);
      
      toast({
        title: "Deleted",
        description: "Message has been deleted",
      });
    } catch (error) {
      console.error("Error deleting message:", error);
      toast({
        title: "Error",
        description: "Failed to delete message",
        variant: "destructive",
      });
    }
  };

  const unreadCount = messages.filter(m => !m.is_read).length;

  return (
    <Card className="bg-card border-border">
      <CardHeader className="flex flex-row items-center justify-between">
        <div className="flex items-center gap-3">
          <CardTitle>Contact Messages</CardTitle>
          {unreadCount > 0 && (
            <Badge variant="default">{unreadCount} unread</Badge>
          )}
        </div>
        <Button variant="outline" size="sm" onClick={fetchMessages} disabled={isLoading}>
          <RefreshCw className={`w-4 h-4 mr-2 ${isLoading ? "animate-spin" : ""}`} />
          Refresh
        </Button>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
          </div>
        ) : messages.length === 0 ? (
          <div className="text-center py-12 text-muted-foreground">
            <Mail className="w-12 h-12 mx-auto mb-4 opacity-50" />
            <p>No messages yet</p>
          </div>
        ) : (
          <div className="grid lg:grid-cols-2 gap-4">
            {/* Message List */}
            <div className="space-y-2 max-h-[600px] overflow-y-auto pr-2">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  onClick={() => setSelectedMessage(msg)}
                  className={`p-4 rounded-lg cursor-pointer transition-colors ${
                    selectedMessage?.id === msg.id
                      ? "bg-primary/20 border border-primary"
                      : "bg-muted/50 hover:bg-muted"
                  } ${!msg.is_read ? "border-l-4 border-l-primary" : ""}`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2">
                        {msg.is_read ? (
                          <MailOpen className="w-4 h-4 text-muted-foreground shrink-0" />
                        ) : (
                          <Mail className="w-4 h-4 text-primary shrink-0" />
                        )}
                        <span className={`font-medium truncate ${!msg.is_read ? "text-foreground" : "text-muted-foreground"}`}>
                          {msg.name}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground truncate mt-1">{msg.subject}</p>
                      <p className="text-xs text-muted-foreground mt-1">
                        {format(new Date(msg.created_at), "MMM d, yyyy h:mm a")}
                      </p>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="shrink-0"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDelete(msg.id);
                      }}
                    >
                      <Trash2 className="w-4 h-4 text-destructive" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>

            {/* Message Detail */}
            <div className="bg-muted/30 rounded-lg p-6 min-h-[400px]">
              {selectedMessage ? (
                <div>
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-xl font-semibold">{selectedMessage.subject}</h3>
                      <p className="text-muted-foreground">
                        From: <span className="text-foreground">{selectedMessage.name}</span>
                      </p>
                      <a 
                        href={`mailto:${selectedMessage.email}`} 
                        className="text-primary hover:underline text-sm"
                      >
                        {selectedMessage.email}
                      </a>
                      <p className="text-xs text-muted-foreground mt-2">
                        {format(new Date(selectedMessage.created_at), "MMMM d, yyyy 'at' h:mm a")}
                      </p>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleToggleRead(selectedMessage)}
                    >
                      {selectedMessage.is_read ? (
                        <>
                          <Mail className="w-4 h-4 mr-2" />
                          Mark Unread
                        </>
                      ) : (
                        <>
                          <MailOpen className="w-4 h-4 mr-2" />
                          Mark Read
                        </>
                      )}
                    </Button>
                  </div>
                  <div className="border-t border-border pt-4 mt-4">
                    <p className="whitespace-pre-wrap text-foreground">{selectedMessage.message}</p>
                  </div>
                  <div className="mt-6">
                    <Button asChild variant="hero">
                      <a href={`mailto:${selectedMessage.email}?subject=Re: ${selectedMessage.subject}`}>
                        Reply via Email
                      </a>
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="flex items-center justify-center h-full text-muted-foreground">
                  <p>Select a message to view details</p>
                </div>
              )}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
