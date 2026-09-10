CREATE TABLE IF NOT EXISTS experiment_runs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id text NOT NULL,
  user_email text,
  stimulus text NOT NULL,
  response text NOT NULL,
  plasticity integer NOT NULL,
  decay integer NOT NULL,
  interference integer NOT NULL,
  initial_strength integer NOT NULL,
  final_strength integer NOT NULL,
  recalled boolean NOT NULL,
  event_type text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now()
)