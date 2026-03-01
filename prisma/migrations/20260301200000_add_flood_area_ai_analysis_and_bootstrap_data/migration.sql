-- CreateTable
CREATE TABLE "tb_flood_area_ai_analysis" (
    "id" SERIAL NOT NULL,
    "flood_area_id" INTEGER NOT NULL,
    "image_url" TEXT NOT NULL,
    "is_flood" BOOLEAN,
    "confidence" DOUBLE PRECISION,
    "veracity_score" DOUBLE PRECISION,
    "analysis" TEXT,
    "metadata" JSONB,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "tb_flood_area_ai_analysis_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "tb_flood_area_ai_analysis_flood_area_id_key" ON "tb_flood_area_ai_analysis"("flood_area_id");

-- AddForeignKey
ALTER TABLE "tb_flood_area_ai_analysis" ADD CONSTRAINT "tb_flood_area_ai_analysis_flood_area_id_fkey" FOREIGN KEY ("flood_area_id") REFERENCES "tb_flood_area"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- FAQ bootstrap data
INSERT INTO "tb_faq" ("question", "answer", "created_at", "updated_at")
SELECT
    'Como funciona a autenticação via SMS?',
    'Após inserir seu número de celular, você receberá um código de verificação por SMS. Digite esse código no aplicativo para fazer login. Isso garante que apenas usuários autenticados possam acessar determinadas funcionalidades do aplicativo.',
    CURRENT_TIMESTAMP,
    CURRENT_TIMESTAMP
WHERE NOT EXISTS (
    SELECT 1 FROM "tb_faq" WHERE "question" = 'Como funciona a autenticação via SMS?'
);

INSERT INTO "tb_faq" ("question", "answer", "created_at", "updated_at")
SELECT
    'Como posso marcar um ponto de alagamento?',
    'Para marcar um ponto de alagamento: 1. Acesse o mapa interativo. 2. Selecione o local onde ocorreu o alagamento. 3. Envie uma imagem que comprove o alagamento. 4. Escolha o nível de gravidade (leve, moderado ou interditado). 5. Confirme sua localização. Após enviar, você verá uma mensagem informando que sua marcação está em análise.',
    CURRENT_TIMESTAMP,
    CURRENT_TIMESTAMP
WHERE NOT EXISTS (
    SELECT 1 FROM "tb_faq" WHERE "question" = 'Como posso marcar um ponto de alagamento?'
);

INSERT INTO "tb_faq" ("question", "answer", "created_at", "updated_at")
SELECT
    'Como posso visualizar os pontos de alagamento registrados?',
    'O aplicativo exibe todos os pontos de alagamento registrados em tempo real no mapa interativo.',
    CURRENT_TIMESTAMP,
    CURRENT_TIMESTAMP
WHERE NOT EXISTS (
    SELECT 1 FROM "tb_faq" WHERE "question" = 'Como posso visualizar os pontos de alagamento registrados?'
);

INSERT INTO "tb_faq" ("question", "answer", "created_at", "updated_at")
SELECT
    'O que acontece quando recebo um alerta sobre um ponto de alagamento?',
    'Quando você estiver próximo a um ponto de alagamento, receberá um alerta perguntando se o local ainda está alagado. Você pode responder ''Sim'' ou ''Não''.',
    CURRENT_TIMESTAMP,
    CURRENT_TIMESTAMP
WHERE NOT EXISTS (
    SELECT 1 FROM "tb_faq" WHERE "question" = 'O que acontece quando recebo um alerta sobre um ponto de alagamento?'
);

INSERT INTO "tb_faq" ("question", "answer", "created_at", "updated_at")
SELECT
    'Como posso visualizar meu histórico de envios?',
    'Você pode acessar a tela de histórico no aplicativo, onde encontrará todas as suas marcações.',
    CURRENT_TIMESTAMP,
    CURRENT_TIMESTAMP
WHERE NOT EXISTS (
    SELECT 1 FROM "tb_faq" WHERE "question" = 'Como posso visualizar meu histórico de envios?'
);

INSERT INTO "tb_faq" ("question", "answer", "created_at", "updated_at")
SELECT
    'O que são notificações e como funcionam?',
    'As notificações são mensagens enviadas pelo administrador do sistema sobre condições climáticas adversas.',
    CURRENT_TIMESTAMP,
    CURRENT_TIMESTAMP
WHERE NOT EXISTS (
    SELECT 1 FROM "tb_faq" WHERE "question" = 'O que são notificações e como funcionam?'
);

INSERT INTO "tb_faq" ("question", "answer", "created_at", "updated_at")
SELECT
    'Como posso relatar um problema técnico ou fornecer feedback?',
    'Caso encontre problemas técnicos ou tenha sugestões, utilize o formulário de feedback disponível no aplicativo.',
    CURRENT_TIMESTAMP,
    CURRENT_TIMESTAMP
WHERE NOT EXISTS (
    SELECT 1 FROM "tb_faq" WHERE "question" = 'Como posso relatar um problema técnico ou fornecer feedback?'
);

INSERT INTO "tb_faq" ("question", "answer", "created_at", "updated_at")
SELECT
    'O que devo fazer se não receber o código de verificação por SMS?',
    'Verifique o número informado, o sinal do celular e tente solicitar o código novamente.',
    CURRENT_TIMESTAMP,
    CURRENT_TIMESTAMP
WHERE NOT EXISTS (
    SELECT 1 FROM "tb_faq" WHERE "question" = 'O que devo fazer se não receber o código de verificação por SMS?'
);

INSERT INTO "tb_faq" ("question", "answer", "created_at", "updated_at")
SELECT
    'O aplicativo é gratuito?',
    'Sim, o aplicativo é gratuito para download e uso.',
    CURRENT_TIMESTAMP,
    CURRENT_TIMESTAMP
WHERE NOT EXISTS (
    SELECT 1 FROM "tb_faq" WHERE "question" = 'O aplicativo é gratuito?'
);

-- Admin bootstrap data
INSERT INTO "tb_user_admin" ("name", "email", "password", "active", "created_at", "updated_at")
VALUES (
    'Rayane Melo',
    'ray@gmail.com',
    '$2b$10$IGR0JVrsi/hIK44YVqcZhOruXgxtsAlcfea196pelsDkZv0uJzCp6',
    true,
    CURRENT_TIMESTAMP,
    CURRENT_TIMESTAMP
)
ON CONFLICT ("email") DO UPDATE
SET "active" = EXCLUDED."active";

-- Flood levels bootstrap data
INSERT INTO "tb_flood_level" ("id", "level", "created_at", "updated_at")
VALUES
    (1, 'leve', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    (2, 'moderado', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    (3, 'interditado', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
ON CONFLICT ("id") DO NOTHING;

-- Default user bootstrap data
INSERT INTO "tb_user" ("phone", "active", "created_at", "updated_at")
VALUES ('51990000001', true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
ON CONFLICT ("phone") DO UPDATE
SET "active" = EXCLUDED."active";

-- Flood areas bootstrap data
INSERT INTO "tb_flood_area" (
    "id",
    "address",
    "latitude",
    "longitude",
    "active",
    "status",
    "user_id",
    "flood_level_id",
    "comments_admin",
    "yes_count",
    "no_count",
    "created_at",
    "updated_at"
)
VALUES
    (
        1,
        'Rua General Frota',
        '-29.6509',
        '-50.7814',
        true,
        'approved',
        (SELECT "id" FROM "tb_user" WHERE "phone" = '51990000001'),
        1,
        NULL,
        0,
        0,
        TIMESTAMP '2025-05-19 20:00:00',
        TIMESTAMP '2025-05-19 20:00:00'
    ),
    (
        2,
        'Rua Pinheiro Machado',
        '-29.6501',
        '-50.7852',
        false,
        'pending',
        (SELECT "id" FROM "tb_user" WHERE "phone" = '51990000001'),
        3,
        NULL,
        0,
        0,
        TIMESTAMP '2025-03-22 14:00:00',
        TIMESTAMP '2025-03-22 14:00:00'
    ),
    (
        3,
        'Av. Sebastião Amoreti',
        '-29.6468',
        '-50.7921',
        false,
        'rejected',
        (SELECT "id" FROM "tb_user" WHERE "phone" = '51990000001'),
        2,
        'Relato rejeitado pela moderação.',
        0,
        0,
        TIMESTAMP '2025-02-15 17:00:00',
        TIMESTAMP '2025-02-15 17:00:00'
    )
ON CONFLICT ("id") DO UPDATE
SET
    "address" = EXCLUDED."address",
    "latitude" = EXCLUDED."latitude",
    "longitude" = EXCLUDED."longitude",
    "active" = EXCLUDED."active",
    "status" = EXCLUDED."status",
    "user_id" = EXCLUDED."user_id",
    "flood_level_id" = EXCLUDED."flood_level_id",
    "comments_admin" = EXCLUDED."comments_admin";

-- Flood area images bootstrap data
INSERT INTO "tb_images" ("id", "url", "flood_area_id", "created_at", "updated_at")
VALUES
    (1, 'https://picsum.photos/id/1011/800/600', 1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    (2, 'https://picsum.photos/id/1025/800/600', 2, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    (3, 'https://picsum.photos/id/1036/800/600', 3, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
ON CONFLICT ("id") DO UPDATE
SET
    "url" = EXCLUDED."url",
    "flood_area_id" = EXCLUDED."flood_area_id";

-- Notifications bootstrap data
INSERT INTO "tb_notification" ("content", "created_at", "updated_at")
SELECT 'Risco de enchente na sua região. Fique atento!', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP
WHERE NOT EXISTS (
    SELECT 1 FROM "tb_notification" WHERE "content" = 'Risco de enchente na sua região. Fique atento!'
);

INSERT INTO "tb_notification" ("content", "created_at", "updated_at")
SELECT 'Nível do rio subiu 20cm nas últimas 12 horas.', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP
WHERE NOT EXISTS (
    SELECT 1 FROM "tb_notification" WHERE "content" = 'Nível do rio subiu 20cm nas últimas 12 horas.'
);

INSERT INTO "tb_notification" ("content", "created_at", "updated_at")
SELECT 'Alerta de chuva forte para as próximas horas.', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP
WHERE NOT EXISTS (
    SELECT 1 FROM "tb_notification" WHERE "content" = 'Alerta de chuva forte para as próximas horas.'
);

INSERT INTO "tb_notification" ("content", "created_at", "updated_at")
SELECT 'Equipe de monitoramento enviou novas imagens da região.', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP
WHERE NOT EXISTS (
    SELECT 1 FROM "tb_notification" WHERE "content" = 'Equipe de monitoramento enviou novas imagens da região.'
);

INSERT INTO "tb_notification" ("content", "created_at", "updated_at")
SELECT 'Alerta de evacuação preventiva. Siga as instruções da Defesa Civil.', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP
WHERE NOT EXISTS (
    SELECT 1 FROM "tb_notification" WHERE "content" = 'Alerta de evacuação preventiva. Siga as instruções da Defesa Civil.'
);

INSERT INTO "tb_notification" ("content", "created_at", "updated_at")
SELECT 'Ruas alagadas nas proximidades. Evite transitar pela região.', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP
WHERE NOT EXISTS (
    SELECT 1 FROM "tb_notification" WHERE "content" = 'Ruas alagadas nas proximidades. Evite transitar pela região.'
);

INSERT INTO "tb_notification" ("content", "created_at", "updated_at")
SELECT 'Atualização: situação está sob controle, mas continue acompanhando.', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP
WHERE NOT EXISTS (
    SELECT 1 FROM "tb_notification" WHERE "content" = 'Atualização: situação está sob controle, mas continue acompanhando.'
);

INSERT INTO "tb_notification" ("content", "created_at", "updated_at")
SELECT 'Seu relato foi analisado por nossa equipe. Obrigado pela contribuição!', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP
WHERE NOT EXISTS (
    SELECT 1 FROM "tb_notification" WHERE "content" = 'Seu relato foi analisado por nossa equipe. Obrigado pela contribuição!'
);

INSERT INTO "tb_notification" ("content", "created_at", "updated_at")
SELECT 'Previsão indica melhora no tempo nas próximas 24h.', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP
WHERE NOT EXISTS (
    SELECT 1 FROM "tb_notification" WHERE "content" = 'Previsão indica melhora no tempo nas próximas 24h.'
);

INSERT INTO "tb_notification" ("content", "created_at", "updated_at")
SELECT 'Monitoramento constante sendo realizado pela nossa equipe técnica.', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP
WHERE NOT EXISTS (
    SELECT 1 FROM "tb_notification" WHERE "content" = 'Monitoramento constante sendo realizado pela nossa equipe técnica.'
);
