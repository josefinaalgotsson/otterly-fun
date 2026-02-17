-- 004: Create parents and children tables
CREATE TABLE IF NOT EXISTS parents (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    auth_user_id UUID UNIQUE,
    email TEXT NOT NULL,
    full_name TEXT NOT NULL,
    phone TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS children (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    parent_id UUID NOT NULL REFERENCES parents(id) ON DELETE CASCADE,
    full_name TEXT NOT NULL,
    date_of_birth DATE,
    swimming_level TEXT DEFAULT 'none',
    notes TEXT DEFAULT '',
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE parents ENABLE ROW LEVEL SECURITY;
ALTER TABLE children ENABLE ROW LEVEL SECURITY;

-- Service role can manage parents and children (used by booking API)
CREATE POLICY "Service role full access to parents"
    ON parents FOR ALL
    USING (auth.role() = 'service_role');

CREATE POLICY "Service role full access to children"
    ON children FOR ALL
    USING (auth.role() = 'service_role');

-- Authenticated users (trainers) can view parents & children
CREATE POLICY "Authenticated users can view parents"
    ON parents FOR SELECT
    USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can view children"
    ON children FOR SELECT
    USING (auth.role() = 'authenticated');

-- Indexes
CREATE INDEX idx_children_parent_id ON children(parent_id);
