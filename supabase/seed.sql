-- Seed data for Otterly Fun Swim School
-- Run after migrations: psql -f seed.sql

-- Insert trainer
INSERT INTO trainers (id, email, full_name, phone) VALUES
    ('a1b2c3d4-e5f6-7890-abcd-ef1234567890', 'trainer@otterlyfun.se', 'Josefina Algotsson', '+46701234567');

-- Insert courses
INSERT INTO courses (id, title, description, level, prerequisites, goals, price_cents, currency, max_participants, location) VALUES
    (
        '11111111-1111-1111-1111-111111111111',
        'Little Otters - Baby Swim',
        'A gentle introduction to water for the youngest swimmers (3-12 months) and their parents. Focus on water confidence, floating, and fun water play in a warm pool.',
        'beginner',
        'No previous swimming experience required. A parent must be in the water with the child.',
        'Build water confidence, learn basic floating with support, enjoy water play',
        1500,
        'SEK',
        8,
        'Otterly Fun Pool, Simhallsgatan 12, Stockholm'
    ),
    (
        '22222222-2222-2222-2222-222222222222',
        'Splash Explorers',
        'For toddlers (1-3 years) who are ready to explore the water with more independence. Learn basic kicking, blowing bubbles, and safe water entry.',
        'beginner',
        'Child should be comfortable being in water with a parent. Parent participation required.',
        'Independent water comfort, basic kicking technique, safe pool entry and exit',
        1800,
        'SEK',
        8,
        'Otterly Fun Pool, Simhallsgatan 12, Stockholm'
    ),
    (
        '33333333-3333-3333-3333-333333333333',
        'Swim Starters',
        'For children (4-6 years) learning to swim independently. Focus on freestyle basics, back floating, and treading water.',
        'intermediate',
        'Child should be comfortable putting face in water and floating with support.',
        'Swim 10 meters unassisted, back float for 15 seconds, basic freestyle technique',
        2200,
        'SEK',
        6,
        'Otterly Fun Pool, Simhallsgatan 12, Stockholm'
    ),
    (
        '44444444-4444-4444-4444-444444444444',
        'Stroke Masters',
        'For children (6-10 years) who can already swim basics. Refine freestyle and backstroke, learn breaststroke, and build endurance.',
        'advanced',
        'Child must be able to swim 25 meters unassisted in freestyle.',
        'Confident in all three strokes, swim 50 meters continuously, basic diving',
        2500,
        'SEK',
        6,
        'Otterly Fun Pool, Simhallsgatan 12, Stockholm'
    );

-- Insert course sessions
INSERT INTO course_sessions (id, course_id, trainer_id, start_date, end_date, day_of_week, start_time, end_time, spots_available, status) VALUES
    -- Little Otters sessions
    ('aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', '11111111-1111-1111-1111-111111111111', 'a1b2c3d4-e5f6-7890-abcd-ef1234567890', '2026-03-02', '2026-04-27', 'Monday', '09:00', '09:45', 8, 'open'),
    ('bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', '11111111-1111-1111-1111-111111111111', 'a1b2c3d4-e5f6-7890-abcd-ef1234567890', '2026-03-04', '2026-04-29', 'Wednesday', '09:00', '09:45', 5, 'open'),
    -- Splash Explorers sessions
    ('cccccccc-cccc-cccc-cccc-cccccccccccc', '22222222-2222-2222-2222-222222222222', 'a1b2c3d4-e5f6-7890-abcd-ef1234567890', '2026-03-02', '2026-04-27', 'Monday', '10:00', '10:45', 6, 'open'),
    ('dddddddd-dddd-dddd-dddd-dddddddddddd', '22222222-2222-2222-2222-222222222222', 'a1b2c3d4-e5f6-7890-abcd-ef1234567890', '2026-03-05', '2026-04-30', 'Thursday', '10:00', '10:45', 0, 'full'),
    -- Swim Starters sessions
    ('eeeeeeee-eeee-eeee-eeee-eeeeeeeeeeee', '33333333-3333-3333-3333-333333333333', 'a1b2c3d4-e5f6-7890-abcd-ef1234567890', '2026-03-03', '2026-04-28', 'Tuesday', '15:00', '15:45', 4, 'open'),
    ('ffffffff-ffff-ffff-ffff-ffffffffffff', '33333333-3333-3333-3333-333333333333', 'a1b2c3d4-e5f6-7890-abcd-ef1234567890', '2026-03-06', '2026-05-01', 'Friday', '15:00', '15:45', 6, 'open'),
    -- Stroke Masters sessions
    ('00000000-0000-0000-0000-000000000001', '44444444-4444-4444-4444-444444444444', 'a1b2c3d4-e5f6-7890-abcd-ef1234567890', '2026-03-03', '2026-04-28', 'Tuesday', '16:00', '17:00', 3, 'open'),
    ('00000000-0000-0000-0000-000000000002', '44444444-4444-4444-4444-444444444444', 'a1b2c3d4-e5f6-7890-abcd-ef1234567890', '2026-03-07', '2026-05-02', 'Saturday', '10:00', '11:00', 6, 'open');
