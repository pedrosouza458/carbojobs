import { Cities } from "../../../../shared/enums/citites";
import { Roles } from "../../../../shared/enums/roles";
import { Services } from "../../../../shared/enums/services";
import {
  AppointmentStatus,
  BusinessStatus,
} from "../../../../shared/enums/status";
import { Days } from "../../../../shared/enums/Days";
import { Hours } from "../../../../shared/enums/hours";
import { sql } from "../lib/db";
// @ts-ignore
import { nanoid } from "nanoid";
import { hash } from "bcryptjs";

async function Seed() {
  await sql/*sql*/ `TRUNCATE TABLE users CASCADE;`;
  await sql/*sql*/ `TRUNCATE TABLE business CASCADE;`;
  await sql/*sql*/ `TRUNCATE TABLE appointments CASCADE;`;
  await sql/*sql*/ `TRUNCATE TABLE links CASCADE;`;

  const firstUserId = nanoid();
  const SecondUserId = nanoid();
  const ThirdUserId = nanoid();
  const FourthUserId = nanoid();
  const FifthUserId = nanoid();
  const SixthUserId = nanoid();

  const Week = [Days.SEGUNDA, Days.TERCA, Days.QUARTA, Days.QUINTA, Days.SEXTA];

  const HoursList = [
    Hours.SEIS_MANHA,
    Hours.SEIS_MEIA_MANHA,
    Hours.SETE_MANHA,
    Hours.SETE_MEIA_MANHA,
    Hours.OITO_MANHA,
    Hours.OITO_MEIA_MANHA,
    Hours.NOVE_MANHA,
    Hours.NOVE_MEIA_MANHA,
    Hours.DEZ_MANHA,
    Hours.DEZ_MEIA_MANHA,
    Hours.ONZE_MANHA,
    Hours.ONZE_MEIA_MANHA,
  ];

  await sql/*sql*/ `
   INSERT INTO "users" 
   ("id", "name", "email", "avatar_url",  "description", "password", "role", "city", "service", "days", "hours" ,"indicated")
   VALUES(${firstUserId}, 'John doe', 
    'johndoe@gmail.com', 
    'https://images.unsplash.com/photo-1565954786194-d22abeaac3ae?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', 
   'Lorem ipsum dolor sit amet. Hic optio possimus ut maxime minus sit cupiditate placeat ut accusamus aliquid rem galisum praesentium et accusantium corporis. Rem dolores repellendus et debitis quia et voluptatem sapiente et reiciendis numquam. Non consequatur laborum ut Quis pariatur eum modi error qui repellendus velit est vero maiores!', 
   ${await hash("123456", 6)}, ${Roles.PROVIDER}, ${Cities.CHARQUEADAS}, ${
    Services.ARTESÃO
  }, 
   ${Week},
  ${HoursList}, 20
  );
  `;

  await sql/*sql*/ `
INSERT INTO "users" 
("id", "name", "email", "password", "role", "city")
VALUES(${SecondUserId},'Fulana da Silvca', 'fulanadasilva@gmail.com', ${await hash(
    "123456",
    6
  )}, ${Roles.CLIENT}, ${Cities.ARAMBARE});
`;

  await sql/*sql*/ `
  INSERT INTO "users" 
  ("id", "name", "email", "avatar_url", "password", "role", "city", "service", "description" , "days", "hours" , "indicated")
   VALUES(${ThirdUserId},'João Gonçalves', 'fulanodasilva@gmail.com', 
   'https://images.unsplash.com/photo-1581094480465-4e6c25fb4a52?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', 
   ${await hash("123456", 6)}, ${Roles.PROVIDER}, ${Cities.CHARQUEADAS}, ${
    Services.CHAVEIRO
  },  'Sou o fulano da silva'
  , 
   ${Week},
  ${HoursList}, 13);
`;

  await sql/*sql*/ `
  INSERT INTO "users" 
  ("id", "name", "email", "avatar_url", "password", "role", "city", "service", "description" , "days", "hours", "indicated")
   VALUES(${FourthUserId},'Denise Alessandra', 'deniseale@gmail.com', 
   'https://images.unsplash.com/photo-1484863137850-59afcfe05386?q=80&w=2942&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', 
   ${await hash("123456", 6)}, ${Roles.PROVIDER}, ${Cities.CRISTAL}, ${
    Services.LIMPEZA
  },  'Sou a Denise', 
  ${Week},
 ${HoursList}, 60);
`;
  await sql/*sql*/ `
  INSERT INTO "users" 
  ("id", "name", "email", "avatar_url", "password", "role", "city", "service", "description", "days", "hours", "indicated")
   VALUES(${FifthUserId},'Monique Gomes', 'monique@gmail.com', 
   'https://plus.unsplash.com/premium_photo-1663020034458-ae4ced0720ca?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', 
   ${await hash("123456", 6)}, ${Roles.PROVIDER}, ${Cities.SAO_JERONIMO}, ${
    Services.FERREIRO
  },  'Sou a Monique', 
  ${Week},
 ${HoursList}, 2);
`;

  await sql/*sql*/ `
INSERT INTO "users" 
("id", "name", "email", "password", "role", "city")
VALUES(${SixthUserId},'Joana doe', 'joanadoe@gmail.com', ${await hash(
    "123456",
    6
  )}, ${Roles.CLIENT}, ${Cities.ARAMBARE});
`;

  const firstBusinessId = nanoid();
  const SecondBusinessId = nanoid();
  const ThirdBusinessId = nanoid();
  const FourthBusinessId = nanoid();

  const firstBusinessPrice = 150.0;
  const SecondBusinessPrice = 250.0;

  await sql/*sql*/ `
   INSERT INTO "business" 
   ("id", "price", "description", "provider_id", "title")
   VALUES(${firstBusinessId}, ${firstBusinessPrice},
   'Este serviço ofereca a criação de um boneco de madeira, personagem fica por escolha do cliente.',
    ${firstUserId}, 'Criação de boneco de madeira');
`;

  await sql/*sql*/ `
   INSERT INTO "business" 
   ("id", "price", "description", "provider_id", "title")
    VALUES(${SecondBusinessId}, ${firstBusinessPrice}, 
    'Crio mesas de madeira sob medida, com tamanhos variados.', ${firstUserId}, 'Criação de mesa');
   `;

  await sql/*sql*/ `
  INSERT INTO "business" 
   ("id", "price", "provider_id", "title")
    VALUES(${ThirdBusinessId}, ${SecondBusinessPrice}, 
    ${ThirdUserId}, 'Conserto de chave');
`;

  await sql/*sql*/ `
  INSERT INTO "business" 
   ("id", "price", "provider_id", "title")
    VALUES(${FourthBusinessId}, ${SecondBusinessPrice}, 
    ${FifthUserId}, 'Botar ferradura em cavalos');
`;

  const date = Date.now();
  const startDate = new Date(date);

  // Add 10 days to the startDate
  const endDate = new Date(startDate);
  endDate.setDate(startDate.getDate() + 7);
  startDate.toLocaleDateString("pt-BR");
  endDate.toLocaleDateString("pt-BR");

  await sql/*sql*/ `
  INSERT INTO "appointments" 
   ("id", "business_id", "name", "description", "date", "hour", "phone", "provider_id", "client_id")
    VALUES(${nanoid()}, ${firstBusinessId}, 'Joana Doe', 'Exemplo de agendamento', '12/07/2024', ${
    Hours.SETE_TARDE
  }, '5551997000856', ${firstUserId}, ${SecondUserId});
`;

  await sql/*sql*/ `
INSERT INTO "appointments" 
 ("id", "business_id", "name", "description", "date", "hour", "phone", "provider_id", "client_id", "status")
  VALUES(${nanoid()}, ${firstBusinessId}, 'Fulana da Silva', 'Exemplo de agendamento', '13/07/2024', ${
    Hours.SETE_MEIA_TARDE
  }, '5551997000856', ${firstUserId}, ${SixthUserId}, ${
    AppointmentStatus.ACCEPT
  });
`;

  await sql/*sql*/ `
INSERT INTO "appointments" 
 ("id", "business_id", "name", "description", "date", "hour", "phone", "provider_id", "client_id")
  VALUES(${nanoid()}, ${firstBusinessId}, 'Joana Doe', 'Exemplo de agendamento', '15/07/2024', ${
    Hours.OITO_MANHA
  }, '5551997000856', ${firstUserId}, ${SecondUserId});
`;

  await sql/*sql*/ `
INSERT INTO "appointments" 
 ("id", "business_id", "name", "description", "date", "hour", "phone", "provider_id", "client_id", "status")
  VALUES(${nanoid()}, ${firstBusinessId}, 'Fulana da Silva', 'Exemplo de agendamento', '17/07/2024', ${
    Hours.OITO_MEIA_MANHA
  }, '5551997000856', ${firstUserId}, ${SixthUserId}, ${
    AppointmentStatus.REFUSED
  });
`;

  await sql/*sql*/ `
  INSERT INTO "links" 
  ("id", "title", "url", "provider_id")
    VALUES(${nanoid()}, 'Instagram', 'https://www.instagram.com/so_souzxa/', ${firstUserId});
`;

  await sql/*sql*/ `
INSERT INTO "links" 
("id", "title", "url", "provider_id")
  VALUES(${nanoid()}, 'Twitter (X)', 'https://x.com/sosouzxa', ${firstUserId});
`;

  await sql.end();
  console.log("Seed feito com sucesso");
}

Seed();
