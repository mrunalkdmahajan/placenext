import 'package:animated_text_kit/animated_text_kit.dart';
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
            mainAxisAlignment:
                MainAxisAlignment.center, // Center the content vertically
            children: [
              Image.asset('assets/images/PlaceNext_logo.png'),
              const SizedBox(height: 10), // Add space between image and text
              _AnimatedText(), // This will now display the animated text
            ],
          ),
        ),
      ),
    );
  }

  Widget _AnimatedText() {
    return AnimatedTextKit(
      animatedTexts: [
        TyperAnimatedText(
          'Placenext',
          textStyle: const TextStyle(
            fontSize: 32.0,
            fontWeight: FontWeight.bold,
          ),
          speed: const Duration(milliseconds: 150),
        ),
      ],
      totalRepeatCount: 1, // Number of times to repeat the animation
      pause: const Duration(milliseconds: 1000), // Pause between repeats
      displayFullTextOnTap: true, // Display full text if tapped
    );
  }
}
