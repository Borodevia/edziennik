'use client';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

export default function NotFound() {
  const goBack = () => {
    window.history.back();
  };

  return (
    <div className="w-screen h-screen grid place-items-center">
      <Card className="w-sm">
        <CardHeader>
          <CardTitle className="text-center">
            <span className="border-r-1 border-r-white border-solid pr-2 mr-2">
              404
            </span>
            Page Not Found
          </CardTitle>
        </CardHeader>
        <CardContent>
          <CardDescription className="text-center">
            The page you are looking for does not exist.
          </CardDescription>
        </CardContent>
        <CardFooter>
          <CardAction className="mx-auto">
            <Button onClick={goBack}>Go Back</Button>
          </CardAction>
        </CardFooter>
      </Card>
    </div>
  );
}
