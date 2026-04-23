import { scale, moderateScale } from "react-native-size-matters";

export const spacing = {
  xs: moderateScale(4),
  sm: moderateScale(8),
  md: moderateScale(12),
  lg: moderateScale(16),
  xl: moderateScale(20),
  xxl: moderateScale(24),
  xxxl: moderateScale(32),
  full: scale(30),
  iconContainer: moderateScale(40),
  iconSize: moderateScale(22),
};