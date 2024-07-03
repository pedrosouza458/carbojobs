import { Star, StarHalf, Link } from "lucide-react";
import { Button } from "../ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "../ui/card";
import { Skeleton } from "../ui/skeleton";

export function ProvidersSkeleton() {
  return (
    <div className="px-6 lg:px-20 pt-8 grid md:grid-cols-2 lg:grid-cols-4 gap-6">
      {Array(8).fill(
        <div className="space-y-4">
          <Skeleton className="h-60" />
          <Skeleton className="h-10" />
        </div>
      )}
    </div>
  );
}
