export type Database = {
  public: {
    Tables: {
      trainers: {
        Row: {
          id: string;
          auth_user_id: string | null;
          email: string;
          full_name: string;
          phone: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          auth_user_id?: string | null;
          email: string;
          full_name: string;
          phone?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          auth_user_id?: string | null;
          email?: string;
          full_name?: string;
          phone?: string | null;
          created_at?: string;
        };
        Relationships: [];
      };
      courses: {
        Row: {
          id: string;
          title: string;
          description: string;
          level: "beginner" | "intermediate" | "advanced";
          prerequisites: string;
          goals: string;
          price_cents: number;
          currency: string;
          max_participants: number;
          location: string;
          is_active: boolean;
          created_at: string;
        };
        Insert: {
          id?: string;
          title: string;
          description?: string;
          level: "beginner" | "intermediate" | "advanced";
          prerequisites?: string;
          goals?: string;
          price_cents?: number;
          currency?: string;
          max_participants?: number;
          location?: string;
          is_active?: boolean;
          created_at?: string;
        };
        Update: {
          id?: string;
          title?: string;
          description?: string;
          level?: "beginner" | "intermediate" | "advanced";
          prerequisites?: string;
          goals?: string;
          price_cents?: number;
          currency?: string;
          max_participants?: number;
          location?: string;
          is_active?: boolean;
          created_at?: string;
        };
        Relationships: [];
      };
      course_sessions: {
        Row: {
          id: string;
          course_id: string;
          trainer_id: string | null;
          start_date: string;
          end_date: string;
          day_of_week: string;
          start_time: string;
          end_time: string;
          spots_available: number;
          status: "open" | "full" | "cancelled";
          created_at: string;
        };
        Insert: {
          id?: string;
          course_id: string;
          trainer_id?: string | null;
          start_date: string;
          end_date: string;
          day_of_week: string;
          start_time: string;
          end_time: string;
          spots_available?: number;
          status?: "open" | "full" | "cancelled";
          created_at?: string;
        };
        Update: {
          id?: string;
          course_id?: string;
          trainer_id?: string | null;
          start_date?: string;
          end_date?: string;
          day_of_week?: string;
          start_time?: string;
          end_time?: string;
          spots_available?: number;
          status?: "open" | "full" | "cancelled";
          created_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "course_sessions_course_id_fkey";
            columns: ["course_id"];
            isOneToOne: false;
            referencedRelation: "courses";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "course_sessions_trainer_id_fkey";
            columns: ["trainer_id"];
            isOneToOne: false;
            referencedRelation: "trainers";
            referencedColumns: ["id"];
          },
        ];
      };
      parents: {
        Row: {
          id: string;
          auth_user_id: string | null;
          email: string;
          full_name: string;
          phone: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          auth_user_id?: string | null;
          email: string;
          full_name: string;
          phone?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          auth_user_id?: string | null;
          email?: string;
          full_name?: string;
          phone?: string | null;
          created_at?: string;
        };
        Relationships: [];
      };
      children: {
        Row: {
          id: string;
          parent_id: string;
          full_name: string;
          date_of_birth: string | null;
          swimming_level: string;
          notes: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          parent_id: string;
          full_name: string;
          date_of_birth?: string | null;
          swimming_level?: string;
          notes?: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          parent_id?: string;
          full_name?: string;
          date_of_birth?: string | null;
          swimming_level?: string;
          notes?: string;
          created_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "children_parent_id_fkey";
            columns: ["parent_id"];
            isOneToOne: false;
            referencedRelation: "parents";
            referencedColumns: ["id"];
          },
        ];
      };
      bookings: {
        Row: {
          id: string;
          session_id: string;
          child_id: string;
          parent_id: string;
          status: "pending" | "confirmed" | "cancelled";
          booked_at: string;
          payment_status: "unpaid" | "paid" | "refunded";
          payment_reference: string;
          notes: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          session_id: string;
          child_id: string;
          parent_id: string;
          status?: "pending" | "confirmed" | "cancelled";
          booked_at?: string;
          payment_status?: "unpaid" | "paid" | "refunded";
          payment_reference?: string;
          notes?: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          session_id?: string;
          child_id?: string;
          parent_id?: string;
          status?: "pending" | "confirmed" | "cancelled";
          booked_at?: string;
          payment_status?: "unpaid" | "paid" | "refunded";
          payment_reference?: string;
          notes?: string;
          created_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "bookings_session_id_fkey";
            columns: ["session_id"];
            isOneToOne: false;
            referencedRelation: "course_sessions";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "bookings_child_id_fkey";
            columns: ["child_id"];
            isOneToOne: false;
            referencedRelation: "children";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "bookings_parent_id_fkey";
            columns: ["parent_id"];
            isOneToOne: false;
            referencedRelation: "parents";
            referencedColumns: ["id"];
          },
        ];
      };
      session_logs: {
        Row: {
          id: string;
          session_id: string;
          trainer_id: string;
          log_date: string;
          notes: string;
          attendance: AttendanceEntry[];
          created_at: string;
        };
        Insert: {
          id?: string;
          session_id: string;
          trainer_id: string;
          log_date: string;
          notes?: string;
          attendance?: AttendanceEntry[];
          created_at?: string;
        };
        Update: {
          id?: string;
          session_id?: string;
          trainer_id?: string;
          log_date?: string;
          notes?: string;
          attendance?: AttendanceEntry[];
          created_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "session_logs_session_id_fkey";
            columns: ["session_id"];
            isOneToOne: false;
            referencedRelation: "course_sessions";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "session_logs_trainer_id_fkey";
            columns: ["trainer_id"];
            isOneToOne: false;
            referencedRelation: "trainers";
            referencedColumns: ["id"];
          },
        ];
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: Record<string, never>;
    CompositeTypes: Record<string, never>;
  };
};

export type AttendanceEntry = {
  child_id: string;
  child_name: string;
  present: boolean;
};

// Convenience types
export type Trainer = Database["public"]["Tables"]["trainers"]["Row"];
export type Course = Database["public"]["Tables"]["courses"]["Row"];
export type CourseSession = Database["public"]["Tables"]["course_sessions"]["Row"];
export type Parent = Database["public"]["Tables"]["parents"]["Row"];
export type Child = Database["public"]["Tables"]["children"]["Row"];
export type Booking = Database["public"]["Tables"]["bookings"]["Row"];
export type SessionLog = Database["public"]["Tables"]["session_logs"]["Row"];

// Course with sessions joined
export type CourseWithSessions = Course & {
  course_sessions: CourseSession[];
};

// Booking with related data
export type BookingWithDetails = Booking & {
  course_sessions: CourseSession & {
    courses: Course;
  };
  children: Child;
  parents: Parent;
};
