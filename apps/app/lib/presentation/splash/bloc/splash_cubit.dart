// splash_cubit.dart
import 'package:bloc/bloc.dart';
import 'package:app/presentation/splash/bloc/splash_state.dart';

import 'package:app/service_locator.dart'; // Assume you're using service locators

class SplashCubit extends Cubit<SplashState> {
  SplashCubit() : super(DisplaySplash());

  void appStarted() async {
    // await Future.delayed(
    //     const Duration(seconds: 2)); // Show splash for 2 seconds
    // var isLoggedIn =
    //     await sl<IsLoggedInUseCase>().call(); // Check if user is logged in

    // if (isLoggedIn) {
    //   emit(Authenticated()); // User is authenticated, emit Authenticated state
    // } else {
    //   emit(
    //       UnAuthenticated()); // User is not authenticated, emit UnAuthenticated state
    // }
  }
}
