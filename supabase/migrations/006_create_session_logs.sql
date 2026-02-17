-- 006: Create session_logs table
CREATE TABLE IF NOT EXISTS session_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    session_id UUID NOT NULL REFERENCES course_sessions(id) ON DELETE CASCADE,
    trainer_id UUID NOT NULL REFERENCES trainers(id) ON DELETE CASCADE,
    log_date DATE NOT NULL,
    notes TEXT DEFAULT '',
    attendance JSONB DEFAULT '[]'::jsonb,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE session_logs ENABLE ROW LEVEL SECURITY;

-- Trainers can view their own logs
CREATE POLICY "Trainers can view own logs"
    ON session_logs FOR SELECT
    USING (
        trainer_id IN (
            SELECT id FROM trainers WHERE auth_user_id = auth.uid()
        )
    );

-- Trainers can insert their own logs
CREATE POLICY "Trainers can insert own logs"
    ON session_logs FOR INSERT
    WITH CHECK (
        trainer_id IN (
            SELECT id FROM trainers WHERE auth_user_id = auth.uid()
        )
    );

-- Trainers can update their own logs
CREATE POLICY "Trainers can update own logs"
    ON session_logs FOR UPDATE
    USING (
        trainer_id IN (
            SELECT id FROM trainers WHERE auth_user_id = auth.uid()
        )
    );

-- Service role full access
CREATE POLICY "Service role full access to session_logs"
    ON session_logs FOR ALL
    USING (auth.role() = 'service_role');

-- Indexes
CREATE INDEX idx_session_logs_session_id ON session_logs(session_id);
CREATE INDEX idx_session_logs_trainer_id ON session_logs(trainer_id);
CREATE INDEX idx_session_logs_log_date ON session_logs(log_date);
