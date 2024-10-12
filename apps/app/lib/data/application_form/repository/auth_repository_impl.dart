import 'package:app/data/application_form/model/user_google_login_req.dart';
import 'package:app/domain/auth/repository/auth.dart';
import 'package:dartz/dartz.dart';
import 'package:google_sign_in/google_sign_in.dart';

class AuthRepositoryImpl extends AuthRepository {
  final GoogleSignIn _googleSignIn = GoogleSignIn();

  @override
  Future<Either<Exception, UserGoogleLoginReq>> googleSignIn() async {
    try {
      final account = await _googleSignIn.signIn();
      if (account != null) {
        return Right(UserGoogleLoginReq(
          displayName: account.displayName,
          email: account.email,
          photoUrl: account.photoUrl,
        ));
      } else {
        return Left(Exception("Google Sign-In canceled by user."));
      }
    } catch (e) {
      return Left(Exception("Error during Google Sign-In: $e"));
    }
  }
}
