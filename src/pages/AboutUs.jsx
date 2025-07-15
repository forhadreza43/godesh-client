import { Github, ExternalLink } from "lucide-react";
import dev from '../assets/dev.png'
const AboutUs = () => {
  return (
    <div className="mx-auto max-w-4xl px-4 py-16 text-center">
      <h1 className="mb-6 text-4xl font-bold">About the Developer</h1>

      <div className="rounded-lg bg-white p-8">
        <div className="flex flex-col items-center space-y-4">
          {/* Developer Image (Optional) */}
          <img
            src={dev}
            alt="Developer"
            className="h-24 w-24 rounded-full object-cover ring-2 ring-accent ring-offset-2"
          />

          <h2 className="text-2xl font-semibold">Forhad Reza</h2>
          <p className="max-w-xl text-sm text-gray-600">
            I'm a full-stack web developer passionate about building scalable,
            accessible, and visually appealing web apps. I love working with
            React, Node.js, MongoDB, and TailwindCSS.
          </p>

          <div className="mt-2 flex flex-wrap justify-center gap-2 text-sm text-gray-700">
            <span className="rounded-full bg-green-100 px-3 py-1">React</span>
            <span className="rounded-full bg-green-100 px-3 py-1">
              TailwindCSS
            </span>
            <span className="rounded-full bg-green-100 px-3 py-1">Node.js</span>
            <span className="rounded-full bg-green-100 px-3 py-1">MongoDB</span>
          </div>

          <p className="mt-6 text-gray-800">
            🔧 <strong>Projects Completed:</strong> 12+
          </p>

          <div className="mt-4 space-y-2 text-left">
            <div className="flex items-center gap-2">
              <Github className="text-gray-700" size={18} />
              <a
                href="https://github.com/forhadreza43"
                target="_blank"
                rel="noopener noreferrer"
                className="text-green-600 hover:underline"
              >
                GitHub Profile
              </a>
            </div>
            <div className="flex items-center gap-2">
              <ExternalLink className="text-gray-700" size={18} />
              <a
                href="https://group-study-app-89073.web.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-green-600 hover:underline"
              >
                Study Together App
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
