'use client';

import { useActionState } from 'react';
import { login } from './actions';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Lock } from 'lucide-react';

const initialState = {
  error: '',
};

export default function AdminLoginPage() {
  const [state, formAction, isPending] = useActionState(login, initialState);

  return (
    <div className="flex min-h-screen items-center justify-center bg-secondary/30 px-4">
      <Card className="w-full max-w-md border-border bg-card text-card-foreground shadow-lg">
        <CardHeader className="space-y-1 text-center">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-navy/10 text-navy">
            <Lock className="h-6 w-6" />
          </div>
          <CardTitle className="font-display text-3xl text-navy">Admin Access</CardTitle>
          <CardDescription className="text-muted-foreground">
            Enter the editorial desk password to continue
          </CardDescription>
        </CardHeader>
        <form action={formAction}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                name="password"
                type="password"
                placeholder="••••••••"
                required
                className="border-border bg-input focus-visible:ring-brass"
              />
            </div>
            {state?.error && (
              <p className="text-sm font-medium text-destructive">{state.error}</p>
            )}
          </CardContent>
          <CardFooter>
            <Button
              type="submit"
              className="w-full bg-navy text-paper hover:bg-navy-soft"
              disabled={isPending}
            >
              {isPending ? 'Authenticating...' : 'Sign In'}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
