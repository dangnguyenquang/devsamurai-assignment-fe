import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Mail, Lock } from "lucide-react";

export default function LoginPage() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-muted h-screen dark:bg-background bg-gray-50">
      <Card className="border-transparent dark:border-border w-[400px] px-4 py-2 bg-white shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)]">
        <CardHeader className="flex flex-col space-y-1.5 p-6">
          <CardTitle className="text-2xl font-bold">Sign in to your account</CardTitle>
          <CardDescription>Welcome back! Please sign in to continue.</CardDescription>
        </CardHeader>

        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <div className="relative">
              <Mail className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input id="email" type="email" placeholder="you@example.com" className="pl-8" />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <div className="relative">
              <Lock className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input id="password" type="password" placeholder="********" className="pl-8" />
            </div>
            <div className="text-right text-sm">
              <a href="#" className="text-blue-500 hover:underline">Forgot password?</a>
            </div>
          </div>

          <Button className="w-full">Sign in</Button>

          <div className="flex items-center gap-2">
            <div className="flex-1 border-t border-muted-foreground"></div>
            <span className="text-xs text-muted-foreground">Or continue with</span>
            <div className="flex-1 border-t border-muted-foreground"></div>
          </div>

          <div className="flex gap-2">
            <Button variant="outline" className="w-full">Google</Button>
            <Button variant="outline" className="w-full">Microsoft</Button>
          </div>

          <p className="text-center text-sm text-muted-foreground">
            Don’t have an account?{" "}
            <a href="#" className="text-blue-500 hover:underline">Sign up</a>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
