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


| Navn               | Hex      | Forhåndsvisning |
|--------------------|----------|-----------------|
| primary            | `#047464` | <svg width="20" height="20"><rect width="20" height="20" fill="#047464" stroke="#000" /></svg> |
| primary-light      | `#d1fae5` | <svg width="20" height="20"><rect width="20" height="20" fill="#d1fae5" stroke="#000" /></svg> |
| primary-dark       | `#065f54` | <svg width="20" height="20"><rect width="20" height="20" fill="#065f54" stroke="#000" /></svg> |
| ui-background      | `#34495e` | <svg width="20" height="20"><rect width="20" height="20" fill="#34495e" stroke="#000" /></svg> |
| navbar-bg          | `#f7f5f0` | <svg width="20" height="20"><rect width="20" height="20" fill="#f7f5f0" stroke="#000" /></svg> |
| navbar-link        | `#333333` | <svg width="20" height="20"><rect width="20" height="20" fill="#333333" stroke="#000" /></svg> |
| navbar-link-hover  | `#047464` | <svg width="20" height="20"><rect width="20" height="20" fill="#047464" stroke="#000" /></svg> |
| navbar-link-active | `#047464` | <svg width="20" height="20"><rect width="20" height="20" fill="#047464" stroke="#000" /></svg> |
| navbar-icon        | `#333333` | <svg width="20" height="20"><rect width="20" height="20" fill="#333333" stroke="#000" /></svg> |
| warm-off-white     | `#fffefc` | <svg width="20" height="20"><rect width="20" height="20" fill="#fffefc" stroke="#000" /></svg> |
| bg-color           | `#F8F3ED` | <svg width="20" height="20"><rect width="20" height="20" fill="#F8F3ED" stroke="#000" /></svg> |



*Note: Standard Tailwind CSS colors (e.g. "gray-300", "text-white") are used directly without a custom variable unless specific override is required.*