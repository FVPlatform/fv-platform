import { SignIn } from "@clerk/nextjs";

//Ruta dinamica donde se hace la importacion de Signin(Inicio de sesion) y regresandolo

export default function Page() {
  return <SignIn />;
}