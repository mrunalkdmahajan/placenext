import 'package:flutter/material.dart';

class HomePage extends StatelessWidget {
  const HomePage({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text("Student Dashboard"),
        // actions: [Icon(Icons.circle)],
        leading: Icon(Icons.arrow_back),
      ),
      // bottomNavigationBar: BottomNavigationBar(),

      body: Center(
        child: Text("hello"),
      ),
    );
  }
}
