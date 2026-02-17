-- 003: Create course_sessions table
CREATE TABLE IF NOT EXISTS course_sessions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    course_id UUID NOT NULL REFERENCES courses(id) ON DELETE CASCADE,
    trainer_id UUID REFERENCES trainers(id) ON DELETE SET NULL,
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    day_of_week TEXT NOT NULL,
    start_time TIME NOT NULL,
    end_time TIME NOT NULL,
    spots_available INTEGER NOT NULL DEFAULT 8,
    status TEXT NOT NULL DEFAULT 'open' CHECK (status IN ('open', 'full', 'cancelled')),
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE course_sessions ENABLE ROW LEVEL SECURITY;

-- Anyone can view sessions (public)
CREATE POLICY "Public can view sessions"
    ON course_sessions FOR SELECT
    USING (true);

-- Authenticated users (trainers) can manage sessions
CREATE POLICY "Authenticated users can insert sessions"
    ON course_sessions FOR INSERT
    WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can update sessions"
    ON course_sessions FOR UPDATE
    USING (auth.role() = 'authenticated');

-- Service role full access
CREATE POLICY "Service role full access to sessions"
    ON course_sessions FOR ALL
    USING (auth.role() = 'service_role');

-- Indexes
CREATE INDEX idx_sessions_course_id ON course_sessions(course_id);
CREATE INDEX idx_sessions_status ON course_sessions(status);
