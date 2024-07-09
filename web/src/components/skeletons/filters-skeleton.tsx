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

export function FiltersSkeleton() {
  return (
    <div className="px-44 pt-12 gap-12 hidden flex-row lg:flex md:flex items-center justify-center">
      {Array(4).fill(
        <Skeleton className="h-10 w-full" />
      )}
    </div>
  );
}
