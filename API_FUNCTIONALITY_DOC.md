# Gratify Ads: API Functionality Documentation

## Overview
This document explains the core API functionalities for downloading ads to a device, running uploaded video links, and uploading waste data in the Gratify Ads project. It covers the relevant API endpoints, their purposes, and how to use them, as well as instructions for running the project.

---

## 1. Downloading Ads to Device

### Endpoint
- **GET** `/api/download/[id]`

### Functionality
- Downloads a video ad to the device using the provided `id`.
- The `id` parameter corresponds to the video or ad identifier in the database.
- The API fetches the video file from storage (e.g., Cloudinary or local storage) and streams it to the client for download.

### Usage Example
```
GET /api/download/12345
```
- The response will be the video file associated with `id=12345`.

---

## 2. Running the Link of Uploaded Video

### Endpoint
- **GET** `/api/video/[videoId]`

### Functionality
- Retrieves the video metadata and/or streaming link for the uploaded video.
- The `videoId` parameter is the unique identifier for the video in the database.
- The API returns a JSON object containing the video URL, which can be used to play the video in a web player or app.

### Usage Example
```
GET /api/video/abcde
```
- The response will include the video URL, e.g.:
```
{
  "url": "https://res.cloudinary.com/.../video.mp4",
  ...other metadata
}
```
- Use the `url` field to play the video in your application.

---

## 3. Uploading Waste Data

### Endpoint
- **POST** `/api/uploadwaste`

### Functionality
- Allows uploading of waste data (e.g., images, metadata) to the server.
- Accepts multipart/form-data or JSON payloads, depending on implementation.
- Stores the waste data in the database and/or uploads files to cloud storage.
- Returns a success response with details of the uploaded waste entry.

### Usage Example
```
POST /api/uploadwaste
Content-Type: multipart/form-data

{
  "image": <file>,
  "type": "plastic",
  "location": "Bin 1"
}
```
- The response will confirm the upload and provide the waste entry ID.

---

## 4. How to Run the Project

### Prerequisites
- Node.js (v18+ recommended)
- npm or yarn

### Installation
1. Clone the repository:
   ```
   git clone <repo-url>
   cd Gratify_Ads
   ```
2. Install dependencies:
   ```
   npm install
   # or
   yarn install
   ```

### Running the Project
- Start the development server:
  ```
  npm run dev
  # or
  yarn dev
  ```
- The app will be available at `http://localhost:3000` by default.

---

## 5. Additional Notes
- All API endpoints are located under `src/app/api/`.
- Video and waste data models are defined in `src/models/`.
- Cloudinary integration for video storage is handled in `src/lib/cloudinary.ts`.
- For authentication or advanced usage, refer to the codebase and README.md.

---

## 6. References
- [src/app/api/download/[id]/route.ts](src/app/api/download/[id]/route.ts)
- [src/app/api/video/[videoId]/route.ts](src/app/api/video/[videoId]/route.ts)
- [src/app/api/uploadwaste/route.ts](src/app/api/uploadwaste/route.ts)
- [src/lib/cloudinary.ts](src/lib/cloudinary.ts)
- [src/models/Video.ts](src/models/Video.ts)
- [src/models/Waste.ts](src/models/Waste.ts)

---

For further details, review the code in the referenced files or contact the project maintainer.
