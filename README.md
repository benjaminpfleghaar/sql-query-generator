# SQL Query Generator

A **Next.js** application that generates SQL queries based on a given translation key and its corresponding translation.
The generated query includes various translations, ready for database import.

## Features

- **Multiple Languages:** Generate a query for various languages.
- **AI-Powered Translations:** Translations are generated using ChatGPT
- **Safe Insert:** Adds new translations if they don’t exist; otherwise, updates them
- **Database Selector:** Switch between different databases for dynamic queries
- **Secure Login:** Authentication via Supabase Auth

## Technologies

This project is built with:

- **Framework**: [Next.js](https://nextjs.org)
- **Styling**: [Tailwind CSS](https://tailwindcss.com)
- **Authentication**: [Supabase](https://supabase.com/)
- **Translation**: [GPT-4o mini](https://openai.com/)
- **Components**: [Shadcn](https://ui.shadcn.com)
- **Validation**: [Zod](https://zod.dev/)
- **Toasts**: [Sonner](https://sonner.emilkowal.ski/)
- **Icons**: [Lucide](https://lucide.dev/)

## Getting Started

Ensure you have **Node.js** installed, an **OpenAI** API key and an active **Supabase** user.

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/benjaminpfleghaar/sql-query-generator.git
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env.local.` file and provide credentials:
   ```plaintext
   NEXT_PUBLIC_SUPABASE_URL=<YOUR_URL>
   NEXT_PUBLIC_SUPABASE_ANON_KEY=<YOUR_KEY>
   OPENAI_API_KEY=<YOUR_KEY>
   ```

4. Update the database names and languages in `config.js`:
   ```js
   export const languages = {1: "German", 2: "English", ...};
   export const databases = ["myDatabase.Translations", "..."];
   ```

5. Run the application:
   ```bash
   npm run dev
   ```

## Project Structure

The project follows a clear structure:

```plaintext
├── app/                # Source code
│   ├── components/     # UI components
│   ├── lib/            # Utilities and middleware
│   ├── login/          # Login route
│   │   ├── page.tsx    # Page displaying the login form
│   ├── config.css      # Default language and databse values
│   ├── global.css      # Global styles for the entire app
│   ├── layout.tsx      # Layout component for the app
│   ├── page.tsx        # Main page displaying the query generator
```