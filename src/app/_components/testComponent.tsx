"use client"

import { api } from "~/trpc/react";
export default function TestComponent() {

  const testMutation = api.post.create.useMutation({
    onSuccess: ({ success }) => {
      console.log({ success })
    },
  });
  return <div onClick={() => { testMutation.mutate() }}>asdasd</div>
}
