-- 002: Create courses table
CREATE TABLE IF NOT EXISTS courses (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    description TEXT NOT NULL DEFAULT '',
    level TEXT NOT NULL CHECK (level IN ('beginner', 'intermediate', 'advanced')),
    prerequisites TEXT DEFAULT '',
    goals TEXT DEFAULT '',
    price_cents INTEGER NOT NULL DEFAULT 0,
    currency TEXT NOT NULL DEFAULT 'SEK',
    max_participants INTEGER NOT NULL DEFAULT 8,
    location TEXT NOT NULL DEFAULT '',
    is_active BOOLEAN NOT NULL DEFAULT true,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE courses ENABLE ROW LEVEL SECURITY;

-- Anyone can read active courses (public)
CREATE POLICY "Public can view active courses"
    ON courses FOR SELECT
    USING (is_active = true);

-- Authenticated trainers can manage courses
CREATE POLICY "Authenticated users can insert courses"
    ON courses FOR INSERT
    WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can update courses"
    ON courses FOR UPDATE
    USING (auth.role() = 'authenticated');

-- Service role full access
CREATE POLICY "Service role full access to courses"
    ON courses FOR ALL
    USING (auth.role() = 'service_role');
