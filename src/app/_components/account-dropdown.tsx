import { Button } from "~/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu"
import { signOut, signIn } from 'next-auth/react';
import Image from "next/image"
import { useSession } from "next-auth/react";
import Link from "next/link";
export default function AccountDropdown() {
  const { data: session } = useSession();
  const user = session ? session.user : null;
  return <DropdownMenu>
    <DropdownMenuTrigger className="ml-6">
      <div>
        <div><img width="30" height="30" src="https://img.icons8.com/ios-glyphs/30/user--v1.png" alt="user--v1" /></div>
      </div>
    </DropdownMenuTrigger>
    <DropdownMenuContent>
      <DropdownMenuLabel>{user ? user.name : "My Account"}</DropdownMenuLabel>
      <DropdownMenuSeparator />
      <DropdownMenuItem><Link href='/myBookings'>My Bookings</Link></DropdownMenuItem>
      {user ?
        <DropdownMenuItem onClick={() => { signOut() }}>Logout</DropdownMenuItem>
        : <DropdownMenuItem onClick={() => { signIn() }}>Login</DropdownMenuItem>}
    </DropdownMenuContent>
  </DropdownMenu>
}
