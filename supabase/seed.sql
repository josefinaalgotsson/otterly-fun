-- Seed data for Utterns simskola
-- Run after migrations: psql -f seed.sql

-- Insert trainer
INSERT INTO trainers (id, email, full_name, phone) VALUES
    ('a1b2c3d4-e5f6-7890-abcd-ef1234567890', 'trainer@utternssimskola.se', 'Josefina Algotsson', '+46701234567');

-- Insert courses
INSERT INTO courses (id, title, description, level, prerequisites, goals, price_cents, currency, max_participants, location) VALUES
    (
        '11111111-1111-1111-1111-111111111111',
        'Små Uttrar – Babysim',
        'En varsam introduktion till vattnet för de allra minsta simmarna (3–12 månader) och deras föräldrar. Fokus på vattenvana, flytande och rolig lek i en varm bassäng.',
        'beginner',
        'Ingen tidigare simerfarenhet krävs. En förälder måste vara med i vattnet.',
        'Bygga vattenvana, lära sig flyta med stöd, njuta av vattenlek',
        1500,
        'SEK',
        8,
        'Utterns simskola, Simhallsgatan 12, Kolmården'
    ),
    (
        '22222222-2222-2222-2222-222222222222',
        'Plaskare',
        'För småbarn (1–3 år) som är redo att utforska vattnet mer självständigt. Lär sig grundläggande sparkteknik, blåsa bubblor och säker i- och uppstigning.',
        'beginner',
        'Barnet bör vara bekvämt i vattnet med en förälder. Föräldramedverkan krävs.',
        'Självständig vattenvana, grundläggande sparkteknik, säker i- och uppstigning',
        1800,
        'SEK',
        8,
        'Utterns simskola, Simhallsgatan 12, Kolmården'
    ),
    (
        '33333333-3333-3333-3333-333333333333',
        'Simstartare',
        'För barn (4–6 år) som lär sig simma självständigt. Fokus på grunderna i crawl, ryggflyt och vattentrampa.',
        'intermediate',
        'Barnet bör vara bekvämt med att ha ansiktet i vattnet och kunna flyta med stöd.',
        'Simma 10 meter utan hjälp, ryggflyta i 15 sekunder, grundläggande crawlteknik',
        2200,
        'SEK',
        6,
        'Utterns simskola, Simhallsgatan 12, Kolmården'
    ),
    (
        '44444444-4444-4444-4444-444444444444',
        'Simmare',
        'För barn (6–10 år) som redan kan simma grunderna. Förfina crawl och ryggsim, lär sig bröstsim och bygg uthållighet.',
        'advanced',
        'Barnet måste kunna simma 25 meter utan hjälp i crawl.',
        'Trygg i alla tre simsätten, simma 50 meter sammanhängande, grundläggande dykning',
        2500,
        'SEK',
        6,
        'Utterns simskola, Simhallsgatan 12, Kolmården'
    );

-- Insert course sessions
INSERT INTO course_sessions (id, course_id, trainer_id, start_date, end_date, day_of_week, start_time, end_time, spots_available, status) VALUES
    -- Små Uttrar sessions
    ('aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', '11111111-1111-1111-1111-111111111111', 'a1b2c3d4-e5f6-7890-abcd-ef1234567890', '2026-03-02', '2026-04-27', 'Måndag', '09:00', '09:45', 8, 'open'),
    ('bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', '11111111-1111-1111-1111-111111111111', 'a1b2c3d4-e5f6-7890-abcd-ef1234567890', '2026-03-04', '2026-04-29', 'Onsdag', '09:00', '09:45', 5, 'open'),
    -- Plaskare sessions
    ('cccccccc-cccc-cccc-cccc-cccccccccccc', '22222222-2222-2222-2222-222222222222', 'a1b2c3d4-e5f6-7890-abcd-ef1234567890', '2026-03-02', '2026-04-27', 'Måndag', '10:00', '10:45', 6, 'open'),
    ('dddddddd-dddd-dddd-dddd-dddddddddddd', '22222222-2222-2222-2222-222222222222', 'a1b2c3d4-e5f6-7890-abcd-ef1234567890', '2026-03-05', '2026-04-30', 'Torsdag', '10:00', '10:45', 0, 'full'),
    -- Simstartare sessions
    ('eeeeeeee-eeee-eeee-eeee-eeeeeeeeeeee', '33333333-3333-3333-3333-333333333333', 'a1b2c3d4-e5f6-7890-abcd-ef1234567890', '2026-03-03', '2026-04-28', 'Tisdag', '15:00', '15:45', 4, 'open'),
    ('ffffffff-ffff-ffff-ffff-ffffffffffff', '33333333-3333-3333-3333-333333333333', 'a1b2c3d4-e5f6-7890-abcd-ef1234567890', '2026-03-06', '2026-05-01', 'Fredag', '15:00', '15:45', 6, 'open'),
    -- Simmare sessions
    ('00000000-0000-0000-0000-000000000001', '44444444-4444-4444-4444-444444444444', 'a1b2c3d4-e5f6-7890-abcd-ef1234567890', '2026-03-03', '2026-04-28', 'Tisdag', '16:00', '17:00', 3, 'open'),
    ('00000000-0000-0000-0000-000000000002', '44444444-4444-4444-4444-444444444444', 'a1b2c3d4-e5f6-7890-abcd-ef1234567890', '2026-03-07', '2026-05-02', 'Lördag', '10:00', '11:00', 6, 'open');
