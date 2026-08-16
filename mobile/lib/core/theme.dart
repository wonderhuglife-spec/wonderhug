import 'package:flutter/material.dart';

class WonderHugColors {
  static const purple = Color(0xFF79409B);
  static const teal = Color(0xFF309292);
  static const navy = Color(0xFF2F4275);
  static const tealSoft = Color(0xFFF0FDFA);
  static const ink = Color(0xFF1F2937);
  static const slate = Color(0xFF64748B);
  static const muted = Color(0xFF94A3B8);
  static const line = Color(0xFFE5E7EB);
  static const canvas = Color(0xFFF8FAFA);
}

ThemeData wonderHugTheme() {
  final base = ThemeData(
    useMaterial3: true,
    colorScheme: ColorScheme.fromSeed(
      seedColor: WonderHugColors.teal,
      primary: WonderHugColors.purple,
      secondary: WonderHugColors.teal,
      surface: Colors.white,
    ),
    scaffoldBackgroundColor: Colors.white,
  );
  return base.copyWith(
    appBarTheme: const AppBarTheme(
      backgroundColor: Colors.white,
      foregroundColor: WonderHugColors.ink,
      elevation: 0,
    ),
    navigationBarTheme: NavigationBarThemeData(
      indicatorColor: WonderHugColors.tealSoft,
      labelTextStyle: WidgetStateProperty.all(
        const TextStyle(fontSize: 12, fontWeight: FontWeight.w600),
      ),
    ),
  );
}
