import xlsx, { IJsonSheet } from "json-as-xlsx";
import { api } from "~/trpc/react";
import { TbookingsValidator } from "~/utils/validators/bookingValidators";

function extractBookingDetailsColumn(booking: TbookingsValidator) {
  const keys = Object.keys(booking)
  const columns = keys.map((k) => { return { label: k, value: k } })
  return columns
}

export default function downloadToExcel({ bookings }: { bookings: TbookingsValidator[] }) {
  if (!!bookings.length) {
    let data = [
      {
        sheet: "Booking Details",
        columns: [
          ...extractBookingDetailsColumn(bookings[0]!)
        ],
        content: [
          ...bookings
        ],
      },
    ]
    let settings = {
      fileName: "Booking Details",
    };

    //@ts-ignore
    xlsx(data, settings);
  }
  else return
}
