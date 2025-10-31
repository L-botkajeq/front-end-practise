// Navigation functionality
document.addEventListener('DOMContentLoaded', function() {
    const navLinks = document.querySelectorAll('.nav-links a');
    const mobileMenu = document.querySelector('.mobile-menu');
    const navLinksContainer = document.querySelector('.nav-links');
    
    // Navigation click events
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const sectionId = this.getAttribute('href').substring(1);
            loadSection(sectionId);
            
            // Update navigation active state
            navLinks.forEach(link => {
                link.classList.toggle('active', link.getAttribute('href') === `#${sectionId}`);
            });
            
            // Close menu on mobile after click
            if (window.innerWidth <= 768) {
                navLinksContainer.classList.remove('active');
            }
        });
    });
    
    // Mobile menu toggle
    mobileMenu.addEventListener('click', function() {
        navLinksContainer.classList.toggle('active');
    });
});

// Load section content
function loadSection(sectionId) {
    const contentArea = document.getElementById('content-area');
    
    // Show loading indicator
    contentArea.innerHTML = '<div class="loading">Loading...</div>';
    
    // In a real application, you would fetch the content from the server
    // For this example, we'll use a simple object with the content
    const sections = {
        'home': getHomeContent(),
        'schedule': getScheduleContent(),
        'results': getResultsContent(),
        'athletes': getAthletesContent(),
        'about': getAboutContent(),
        'personal': getPersonalContent()
    };
    
    // Simulate network delay
    setTimeout(() => {
        contentArea.innerHTML = sections[sectionId] || '<div class="page-section"><h2>Section not found</h2></div>';
        
        // Re-initialize any dynamic functionality for the loaded section
        if (sectionId === 'results') {
            initSearch();
        }
        
        // Initialize gallery items for any section that has them
        initGalleryItems();
    }, 300);
}

// Content functions (in a real app, these would be separate HTML files)
function getHomeContent() {
    return `
        <section id="home" class="page-section">
            <h2 class="section-title"><i class="fas fa-home"></i> Event Overview</h2>
            
            <div class="stats-grid">
                <div class="stat-card">
                    <div class="stat-number">156</div>
                    <div class="stat-label">Athletes</div>
                </div>
                <div class="stat-card">
                    <div class="stat-number">24</div>
                    <div class="stat-label">Events</div>
                </div>
                <div class="stat-card">
                    <div class="stat-number">36</div>
                    <div class="stat-label">Classes</div>
                </div>
                <div class="stat-card">
                    <div class="stat-number">8</div>
                    <div class="stat-label">Completed</div>
                </div>
            </div>
            
            <div class="card-grid">
                <div class="card">
                    <div class="card-icon"><i class="fas fa-broadcast-tower"></i></div>
                    <h3>Live Updates</h3>
                    <p>Current Event: Men's 100m Preliminaries</p>
                    <p>Next Event: High Jump Finals (14:30)</p>
                    <p>Completed Events: 8</p>
                    <div class="status-badge status-in-progress">
                        <i class="fas fa-circle"></i> Live
                    </div>
                </div>
                <div class="card">
                    <div class="card-icon"><i class="fas fa-trophy"></i></div>
                    <h3>Class Rankings</h3>
                    <ol class="leaderboard">
                        <li class="leaderboard-item">Grade 12 Class 1 - 85 points</li>
                        <li class="leaderboard-item">Grade 11 Class 3 - 78 points</li>
                        <li class="leaderboard-item">Grade 10 Class 2 - 72 points</li>
                        <li class="leaderboard-item">Grade 12 Class 4 - 68 points</li>
                        <li class="leaderboard-item">Grade 11 Class 1 - 65 points</li>
                    </ol>
                </div>
                <div class="card">
                    <div class="card-icon"><i class="fas fa-star"></i></div>
                    <h3>Today's Stars</h3>
                    <p><i class="fas fa-running"></i> John Zhang - Broke school record: 100m Sprint</p>
                    <p><i class="fas fa-walking"></i> Lisa Li - High Jump Champion</p>
                    <p><i class="fas fa-futbol"></i> William Wang - Football Top Scorer</p>
                    <p><i class="fas fa-medal"></i> David Zhao - Shot Put Rising Star</p>
                </div>
            </div>

            <div class="card">
                <h3><i class="fas fa-camera"></i> Highlights</h3>
                <div class="gallery">
                    <div class="gallery-item" 
                         style="background-image: url('https://images.unsplash.com/photo-1552674605-db6ffd4facb5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80');"
                         data-title="Track Sprint">
                    </div>
                    <div class="gallery-item" 
                         style="background-image: url('https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80');"
                         data-title="Long Jump">
                    </div>
                    <div class="gallery-item" 
                         style="background-image: url('https://images.unsplash.com/photo-1511882150382-421056c89033?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80');"
                         data-title="Relay Race">
                    </div>
                    <div class="gallery-item" 
                         style="background-image: url('https://images.unsplash.com/photo-1461896836934-ffe607ba8211?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80');"
                         data-title="Team Celebration">
                    </div>
                </div>
            </div>
        </section>
    `;
}

