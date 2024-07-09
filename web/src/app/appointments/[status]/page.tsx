
export default async function AppointmentStatus({ params }: { params: { status: string } }) {

  const { status } = params;
  return (
    <div className="text-center px-8 py-8">
      <h1>Seu agendamento foi {status}.</h1>
      {status === "Aceito" && (
        <p>
          Você receberá o contato do cliente em instantes via WhatsApp, por
          favor, aguarde.
        </p>
      )}
    </div>
  );
}
