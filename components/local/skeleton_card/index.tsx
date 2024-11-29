import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

function SkeletonCard() {
    return (
        <Card className="flex h-20 items-center px-4 justify-between">
            <Skeleton className="h-12 w-1/2" />
            <Skeleton className="h-12 w-40" />
            <Skeleton className="h-12 w-40" />
        </Card>
    );
}

export default SkeletonCard;