function getScheduleContent() {
    return `
        <section id="schedule" class="page-section">
            <h2 class="section-title"><i class="fas fa-calendar-alt"></i> Event Schedule</h2>
            <div class="card">
                <h3><i class="fas fa-calendar-day"></i> Today's Schedule - 2024 Campus Games</h3>
                <div class="table-responsive">
                    <table class="data-table">
                        <thead>
                            <tr>
                                <th>Time</th>
                                <th>Event</th>
                                <th>Category</th>
                                <th>Venue</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>08:30-09:30</td>
                                <td>100m Preliminaries</td>
                                <td>Men's</td>
                                <td>Main Stadium</td>
                                <td><span class="status-badge status-completed"><i class="fas fa-check"></i> Completed</span></td>
                            </tr>
                            <tr>
                                <td>09:45-10:45</td>
                                <td>Shot Put Finals</td>
                                <td>Women's</td>
                                <td>Throwing Area</td>
                                <td><span class="status-badge status-completed"><i class="fas fa-check"></i> Completed</span></td>
                            </tr>
                            <tr>
                                <td>10:00-11:00</td>
                                <td>High Jump Finals</td>
                                <td>Women's</td>
                                <td>Jumping Area</td>
                                <td><span class="status-badge status-in-progress"><i class="fas fa-spinner"></i> In Progress</span></td>
                            </tr>
                            <tr>
                                <td>14:30-15:30</td>
                                <td>4×100m Relay</td>
                                <td>Mixed</td>
                                <td>Main Stadium</td>
                                <td><span class="status-badge status-upcoming"><i class="fas fa-clock"></i> Upcoming</span></td>
                            </tr>
                            <tr>
                                <td>15:45-16:45</td>
                                <td>Long Jump Finals</td>
                                <td>Men's</td>
                                <td>Jumping Area</td>
                                <td><span class="status-badge status-upcoming"><i class="fas fa-clock"></i> Upcoming</span></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </section>
    `;
}

