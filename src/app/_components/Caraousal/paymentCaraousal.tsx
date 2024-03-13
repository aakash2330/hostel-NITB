"use client"
import * as React from "react"
import paymentLogo from "public/animat-checkmark.gif"

import { Card, CardContent } from "~/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "~/components/ui/carousel"
import { Label } from "~/components/ui/label"
import CardDetails from "../payment/CardDetails"
import { Button } from "~/components/ui/button"
import { Input } from "~/components/ui/input"
import Image from "next/image"
import Link from "next/link"

export function PaymentCarousel() {
  const [api, setApi] = React.useState<CarouselApi>()

  React.useEffect(() => {
    if (!api) {
      return
    }

    api.on("select", () => {
      console.log("asd")
      // Do something on select.
    })
  }, [api])

  return (
    <div>
      <Carousel setApi={setApi} className="size-[20rem] md:size-[40rem]">
        <CarouselContent>
          <CarouselItem>
            <Card>
              <CardContent className="flex gap-2 flex-col aspect-square items-center justify-center p-6">
                <CardDetails></CardDetails>
                <Button>
                  <Label htmlFor="next">Next</Label>
                </Button>
              </CardContent>
            </Card>
          </CarouselItem>


          <CarouselItem>
            <Card>
              <CardContent className="flex gap-2 flex-col aspect-square items-center justify-center p-6">
                <div>
                  <div>OTP</div>
                  <Input placeholder="xxxx"></Input>
                </div>
                <Button>
                  <Label htmlFor="next">Next</Label>
                </Button>
              </CardContent>
            </Card>
          </CarouselItem>


          <CarouselItem>
            <Card>
              <CardContent className="flex flex-col   gap-2  aspect-square items-center justify-center p-6">
                <Image src={paymentLogo} alt="loading..." />
                <div className="text-2xl">Payment Successful</div>
                <Button>
                  <Link href={"/"}>Done</Link>

                </Button>
              </CardContent>
            </Card>
          </CarouselItem>



        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext id="next" />
      </Carousel>
      <div className="py-2 text-center text-sm text-muted-foreground">
      </div>
    </div>
  )
}
