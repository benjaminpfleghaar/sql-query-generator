# SQL Query Generator

Next.js tool that converts translation keys into SQL queries, leveraging AI to generate multilingual, database-ready
queries.

![Mockup](./assets/mockup.jpg)

## Features

- **Multiple Languages:** Generate queries in different languages
- **AI-Powered Translations:** Create translations using ChatGPT
- **Database Selector:** Switch between databases for dynamic queries
- **Secure Login:** Authenticate securely with Supabase Auth

## Technologies

- **Framework:** [Next.js](https://nextjs.org)
- **Styling:** [Tailwind CSS](https://tailwindcss.com)
- **Authentication:** [Supabase](https://supabase.com/)
- **AI:** [OpenAI/ChatGPT](https://openai.com/)
- **Components:** [Shadcn](https://ui.shadcn.com)
- **Validation:** [Zod](https://zod.dev/)
- **Toasts:** [Sonner](https://sonner.emilkowal.ski/)
- **Icons:** [Lucide](https://lucide.dev/)

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org) installed
- An [OpenAI](https://openai.com/) API key
- An active [Supabase](https://supabase.com) project

### Installation

1. Clone the repository:

    ```bash
     git clone https://github.com/benjaminpfleghaar/sql-query-generator.git
    ```

2. Install dependencies:

    ```bash
    npm install
    ```

3. Create a `.env.local` file and add your credentials:

    ```bash
    NEXT_PUBLIC_SUPABASE_URL=<YOUR_URL>
    NEXT_PUBLIC_SUPABASE_ANON_KEY=<YOUR_KEY>
    OPENAI_API_KEY=<YOUR_KEY>
    ```

4. Update the database names and languages in `config.js`:

    ```js
    export const languages = {1: "German", 2: "English", ...};
    export const databases = ["myDatabase.Translations", "..."];
    ```

5. Run the development server:

    ```bash
    npm run dev
    ```
