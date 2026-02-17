-- 001: Create trainers table
CREATE TABLE IF NOT EXISTS trainers (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    auth_user_id UUID UNIQUE,
    email TEXT NOT NULL UNIQUE,
    full_name TEXT NOT NULL,
    phone TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE trainers ENABLE ROW LEVEL SECURITY;

-- Trainers can read their own data
CREATE POLICY "Trainers can view own profile"
    ON trainers FOR SELECT
    USING (auth.uid() = auth_user_id);

-- Trainers can update their own data
CREATE POLICY "Trainers can update own profile"
    ON trainers FOR UPDATE
    USING (auth.uid() = auth_user_id);

-- Service role can manage all trainers
CREATE POLICY "Service role full access to trainers"
    ON trainers FOR ALL
    USING (auth.role() = 'service_role');
