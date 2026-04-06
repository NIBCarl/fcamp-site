FCAMP Registration Platform - Final Design Document
Understanding Summary
What is being built: A free event registration website for FCAMP.

Why it exists: To monitor registrations and securely track attendees for the upcoming event.

Who it is for: Campers registering by district and organizers managing the event.

Key constraints: Zero to low budget utilizing free cloud services.

Explicit non-goals: No digital tickets or QR code scanning at the venue.

Assumptions
The frontend will be built using Next.js/React.

Global admins will have full access to all database records and media controls.

District admins will only see attendees within their assigned district.

The venue will have sufficient internet connectivity for live manual name lookups.

Decision Log
Check-in Method: Manual Name Lookup. (Chosen for simplicity and low technical barrier at the venue).

Admin Structure: Global and District Admins. (Chosen to allow distributed management while maintaining central oversight).

Infrastructure: Free tier cloud services utilizing Vercel and Supabase. (Chosen to meet the zero-budget constraint).

Architecture: Unified Next.js App with Supabase Row Level Security. (Chosen for high security and low maintenance overhead).

Media Hosting: Cloudinary Free Tier. (Chosen for automatic optimization and budget constraints).

Media Management: Global Admins Only via Signed Server Uploads. (Chosen to protect API secrets, prevent free-tier abuse, and maintain centralized quality control).

Final Design
1. Database and Authentication Architecture

Database (Supabase PostgreSQL): * districts table: Stores participating regions.

profiles table: Stores camper registration data, linked to districts via foreign key.

admin_roles table: Defines Global vs. District Admin status.

Security: Supabase Row Level Security (RLS) policies will enforce data isolation. Global Admins can query all rows in profiles; District Admins can only query rows where the camper's district matches their assigned district.

Authentication: Supabase Auth for secure admin login and session management.

2. Website Pages and User Flow

Public Camper Flow:

Landing Page: Hero section with dates/location, dynamic promotional media (fetched from Cloudinary), and a call-to-action to register.

Registration Page: Streamlined form collecting essential details and a district selection dropdown.

Success Page: Post-submission confirmation message.

Admin Management Flow:

Secure Login Page: Admin authentication gateway.

Main Dashboard: High-level summary (Global sees all registrations; District sees local total).

Attendee Roster & Check-in: Data table listing campers. Includes a search bar for rapid manual name lookup and an interactive "Arrived" toggle for on-site check-in. Global admins have an additional district filter.

Media Manager (Global Admins Only): A secure interface to select images/videos. Files are sent to a secure Next.js API route, signed with Cloudinary credentials, and uploaded directly to Cloudinary.