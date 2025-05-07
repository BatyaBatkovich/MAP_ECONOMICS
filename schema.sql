-- Creating the event types table
CREATE TABLE event_types (
	id SERIAL PRIMARY KEY,                 -- Unique identifier for the event type
	name VARCHAR(100) UNIQUE NOT NULL      -- Name of the event type (e.g., "Ecology", "War")
);

-- Creating the events table to store detailed information about each event
CREATE TABLE events (
	id SERIAL PRIMARY KEY,                 -- Unique identifier for the event
	event_type_id INT NOT NULL,            -- Reference to the event type
	name VARCHAR(255) NOT NULL,            -- Name of the event (e.g., "Invasion of Ukraine")
	latitude DOUBLE PRECISION NOT NULL,    -- Latitude of the event location
	longitude DOUBLE PRECISION NOT NULL,   -- Longitude of the event location
	event_date DATE NOT NULL,              -- Date when the event occurred
	source_url TEXT NOT NULL,              -- Source of the event (URL)
	created_at TIMESTAMP DEFAULT NOW(),    -- Record creation timestamp, defaults to current time
	FOREIGN KEY (event_type_id) REFERENCES event_types(id) -- Relationship to the event_types table
);

-- Documentation comments
-- The event_types table stores the types of events, for example:
-- 1 - War
-- 2 - Big Tech
-- 3 - Protests
-- 4 - Environmental
-- 5 - Economic
-- 6 - Cybersecurity
-- The events table stores details of each event associated with a type from event_types.
-- The event_type_id column in the events table indicates the type of the event.
