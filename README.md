# Dream Canvas

Dream Canvas is a **React + Vite** project that allows users to generate AI-generated images based on prompts and customizable options. It connects to an AI image generation API to bring users' imaginations to life.

![localhost_5173_](https://github.com/user-attachments/assets/eddf086e-6c8e-410b-a719-4cfb8dae4fd7)


## Features

- Enter a prompt to describe the desired image.
- Customize image generation with options such as size, style, or other parameters.
- View the generated image and download it.

---

## Getting Started

Follow these instructions to set up and run the Dream Canvas project locally.

### Prerequisites

Ensure you have the following installed:

- **Node.js** (LTS version recommended) [Download Node.js](https://nodejs.org/)
- **npm** or **yarn** package manager (npm comes with Node.js)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/mahmoud661/Dream-canvas
   ```

2. Navigate to the project directory:
   ```bash
   cd dream-canvas
   ```

3. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

### Running the Development Server

1. Start the Vite development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

2. Open your browser and go to:
   ```
   http://localhost:5173
   ```

You should see the Dream Canvas app running locally.


## Using the Application

1. **Enter a Prompt**: Type a description of the image you want to generate.
2. **Customize Options**: Choose parameters like size, style, or other settings.
3. **Generate the Image**: Submit the prompt to generate the image using the AI API.
4. **View and Download**: Once generated, view the image and download it if desired.

---

## AI Integration

This project uses the @fal-ai/client library for AI image generation. The integration is handled using:

`
import { fal } from '@fal-ai/client';
`

Ensure you have configured your API key correctly in the .env file.

---

## Environment Variables

To connect to the AI API, you need to set up environment variables. Create a `.env` file in the root directory and add the following:

```
VITE_AI_API_KEY=your_api_key_here
```

Replace `your_api_key_here` with your API key.



## Contributing

Contributions are welcome! Please follow these steps to contribute:

1. Fork the repository.
2. Create a new branch for your feature/bug fix:
   ```bash
   git checkout -b feature-name
   ```
3. Commit your changes:
   ```bash
   git commit -m "Add feature-name"
   ```
4. Push to your forked repository:
   ```bash
   git push origin feature-name
   ```
5. Open a pull request to the `main` branch of this repository.

---

## License

This project is licensed under the [MIT License](LICENSE).

---

## Contact

If you have any questions or issues, feel free to reach out:

- **Email**: mahmoudzuriqi8@gmail.com
- **Website**: [mahmoudzuriqi.tech](https://mahmoudzuriqi.tech)

Enjoy creating with Dream Canvas!

