# Django Portfolio Website

This is a portfolio website built with Django. It showcases various projects, work experience, LinkedIn recommendations, and includes a contact form.

## Table of Contents

- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Models](#models)
- [Forms](#forms)
- [Helpers](#helpers)
- [License](#license)

## Features

- **Home Page**: Displays a hero section with an image, an about section, and a list of projects.
- **Work Experience**: Lists work experiences grouped by company.
- **LinkedIn Recommendations**: Displays recommendations in a carousel.
- **Contact Form**: Allows users to send messages via a form.

## Installation

1. **Clone the Repository**:
   ```bash
   git clone <repository-url>
   cd <repository-directory>
2. **Create a Virtual Environment:**
    ```bash
    python -m venv venv
    venv\Scripts\activate
3. **Install Dependencies:**
    ```bash
    pip install -r requirements.txt
4. **Apply Migrations::**
    ```bash
    python manage.py migrate
5. **Collect Static Files (if needed):**
    ```bash
    python manage.py collectstatic
5. **Run the Development Server:**
    ```bash
    python manage.py runserver
5. **Access the Application:**
    Open your browser and navigate to http://127.0.0.1:8000/.


## Usage

### Adding Data

1. **Use the Django Admin Interface**:
   - Navigate to the Django admin interface at `http://127.0.0.1:8000/admin/`.
   - Log in with your admin credentials.
   - Add data to the following models:
     - `WebsiteData`
     - `Media`
     - `WorkExperience`
     - `LinkedInRecommendation`
   - Ensure to upload media files (images, PDFs) in the appropriate locations.

2. **Verify Data**:
   - Check that the data appears correctly on the home page and other relevant sections.

### Customizing Content

1. **Update Logic**:
   - Modify the `views.py` file to update the logic for fetching and processing data.
   - Adjust how data is retrieved and passed to the templates.

2. **Modify Template**:
   - Edit the `home.html` template to customize the layout and appearance.
   - Change HTML and CSS as needed to reflect your desired design.

3. **Test Changes**:
   - Restart the development server using `python manage.py runserver`.
   - Refresh your browser to see the changes.

## Features

- **Home Page**: Displays a hero section with an image, an about section, and a list of projects.
- **Work Experience**: Lists work experiences grouped by company.
- **LinkedIn Recommendations**: Displays recommendations in a carousel.
- **Contact Form**: Allows users to send messages via a form.

## Models

- **WebsiteData**: Stores general information such as about text.
- **Media**: Manages media files like images and resumes.
- **WorkExperience**: Contains information about work experience.
- **LinkedInRecommendation**: Holds LinkedIn recommendations from various individuals.
- **Profile**: Represents user profiles (if applicable).

## Forms

- **MessageForm**: Handles the contact form submission.

## Helpers

- **get_projects()**: A helper function to fetch and return project data.
- **get_urls()**: A helper function to get additional URLs or data.

## License

This project is licensed under the MIT License. See the LICENSE file for details


