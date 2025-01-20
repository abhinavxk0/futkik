# 12thMan

12thMan is a web application that allows users to browse football competitions, search for teams, and view upcoming matches. The project uses modern web technologies to provide an engaging and interactive user experience.

---

## Features
- **Search Teams:** Find football teams by name, view their details, and explore their history.
- **Browse Competitions:** Explore various football competitions and their associated matches.
- **View Upcoming Matches:** Check schedules for upcoming matches, complete with team logos and formatted dates.
- **Interactive Design:** Responsive layout and interactive elements for a seamless user experience.

---

## Technologies Used
- **Frontend:**
  - HTML5
  - CSS3
  - JavaScript (ES6+)
- **Backend API:**
  - Node.js and Express.js (assumed for mock API)
  - Local API endpoints (`http://localhost:3000`)

---

## Installation

### Prerequisites
Ensure you have the following installed on your system:
- Node.js (v14 or higher)
- npm (Node Package Manager)

### Steps
1. Clone this repository:
   ```bash
   git clone https://github.com/abhinavxk0/twelfthman.git
   cd twelfthman
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the backend server:
   ```bash
   node server.js
   ```
4. Open the `index.html` file in your browser or set up a local server for the frontend.

---

## Folder Structure
```
twelfthman/
|-- server.js              # Backend server script
|-- script.js              # Main JavaScript script
|-- package.json           # Node.js dependencies and metadata
|-- package-lock.json      # Lock file for exact dependency versions
|-- README.md              # Project documentation
|-- match-details.html     # HTML for match details
|-- main.html              # Main HTML file
|-- favicon.ico            # Website favicon
|-- fonts/                 # Font files
|   |-- BebasNeue-Regular.ttf
|   |-- Poppins-Extrabold.ttf
|   |-- RobotoCondensed-VariableFont-wght.ttf
|-- loading/               # Loading animation assets
|   |-- loading.gif        # Loading spinner
|-- splashscreen/          # Splash screen files
|   |-- splashscreen.css   # Splash screen styles
|   |-- splashscreen.html  # Splash screen markup
|   |-- splashscreen.js    # Splash screen script
|-- styling/               # Stylesheets
|   |-- main.css           # Main styles
|   |-- match-details.css  # Match details styles

```

---

## API Endpoints
### Teams
- **Search Teams by Name:** `GET /teams/search?name=<teamName>`
- **Get Team Details by ID:** `GET /teams/:id`
- **Get Team Matches by ID:** `GET /teams/:id/matches`

### Competitions
- **Get All Competitions:** `GET /competitions`

### Matches
- **Get Matches by Competition ID:** `GET /matches/:competitionId`

---

## Features in Detail
### 1. Search Teams
- Enter a team name in the search bar and view matching results.
- Click on a team to see detailed information, including:
  - Team crest
  - Founded year
  - Venue
  - Current coach

### 2. Browse Competitions
- Explore competitions with visually appealing buttons displaying logos and names.
- Click a competition to view its upcoming matches.

### 3. View Matches
- See upcoming matches with formatted dates and logos for both teams.
- Click a match to save its details and navigate to a `match-details.html` page.

---

## Development Notes
### Enhancements
- Improved menu with hover animations and icons.
- Responsive design using flexbox and media queries.

### Known Issues
- Ensure the backend API is running at `http://localhost:3000`.
- Placeholder logos and images may need updating.

---

## Contribution
Contributions are welcome! Feel free to fork this repository and submit pull requests. 

### Steps to Contribute
1. Fork the repository.
2. Create a feature branch:
   ```bash
   git checkout -b feature/your-feature
   ```
3. Commit your changes and push to your fork.
4. Submit a pull request with a detailed description.

---

## License
This project is licensed under the [MIT License](LICENSE).

---
