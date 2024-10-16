import 'package:app/firebase_options.dart';
import 'package:app/presentation/dashboard/pages/home.dart';
import 'package:app/presentation/splash/pages/splash.dart';
// import 'package:app/service_locator.dart';
import 'package:firebase_core/firebase_core.dart';
import 'package:flutter_dotenv/flutter_dotenv.dart';
import 'package:flutter/material.dart';

Future<void> main() async {
  await dotenv.load(fileName: ".env");
  WidgetsFlutterBinding.ensureInitialized();
  await Firebase.initializeApp(options: DefaultFirebaseOptions.currentPlatform);
  // await initializeDependencies();
  return runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      debugShowCheckedModeBanner: false,
      home: HomePage(),
      theme: ThemeData(
          appBarTheme:
              AppBarTheme(backgroundColor: Color.fromARGB(1, 237, 237, 255))),
    );
  }
}
