"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useGetMeQuery } from "@/app/store/api/authApi";

type Props = {
  children: React.ReactNode;
};

export default function AuthGuard({ children }: Props) {
  const router = useRouter();

  const { isLoading, isError } = useGetMeQuery();

  useEffect(() => {
    if (!isLoading && isError) {
      router.replace("/");
    }
  }, [isLoading, isError, router]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return null;
  }

  return <>{children}</>;
}