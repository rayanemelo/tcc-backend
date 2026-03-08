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
CREATE UNIQUE INDEX "tb_flood_area_ai_analysis_flood_area_id_key"
ON "tb_flood_area_ai_analysis"("flood_area_id");

-- AddForeignKey
ALTER TABLE "tb_flood_area_ai_analysis"
ADD CONSTRAINT "tb_flood_area_ai_analysis_flood_area_id_fkey"
FOREIGN KEY ("flood_area_id")
REFERENCES "tb_flood_area"("id")
ON DELETE RESTRICT
ON UPDATE CASCADE;

-- Add mandatory geolocation storage for users
ALTER TABLE "tb_user"
ADD COLUMN IF NOT EXISTS "latitude" TEXT,
ADD COLUMN IF NOT EXISTS "longitude" TEXT;

UPDATE "tb_user"
SET
    "latitude" = COALESCE("latitude", '0'),
    "longitude" = COALESCE("longitude", '0');

ALTER TABLE "tb_user"
ALTER COLUMN "latitude" DROP DEFAULT,
ALTER COLUMN "longitude" DROP DEFAULT,
ALTER COLUMN "latitude" SET NOT NULL,
ALTER COLUMN "longitude" SET NOT NULL;

-- FAQ bootstrap data
INSERT INTO "tb_faq" ("question","answer","created_at","updated_at")
SELECT
'Como funciona a autenticação via SMS?',
'Após inserir seu número de celular, você receberá um código de verificação por SMS. Digite esse código no aplicativo para fazer login. Isso garante que apenas usuários autenticados possam acessar determinadas funcionalidades do aplicativo.',
CURRENT_TIMESTAMP,
CURRENT_TIMESTAMP
WHERE NOT EXISTS (
SELECT 1 FROM "tb_faq"
WHERE "question"='Como funciona a autenticação via SMS?'
);

INSERT INTO "tb_faq" ("question","answer","created_at","updated_at")
SELECT
'Como posso marcar um ponto de alagamento?',
'Para marcar um ponto de alagamento: 1. Acesse o mapa interativo. 2. Selecione o local onde ocorreu o alagamento. 3. Envie uma imagem que comprove o alagamento. 4. Escolha o nível de gravidade (leve, moderado ou interditado). 5. Confirme sua localização.',
CURRENT_TIMESTAMP,
CURRENT_TIMESTAMP
WHERE NOT EXISTS (
SELECT 1 FROM "tb_faq"
WHERE "question"='Como posso marcar um ponto de alagamento?'
);

INSERT INTO "tb_faq" ("question","answer","created_at","updated_at")
SELECT
'Como posso visualizar os pontos de alagamento registrados?',
'O aplicativo exibe todos os pontos de alagamento registrados em tempo real no mapa interativo.',
CURRENT_TIMESTAMP,
CURRENT_TIMESTAMP
WHERE NOT EXISTS (
SELECT 1 FROM "tb_faq"
WHERE "question"='Como posso visualizar os pontos de alagamento registrados?'
);

INSERT INTO "tb_faq" ("question","answer","created_at","updated_at")
SELECT
'O que acontece quando recebo um alerta sobre um ponto de alagamento?',
'Quando você estiver próximo a um ponto de alagamento, receberá um alerta perguntando se o local ainda está alagado.',
CURRENT_TIMESTAMP,
CURRENT_TIMESTAMP
WHERE NOT EXISTS (
SELECT 1 FROM "tb_faq"
WHERE "question"='O que acontece quando recebo um alerta sobre um ponto de alagamento?'
);

-- Admin bootstrap
INSERT INTO "tb_user_admin" ("name","email","password","active","created_at","updated_at")
VALUES (
'Rayane Melo',
'ray@gmail.com',
'$2b$10$IGR0JVrsi/hIK44YVqcZhOruXgxtsAlcfea196pelsDkZv0uJzCp6',
true,
CURRENT_TIMESTAMP,
CURRENT_TIMESTAMP
)
ON CONFLICT ("email")
DO UPDATE SET "active"=EXCLUDED."active";

