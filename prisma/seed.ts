import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const MOCK_FLOOD_AREAS = [
  {
    id: 1,
    endereco: 'Rua General Frota',
    nivel: 'leve',
    status: 'approved',
    data: new Date('2025-05-19T20:00:00'),
    lat: -29.6509,
    lng: -50.7814,
    imageUrl: 'https://picsum.photos/id/1011/800/600',
  },
  {
    id: 2,
    endereco: 'Rua Pinheiro Machado',
    nivel: 'interditado',
    status: 'pending',
    data: new Date('2025-03-22T14:00:00'),
    lat: -29.6501,
    lng: -50.7852,
    imageUrl: 'https://picsum.photos/id/1025/800/600',
  },
  {
    id: 3,
    endereco: 'Av. Sebastião Amoreti',
    nivel: 'moderado',
    status: 'rejected',
    data: new Date('2025-02-15T17:00:00'),
    lat: -29.6468,
    lng: -50.7921,
    imageUrl: 'https://picsum.photos/id/1036/800/600',
  },
];

async function main() {
  console.log('🌱 Iniciando seed...');

  /* =========================
     FAQ
  ========================== */
  await prisma.faq.createMany({
    data: [
      {
        question: 'Como funciona a autenticação via SMS?',
        answer:
          'Após inserir seu número de celular, você receberá um código de verificação por SMS. Digite esse código no aplicativo para fazer login. Isso garante que apenas usuários autenticados possam acessar determinadas funcionalidades do aplicativo.',
      },
      {
        question: 'Como posso marcar um ponto de alagamento?',
        answer:
          'Para marcar um ponto de alagamento: 1. Acesse o mapa interativo. 2. Selecione o local onde ocorreu o alagamento. 3. Envie uma imagem que comprove o alagamento. 4. Escolha o nível de gravidade (leve, moderado ou interditado). 5. Confirme sua localização. Após enviar, você verá uma mensagem informando que sua marcação está em análise.',
      },
      {
        question: 'Como posso visualizar os pontos de alagamento registrados?',
        answer:
          'O aplicativo exibe todos os pontos de alagamento registrados em tempo real no mapa interativo.',
      },
      {
        question:
          'O que acontece quando recebo um alerta sobre um ponto de alagamento?',
        answer:
          "Quando você estiver próximo a um ponto de alagamento, receberá um alerta perguntando se o local ainda está alagado. Você pode responder 'Sim' ou 'Não'.",
      },
      {
        question: 'Como posso visualizar meu histórico de envios?',
        answer:
          'Você pode acessar a tela de histórico no aplicativo, onde encontrará todas as suas marcações.',
      },
      {
        question: 'O que são notificações e como funcionam?',
        answer:
          'As notificações são mensagens enviadas pelo administrador do sistema sobre condições climáticas adversas.',
      },
      {
        question:
          'Como posso relatar um problema técnico ou fornecer feedback?',
        answer:
          'Caso encontre problemas técnicos ou tenha sugestões, utilize o formulário de feedback disponível no aplicativo.',
      },
      {
        question:
          'O que devo fazer se não receber o código de verificação por SMS?',
        answer:
          'Verifique o número informado, o sinal do celular e tente solicitar o código novamente.',
      },
      {
        question: 'O aplicativo é gratuito?',
        answer: 'Sim, o aplicativo é gratuito para download e uso.',
      },
    ],
    skipDuplicates: true,
  });

  /* =========================
     USER ADMIN
  ========================== */
  await prisma.userAdmin.upsert({
    where: { email: 'ray@gmail.com' },
    update: {
      active: true,
    },
    create: {
      name: 'Rayane Melo',
      email: 'ray@gmail.com',
      password: '$2b$10$IGR0JVrsi/hIK44YVqcZhOruXgxtsAlcfea196pelsDkZv0uJzCp6',
      active: true,
    },
  });

  /* =========================
     FLOOD LEVELS
  ========================== */
  await prisma.floodLevel.upsert({
    where: { id: 1 },
    update: {},
    create: { id: 1, level: 'leve' },
  });

  await prisma.floodLevel.upsert({
    where: { id: 2 },
    update: {},
    create: { id: 2, level: 'moderado' },
  });

  await prisma.floodLevel.upsert({
    where: { id: 3 },
    update: {},
    create: { id: 3, level: 'interditado' },
  });

  /* =========================
     USER + FLOOD AREAS
  ========================== */
  const defaultUser = await prisma.user.upsert({
    where: { phone: '51990000001' },
    update: {
      active: true,
    },
    create: {
      phone: '51990000001',
      active: true,
    },
  });

  const floodLevelByName = await prisma.floodLevel.findMany({
    where: {
      level: { in: ['leve', 'moderado', 'interditado'] },
    },
  });

  const floodLevelIdMap = floodLevelByName.reduce<Record<string, number>>(
    (acc, item) => {
      acc[item.level] = item.id;
      return acc;
    },
    {}
  );

  for (const area of MOCK_FLOOD_AREAS) {
    const floodLevelId = floodLevelIdMap[area.nivel];

    if (!floodLevelId) {
      throw new Error(`Nível de alagamento inválido no seed: ${area.nivel}`);
    }

    await prisma.floodArea.upsert({
      where: { id: area.id },
      update: {
        address: area.endereco,
        latitude: String(area.lat),
        longitude: String(area.lng),
        active: area.status === 'approved',
        status: area.status,
        userId: defaultUser.id,
        floodLevelId,
        commentsAdmin:
          area.status === 'rejected'
            ? 'Relato rejeitado pela moderação.'
            : null,
      },
      create: {
        id: area.id,
        address: area.endereco,
        latitude: String(area.lat),
        longitude: String(area.lng),
        active: area.status === 'approved',
        status: area.status,
        userId: defaultUser.id,
        floodLevelId,
        commentsAdmin:
          area.status === 'rejected'
            ? 'Relato rejeitado pela moderação.'
            : null,
        createdAt: area.data,
      },
    });

    await prisma.images.upsert({
      where: { id: area.id },
      update: {
        url: area.imageUrl,
        floodAreaId: area.id,
      },
      create: {
        id: area.id,
        url: area.imageUrl,
        floodAreaId: area.id,
      },
    });
  }

  /* =========================
     NOTIFICATIONS
  ========================== */
  await prisma.notification.createMany({
    data: [
      { content: 'Risco de enchente na sua região. Fique atento!' },
      { content: 'Nível do rio subiu 20cm nas últimas 12 horas.' },
      { content: 'Alerta de chuva forte para as próximas horas.' },
      { content: 'Equipe de monitoramento enviou novas imagens da região.' },
      {
        content:
          'Alerta de evacuação preventiva. Siga as instruções da Defesa Civil.',
      },
      {
        content: 'Ruas alagadas nas proximidades. Evite transitar pela região.',
      },
      {
        content:
          'Atualização: situação está sob controle, mas continue acompanhando.',
      },
      {
        content:
          'Seu relato foi analisado por nossa equipe. Obrigado pela contribuição!',
      },
      { content: 'Previsão indica melhora no tempo nas próximas 24h.' },
      {
        content:
          'Monitoramento constante sendo realizado pela nossa equipe técnica.',
      },
    ],
    skipDuplicates: true,
  });

  console.log('✅ Seed finalizado com sucesso');
}

main()
  .catch((e) => {
    console.error('❌ Erro no seed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
