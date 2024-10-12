import 'package:app/data/application_form/model/user_google_login_req.dart';
import 'package:dartz/dartz.dart';

abstract class AuthRepository {
  Future<Either<Exception, UserGoogleLoginReq>> googleSignIn();
}
