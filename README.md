## Technology Choice: Why Node.js?
We chose Node.js with Express for the backend of this project because it provides a fast, flexible, and modern development workflow that fits our needs well.

Key reasons for this choice:

- Shared language across the stack – Using JavaScript for both frontend and backend simplifies development, maintenance, and onboarding.
- Lightweight and modular – Express offers the flexibility to build a small-scale site that can scale as new functionality is added.
- Seamless API integration – External data sources like Finn.no or Billink can easily be consumed and displayed through Node’s built-in HTTP capabilities.
- Built-in support for authentication and access control – This is essential for implementing secure admin features and restricted content management.
- Flexible data modeling with MongoDB – Using Mongoose allows us to store articles, inquiries, and claims in a way that adapts to varying content types.
- Node.js strikes a good balance between performance, developer speed, and extensibility, making it a natural fit for a modern web application like this.

Dependencies - Frontend: 
Run the following commands before you start: 
cd frontend
npm install

## Color Palette
This project utilizes a set of semantically named colors defined in "tailwind.config.js". These colors represent the project's brand and UI palette and should be used consistently throughout the application.

| Hex Code | Semantic CSS Variable Name | Tailwind CSS Class Name | Usage (Example) |
| :------- | :------------------------- | :---------------------- | :-------------- |
| `#047464`| `--color-primary`          | `primary`               | Primary brand color, important buttons, headings |
| `#d1fae5`| `--color-primary-light`    | `primary-light`         | Lighter accent/hover for primary |
| `#065f54`| `--color-primary-dark`     | `primary-dark`          | Darker accent/hover for primary |
| `#34495e`| `--color-ui-background`    | `ui-background`         | General UI background (e.g., navigation bars) |
| `#2c3e50`| `--color-footer-background`| `footer-background`     | Footer background |

*Note: Standard Tailwind CSS colors (e.g. "gray-300", "text-white") are used directly without a custom variable unless specific override is required.*