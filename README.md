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
## 🎨 Fargepalett

| Navn                | Hex       | Forhåndsvisning |
|---------------------|-----------|-----------------|
| primary             | `#047464` | ![#047464](https://via.placeholder.com/20/047464/000000?text=+) |
| primary-light       | `#d1fae5` | ![#d1fae5](https://via.placeholder.com/20/d1fae5/000000?text=+) |
| primary-dark        | `#065f54` | ![#065f54](https://via.placeholder.com/20/065f54/000000?text=+) |
| ui-background       | `#34495e` | ![#34495e](https://via.placeholder.com/20/34495e/000000?text=+) |
| navbar-bg           | `#f7f5f0` | ![#f7f5f0](https://via.placeholder.com/20/f7f5f0/000000?text=+) |
| navbar-link         | `#333333` | ![#333333](https://via.placeholder.com/20/333333/000000?text=+) |
| navbar-link-hover   | `#047464` | ![#047464](https://via.placeholder.com/20/047464/000000?text=+) |
| navbar-link-active  | `#047464` | ![#047464](https://via.placeholder.com/20/047464/000000?text=+) |
| navbar-icon         | `#333333` | ![#333333](https://via.placeholder.com/20/333333/000000?text=+) |
| warm-off-white      | `#fffefc` | ![#fffefc](https://via.placeholder.com/20/fffefc/000000?text=+) |
| bg-color            | `#F8F3ED` | ![#F8F3ED](https://via.placeholder.com/20/F8F3ED/000000?text=+) |
*Note: Standard Tailwind CSS colors (e.g. "gray-300", "text-white") are used directly without a custom variable unless specific override is required.*