import "package:app/src/pages/student/student_dashboard_screen.dart";
import "package:flutter/material.dart";

import "src/components/OnBoarding/on_boarding_screen.dart";
import "src/pages/student/login_screen.dart";

void main() {
  runApp(MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      debugShowCheckedModeBanner: false,
      initialRoute: "/student_login",
      routes: {
        "/": (context) => const OnBoardingScreen(),
        "/student_login": (context) => const LoginScreen(),
        "/student_register": (context) => const OnBoardingScreen(),
        "/student_dashboard": (context) => StudentDashboardScreen(),
        "/student_profile": (context) => const OnBoardingScreen(),
        "/college_login": (context) => const OnBoardingScreen(),
        "/college_register": (context) => const OnBoardingScreen(),
        "/college_dashboard": (context) => const OnBoardingScreen(),
        "/company_login": (context) => const OnBoardingScreen(),
        "/company_register": (context) => const OnBoardingScreen(),
        "/company_dashboard": (context) => const OnBoardingScreen(),
      },
    );
  }
}
