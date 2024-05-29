# NYC Hiking Trails Recommendation System

## Overview

Welcome to the Hiking Trails Recommendation System! This project utilizes a Retrieval-Augmented Generation (RAG) model along with the Google API to provide personalized hiking trail recommendations in NYC. This application uses geolocation data to suggest trails that match user preferences and current location.

## Features

- **Personalized Recommendations**: Get hiking trail suggestions based on your preferences and past experiences.
- **Location-Based Suggestions**: Receive recommendations for trails near your current location using the Google API.
- **User-Friendly Interface**: Easy-to-use interface for inputting preferences and viewing recommended trails.

## Prerequisites

Before you begin, ensure you have met the following requirements:

- **Python 3.8+**: Make sure you have Python installed on your machine.
- **Google API Key**: You need a valid Google API key for accessing geolocation data and other Google services.
- **Pip**: Ensure you have pip installed for managing Python packages.

## Installation

1. **Clone the Repository**

   ```bash
   git clone [https://github.com/yourusername/hiking-trails-recommendation.git](https://github.com/InsightfulEngine/HikerAI
   cd HikerAI
   ```

2. **Create a Virtual Environment**

   ```bash
   python3 -m venv env
   source env/bin/activate   # On Windows use `env\Scripts\activate`
   ```

3. **Install Dependencies**

   ```bash
   pip install -r requirements.txt
   ```

4. **Set Up Environment Variables**

   Create a `.env` file in the root directory and add your Google API key:

   ```plaintext
   GOOGLE_API_KEY=your_google_api_key
   ```

## Usage

1. **Run the Application**

   ```bash
   python main.py
   ```

2. **Interact with the Interface**

   Follow the prompts to input your preferences and receive hiking trail recommendations.

## Project Structure

- `main.py`: The main script to run the application.
- `requirements.txt`: List of Python dependencies.
- `google_api/`: Directory containing scripts for interacting with the Google API.
- `data/`: Directory for storing trail data.

## Contributing

Contributions are welcome! Please follow these steps to contribute:

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

Distributed under the MIT License. See `LICENSE` for more information.

## Creators

Cristian J Abad
Daria Khotunitskaya
Linqing Zhu
Najeeb A.

## Acknowledgments

- Thanks to the contributors of the original RAG model.
- Special thanks to the Google API team for their comprehensive documentation and support.

