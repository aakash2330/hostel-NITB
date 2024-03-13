import { Answer, BookingStatus, Category, CleaningStatus, Country, Floor, Gender, GuestHouse, IDCardType, MaritalStatus, Nationality, Occupancy, PrismaClient, Religion, RoomTariff, RoomType, State, TypeOrg, UserPermissionRole } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const user1 = await prisma.user.create({
    data: {
      name: "user1" + Math.random(),
      email: "user1@user1" + Math.random(),
      role: UserPermissionRole.USER,
      password: "password"
    },
  });

  const guest1 = await prisma.guestProfile.create({
    data: {
      name: "John Doe" + Math.random(),
      email: "john.doe@example.com",
      alternativeEmail: "j.doe@anothermail.com",
      mobileNo: "1234567890",
      alternativeMobileNo: "0987654321",
      identity_card_type: IDCardType.DRIVING_LICENSE, // Assuming PASSPORT is an enum value for IDCardType
      id_card_no: "X1234567",
      fatherHusbandName: "Jane Doe",
      nationality: Nationality.INDIAN, // Assuming AMERICAN is an enum value for Nationality
      religion: Religion.HINDU, // Assuming CHRISTIANITY is an enum value for Religion
      typeOrg: TypeOrg.PRIVATE, // Assuming PRIVATE is an enum value for TypeOrg
      designation: "Developer",
      orgName: "Tech Solutions Inc",
      orgEmail: "contact@techsolutions.com",
      orgPhone: "1112223333",
      orgWebsite: "https://www.techsolutions.com",
      residentialCity: "New York",
      residentialDistt: "New York",
      residentialState: State.MAHARASTRA, // Assuming NY is an enum value for State
      country: Country.INDIA, // Assuming USA is an enum value for Country
      orgAddress: "123 Tech Park, Silicon Alley, New York, NY, 10001",
      physicallyChallenged: Answer.NO, // Assuming NO is an enum value for Answer
      gender: Gender.MALE, // Assuming MALE is an enum value for Gender
      category: Category.GEN, // Assuming GENERAL is an enum value for Category
      localAddress: "123 Main St, Apt 4B, New York, NY, 10001",
      permanentAddress: "456 Country Rd, Springfield, IL, 62701",
      dob: new Date("1990-01-01T00:00:00Z"),
      maritalStatus: MaritalStatus.MARRIED, // Assuming SINGLE is an enum value for MaritalStatus
      remark: "No remarks.",
      userId: user1.id

    }
  })


  const guest2 = await prisma.guestProfile.create({
    data: {
      name: "guest2",
      email: "john.doe@example.com",
      alternativeEmail: "j.doe@anothermail.com",
      mobileNo: "1234567890",
      alternativeMobileNo: "0987654321",
      identity_card_type: IDCardType.DRIVING_LICENSE, // Assuming PASSPORT is an enum value for IDCardType
      id_card_no: "X1234567",
      fatherHusbandName: "Jane Doe",
      nationality: Nationality.INDIAN, // Assuming AMERICAN is an enum value for Nationality
      religion: Religion.HINDU, // Assuming CHRISTIANITY is an enum value for Religion
      typeOrg: TypeOrg.PRIVATE, // Assuming PRIVATE is an enum value for TypeOrg
      designation: "Developer",
      orgName: "Tech Solutions Inc",
      orgEmail: "contact@techsolutions.com",
      orgPhone: "1112223333",
      orgWebsite: "https://www.techsolutions.com",
      residentialCity: "New York",
      residentialDistt: "New York",
      residentialState: State.MAHARASTRA, // Assuming NY is an enum value for State
      country: Country.INDIA, // Assuming USA is an enum value for Country
      orgAddress: "123 Tech Park, Silicon Alley, New York, NY, 10001",
      physicallyChallenged: Answer.NO, // Assuming NO is an enum value for Answer
      gender: Gender.MALE, // Assuming MALE is an enum value for Gender
      category: Category.GEN, // Assuming GENERAL is an enum value for Category
      localAddress: "123 Main St, Apt 4B, New York, NY, 10001",
      permanentAddress: "456 Country Rd, Springfield, IL, 62701",
      dob: new Date("1990-01-01T00:00:00Z"),
      maritalStatus: MaritalStatus.MARRIED, // Assuming SINGLE is an enum value for MaritalStatus
      remark: "No remarks.",
      userId: user1.id

    }
  })


  const bookingDetail1 = await prisma.bookingDetails.create({
    data: {
      guestName: guest1.name + Math.random(),
      guestEmail: guest1.email,
      guestMobileNo: guest1.mobileNo,
      guestIdCardType: guest1.identity_card_type, // Assuming DRIVING_LICENSE is an enum value for IDCardType
      guestIdCardNo: guest1.id_card_no,
      guestIdCardUploaded: "YES", // Assuming YES is an enum value for Answer
      guestAddress: guest1.permanentAddress,
      guestOfficeAdd: guest1.orgAddress,
      guestDesignation: guest1.designation,
      guestType: TypeOrg.PRIVATE, // Assuming CORPORATE is an enum value for TypeOrg
      guestProfileId: guest1.id, // This should be a valid ID from the `guestProfiles` table
      bookingOrderNo: "BOOK123456789",
      bookingStatus: BookingStatus.VACANT, // Assuming CONFIRMED is an enum value for BookingStatus
      hostelName: GuestHouse.EXECUTIVE_GUEST_HOUSE, // Assuming MAIN_GUEST_HOUSE is an enum value for GuestHouse
      roomTarrif: RoomTariff.EXECTIVE_3500, // Assuming STANDARD is an enum value for RoomTariff
      nosRoom: "2",
      nosguest: "4",
      updateBy: "Candidate",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      bookingPersonName: "Chris Johnson",
      bookingPersonMobileNo: "1234567890",
      bookingPersonEmail: "chris.johnson@example.com",
      bookingDate: new Date().toISOString(),
      bookedFromDt: new Date(new Date().setDate(new Date().getDate() + 7)).toISOString(),
      bookedToDt: new Date(new Date().setDate(new Date().getDate() + 10)).toISOString(),
      remark: "Looking forward to the stay.",
      bookingPersonProfileId: "clsxpbrel0000usrl2nl70tfe", // This should be a valid ID from the `guestProfiles` table
      bookPaymentId: "cuid789payment" // This should be a valid ID from the `bookingPayments` table
    }
  })

  const bookingDetail2 = await prisma.bookingDetails.create({
    data: {
      guestName: guest2.name,
      guestEmail: guest2.email,
      guestMobileNo: guest2.mobileNo,
      guestIdCardType: guest2.identity_card_type, // Assuming DRIVING_LICENSE is an enum value for IDCardType
      guestIdCardNo: guest2.id_card_no,
      guestIdCardUploaded: "YES", // Assuming YES is an enum value for Answer
      guestAddress: guest2.permanentAddress,
      guestOfficeAdd: guest2.orgAddress,
      guestDesignation: guest2.designation,
      guestType: TypeOrg.PRIVATE, // Assuming CORPORATE is an enum value for TypeOrg
      guestProfileId: guest2.id, // This should be a valid ID from the `guestProfiles` table
      bookingOrderNo: "BOOK123456789",
      bookingStatus: BookingStatus.VACANT, // Assuming CONFIRMED is an enum value for BookingStatus
      hostelName: GuestHouse.EXECUTIVE_GUEST_HOUSE, // Assuming MAIN_GUEST_HOUSE is an enum value for GuestHouse
      roomTarrif: RoomTariff.EXECTIVE_3500, // Assuming STANDARD is an enum value for RoomTariff
      nosRoom: "2",
      nosguest: "4",
      updateBy: "Candidate",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      bookingPersonName: "Chris Johnson",
      bookingPersonMobileNo: "1234567890",
      bookingPersonEmail: "chris.johnson@example.com",
      bookingDate: new Date().toISOString(),
      bookedFromDt: new Date(new Date().setDate(new Date().getDate() + 7)).toISOString(),
      bookedToDt: new Date(new Date().setDate(new Date().getDate() + 10)).toISOString(),
      remark: "Looking forward to the stay.",
      bookingPersonProfileId: "clsxpbrel0000usrl2nl70tfe", // This should be a valid ID from the `guestProfiles` table
      bookPaymentId: "cuid789payment" // This should be a valid ID from the `bookingPayments` table
    }
  })

  const saranRoomPictures = ["https://aakash2330-drippy.s3.amazonaws.com/NITTTR/saran/fwdsaranguesthouselatestphotograph/_DSC0346+(2).JPG", "https://aakash2330-drippy.s3.amazonaws.com/NITTTR/saran/fwdsaranguesthouselatestphotograph/DSC_0127.JPG", "https://aakash2330-drippy.s3.amazonaws.com/NITTTR/saran/fwdsaranguesthouselatestphotograph/DSC_0136.JPG", "https://aakash2330-drippy.s3.amazonaws.com/NITTTR/saran/fwdsaranguesthouselatestphotograph/DSC_0137.JPG", "https://aakash2330-drippy.s3.amazonaws.com/NITTTR/saran/fwdsaranguesthouselatestphotograph/DSC_0140.JPG"]
  for (let i = 0; i < saranRoomPictures.length; i++) {
    const roomDetails = await prisma.roomDetails.create({
      data: {
        code: "RM100" + i,
        roomImg: saranRoomPictures,
        hostelName: GuestHouse.SARAN_GUEST_HOUSE,
        value: "Deluxe Room",
        ghName: "Grand Hotel",
        roomType: RoomType.FOUR_BED, // Assuming DELUXE is a valid enum value for RoomType
        occupancy: Occupancy.DOUBLE, // Assuming DOUBLE is a valid enum value for Occupancy
        floor: Floor.FIRST_FLOOR, // Assuming FIRST_FLOOR is a valid enum value for Floor
        ac: Answer.YES, // Assuming YES is a valid enum value for Answer
        geaser: Answer.YES, // Assuming YES is a valid enum value for Answer
        airCooled: Answer.NO, // Assuming NO is a valid enum value for Answer
        maxAdult: "2",
        maxChild: "2",
        remark: "Experience comfort and convenience in our single rooms at NITTTR Bhopal. Perfect for solo travelers or individuals seeking privacy. Explore our affordable accommodation options today!",
        updateBy: "Admin",
        updateDt: new Date().toISOString(),
        roomTarrif: RoomTariff.EXECTIVE_3500, // Assuming STANDARD is a valid enum value for RoomTariff
        rentPerDay: "1000.00",
        taxes: "180.00",
        totalChargePerDay: "1180.00",
        bookingStatus: BookingStatus.BOOKED, // Assuming AVAILABLE is a valid enum value for BookingStatus
        cleaningStatus: CleaningStatus.READY, // Assuming CLEAN is a valid enum value for CleaningStatus
        lastCleaningDate: new Date().toISOString(),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      }

    })
  }

  const executeRoomPictures = ["https://aakash2330-drippy.s3.amazonaws.com/NITTTR/fwdexecutivehostelphotograph/DSC_1095.JPG", "https://aakash2330-drippy.s3.amazonaws.com/NITTTR/fwdexecutivehostelphotograph/DSC_1107.JPG", "https://aakash2330-drippy.s3.amazonaws.com/NITTTR/fwdexecutivehostelphotograph/DSC_1115.JPG", "https://aakash2330-drippy.s3.amazonaws.com/NITTTR/fwdexecutivehostelphotograph/DSC_1120.JPG"]
  for (let i = 0; i < executeRoomPictures.length; i++) {
    const roomDetails = await prisma.roomDetails.create({
      data: {
        code: "EX100" + i,
        roomImg: executeRoomPictures,
        hostelName: GuestHouse.EXECUTIVE_GUEST_HOUSE,
        value: "Deluxe Room",
        ghName: "Grand Hotel",
        roomType: RoomType.SINGLE_BED, // Assuming DELUXE is a valid enum value for RoomType
        occupancy: Occupancy.SINGLE, // Assuming DOUBLE is a valid enum value for Occupancy
        floor: Floor.FIRST_FLOOR, // Assuming FIRST_FLOOR is a valid enum value for Floor
        ac: Answer.YES, // Assuming YES is a valid enum value for Answer
        geaser: Answer.YES, // Assuming YES is a valid enum value for Answer
        airCooled: Answer.NO, // Assuming NO is a valid enum value for Answer
        maxAdult: "2",
        maxChild: "2",
        remark: "Experience a blend of comfort and sophistication in our Executive Double Room at the prestigious NITTTR Bhopal Guesthouse. Designed with your utmost comfort in mind, our spacious double room offers a serene ambiance, perfect for unwinding after a day of exploration.",
        updateBy: "Admin",
        updateDt: new Date().toISOString(),
        roomTarrif: RoomTariff.EXECTIVE_3500, // Assuming STANDARD is a valid enum value for RoomTariff
        rentPerDay: "2000.00",
        taxes: "180.00",
        totalChargePerDay: "2180.00",
        bookingStatus: BookingStatus.BOOKED, // Assuming AVAILABLE is a valid enum value for BookingStatus
        cleaningStatus: CleaningStatus.READY, // Assuming CLEAN is a valid enum value for CleaningStatus
        lastCleaningDate: new Date().toISOString(),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      }

    })
  }


  const viswesawraiyaguesthousePictures = ["https://aakash2330-drippy.s3.amazonaws.com/NITTTR/fwdviswesawraiyaguesthouse/_DSC0140.JPG", "https://aakash2330-drippy.s3.amazonaws.com/NITTTR/fwdviswesawraiyaguesthouse/DSC_0067.JPG", "https://aakash2330-drippy.s3.amazonaws.com/NITTTR/fwdviswesawraiyaguesthouse/DSC_0111.JPG", "https://aakash2330-drippy.s3.amazonaws.com/NITTTR/fwdviswesawraiyaguesthouse/DSC_1422.JPG"]
  for (let i = 0; i < viswesawraiyaguesthousePictures.length; i++) {
    const roomDetails = await prisma.roomDetails.create({
      data: {
        code: "EX100" + i,
        roomImg: viswesawraiyaguesthousePictures,
        hostelName: GuestHouse.VISHVESHVARAYA_GUEST_HOUSE,
        value: "Deluxe Room",
        ghName: "Grand Hotel",
        roomType: RoomType.FOUR_BED, // Assuming DELUXE is a valid enum value for RoomType
        occupancy: Occupancy.TRIPLE, // Assuming DOUBLE is a valid enum value for Occupancy
        floor: Floor.GROUND_FLOOR, // Assuming FIRST_FLOOR is a valid enum value for Floor
        ac: Answer.YES, // Assuming YES is a valid enum value for Answer
        geaser: Answer.YES, // Assuming YES is a valid enum value for Answer
        airCooled: Answer.NO, // Assuming NO is a valid enum value for Answer
        maxAdult: "2",
        maxChild: "2",
        remark: "Discover spacious and cozy double rooms at NITTTR Bhopal, ideal for couples or friends traveling together. Enjoy a comfortable stay with modern amenities. Book your room now!",
        updateBy: "Admin",
        updateDt: new Date().toISOString(),
        roomTarrif: RoomTariff.EXECTIVE_3500, // Assuming STANDARD is a valid enum value for RoomTariff
        rentPerDay: "800.00",
        taxes: "180.00",
        totalChargePerDay: "980.00",
        bookingStatus: BookingStatus.BOOKED, // Assuming AVAILABLE is a valid enum value for BookingStatus
        cleaningStatus: CleaningStatus.READY, // Assuming CLEAN is a valid enum value for CleaningStatus
        lastCleaningDate: new Date().toISOString(),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      }

    })
  }

}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
