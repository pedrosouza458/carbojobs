import fastify from "fastify";
import fastifyCors from '@fastify/cors'
import fasitfyJwt from '@fastify/jwt'
import { GetProviders } from "./routes/users/providers/get-providers";
import { CreateUser } from "./routes/users/create-user";
import { GetProviderById } from "./routes/users/providers/get-provider-by-id";
import { UpdateUser } from "./routes/users/update-user";
import { LoginUser } from "./routes/users/login-user";
import { GetProfile } from "./routes/users/get-profile";
import { GetBusinessByProvider } from "./routes/business/get- business-by-provider";
import { GetLinksByProvider } from "./routes/links/get-links-by-provider";
import { GetBusinessDetails } from "./routes/business/get-business-details";
import { GetAppointments } from "./routes/appointments/get-appointments";
import { ChangeAppointmentStatus } from "./routes/appointments/change-appointment-status";
import { CreateBusiness } from "./routes/business/create-business";
import { CreateAppointment } from "./routes/appointments/create-appointment";
import { DeleteBusiness } from "./routes/business/delete-business";
import { IndicateProvider } from "./routes/indications/indicate-provider";
import { CreateLink } from "./routes/links/create-link";
import { DeleteUser } from "./routes/users/delete-user";
import { DeleteLink } from "./routes/links/delete-link";
import { GetAppointmentsByDay } from "./routes/(charts)/appointments/get-appointments-by-day";
import { GetAppointmentsByService } from "./routes/(charts)/appointments/get-appointments-by-service";
import { GetToken } from "./routes/tokens/get-token";
import { ForgotPassword } from "./routes/users/forgot-password";
import { HideAppointments } from "./routes/appointments/hide-appointment";

require('dotenv').config();
const app = fastify()

app.register(fastifyCors)

app.register(GetProviders)
app.register(GetProviderById)

app.register(CreateUser)
app.register(UpdateUser)
app.register(LoginUser)
app.register(GetProfile)
app.register(DeleteUser)
app.register(ForgotPassword)

app.register(GetBusinessByProvider)
app.register(GetBusinessDetails)
app.register(CreateBusiness)
app.register(DeleteBusiness)

app.register(GetLinksByProvider)

app.register(GetAppointments)
app.register(ChangeAppointmentStatus)
app.register(HideAppointments)
app.register(CreateAppointment)

app.register(CreateLink)
app.register(DeleteLink)

app.register(IndicateProvider)

app.register(GetAppointmentsByDay)
app.register(GetAppointmentsByService)

app.register(GetToken)

app.register(fasitfyJwt, {
  secret: process.env.JWT_SECRET as string,
})
const serverPort = process.env.SERVER_PORT ? parseInt(process.env.SERVER_PORT, 10) : 3001; 
app.listen({ port: serverPort}).then(() => {
  console.log('HTTP server running')
})
