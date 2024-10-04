"use client";

import { Box, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import { useRouter } from "next/navigation";
import ImportContactsTwoToneIcon from "@mui/icons-material/ImportContactsTwoTone"; // Student Login Icon
import { FaBuilding } from "react-icons/fa6"; // Company Login Icon
//import { FaChalkboardTeacher } from "react-icons/fa6"; // Faculty Login Icon

// Define menu options with icons and paths
interface NavOption {
  name: string;
  path: string;
  icon: JSX.Element;
}

const navOptions: NavOption[] = [
  { name: "Student Login", path: "/studentLogin", icon: <ImportContactsTwoToneIcon /> },
  { name: "Company Login", path: "/companyLogin", icon: <FaBuilding /> },
  { name: "Faculty Login", path: "/facultyLogin", icon: <FaChalkboardTeacher /> },
];

export default function NavOptions() {
  const router = useRouter();

  return (
    <Box className="hidden md:flex flex-row">
      <List className="flex-row flex text-black">
        {navOptions.map((option, index) => (
          <ListItem key={index} disablePadding>
            <ListItemButton
              className="mr-4"
              onClick={() => router.push(option.path)} // Navigate to the corresponding route
            >
              <ListItemIcon>{option.icon}</ListItemIcon> {/* Render the icon */}
              <ListItemText primary={option.name} className="hover:underline" />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );
}


// "use client";

// import Link from "next/link";
// import LogoText from "../LogoText";
// import NavOptions from "./NavSubComponents/NavOptions";
// import { Button } from "@/components/ui/button";

// export default function LandingNav() {
//   return (
//     <div className="flex flex-row items-center justify-between mx-2 lg:mx-4">
//       <LogoText />
//       <NavOptions />
//       <Button className="mx-1 lg:ml-4 bg-white border-[1px] border-black">
//         <Link href="/login" className="text-black text-[10px]">
//           Request a Demo
//         </Link>
//       </Button>
//     </div>
//   );
// }
