import 'package:flutter/material.dart';

class HomePage extends StatelessWidget {
  const HomePage({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text("Student Dashboard"),
        // actions: [Icon(Icons.circle)],
        leading: const Icon(Icons.arrow_back),
      ),
      // bottomNavigationBar: BottomNavigationBar(),

      body: const Center(
        child: Text("hello"),
      ),
    );
  }
}