-- Flood levels bootstrap
INSERT INTO "tb_flood_level" ("level","created_at","updated_at")
SELECT 'leve',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP
WHERE NOT EXISTS (SELECT 1 FROM "tb_flood_level" WHERE "level"='leve');

INSERT INTO "tb_flood_level" ("level","created_at","updated_at")
SELECT 'moderado',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP
WHERE NOT EXISTS (SELECT 1 FROM "tb_flood_level" WHERE "level"='moderado');

INSERT INTO "tb_flood_level" ("level","created_at","updated_at")
SELECT 'interditado',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP
WHERE NOT EXISTS (SELECT 1 FROM "tb_flood_level" WHERE "level"='interditado');

-- Default user
INSERT INTO "tb_user" ("phone","latitude","longitude","active","created_at","updated_at")
VALUES ('51990000001','-29.6509','-50.7814',true,CURRENT_TIMESTAMP,CURRENT_TIMESTAMP)
ON CONFLICT ("phone")
DO UPDATE SET
"latitude"=EXCLUDED."latitude",
"longitude"=EXCLUDED."longitude",
"active"=EXCLUDED."active";

-- Flood areas bootstrap
INSERT INTO "tb_flood_area"
(
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
'Rua General Frota',
'-29.6509',
'-50.7814',
true,
'approved',
(SELECT id FROM "tb_user" WHERE phone='51990000001'),
(SELECT id FROM "tb_flood_level" WHERE level='leve'),
NULL,
0,
0,
TIMESTAMP '2025-05-19 20:00:00',
TIMESTAMP '2025-05-19 20:00:00'
),
(
'Rua Pinheiro Machado',
'-29.6501',
'-50.7852',
false,
'pending',
(SELECT id FROM "tb_user" WHERE phone='51990000001'),
(SELECT id FROM "tb_flood_level" WHERE level='interditado'),
NULL,
0,
0,
TIMESTAMP '2025-03-22 14:00:00',
TIMESTAMP '2025-03-22 14:00:00'
),
(
'Av. Sebastião Amoreti',
'-29.6468',
'-50.7921',
false,
'rejected',
(SELECT id FROM "tb_user" WHERE phone='51990000001'),
(SELECT id FROM "tb_flood_level" WHERE level='moderado'),
'Relato rejeitado pela moderação.',
0,
0,
TIMESTAMP '2025-02-15 17:00:00',
TIMESTAMP '2025-02-15 17:00:00'
);

-- Flood area images bootstrap
INSERT INTO "tb_images" ("url","flood_area_id","created_at","updated_at")
VALUES
(
'https://picsum.photos/id/1011/800/600',
(SELECT id FROM "tb_flood_area" WHERE address='Rua General Frota'),
CURRENT_TIMESTAMP,
CURRENT_TIMESTAMP
),
(
'https://picsum.photos/id/1025/800/600',
(SELECT id FROM "tb_flood_area" WHERE address='Rua Pinheiro Machado'),
CURRENT_TIMESTAMP,
CURRENT_TIMESTAMP
),
(
'https://picsum.photos/id/1036/800/600',
(SELECT id FROM "tb_flood_area" WHERE address='Av. Sebastião Amoreti'),
CURRENT_TIMESTAMP,
CURRENT_TIMESTAMP
);

-- Notifications
INSERT INTO "tb_notification" ("content","created_at","updated_at")
SELECT 'Risco de enchente na sua região. Fique atento!',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP
WHERE NOT EXISTS (
SELECT 1 FROM "tb_notification"
WHERE content='Risco de enchente na sua região. Fique atento!'
);

INSERT INTO "tb_notification" ("content","created_at","updated_at")
SELECT 'Nível do rio subiu 20cm nas últimas 12 horas.',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP
WHERE NOT EXISTS (
SELECT 1 FROM "tb_notification"
WHERE content='Nível do rio subiu 20cm nas últimas 12 horas.'
);

INSERT INTO "tb_notification" ("content","created_at","updated_at")
SELECT 'Alerta de chuva forte para as próximas horas.',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP
WHERE NOT EXISTS (
SELECT 1 FROM "tb_notification"
WHERE content='Alerta de chuva forte para as próximas horas.'
);
