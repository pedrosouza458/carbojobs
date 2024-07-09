// import { getProfile } from "@/http/get-profile";
// import { getFirstName } from "@/utils/get-first-name";
// import { cookies } from "next/headers";

// export async function HomeMessage() {
//   const token = cookies().get("token")?.value;
//   let user: any;
//   if (token) {
//     user = await getProfile(token);
//   }

//   return (
//     <div>
//       {user && (
//         <>
//           {user.map((user: any) => (
//             <p className="text-center text-2xl font-semibold" key={user.id}>
//               Olá {getFirstName(user.name)}, confira nossos prestadores
//             </p>
//           ))}
//         </>
//       )}
//       {!user && (
//         <p className="text-center text-2xl font-semibold">
//           Confira nossos prestadores
//         </p>
//       )}
//     </div>
//   );
// }
