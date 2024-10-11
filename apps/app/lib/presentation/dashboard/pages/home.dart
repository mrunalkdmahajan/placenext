import 'package:app/common/helper/navigator/app_navigator.dart';
import 'package:flutter/material.dart';

class HomePage extends StatelessWidget {
  const HomePage({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text("Student Dashboard"),
        // actions: [Icon(Icons.circle)],
        leading: IconButton(
          icon: Icon(Icons.arrow_back),
          onPressed: () {
            AppNavigator.pop(context);
          },
        ),
      ),
      // bottomNavigationBar: BottomNavigationBar(),

      body: Center(
        child: Text("hello"),
      ),
    );
  }
}