function getResultsContent() {
    return `
        <section id="results" class="page-section">
            <h2 class="section-title"><i class="fas fa-chart-line"></i> Results Query System</h2>
            <div class="card">
                <h3><i class="fas fa-search"></i> Quick Search</h3>
                <div class="search-box">
                    <input type="text" placeholder="Search by name, student ID, or class..." id="searchInput">
                    <button onclick="searchResults()">
                        <i class="fas fa-search"></i> Search
                    </button>
                </div>
            </div>
            
            <div class="card">
                <h3><i class="fas fa-list-alt"></i> Latest Results</h3>
                <div class="table-responsive">
                    <table class="data-table">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Class</th>
                                <th>Event</th>
                                <th>Result</th>
                                <th>Rank</th>
                                <th>Points</th>
                            </tr>
                        </thead>
                        <tbody id="resultsTable">
                            <tr>
                                <td>John Zhang</td>
                                <td>Grade 12 Class 1</td>
                                <td>100m Sprint</td>
                                <td>11.23s</td>
                                <td><i class="fas fa-medal" style="color: gold;"></i> 1st</td>
                                <td>9</td>
                            </tr>
                            <tr>
                                <td>Lisa Li</td>
                                <td>Grade 11 Class 3</td>
                                <td>High Jump</td>
                                <td>1.75m</td>
                                <td><i class="fas fa-medal" style="color: gold;"></i> 1st</td>
                                <td>9</td>
                            </tr>
                            <tr>
                                <td>William Wang</td>
                                <td>Grade 10 Class 2</td>
                                <td>Shot Put</td>
                                <td>12.5m</td>
                                <td><i class="fas fa-medal" style="color: silver;"></i> 2nd</td>
                                <td>7</td>
                            </tr>
                            <tr>
                                <td>David Zhao</td>
                                <td>Grade 12 Class 4</td>
                                <td>100m Sprint</td>
                                <td>11.89s</td>
                                <td><i class="fas fa-medal" style="color: silver;"></i> 2nd</td>
                                <td>7</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </section>
    `;
}

function getAthletesContent() {
    return `
        <section id="athletes" class="page-section">
            <h2 class="section-title"><i class="fas fa-users"></i> Athletes Spotlight</h2>
            
            <div class="card">
                <h3><i class="fas fa-camera-retro"></i> Photo Gallery</h3>
                <div class="gallery">
                    <div class="gallery-item" 
                         style="background-image: url('https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80');"
                         data-title="Track Athlete">
                    </div>
                    <div class="gallery-item" 
                         style="background-image: url('https://images.unsplash.com/photo-1511882150382-421056c89033?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80');"
                         data-title="Field Events">
                    </div>
                    <div class="gallery-item" 
                         style="background-image: url('https://images.unsplash.com/photo-1461896836934-ffe607ba8211?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80');"
                         data-title="Team Sports">
                    </div>
                    <div class="gallery-item" 
                         style="background-image: url('https://images.unsplash.com/photo-1517649763962-0c623066013b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80');"
                         data-title="Victory Moment">
                    </div>
                    <div class="gallery-item" 
                         style="background-image: url('https://images.unsplash.com/photo-1551698618-1dfe5d97d256?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80');"
                         data-title="Training Session">
                    </div>
                    <div class="gallery-item" 
                         style="background-image: url('https://images.unsplash.com/photo-1517649763962-0c623066013b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80');"
                         data-title="Award Ceremony">
                    </div>
                </div>
            </div>

            <div class="card-grid">
                <div class="card athlete-card">
                    <div class="athlete-avatar">J</div>
                    <h3><i class="fas fa-running"></i> John Zhang - Sprint Specialist</h3>
                    <p><strong>Class:</strong> Grade 12 Class 1</p>
                    <p><strong>Events:</strong> 100m, 200m, 4×100m Relay</p>
                    <p><strong>Best Result:</strong> 100m 11.23s (School Record)</p>
                    <p><strong>Motto:</strong>"Speed and passion, never stop!"</p>
                </div>
                <div class="card athlete-card">
                    <div class="athlete-avatar">L</div>
                    <h3><i class="fas fa-walking"></i> Lisa Li - High Jump Champion</h3>
                    <p><strong>Class:</strong> Grade 11 Class 3</p>
                    <p><strong>Events:</strong> High Jump, Triple Jump</p>
                    <p><strong>Best Result:</strong> High Jump 1.75m</p>
                    <p><strong>Motto:</strong>"Challenge heights, surpass yourself!"</p>
                </div>
                <div class="card athlete-card">
                    <div class="athlete-avatar">W</div>
                    <h3><i class="fas fa-futbol"></i> William Wang - Football Star</h3>
                    <p><strong>Class:</strong> Grade 10 Class 2</p>
                    <p><strong>Events:</strong> Football, 4×400m Relay</p>
                    <p><strong>Best Result:</strong> Football Top Scorer</p>
                    <p><strong>Motto:</strong>"Teamwork creates miracles!"</p>
                </div>
            </div>
        </section>
    `;
}

