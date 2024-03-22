import Link from "next/link";
import { RecentBookings } from "~/app/_components/admin/RecentBookings";
import { Button } from "~/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { ScrollArea } from "~/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";
import { api } from "~/trpc/server";

function formatObject(obj: any, indentLevel = 1) {
  let result = '';
  const indent = '  '.repeat(indentLevel); // Creates an indentation string based on the current recursion depth
  for (const [key, value] of Object.entries(obj)) {
    if (typeof value === 'object' && value !== null) {
      // If the value is an object, recursively format it
      result += `${indent}${+key + 1}:\n${formatObject(value, indentLevel + 1)}`;
    } else {
      // Otherwise, just append the key-value pair
      result += `${indent}${key}- ${value}\n`;
    }
  }

  return result;
}

// Usage in a component

export default async function Page({
  searchParams,
}: {
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  const paymentId = searchParams?.id
  if (paymentId) {
    const { booking } = await api.booking.getBookingByID.mutate({ id: paymentId as string })
    return (
      <ScrollArea className="h-full">
        <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
          <div className="flex items-center justify-between space-y-2">
            <h2 className="text-3xl font-bold tracking-tight">
              Admin Dashboard
            </h2>
            <div className="hidden md:flex items-center space-x-2">
              <Button><Link href={"/admin/bookings/create"} >Create Booking</Link></Button>
            </div>
          </div>
          <Tabs defaultValue="overview" className="space-y-4">
            <TabsList>
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="analytics" disabled>
                Analytics
              </TabsTrigger>
            </TabsList>
            <TabsContent value="overview" className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      Vacant Rooms
                    </CardTitle>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      className="h-4 w-4 text-muted-foreground"
                    >
                    </svg>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">50</div>
                    <p className="text-xs text-muted-foreground">

                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      Rooms Ready
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">27</div>
                    <p className="text-xs text-muted-foreground">
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Unconfirmed Bookings</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">12</div>
                    <p className="text-xs text-muted-foreground">
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      Total Revenue This Month
                    </CardTitle>

                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">₹50,000</div>
                    <p className="text-xs text-muted-foreground">
                    </p>
                  </CardContent>
                </Card>
              </div>
              <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-7">
                <Card className="col-span-4 md:col-span-3">
                  <CardHeader>
                    <CardTitle>Recent Bookings</CardTitle>
                    <CardDescription>
                      Total 50
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <RecentBookings />
                  </CardContent>
                </Card>

                <Card className="col-span-4">
                  <CardHeader>
                    <CardTitle>Overview</CardTitle>
                  </CardHeader>
                  <CardContent className="pl-2">
                    <pre className="mt-2 w-full rounded-md bg-slate-950 p-4 overflow-auto">
                      <code className="text-white text-xs md:text-sm">
                        {Object.keys(booking ?? {}).map((key) => {
                          const value = booking![key as keyof typeof booking];
                          const formattedValue = typeof value === 'object' && value !== null
                            ? `\n${formatObject(value)}`
                            : value

                          return <div key={key}>{`${key} - ${formattedValue}`}</div>;
                        })}
                      </code>
                    </pre>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </ScrollArea>
    );
  } else {
    return <div>
      <ScrollArea className="h-full">
        <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
          <div className="flex items-center justify-between space-y-2">
            <h2 className="text-3xl font-bold tracking-tight">
              Admin Dashboard
            </h2>
            <div className="hidden md:flex items-center space-x-2">
              <Button><Link href={"/admin/bookings/create"} >Create Booking</Link></Button>
            </div>
          </div>
          <Tabs defaultValue="overview" className="space-y-4">
            <TabsList>
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="analytics" disabled>
                Analytics
              </TabsTrigger>
            </TabsList>
            <TabsContent value="overview" className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      Vacant Rooms
                    </CardTitle>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      className="h-4 w-4 text-muted-foreground"
                    >
                    </svg>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">50</div>
                    <p className="text-xs text-muted-foreground">

                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      Rooms Ready
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">27</div>
                    <p className="text-xs text-muted-foreground">
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Unconfirmed Bookings</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">12</div>
                    <p className="text-xs text-muted-foreground">
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      Total Revenue This Month
                    </CardTitle>

                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">₹50,000</div>
                    <p className="text-xs text-muted-foreground">
                    </p>
                  </CardContent>
                </Card>
              </div>
              <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-7">
                <Card className="col-span-4 md:col-span-3">
                  <CardHeader>
                    <CardTitle>Recent Bookings</CardTitle>
                    <CardDescription>
                      Total 50
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <RecentBookings />
                  </CardContent>
                </Card>

                <Card className="col-span-4">
                  <CardHeader>
                    <CardTitle>Overview</CardTitle>
                  </CardHeader>
                  <CardContent className="pl-2">
                    <pre className="mt-2 w-full rounded-md bg-slate-950 p-4 overflow-auto">
                      <code className="text-white">{JSON.stringify("", null, 2)}</code>
                    </pre>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </ScrollArea>
    </div>
  }
}


