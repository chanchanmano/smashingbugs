import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

interface AuthCardProps {
  title: string;
  children: React.ReactNode;
}

export function AuthCard({ title, children }: AuthCardProps) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-gradient-to-br from-purple-500 via-pink-500 to-indigo-500">
      
      {/* SmashingBugs Title */}
      <h1 className="text-5xl font-extrabold text-white mb-8 font-sans tracking-tight">
        SmashingBugs
      </h1>

      {/* Card */}
      <Card className="shadow-xl w-full max-w-md backdrop-blur-md bg-white/80">
        <CardHeader>
          <CardTitle className="text-center text-2xl font-semibold text-gray-900">
            {title}
          </CardTitle>
        </CardHeader>
        <CardContent>{children}</CardContent>
      </Card>
    </div>
  );
}
