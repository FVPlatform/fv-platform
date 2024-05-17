import { SignUp } from "@clerk/nextjs";
 
//Ruta dinamica donde se hace la importacion de Signup(Registro) y regresandolo

export default function Page() {
  return <SignUp />;
}