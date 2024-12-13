import 'package:animated_text_kit/animated_text_kit.dart';
import 'package:app/common/helper/navigator/app_navigator.dart';
import 'package:app/presentation/dashboard/pages/home.dart';

import 'package:flutter/material.dart';

class SplashPage extends StatelessWidget {
  const SplashPage({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Center(
        child: Padding(
          padding: const EdgeInsets.all(60.0),
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              Image.asset('assets/images/PlaceNext_logo.png'),
              const SizedBox(height: 10),
              AnimatedTextKit(
                animatedTexts: [
                  TyperAnimatedText(
                    'PlaceNext',
                    textStyle: const TextStyle(
                      fontSize: 32.0,
                      fontWeight: FontWeight.bold,
                      color: Colors.blueAccent,
                    ),
                    speed: const Duration(milliseconds: 150),
                  ),
                ],
                totalRepeatCount: 1,
                onFinished: () {
                  // Navigate to the next screen after animation finishes
                  AppNavigator.pushAndReplacement(
                      context, const HomePage()); // Use your actual route here
                },
              ),
            ],
          ),
        ),
      ),
    );
  }
}
