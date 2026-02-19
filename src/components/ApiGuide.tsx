import React from "react";

const sampleResponse = {
  success: true,
  binId: "6966942c5c40f798ac2792d9",
  count: 3,
  videos: [
    {
      _id: "696694555c40f798ac2792db",
      url: "https://res.cloudinary.com/db2qa9dzs/video/upload/v1768330323/gratify-ads/rygdttih2e0tsosofhpe.mp4",
      downloadUrl:
        "https://res.cloudinary.com/db2qa9dzs/video/upload/fl_attachment/v1768330323/gratify-ads/rygdttih2e0tsosofhpe.mp4",
      publicId: "gratify-ads/rygdttih2e0tsosofhpe",
      createdAt: "2026-01-13T18:52:05.893Z",
    },
    {
      _id: "696697075c40f798ac2792f7",
      url: "https://res.cloudinary.com/db2qa9dzs/video/upload/v1768331014/gratify-ads/delgvdu3wqngjhndyl0z.mp4",
      downloadUrl:
        "https://res.cloudinary.com/db2qa9dzs/video/upload/fl_attachment/v1768331014/gratify-ads/delgvdu3wqngjhndyl0z.mp4",
      publicId: "gratify-ads/delgvdu3wqngjhndyl0z",
      createdAt: "2026-01-13T19:03:35.843Z",
    },
    {
      _id: "6969bfec5719baa752e769b9",
      url: "https://res.cloudinary.com/db2qa9dzs/video/upload/v1768538091/gratify-ads/nfa8lwz1urbdtefloznx.mp4",
      downloadUrl:
        "https://res.cloudinary.com/db2qa9dzs/video/upload/fl_attachment/v1768538091/gratify-ads/nfa8lwz1urbdtefloznx.mp4",
      publicId: "gratify-ads/nfa8lwz1urbdtefloznx",
      createdAt: "2026-01-16T04:34:52.191Z",
    },
  ],
};

type StepItem = string | React.ReactNode;

interface ApiGuideStep {
  number: number;
  title: string;
  description: string;
  steps: StepItem[];
  responseBlock?: React.ReactNode;
}

const CodeBlock = ({ children }: { children: React.ReactNode }) => (
  <code className="block bg-blue-50 text-blue-800 border border-blue-200 px-3 py-1.5 rounded text-sm font-mono mb-2 break-all whitespace-pre-wrap overflow-hidden w-full">
    {children}
  </code>
);

const JsonResponse = () => {
  const json = JSON.stringify(sampleResponse, null, 2);

  // Syntax highlight tokens
  const highlighted = json
    .replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g, (match) => {
      let cls = "text-yellow-300"; // number
      if (/^"/.test(match)) {
        if (/:$/.test(match)) {
          cls = "text-blue-300"; // key
        } else {
          cls = "text-green-300"; // string
        }
      } else if (/true|false/.test(match)) {
        cls = "text-purple-300";
      } else if (/null/.test(match)) {
        cls = "text-red-300";
      }
      return `<span class="${cls}">${match}</span>`;
    });

  return (
    <div className="mt-4 rounded-xl overflow-hidden border border-gray-700">
      <div className="flex items-center justify-between bg-gray-800 px-4 py-2">
        <span className="text-xs font-semibold text-gray-400 tracking-widest uppercase">
          Sample Response
        </span>
        <div className="flex gap-1.5">
          <span className="w-3 h-3 rounded-full bg-red-500" />
          <span className="w-3 h-3 rounded-full bg-yellow-500" />
          <span className="w-3 h-3 rounded-full bg-green-500" />
        </div>
      </div>
      <pre
        className="bg-gray-900 text-gray-100 text-xs font-mono p-4 overflow-x-auto leading-relaxed max-h-64 overflow-y-auto whitespace-pre-wrap break-all"
        dangerouslySetInnerHTML={{ __html: highlighted }}
      />
    </div>
  );
};

const apiGuides: ApiGuideStep[] = [
  {
    number: 1,
    title: "Get Bin Videos as JSON (with Download Links)",
    description:
      "Fetch all videos for a bin by ID and receive a JSON response, including direct download links.",
    steps: [
      "Send a GET request to:",
      <CodeBlock key="url">
        https://gratify-ads-management.vercel.app/api/videos/6966942c5c40f798ac2792d9
      </CodeBlock>,
      "Example using curl:",
      <CodeBlock key="curl">
        curl https://gratify-ads-management.vercel.app/api/videos/6966942c5c40f798ac2792d9
      </CodeBlock>,
      "The response will be a JSON object with video details and a downloadUrl for each video. You can open the downloadUrl in your browser to download the video file directly.",
    ],
    responseBlock: <JsonResponse />,
  },
  {
    number: 2,
    title: "Download Bin Data as File (Automatic Download)",
    description:
      "Download all bin data directly as a file from the browser.",
    steps: [
      "Open your browser and navigate to:",
      <CodeBlock key="dl-url">
        https://gratify-ads-management.vercel.app/api/download/6966942c5c40f798ac2792d9
      </CodeBlock>,
     ,
      "The browser will automatically download the bin data as a file (e.g., JSON or CSV).",
    ],
  },
];

export default function ApiGuide() {
  return (
    <div className="min-h-screen bg-blue-50 flex justify-center items-start py-10 px-4">
      <div className="bg-white rounded-3xl max-w-2xl w-full p-12 shadow-lg">

        {/* Header */}
        <span className="inline-block bg-blue-100 text-blue-700 text-xs font-bold tracking-widest uppercase px-4 py-1.5 rounded-full mb-4">
          🔗 API Usage Guide
        </span>
        <h1 className="text-3xl font-extrabold text-blue-900 mb-2">
          API — Bin Data Access
        </h1>
        <p className="text-sm text-gray-500 mb-10">
          Learn how to fetch bin data as JSON or download it directly from your browser.
        </p>

        {/* Guides */}
        {apiGuides.map((guide, idx) => (
          <div key={guide.number}>
            <div className="flex gap-5">
              <div className="flex-shrink-0 w-10 h-10 bg-blue-600 text-white text-base font-extrabold rounded-full flex items-center justify-center mt-1">
                {guide.number}
              </div>
              <div className="flex-1">
                <h2 className="text-base font-bold text-blue-700 mb-1">
                  {guide.title}
                </h2>
                <p className="text-xs text-gray-500 mb-3">{guide.description}</p>

                <ul className="space-y-1">
                  {guide.steps.map((step, i) => (
                    <li
                      key={i}
                      className="text-sm text-gray-700 pl-5 relative py-1.5 border-b border-gray-100 last:border-0 leading-relaxed"
                    >
                      <span className="absolute left-0 text-blue-600 font-bold">→</span>
                      {step}
                    </li>
                  ))}
                </ul>

                {/* JSON Response Block */}
                {guide.responseBlock && (
                  <div className="mt-2">{guide.responseBlock}</div>
                )}
              </div>
            </div>

            {idx < apiGuides.length - 1 && (
              <hr className="my-8 border-dashed border-blue-200" />
            )}
          </div>
        ))}


      </div>
    </div>
  );
}