function getAboutContent() {
    return `
        <section id="about" class="page-section">
            <h2 class="section-title"><i class="fas fa-info-circle"></i> About the Games</h2>
            <div class="card-grid">
                <div class="card">
                    <h3><i class="fas fa-book"></i> Competition Rules</h3>
                    <p>• All events follow latest IAAF rules</p>
                    <p>• Athletes must report 30 minutes before event</p>
                    <p>• Final results confirmed by judges</p>
                    <p>• Disputes resolved by arbitration committee</p>
                </div>
                <div class="card">
                    <h3><i class="fas fa-chart-bar"></i> Points System</h3>
                    <p><i class="fas fa-medal" style="color: gold;"></i> 1st Place: 9 points</p>
                    <p><i class="fas fa-medal" style="color: silver;"></i> 2nd Place: 7 points</p>
                    <p><i class="fas fa-medal" style="color: #cd7f32;"></i> 3rd Place: 6 points</p>
                    <p>4th: 5 points | 5th: 4 points</p>
                    <p>6th: 3 points | 7th: 2 points | 8th: 1 point</p>
                </div>
            </div>
            
            <div class="card">
                <h3><i class="fas fa-award"></i> Awards</h3>
                <p>• Top 6 teams receive trophies and certificates</p>
                <p>• Top 3 individuals receive medals and certificates</p>
                <p>• 3 "Sportsmanship Awards"</p>
                <p>• 10 "Outstanding Athlete" awards</p>
            </div>
        </section>
    `;
}

function getPersonalContent() {
    return `
        <section id="personal" class="page-section">
            <h2 class="section-title"><i class="fas fa-user"></i> Personal Profile</h2>
            <div class="user-profile">
                <div class="avatar">J</div>
                <div>
                    <h3>John Zhang</h3>
                    <p>Grade 12 Class 1 | Student ID: 2023001</p>
                    <p><i class="fas fa-trophy"></i> Current Points: 9 | <i class="fas fa-chart-line"></i> Class Rank: 1</p>
                </div>
            </div>
            
            <div class="card-grid">
                <div class="card">
                    <h3><i class="fas fa-calendar-check"></i> My Schedule</h3>
                    <div class="table-responsive">
                        <table class="data-table">
                            <thead>
                                <tr>
                                    <th>Time</th>
                                    <th>Event</th>
                                    <th>Venue</th>
                                    <th>Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>08:30</td>
                                    <td>100m Preliminaries</td>
                                    <td>Main Stadium</td>
                                    <td><span class="status-badge status-completed"><i class="fas fa-check"></i> Completed</span></td>
                                </tr>
                                <tr>
                                    <td>14:30</td>
                                    <td>4×100m Relay</td>
                                    <td>Main Stadium</td>
                                    <td><span class="status-badge status-upcoming"><i class="fas fa-clock"></i> Upcoming</span></td>
                                </tr>
                                <tr>
                                    <td>16:00</td>
                                    <td>200m Preliminaries</td>
                                    <td>Main Stadium</td>
                                    <td><span class="status-badge status-upcoming"><i class="fas fa-clock"></i> Upcoming</span></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                
                <div class="card">
                    <h3><i class="fas fa-medal"></i> My Results</h3>
                    <div class="table-responsive">
                        <table class="data-table">
                            <thead>
                                <tr>
                                    <th>Event</th>
                                    <th>Result</th>
                                    <th>Rank</th>
                                    <th>Points</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>100m Sprint</td>
                                    <td>11.23s</td>
                                    <td><i class="fas fa-medal" style="color: gold;"></i> 1st</td>
                                    <td>9</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </section>
    `;
}