-- 005: Create bookings table with triggers for spot management
CREATE TABLE IF NOT EXISTS bookings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    session_id UUID NOT NULL REFERENCES course_sessions(id) ON DELETE CASCADE,
    child_id UUID NOT NULL REFERENCES children(id) ON DELETE CASCADE,
    parent_id UUID NOT NULL REFERENCES parents(id) ON DELETE CASCADE,
    status TEXT NOT NULL DEFAULT 'confirmed' CHECK (status IN ('pending', 'confirmed', 'cancelled')),
    booked_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    payment_status TEXT NOT NULL DEFAULT 'unpaid' CHECK (payment_status IN ('unpaid', 'paid', 'refunded')),
    payment_reference TEXT DEFAULT '',
    notes TEXT DEFAULT '',
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;

-- Service role can manage bookings (used by booking API)
CREATE POLICY "Service role full access to bookings"
    ON bookings FOR ALL
    USING (auth.role() = 'service_role');

-- Authenticated users (trainers) can view and update bookings
CREATE POLICY "Authenticated users can view bookings"
    ON bookings FOR SELECT
    USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can update bookings"
    ON bookings FOR UPDATE
    USING (auth.role() = 'authenticated');

-- Indexes
CREATE INDEX idx_bookings_session_id ON bookings(session_id);
CREATE INDEX idx_bookings_parent_id ON bookings(parent_id);
CREATE INDEX idx_bookings_child_id ON bookings(child_id);
CREATE INDEX idx_bookings_status ON bookings(status);

-- Trigger: decrement spots when booking is confirmed
CREATE OR REPLACE FUNCTION decrement_spots()
RETURNS TRIGGER AS $$
BEGIN
    UPDATE course_sessions
    SET spots_available = spots_available - 1,
        status = CASE WHEN spots_available - 1 <= 0 THEN 'full' ELSE status END
    WHERE id = NEW.session_id AND spots_available > 0;

    IF NOT FOUND THEN
        RAISE EXCEPTION 'No spots available for this session';
    END IF;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_decrement_spots
    AFTER INSERT ON bookings
    FOR EACH ROW
    WHEN (NEW.status = 'confirmed')
    EXECUTE FUNCTION decrement_spots();

-- Trigger: increment spots when booking is cancelled
CREATE OR REPLACE FUNCTION increment_spots()
RETURNS TRIGGER AS $$
BEGIN
    IF OLD.status != 'cancelled' AND NEW.status = 'cancelled' THEN
        UPDATE course_sessions
        SET spots_available = spots_available + 1,
            status = CASE WHEN status = 'full' THEN 'open' ELSE status END
        WHERE id = NEW.session_id;
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_increment_spots
    AFTER UPDATE ON bookings
    FOR EACH ROW
    EXECUTE FUNCTION increment_spots();
