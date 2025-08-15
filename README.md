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

| Name               | Hex       | Preview         |
|--------------------|-----------|-----------------|
| primary            | `#047464` | ![](https://img.shields.io/badge/-?style=flat&logoColor=white&color=047464) |
| primary-light      | `#d1fae5` | ![](https://img.shields.io/badge/-?style=flat&logoColor=white&color=d1fae5) |
| primary-dark       | `#065f54` | ![](https://img.shields.io/badge/-?style=flat&logoColor=white&color=065f54) |
| ui-background      | `#34495e` | ![](https://img.shields.io/badge/-?style=flat&logoColor=white&color=34495e) |
| navbar-bg          | `#f7f5f0` | ![](https://img.shields.io/badge/-?style=flat&logoColor=white&color=f7f5f0) |
| navbar-link        | `#333333` | ![](https://img.shields.io/badge/-?style=flat&logoColor=white&color=333333) |
| navbar-link-hover  | `#047464` | ![](https://img.shields.io/badge/-?style=flat&logoColor=white&color=047464) |
| navbar-link-active | `#047464` | ![](https://img.shields.io/badge/-?style=flat&logoColor=white&color=047464) |
| navbar-icon        | `#333333` | ![](https://img.shields.io/badge/-?style=flat&logoColor=white&color=333333) |
| warm-off-white     | `#fffefc` | ![](https://img.shields.io/badge/-?style=flat&logoColor=white&color=fffefc) |
| bg-color           | `#F8F3ED` | ![](https://img.shields.io/badge/-?style=flat&logoColor=white&color=F8F3ED) |


*Note: Standard Tailwind CSS colors (e.g. "gray-300", "text-white") are used directly without a custom variable unless specific override is required.*