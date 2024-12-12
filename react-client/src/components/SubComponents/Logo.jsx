import { Image, Box } from "@chakra-ui/react";
import AnchorzUpLogo from "./AnchorzUpLogo.svg";

const Logo = () => {
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      width="100%"
    >
      <Image
        src={AnchorzUpLogo}
        alt="AnchorzUp Logo"
        style={{ padding: "25%" }}
      />
    </Box>
  );
};

export default Logo;
