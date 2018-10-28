export class User {
  n_socio: string;
  email: string;
  password: string;
  permision: string;

  constructor(n_socio: string, email: string, password: string, permision: string) {
    this.n_socio = n_socio;
    this.email = email;
    this.password = password;
    this.permision = permision;
  }
}
