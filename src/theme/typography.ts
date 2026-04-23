import { moderateScale } from "react-native-size-matters";

export const Typography = {
  fontSize: {
    xs: moderateScale(10),
    sm: moderateScale(12),
    md: moderateScale(16),
    lg: moderateScale(18),
    xl: moderateScale(24),
  },
  // fontWeight: {
  //   regular: "400" as const,
  //   medium: "500" as const,
  //   semibold: "600" as const,
  //   bold: "700" as const,
  // },
  fontFamily: {
    light: "Ubuntu-Light" as const,
    regular: "Ubuntu-Regular" as const,
    medium: "Ubuntu-Medium" as const,
    bold: "Ubuntu-Bold" as const,
  },
};