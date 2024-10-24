
# Video Generator

This project is a video generation tool built with [Next.js](https://nextjs.org/) and deployed on [Vercel](https://vercel.com). The app allows users to generate AI-powered videos through an API.

## Features

- **AI-based Video Generation**: Automatically generates video content based on user input.
- **API Integration**: Uses various APIs for processing and rendering video content.
- **Fast and Scalable**: Deployed on Vercel with serverless architecture for fast response times and scalability.

## Technologies Used

- **Next.js**: Framework for building the web application.
- **Vercel**: Hosting platform for the deployment of the application.
- **Prisma**: ORM (Object Relational Mapping) for database management.
- **Replicate API**: AI API used for generating video content.
- **Tailwind CSS**: Utility-first CSS framework for styling.
- **TypeScript**: Strongly typed JavaScript for better development experience.

## Setup and Installation

Follow these steps to get the project running locally.

### Prerequisites

- [Node.js](https://nodejs.org/) (v14.x or above)
- [Vercel CLI](https://vercel.com/docs/cli)
- API keys for services such as Replicate, Prisma, etc.

### Clone the Repository

```bash
git clone https://github.com/your-username/video-generator.git
cd video-generator
```

### Install Dependencies

```bash
npm install
```

### Environment Variables

Create a `.env.local` file in the root directory and add the following environment variables:

```
DATABASE_URL=your_prisma_database_url
REPLICATE_API_KEY=your_replicate_api_key
NEXT_PUBLIC_VERCEL_URL=your_vercel_project_url
JWT_SECRET=your_jwt_secret
```

### Run the Application Locally

Start the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the app in the browser.

### Build and Deploy

To build the app for production, run:

```bash
npm run build
```

To deploy the app on Vercel:

```bash
vercel
```

## API Endpoints

This project includes several API endpoints for handling video generation:

- **POST** `/api/generate-video`: Generates a video based on input parameters.
- **GET** `/api/status`: Checks the status of the video generation.

## Troubleshooting

If you encounter any issues, you can check the logs on Vercel’s dashboard or in your terminal using:

```bash
vercel logs
```

Make sure your API keys and environment variables are correctly set in `.env.local`.

## License

This project is licensed under the MIT License.
