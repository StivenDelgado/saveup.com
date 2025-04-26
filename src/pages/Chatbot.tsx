
import { useState, useRef, useEffect } from "react";
import { ArrowUp, Bot, Lightbulb, Paperclip, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import AppLayout from "@/components/Layout/AppLayout";
import { toast } from "sonner";
import { iaService } from "@/api/services/iaService";

interface Message {
  id: string;
  prompt: string;
  sender: "user" | "bot";
  timestamp: Date;
}

const Chatbot = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      prompt: "¡Hola! Soy tu asesor financiero con IA. ¿En qué puedo ayudarte hoy?",
      sender: "bot",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (!input.trim()) return;

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      prompt: input,
      sender: "user",
      timestamp: new Date(),
    };

    const res = await iaService.promptIA({prompt: input});
    console.log(res)
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsTyping(true);

    // Simulate AI response
      const botMessage: Message = {
        id: Date.now().toString(),
        prompt: res.response,
        sender: "bot",
        timestamp: new Date(),
      };
      
      setMessages((prev) => [...prev, botMessage]);
      setIsTyping(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const suggestedQuestions = [
    "¿Cómo puedo ahorrar más dinero?",
    "¿Cuál es una buena tasa de ahorro?",
    "¿Cómo crear un fondo de emergencia?",
    "¿Debería pagar deudas o ahorrar primero?",
    "¿Cómo empezar a invertir con poco dinero?",
  ];

  return (
    <AppLayout>
      <div className="flex flex-col h-[calc(100vh-12rem)] max-h-[calc(100vh-12rem)]">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Asesor Financiero IA</h1>
            <p className="text-muted-foreground">Haz preguntas sobre tus finanzas y obtén consejos personalizados</p>
          </div>
        </div>

        <div className="mt-6 flex-1 overflow-hidden rounded-lg border bg-background shadow">
          <div className="flex h-full flex-col">
            <div className="flex items-center justify-between border-b px-6 py-3">
              <div className="flex items-center gap-2">
                <Bot className="h-5 w-5 text-moneywise-600" />
                <span className="font-medium">Asistente SaveUp</span>
              </div>
            </div>
            
            <div className="flex-1 overflow-y-auto p-4">
              <div className="space-y-4 pb-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${
                      message.sender === "user" ? "justify-end" : "justify-start"
                    }`}
                  >
                    <div
                      className={`flex max-w-[80%] items-start gap-3 rounded-lg px-4 py-2 ${
                        message.sender === "user"
                          ? "ml-auto bg-moneywise-600 text-white"
                          : "bg-muted"
                      }`}
                    >
                      {message.sender === "bot" && (
                        <Bot className="mt-1 h-5 w-5 text-moneywise-600" />
                      )}
                      <div>
                        <p className="text-sm">{message.prompt}</p>
                        <p className="mt-1 text-xs text-muted-foreground">
                          {message.timestamp.toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </p>
                      </div>
                      {message.sender === "user" && (
                        <User className="mt-1 h-5 w-5 text-white" />
                      )}
                    </div>
                  </div>
                ))}
                
                {isTyping && (
                  <div className="flex justify-start">
                    <div className="flex max-w-[80%] items-start gap-3 rounded-lg bg-muted px-4 py-2">
                      <Bot className="mt-1 h-5 w-5 text-moneywise-600" />
                      <div className="flex space-x-1">
                        <div className="h-2 w-2 animate-pulse rounded-full bg-moneywise-600"></div>
                        <div className="h-2 w-2 animate-pulse rounded-full bg-moneywise-600" style={{ animationDelay: "0.2s" }}></div>
                        <div className="h-2 w-2 animate-pulse rounded-full bg-moneywise-600" style={{ animationDelay: "0.4s" }}></div>
                      </div>
                    </div>
                  </div>
                )}
                
                <div ref={messagesEndRef} />
              </div>
            </div>
            
            {messages.length === 1 && (
              <div className="mx-auto mb-6 grid w-full max-w-3xl grid-cols-2 gap-2 px-4">
                {suggestedQuestions.map((question, index) => (
                  <button
                    key={index}
                    className="flex items-center gap-2 rounded-lg border bg-background p-3 text-sm hover:bg-muted transition-colors"
                    onClick={() => {
                      setInput(question);
                    }}
                  >
                    <Lightbulb className="h-4 w-4 text-moneywise-600" />
                    <span className="line-clamp-1 text-left">{question}</span>
                  </button>
                ))}
              </div>
            )}
            
            <div className="border-t p-4">
              <div className="flex items-end gap-2">
                <Button
                  variant="outline"
                  size="icon"
                  className="h-10 w-10 shrink-0 rounded-full"
                  onClick={() => toast.info("La subida de archivos aún no está implementada.")}
                >
                  <Paperclip className="h-5 w-5" />
                  <span className="sr-only">Adjuntar archivo</span>
                </Button>
                <div className="relative flex-1">
                  <Input
                    className="resize-none pr-12"
                    placeholder="Haz una pregunta..."
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                  />
                  <Button
                    size="icon"
                    className="absolute bottom-0.5 right-1 h-8 w-8 rounded-full bg-moneywise-600 hover:bg-moneywise-700"
                    onClick={handleSendMessage}
                    disabled={!input.trim() || isTyping}
                  >
                    <ArrowUp className="h-5 w-5" />
                    <span className="sr-only">Enviar</span>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default Chatbot;
